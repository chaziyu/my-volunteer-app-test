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

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from config import settings
from database import engine, Base, get_db
import models
import schemas  # <--- IMPORT SCHEMAS

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.APP_NAME)

# ... (Your existing CORS setup is fine, keep it) ...
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development, allow all. In prod, use settings.CORS_ORIGINS
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- NEW CODE START ---

@app.post("/api/v1/events/", response_model=schemas.EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    # 1. Create the database model from the schema
    db_event = models.Event(
        title=event.title,
        # Frontend sends 'category' but DB might not have it? 
        # Let's assume you add 'category' to models.py or map it to description for now
        location=event.location,
        date=event.date, # You might want to combine date+time, but keeping separate is fine for now
        description=event.description,
        max_participants=event.max_participants,
        # Set default values
        participants=0,
        status="Open"
    )
    
    # 2. Add to DB
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    # 3. Return the created event
    # We need to map the DB model back to the Pydantic schema manually if fields differ
    # For this simple example, it should work if fields match.
    return db_event

@app.get("/api/v1/events/", response_model=list[schemas.EventResponse])
def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = db.query(models.Event).offset(skip).limit(limit).all()
    return events

# --- NEW CODE END ---

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
# ... rest of your code ...
