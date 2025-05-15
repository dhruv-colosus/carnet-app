from sqlalchemy.orm import Session
import models

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: dict):
    db_user = models.User(**user)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
