from typing import Optional, Dict, Any
from fastapi import HTTPException, status
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from starlette.requests import Request
from starlette.responses import RedirectResponse, JSONResponse
import httpx
from sqlalchemy.orm import Session
import models
import auth
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
config = Config(".env")

# Register OAuth2 configurations
oauth = OAuth(config)

# Google OAuth2
oauth.register(
    name="google",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email profile",
        "redirect_uri": "http://localhost:8000/auth/google/callback"
    }
)

# Apple OAuth2
oauth.register(
    name="apple",
    server_metadata_url="https://appleid.apple.com/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email name",
        "redirect_uri": "http://localhost:8000/auth/apple/callback"
    }
)

async def get_oauth_user(request: Request, provider: str, db: Session) -> models.User:
    """
    Get or create user from OAuth provider.
    
    Args:
        request: FastAPI request object
        provider: OAuth provider name (google/apple)
        db: Database session
    
    Returns:
        User object
    """
    try:
        token = await oauth.authorize_access_token(request)
        userinfo = await oauth.parse_id_token(request, token)
        
        # Get or create user
        email = userinfo.get("email")
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email not provided by OAuth provider"
            )
        
        # Check if user exists
        user = db.query(models.User).filter(models.User.email == email).first()
        if user:
            return user
        
        # Create new user
        username = userinfo.get("name", email.split("@")[0])
        # Ensure unique username
        base_username = username
        counter = 1
        while db.query(models.User).filter(models.User.username == username).first():
            username = f"{base_username}{counter}"
            counter += 1
        
        user = models.User(
            email=email,
            username=username,
            oauth_provider=provider,
            oauth_id=userinfo.get("sub"),
            profile_picture=userinfo.get("picture"),
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
        
    except Exception as e:
        logger.error(f"OAuth error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"OAuth error: {str(e)}"
        )

async def get_oauth_login_url(provider: str, request: Request) -> Dict[str, str]:
    """
    Get OAuth login URL for the specified provider.
    
    Args:
        provider: OAuth provider name (google/apple)
        request: FastAPI request object
    
    Returns:
        Dictionary containing the authorization URL
    """
    try:
        client = oauth.create_client(provider)
        if not client:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"OAuth client for {provider} not configured"
            )
        
        # Get the authorization URL
        redirect_uri = await client.authorize_redirect(request)
        auth_url = str(redirect_uri.url)
        
        logger.info(f"Generated OAuth URL for {provider}: {auth_url}")
        return {"auth_url": auth_url}
        
    except Exception as e:
        logger.error(f"Failed to get OAuth URL: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get OAuth URL: {str(e)}"
        ) 