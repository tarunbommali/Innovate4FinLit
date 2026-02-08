@echo off
echo ========================================
echo Financial Literacy Platform - Complete Setup
echo ========================================
echo.

echo Step 1: Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend dependencies installation failed!
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
echo.

echo Step 2: Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependencies installation failed!
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

echo Step 3: Initializing Database...
cd ..\backend
call npm run init-db
if %errorlevel% neq 0 (
    echo ERROR: Database initialization failed!
    echo.
    echo Please ensure:
    echo 1. PostgreSQL is running
    echo 2. Database "Innovate4FinLit" exists
    echo 3. Connection credentials in backend/.env are correct
    echo.
    pause
    exit /b 1
)
echo ✓ Database initialized successfully
echo.

echo Step 4: Building Backend...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Backend build failed!
    pause
    exit /b 1
)
echo ✓ Backend built successfully
echo.

echo ========================================
echo ✓ Setup Complete! Starting Application...
echo ========================================
echo.
echo Backend will start on: http://localhost:3001
echo Frontend will start on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the application
echo.

cd ..
call npm start
