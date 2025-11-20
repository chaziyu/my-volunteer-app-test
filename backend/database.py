# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

# 1. Get the URL
SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

# 2. Fix for Render's URL format (postgres:// -> postgresql://)
if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# 3. Create Engine (Connection)
if "sqlite" in SQLALCHEMY_DATABASE_URL:
    # SQLite settings (for local testing)
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    # PostgreSQL settings (for Render)
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 4. Create Session Factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 5. Base class for your models
Base = declarative_base()

# 6. Dependency to use in your API routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
