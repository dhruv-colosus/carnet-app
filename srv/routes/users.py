from typing import Generator
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schema
from db import SessionLocal

router = APIRouter(prefix="/users", tags=["users"])

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{user_id}", response_model=schema.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
