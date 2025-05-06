import logging
from migrations.add_oauth_columns import run_migration as add_oauth_columns

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

def run_all_migrations():
    """Run all database migrations in order."""
    try:
        logger.info("Starting database migrations...")
        
        # Run migrations in order
        add_oauth_columns()
        
        logger.info("All migrations completed successfully")
        
    except Exception as e:
        logger.error(f"Error running migrations: {str(e)}", exc_info=True)
        raise

if __name__ == "__main__":
    run_all_migrations() 