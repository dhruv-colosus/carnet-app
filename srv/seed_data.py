from sqlalchemy.orm import Session
import models
from db import SessionLocal, engine, Base
from datetime import datetime
import random
import string
from models import TransactionType

def generate_random_public_key(length=42):
    """Generate a random public key string starting with 0x"""
    chars = string.ascii_letters + string.digits
    return "0x" + ''.join(random.choice(chars) for _ in range(length-2))

def seed_database():
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        existing_user = db.query(models.User).filter(models.User.name == "Dhruv").first()
        if existing_user:
            print("User 'Dhruv' already exists in the database.")
            return
        
        user_data = {
            "name": "Dhruv",
            "car_name": "Tesla",
            "points": 10,
            "public_key": generate_random_public_key(),
            "total_miles": 1250.5,
            "avg_speed": 65.7,
            "total_alerts": 3
        }
        
        user = models.User(**user_data)
        db.add(user)
        db.commit()
        db.refresh(user)
        
        print(f"Created user: {user.name} with id {user.id}")
        
        transactions = [
            {
                "user_id": user.id,
                "type": TransactionType.sell_data,
                "date": datetime.now(),
                "amount": 5.5,
                "sold_to": "Tesla Inc"
            },
            {
                "user_id": user.id,
                "type": TransactionType.cash_out,
                "date": datetime.now(),
                "amount": 2.3,
                "sold_to": None
            }
        ]
        
        for transaction_data in transactions:
            transaction = models.Transaction(**transaction_data)
            db.add(transaction)
        
        db.commit()
        print(f"Added 2 transactions for user {user.name}")
        
    finally:
        db.close()

if __name__ == "__main__":
    seed_database() 