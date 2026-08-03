from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

import socket

# --- SQL DATABASE IMPORTS ---
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# 1. DATABASE CONFIGURATION
DATABASE_URL = "sqlite:///./health_tracker.db"

# The engine connects Python to the database, and SessionLocal handles individual transactions
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 2. SQL ALCHEMY MODEL (Defines what the database table looks like)
class DBFoodEntry(Base):
    __tablename__ = "nutrition_logs"
    id = Column(Integer, primary_key=True, index=True)
    food_name = Column(String, index=True)
    calories = Column(Integer)
    protein = Column(Float, default=0.0)
    carbs = Column(Float, default=0.0)
    fats = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.utcnow)

class DBFitnessEntry(Base): 
    __tablename__ = "fitness_logs"
    id = Column(Integer, primary_key=True, index=True)
    walks_count = Column(Integer, default=0)
    avg_heart_rate = Column(Integer, default=0)
    blood_pressure = Column(String, default="120/80")
    timestamp = Column(DateTime, default=datetime.utcnow)

# This single line tells PostgreSQL to automatically log into the cloud 
# and create our table structure if it doesn't already exist.
Base.metadata.create_all(bind=engine)

# FastAPI setup
app = FastAPI(title="Personal Health & Nutrition Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. DATABASE DEPENDENCY
# This opens a connection to the database for an API call, and closes it when finished.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 4. PYDANTIC SCHEMA (For incoming API validation)
class FoodEntrySchema(BaseModel):
    id: Optional[int] = None
    food_name: str
    calories: int
    protein: float
    carbs: float
    fats: float
    timestamp: Optional[datetime] = None

    class Config:
        from_attributes = True 

class FitnessEntrySchema(BaseModel):
    id: Optional[int] = None
    walks_count: int
    avg_heart_rate: int
    blood_pressure: str
    timestamp: Optional[datetime] = None
# 5. UPDATED API ENDPOINTS (ROUTES)

@app.get("/")
def read_root():
    return {"status": "healthy", "database": "connected", "features": ["nutrition", "fitness"]}

@app.get("/api/logs", response_model=List[FoodEntrySchema])
def get_all_logs(db: Session = Depends(get_db)):
    """Queries the database to pull down all existing records."""
    return db.query(DBFoodEntry).order_by(DBFoodEntry.timestamp.desc()).all()

@app.post("/api/logs", response_model=FoodEntrySchema, status_code=201)
def create_log_entry(entry: FoodEntrySchema, db: Session = Depends(get_db)):
    """Inserts a new data record directly into the cloud SQL table."""
    db_entry = DBFoodEntry(
        food_name=entry.food_name,
        calories=entry.calories,
        protein=entry.protein,
        carbs=entry.carbs,
        fats=entry.fats
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry) # Pulls down the auto-generated ID from SQL
    return db_entry

@app.delete("/api/logs/{entry_id}")
def delete_log_entry(entry_id: int, db: Session = Depends(get_db)):
    """Finds a specific record by ID and removes it permanently from the table."""
    db_entry = db.query(DBFoodEntry).filter(DBFoodEntry.id == entry_id).first()
    if not db_entry:
        raise HTTPException(status_code=404, detail="Log entry not found")
    
    db.delete(db_entry)
    db.commit()
    return {"message": "Successfully deleted"}

# NEW FITNESS ROUTES
@app.get("/api/fitness", response_model=List[FitnessEntrySchema])
def get_all_fitness(db: Session = Depends(get_db)):
    return db.query(DBFitnessEntry).order_by(DBFitnessEntry.timestamp.desc()).all()

@app.post("/api/fitness", response_model=FitnessEntrySchema, status_code=201)
def create_fitness_entry(entry: FitnessEntrySchema, db: Session = Depends(get_db)):
    db_entry = DBFitnessEntry(
        walks_count=entry.walks_count,
        avg_heart_rate=entry.avg_heart_rate,
        blood_pressure=entry.blood_pressure
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

@app.delete("/api/fitness/{entry_id}")
def delete_fitness_entry(entry_id: int, db: Session = Depends(get_db)):
    db_entry = db.query(DBFitnessEntry).filter(DBFitnessEntry.id == entry_id).first()
    if not db_entry:
        raise HTTPException(status_code=404, detail="Fitness log not found")
    db.delete(db_entry)
    db.commit()
    return {"message": "Fitness entry deleted successfully"}

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.Sock_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip

if __name__ == "__main__":
    local_ip = get_local_ip()
    print("\n" + "=" * 50)
    print(f" Server running locally: http://localhost:8000")
    print(f" Open this link on your iphone: http://{local_ip}:8000")
    print("=" * 50 + "\n")

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)