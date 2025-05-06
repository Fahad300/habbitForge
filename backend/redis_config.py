import redis
from typing import Optional
from functools import wraps
from fastapi import HTTPException, Request, status
import time
import os

# Redis connection
redis_client = redis.Redis.from_url(
    os.getenv("REDIS_URL", "redis://localhost:6379/0"),
    decode_responses=True
)

def rate_limit(
    requests_per_minute: int = 60,
    key_prefix: str = "rate_limit"
) -> callable:
    """
    Rate limiting decorator using Redis.
    
    Args:
        requests_per_minute: Maximum number of requests allowed per minute
        key_prefix: Prefix for the Redis key
    """
    def decorator(func: callable) -> callable:
        @wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            # Get client IP
            client_ip = request.client.host
            
            # Create Redis key
            key = f"{key_prefix}:{client_ip}"
            
            # Get current timestamp
            current_time = int(time.time())
            
            # Get existing requests
            pipe = redis_client.pipeline()
            pipe.zremrangebyscore(key, 0, current_time - 60)  # Remove old requests
            pipe.zcard(key)  # Count remaining requests
            pipe.zadd(key, {str(current_time): current_time})  # Add current request
            pipe.expire(key, 60)  # Set expiry
            _, request_count, _, _ = pipe.execute()
            
            # Check if rate limit exceeded
            if request_count > requests_per_minute:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Too many requests. Please try again later."
                )
            
            return await func(request, *args, **kwargs)
        return wrapper
    return decorator

def get_redis_client() -> redis.Redis:
    """
    Get Redis client instance.
    """
    return redis_client 