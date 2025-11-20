# backend/schemas.py
from pydantic import BaseModel
from typing import Optional

# Base Schema (Shared properties)
class EventBase(BaseModel):
    title: str
    category: str
    date: str
    time: str
    location: str
    description: str
    max_participants: int
    requirements: Optional[str] = None
    image: Optional[str] = None

# Schema for creating an event (Incoming data)
class EventCreate(EventBase):
    pass

# Schema for reading an event (Outgoing data)
class EventResponse(EventBase):
    id: int
    participants: int
    status: str

    class Config:
        from_attributes = True
