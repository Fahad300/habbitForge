from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import engine, get_db
import models
from typing import List
from pydantic import BaseModel
from datetime import datetime, timedelta
import schemas
import auth

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Create FastAPI application instance
app = FastAPI(
    title="HabitForge API",
    description="API for HabitForge - A habit tracking application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Pydantic models for request/response
class TestItemBase(BaseModel):
    name: str

class TestItemCreate(TestItemBase):
    pass

class TestItem(TestItemBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True

@app.post("/signup", response_model=schemas.User)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Create a new user."""
    # Check if user already exists
    db_user = db.query(models.User).filter(
        (models.User.email == user.email) | (models.User.username == user.username)
    ).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or username already registered"
        )
    
    # Create new user
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/token", response_model=schemas.Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login to get access token."""
    try:
        # Authenticate user
        user = db.query(models.User).filter(models.User.username == form_data.username).first()
        if not user or not auth.verify_password(form_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token
        access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = auth.create_access_token(
            data={"sub": user.username},
            expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.get("/users/me", response_model=schemas.User)
async def read_users_me(
    current_user: models.User = Depends(auth.get_current_active_user)
):
    """Get current user information."""
    return current_user

@app.get("/")
def read_root():
    """Root endpoint."""
    return {"message": "Welcome to HabitForge API"}

@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

@app.post("/test-db/", response_model=TestItem)
def create_test_item(item: TestItemCreate, db: Session = Depends(get_db)):
    """
    Test endpoint to verify database connection by creating a test item.
    """
    try:
        db_item = models.TestTable(name=item.name)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/test-db/", response_model=List[TestItem])
def read_test_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Test endpoint to verify database connection by retrieving test items.
    """
    try:
        items = db.query(models.TestTable).offset(skip).limit(limit).all()
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 