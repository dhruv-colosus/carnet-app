#!/usr/bin/env python3
"""
Run this script to populate the database with seed data for development.
"""
import sys
import os

# Add the srv directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'srv'))

from seed_data import seed_database

if __name__ == "__main__":
    print("Seeding database with initial data...")
    seed_database()
    print("Seed completed!") 