#!/usr/bin/env python3
"""
Test script for CryptoLance Chatbot
"""

import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

def test_health_endpoint():
    """Test the health endpoint"""
    print("🔍 Testing health endpoint...")
    try:
        response = requests.get("http://localhost:5000/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def test_chat_endpoint():
    """Test the chat endpoint"""
    print("\n💬 Testing chat endpoint...")
    try:
        data = {"message": "Hello, what is CryptoLance?"}
        response = requests.post(
            "http://localhost:5000/chat",
            headers={"Content-Type": "application/json"},
            json=data
        )
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Response length: {len(result.get('response', ''))} characters")
            print(f"First 200 chars: {result.get('response', '')[:200]}...")
            return True
        else:
            print(f"Error response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Chat test failed: {e}")
        return False

def check_environment():
    """Check environment configuration"""
    print("🔧 Checking environment...")
    
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        print("❌ GEMINI_API_KEY not set")
        return False
    elif api_key == 'your_actual_api_key_here':
        print("❌ GEMINI_API_KEY still has placeholder value")
        return False
    else:
        print(f"✅ GEMINI_API_KEY is set (length: {len(api_key)})")
        return True

def main():
    print("🧪 CryptoLance Chatbot Test Suite")
    print("=" * 40)
    
    # Check environment
    if not check_environment():
        print("\n❌ Environment not configured properly!")
        print("Please:")
        print("1. Create a .env file with your Google API key")
        print("2. Set GOOGLE_API_KEY=your_actual_key")
        return
    
    # Test endpoints
    health_ok = test_health_endpoint()
    chat_ok = test_chat_endpoint()
    
    print("\n" + "=" * 40)
    if health_ok and chat_ok:
        print("🎉 All tests passed! Chatbot is working correctly.")
    else:
        print("❌ Some tests failed. Check the output above for details.")
        if not health_ok:
            print("- Make sure the Flask server is running: python chatbot.py")
        if not chat_ok:
            print("- Check the server logs for error details")

if __name__ == "__main__":
    main()
