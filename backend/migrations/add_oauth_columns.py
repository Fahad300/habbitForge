from sqlalchemy import create_engine, String
from sqlalchemy.sql import text
from database import Base, DATABASE_URL
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

def run_migration():
    """Add OAuth-related columns to the users table."""
    try:
        # Create engine
        engine = create_engine(DATABASE_URL)
        
        # Add new columns
        with engine.connect() as connection:
            # Add oauth_provider column
            connection.execute(text("""
                ALTER TABLE users 
                ADD COLUMN IF NOT EXISTS oauth_provider VARCHAR
            """))
            
            # Add oauth_id column
            connection.execute(text("""
                ALTER TABLE users 
                ADD COLUMN IF NOT EXISTS oauth_id VARCHAR
            """))
            
            # Add profile_picture column
            connection.execute(text("""
                ALTER TABLE users 
                ADD COLUMN IF NOT EXISTS profile_picture VARCHAR
            """))
            
            connection.commit()
            
        logger.info("Successfully added OAuth columns to users table")
        
    except Exception as e:
        logger.error(f"Error running migration: {str(e)}", exc_info=True)
        raise

if __name__ == "__main__":
    run_migration() 