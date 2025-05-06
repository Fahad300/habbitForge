from fastapi import FastAPI, Depends, HTTPException, status, Request
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
from redis_config import rate_limit
import oauth
from fastapi.responses import HTMLResponse
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("app.log")
    ]
)
logger = logging.getLogger(__name__)

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
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
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
@rate_limit(requests_per_minute=5, key_prefix="signup")
async def signup(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):
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
        hashed_password=hashed_password,
        is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/token", response_model=schemas.Token)
@rate_limit(requests_per_minute=10, key_prefix="login")
async def login_for_access_token(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login endpoint to get access token."""
    try:
        logger.debug(f"Login attempt for user: {form_data.username}")
        
        # Validate input
        if not form_data.username or not form_data.password:
            logger.warning("Login attempt with empty username or password")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username and password are required"
            )

        # Authenticate user
        user = auth.authenticate_user(db, form_data.username, form_data.password)
        if not user:
            logger.warning(f"Failed login attempt for user: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token
        try:
            access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = auth.create_access_token(
                data={"sub": user.username}, expires_delta=access_token_expires
            )
        except Exception as e:
            logger.error(f"Error creating access token: {str(e)}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error creating access token"
            )
        
        # Convert user to dict for response
        try:
            user_dict = {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "is_active": user.is_active,
                "points": user.points,
                "created_at": user.created_at,
                "updated_at": user.updated_at,
                "oauth_provider": user.oauth_provider,
                "oauth_id": user.oauth_id,
                "profile_picture": user.profile_picture
            }
        except Exception as e:
            logger.error(f"Error converting user to dict: {str(e)}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error processing user data"
            )
        
        logger.info(f"Successful login for user: {user.username}")
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_dict
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error during login: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during login. Please try again."
        )

@app.get("/auth/{provider}")
@rate_limit(requests_per_minute=10, key_prefix="oauth")
async def oauth_login(
    provider: str,
    request: Request
):
    if provider not in ["google", "apple"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OAuth provider"
        )
    return await oauth.get_oauth_login_url(provider, request)

@app.get("/auth/{provider}/callback")
async def oauth_callback(
    provider: str,
    request: Request,
    db: Session = Depends(get_db)
):
    if provider not in ["google", "apple"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OAuth provider"
        )
    
    user = await oauth.get_oauth_user(request, provider, db)
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=schemas.User)
async def read_users_me(
    current_user: models.User = Depends(auth.get_current_active_user)
):
    """Get current user information."""
    return current_user

@app.get("/", response_class=HTMLResponse)
async def root():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>HabitForge API</title>
        <style>
            body {
                font-family: 'Segoe UI', sans-serif;
                background: #f0f4f8;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                background: white;
                padding: 2rem 3rem;
                border-radius: 16px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h1 {
                color: #2e7d32;
                margin-bottom: 0.5rem;
            }
            p {
                color: #555;
                font-size: 1.1rem;
                margin-bottom: 1.5rem;
            }
            a.button {
                display: inline-block;
                margin: 0.3rem;
                padding: 0.6rem 1.2rem;
                background: #2e7d32;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 500;
                transition: background 0.3s ease;
            }
            a.button:hover {
                background: #1b5e20;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Welcome to HabitForge API</h1>
            <p>Build better habits. One check-in at a time.</p>
            <a class="button" href="/docs">📘 Swagger Docs</a>
            <a class="button" href="/redoc">📕 ReDoc</a>
            <a class="button" href="/health">✅ Health Check</a>
            <a class="button" href="http://localhost:5173/" target="_blank">🌐 Frontend</a>
            <a class="button" href="https://github.com/Fahad300/habbitForge" target="_blank">🛠 GitHub</a>
        </div>
    </body>
    </html>
    """

@app.get("/health")
async def health_check():
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

@app.get("/debug/user/{username}")
async def debug_user(
    username: str,
    db: Session = Depends(get_db)
):
    """Debug endpoint to check user details."""
    try:
        user = db.query(models.User).filter(models.User.username == username).first()
        if not user:
            return {"error": f"User {username} not found"}
            
        return {
            "username": user.username,
            "email": user.email,
            "is_active": user.is_active,
            "hashed_password": user.hashed_password,
            "created_at": user.created_at,
            "updated_at": user.updated_at
        }
    except Exception as e:
        logger.error(f"Error in debug endpoint: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        ) 