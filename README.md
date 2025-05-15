# FastAPI Backend

A WebSocket-based backend server that streams mock data to connected clients.

## Setup

1. Clone the repository
   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. Create and activate a virtual environment
   ```
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies
   ```
   pip install fastapi uvicorn websockets
   ```

4. Create a mock data file
   
   Create a file named `mock_data.json` in the root directory with your mock data:
   ```json
   [
     {"data": "example1", "timestamp": "2023-07-01T12:00:00"},
     {"data": "example2", "timestamp": "2023-07-01T12:01:00"}
   ]
   ```

## Running the Server

Start the FastAPI server with:
```
uvicorn main:app --reload
```

The server will be available at:
- HTTP endpoint: http://localhost:8000
- WebSocket endpoint: ws://localhost:8000/live?userid=YOUR_USER_ID

## API Endpoints

### HTTP

- `GET /`: Simple health check endpoint

### WebSocket

- `WebSocket /live`: WebSocket endpoint that streams mock data
  - Required query parameter: `userid` - Identifier for the connecting client

## Testing WebSocket Connection

You can test the WebSocket connection using tools like [websocat](https://github.com/vi/websocat):

```
websocat ws://localhost:8000/live?userid=test_user
```

Or use a browser-based WebSocket client to connect to the endpoint. 