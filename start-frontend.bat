@echo off
echo ========================================
echo Starting Financial Literacy Frontend
echo ========================================
echo.

cd frontend

echo [1/2] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/2] Starting frontend server...
echo Frontend will run on http://localhost:3000
echo Press Ctrl+C to stop
echo.
call npm run dev
