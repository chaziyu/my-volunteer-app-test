# backend/config.py

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
from typing import List, Union

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="allow"
    )

    # App Configuration
    APP_NAME: str = "Volunteerism App Backend"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # API Configuration
    API_V1_PREFIX: str = "/api/v1"
    
    # --- NEW CODE START ---
    # Database Configuration
    # This reads the DATABASE_URL environment variable we set in Render
    DATABASE_URL: str = "sqlite:///./database.db" # Default to local file if cloud URL isn't found
    # --- NEW CODE END ---

    # CORS Configuration
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://my-volunteer-app-test.vercel.app" # Add your Vercel URL here later
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v
    
settings = Settings()
