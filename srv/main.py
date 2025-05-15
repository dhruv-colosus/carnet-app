import json
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def hello():
    return {"message": "Hello, World!"}

@app.websocket("/live")
async def live_endpoint(websocket: WebSocket):
    await websocket.accept()
    user_id = websocket.query_params.get("userid", "unknown")
    print(f"[WS] Connected: {user_id}")

    try:
        with open("mock_data.json") as f:
            data = json.load(f)
        for entry in data:
            await websocket.send_json({"userid": user_id, **entry})
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print(f"[WS] {user_id} disconnected")
    except Exception as e:
        print(f"[WS ERROR] {e}")

@app.websocket("/hi")
async def ws_root(ws: WebSocket):
    await ws.accept()
    print("WS client connected")
    while True:
        msg = await ws.receive_text()
        print("Received:", msg)
        await ws.send_text(f"You said: {msg}")