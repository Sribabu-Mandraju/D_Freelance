#!/usr/bin/env python3
"""
Setup script for CryptoLance Chatbot
"""

import os
import subprocess
import sys

def install_requirements():
    """Install required packages"""
    print("Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements-chatbot.txt"])
        print("✅ Packages installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install packages: {e}")
        return False
    return True

def check_env_file():
    """Check if .env file exists and has API key"""
    if not os.path.exists('.env'):
        print("❌ .env file not found!")
        print("Please create a .env file with your Google API key:")
        print("GEMINI_API_KEY=your_actual_api_key_here")
        return False
    
    with open('.env', 'r') as f:
        content = f.read()
        if 'your_actual_api_key_here' in content or 'GEMINI_API_KEY=' not in content:
            print("❌ Please set your actual Google API key in the .env file")
            return False
    
    print("✅ .env file configured correctly!")
    return True

def main():
    print("🚀 CryptoLance Chatbot Setup")
    print("=" * 40)
    
    # Install requirements
    if not install_requirements():
        return
    
    # Check environment
    if not check_env_file():
        print("\n📝 Setup incomplete. Please:")
        print("1. Get your Google API key from: https://makersuite.google.com/app/apikey")
        print("2. Create a .env file with: GEMINI_API_KEY=your_key_here")
        print("3. Run this setup script again")
        return
    
    print("\n🎉 Setup complete! You can now run:")
    print("python chatbot.py")
    print("\nThe chatbot will be available at: http://localhost:5000")

if __name__ == "__main__":
    main()
