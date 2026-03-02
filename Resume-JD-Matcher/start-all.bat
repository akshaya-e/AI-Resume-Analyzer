@echo off
echo ========================================
echo   AI Resume Analyzer - Integrated System
echo ========================================
echo.
echo Starting all services...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.9+ from https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] Starting Python Microservice (Port 5001)...
start "Python AI Service" cmd /k "cd python-service && python app.py"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Node.js Backend (Port 5000)...
start "Node.js Backend" cmd /k "cd server && npm start"
timeout /t 3 /nobreak >nul

echo [3/3] Starting React Frontend (Port 5173)...
start "React Frontend" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo   All services are starting!
echo ========================================
echo.
echo   Python AI Service: http://localhost:5001
echo   Node.js Backend:   http://localhost:5000
echo   React Frontend:    http://localhost:5173
echo.
echo   Press any key to open the application in your browser...
pause >nul

start http://localhost:5173

echo.
echo   To stop all services, close the terminal windows.
echo.
pause
