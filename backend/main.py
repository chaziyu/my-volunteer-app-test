# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from config import settings

# --- NEW IMPORTS ---
from database import engine, Base
# You will import your models here later so the DB knows what tables to create
# from models import User, Event 
# -------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print(f"Starting {settings.APP_NAME}...")
    print(f"Environment: {settings.ENVIRONMENT}")
    
    # --- NEW CODE: Create Database Tables ---
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")
    # ----------------------------------------
    
    yield
    # Shutdown
    print("Shutting down...")

app = FastAPI(
    title=settings.APP_NAME,
    # ... rest of your code ...
