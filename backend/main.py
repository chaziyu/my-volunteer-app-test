# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from config import settings
# --- NEW IMPORTS ---
from database import engine, Base
# IMPORTANT: Import your models here later so the DB knows what to create!
# from models import User, Event 
# -------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print(f"Starting {settings.APP_NAME}...")
    
    # --- NEW: Create Tables ---
    print("Checking database connection...")
    try:
        # This creates tables for any models you have imported
        Base.metadata.create_all(bind=engine)
        print("Database tables created/verified successfully.")
    except Exception as e:
        print(f"Error connecting to database: {e}")
    # --------------------------

    yield
    # Shutdown
    print("Shutting down...")

app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for Volunteerism App",
    version=settings.VERSION,
    debug=settings.DEBUG,
    lifespan=lifespan
)

# ... rest of your code ...
