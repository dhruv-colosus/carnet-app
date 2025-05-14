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
async def live_endpoint(websocket: WebSocket, userid: str = Query(...)):
   
    await websocket.accept()
    try:
        # Load the mock data
        with open("mock_data.json", "r") as f:
            data = json.load(f)

        for entry in data:
            payload = {"userid": userid, **entry}
            await websocket.send_json(payload)
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print(f"Client {userid} disconnected")
    except Exception as e:
        print(f"Error in streaming data: {e}")