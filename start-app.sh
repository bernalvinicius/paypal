#!/bin/bash

echo "🚀 Starting Transaction App..."

echo "📦 Installing dependencies..."
npm run install-all

echo "🔧 Starting backend server..."
npm run dev &
BACKEND_PID=$!

echo "⏳ Waiting for backend to start..."
sleep 5

echo "🌐 Starting React frontend..."
npm run client &
FRONTEND_PID=$!

echo "✅ Application started!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:3001"
echo "🏥 Health check: http://localhost:3001/api/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
