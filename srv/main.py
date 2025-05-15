from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import live, hi, users
from db import engine, Base

app = FastAPI()
Base.metadata.create_all(bind=engine)

# --- CORS middleware (unchanged) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- include your routers ---
app.include_router(live.router)
app.include_router(hi.router)
app.include_router(users.router)
# app.include_router(users.router)


@app.get("/")
def hello():
    return {"message": "Hello, World!"}
