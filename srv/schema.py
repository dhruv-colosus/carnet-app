from pydantic import BaseModel
from enum import Enum
from datetime import datetime
from typing import List, Optional

class TransactionType(str, Enum):
    sell_data = "sell_data"
    cash_out  = "cash_out"

class Transaction(BaseModel):
    id: int
    type: TransactionType
    date: datetime
    amount: float
    sold_to: Optional[str] = None

    class Config:
        orm_mode = True

class User(BaseModel):
    id: int
    name: str
    car_name: str
    points: int
    public_key: str
    total_miles: float
    avg_speed: float
    total_alerts: int
    transactions: List[Transaction] = []

    class Config:
        orm_mode = True
