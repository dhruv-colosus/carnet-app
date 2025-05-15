import json
import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

@router.websocket("/live")
async def live_endpoint(websocket: WebSocket):
    await websocket.accept()
    user_id = websocket.query_params.get("userid", "unknown")
    print(f"[WS] Connected: {user_id}")

    try:
        # mock_data.json should sit alongside your backend directory
        with open("mock_data.json") as f:
            data = json.load(f)
        for entry in data:
            await websocket.send_json({"userid": user_id, **entry})
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print(f"[WS] {user_id} disconnected")
    except Exception as e:
        print(f"[WS ERROR] {e}")
