# backend/models.py
from sqlalchemy import Column, Integer, String, Boolean, Text, JSON
from database import Base

# User Model
# Matches frontend 'User' interface: id, name, role, badges, eventsJoined
class User(Base):
    __tablename__ = "users"

    # We use String for id because your mock data uses "user_123"
    id = Column(String, primary_key=True, index=True) 
    email = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String) # For security
    role = Column(String) # 'volunteer' or 'organizer'
    
    # Store badges as a JSON list e.g. ["Newbie", "Green Hero"]
    badges = Column(JSON, default=[]) 
    
    events_joined = Column(Integer, default=0)

# Event Model
# Matches frontend 'Event' interface
class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    location = Column(String)
    date = Column(String) # Storing as string (e.g., "2025-11-25") for simplicity
    organizer = Column(String)
    description = Column(Text)
    
    participants = Column(Integer, default=0)
    max_participants = Column(Integer)
    
    status = Column(String, default="Open") # 'Open', 'Full', 'Completed'
    image = Column(String, nullable=True) # URL to the image
