from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from db import Base
import enum

class TransactionType(str, enum.Enum):
    sell_data = "sell_data"
    cash_out  = "cash_out"

class User(Base):
    __tablename__ = "users"
    id               = Column(Integer, primary_key=True, index=True)
    name             = Column(String, index=True)
    car_name         = Column(String)
    points           = Column(Integer, default=0)
    public_key       = Column(String, unique=True, index=True)
    total_miles      = Column(Float, default=0.0)
    avg_speed        = Column(Float, default=0.0)
    total_alerts     = Column(Integer, default=0)
    transactions     = relationship("Transaction", back_populates="owner")

class Transaction(Base):
    __tablename__ = "transactions"
    id           = Column(Integer, primary_key=True, index=True)
    user_id      = Column(Integer, ForeignKey("users.id"))
    type         = Column(Enum(TransactionType))
    date         = Column(DateTime)
    amount       = Column(Float)
    sold_to      = Column(String, nullable=True)  # only set if type == sell_data
    owner        = relationship("User", back_populates="transactions")
