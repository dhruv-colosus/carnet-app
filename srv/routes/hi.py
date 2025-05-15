from fastapi import APIRouter, WebSocket

router = APIRouter()

@router.websocket("/hi")
async def ws_root(ws: WebSocket):
    await ws.accept()
    print("WS client connected")
    while True:
        msg = await ws.receive_text()
        print("Received:", msg)
        await ws.send_text(f"You said: {msg}")
