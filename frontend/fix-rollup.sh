#!/bin/bash

# Exit immediately if a command fails
set -e

echo "Cleaning old dependencies..."
rm -rf node_modules package-lock.json

echo "Reinstalling dependencies..."
npm install

echo "Installing missing Rollup binary for Linux..."
npm install @rollup/rollup-linux-x64-gnu --save-dev

echo "Done! Now commit and push the changes to redeploy."
