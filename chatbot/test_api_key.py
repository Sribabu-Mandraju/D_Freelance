#!/usr/bin/env python3
"""
Test script to verify Google Gemini API key is working
"""

import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def test_api_key():
    """Test if the API key works with Gemini"""
    print("🧪 Testing Google Gemini API Key")
    print("=" * 40)
    
    # Get API key
    api_key = os.getenv('GEMINI_API_KEY') or "AIzaSyD42H1VMFhmFkcXS7MiWhdwaPgmkBmPN1w"
    
    if not api_key:
        print("❌ No API key found!")
        return False
    
    print(f"🔑 Using API key: {api_key[:10]}...")
    
    try:
        # Configure Gemini
        genai.configure(api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Test with a simple prompt
        print("📤 Sending test request...")
        response = model.generate_content("Hello! Please respond with 'API key is working!'")
        
        if response and response.text:
            print("✅ API key is working!")
            print(f"📝 Response: {response.text}")
            return True
        else:
            print("❌ Empty response received")
            return False
            
    except Exception as e:
        print(f"❌ API test failed: {e}")
        print(f"Error type: {type(e).__name__}")
        return False

if __name__ == "__main__":
    success = test_api_key()
    
    print("\n" + "=" * 40)
    if success:
        print("🎉 API key test passed! Your chatbot should work now.")
    else:
        print("❌ API key test failed. Check the error above.")
        print("\nPossible issues:")
        print("- API key is invalid or expired")
        print("- API key doesn't have proper permissions")
        print("- Network connectivity issues")
        print("- API quota exceeded")
