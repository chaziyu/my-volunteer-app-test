# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from config import settings
from database import engine, Base

# --- NEW: IMPORT MODELS HERE ---
# This is crucial! If you don't import them, tables won't be created.
import models 
# -------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"Starting {settings.APP_NAME}...")
    
    # Create Tables
    print("Creating database tables...")
    # This line looks at all imported models and builds the tables
    Base.metadata.create_all(bind=engine) 
    print("Tables created successfully.")
    
    yield
    print("Shutting down...")

# ... rest of your code ...
