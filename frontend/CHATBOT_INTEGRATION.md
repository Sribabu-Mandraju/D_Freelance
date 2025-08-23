# Chatbot Integration Guide

This document explains how the React Chatbot component integrates with the Python Flask backend.

## Overview

The chatbot consists of two main components:

1. **Frontend**: React component (`src/Components/Chatbot.jsx`)
2. **Backend**: Python Flask API (`chatbot/chatbot.py`)

## Backend Setup

### 1. Install Python Dependencies

**Option A: Use the setup script (Recommended)**

```bash
cd chatbot
python setup.py
```

**Option B: Manual installation**

```bash
cd chatbot
pip install -r requirements-chatbot.txt
```

### 2. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 3. Set Environment Variables

Create a `.env` file in the `chatbot` directory:

```env
GOOGLE_API_KEY=your_actual_api_key_here
```

**⚠️ Important:** Replace `your_actual_api_key_here` with your real API key from Google AI Studio.

### 4. Run the Flask Server

```bash
cd chatbot
python chatbot.py
```

The server will start on `http://localhost:5000`

## Frontend Configuration

### 1. API Configuration

The chatbot uses a configuration file (`src/config/chatbot.js`) to manage API endpoints:

```javascript
export const CHATBOT_CONFIG = {
  development: {
    apiUrl: "http://localhost:5000/chat",
    timeout: 10000,
  },
  production: {
    apiUrl: "https://your-domain.com/chat", // Update this
    timeout: 15000,
  },
};
```

### 2. Environment Variables

For production, update the API URL in the config file or set environment variables.

## Features

### Connection Status

- **Online**: Green indicator when backend is reachable
- **Offline**: Red indicator with retry button when backend is unreachable
- **Auto-recovery**: Connection status updates automatically after successful requests

### Error Handling

- **Timeout handling**: Requests timeout after configurable duration
- **Network errors**: Specific error messages for different failure types
- **Graceful degradation**: Chat interface remains functional even when backend is offline

### Message Processing

- **Markdown support**: Bot responses support markdown formatting
- **Real-time updates**: Messages appear instantly with timestamps
- **Loading states**: Visual feedback during API calls

## API Endpoints

### POST `/chat`

Sends a message to the chatbot and receives a response.

**Request Body:**

```json
{
  "message": "User's message here"
}
```

**Response:**

```json
{
  "response": "Bot's response in markdown format"
}
```

### GET `/health`

Health check endpoint to verify service status.

## Troubleshooting

### Common Issues

1. **"Sorry, I'm unable to provide a response right now" Error**

   - **Cause**: Missing or invalid Google API key
   - **Solution**:
     - Check if `.env` file exists in `chatbot` directory
     - Verify `GOOGLE_API_KEY` is set correctly
     - Ensure API key is valid and not expired
     - Check console logs for specific error messages

2. **Backend Connection Failed**

   - Ensure Flask server is running on port 5000
   - Check firewall settings
   - Verify CORS configuration

3. **API Key Issues**

   - Ensure Google Gemini API key is set in `.env` file
   - Check API key permissions and quotas
   - Verify the key is from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **CORS Errors**
   - Backend is configured to allow requests from common development ports
   - Update CORS origins in `chatbot.py` if needed

### Debug Mode

Enable debug mode in Flask by setting `debug=True` in `chatbot.py` for detailed error logs.

### Testing the Backend

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test chat endpoint
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```

## Deployment

### Production Considerations

1. Update API URL in `chatbot.js` config
2. Set proper CORS origins for production domain
3. Use HTTPS for production API endpoints
4. Consider rate limiting and security measures
5. Set appropriate timeout values for production environment

### Environment Variables

```bash
NODE_ENV=production
REACT_APP_CHATBOT_API_URL=https://your-domain.com/chat
```

## Security Notes

- The chatbot uses Google's Gemini API for responses
- API keys should be kept secure and not exposed in client-side code
- Consider implementing rate limiting for production use
- All user messages are sent to the backend for processing

## Quick Start Checklist

- [ ] Install Python dependencies: `python setup.py`
- [ ] Get Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] Create `.env` file with your API key
- [ ] Start backend: `python chatbot.py`
- [ ] Test health endpoint: `curl http://localhost:5000/health`
- [ ] Test chat endpoint with a simple message
- [ ] Verify frontend connects successfully
