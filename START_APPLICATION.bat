@echo off
echo ========================================
echo Financial Literacy Platform for Bharat
echo ========================================
echo.

REM Check if database is initialized
echo Checking database status...
cd backend
call npx prisma db pull --force 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Database not initialized or not accessible!
    echo.
    echo Please run INIT_DATABASE.bat first to set up the database.
    echo.
    pause
    exit /b 1
)
cd ..

echo ✓ Database is ready
echo.
echo This will start both backend and frontend servers.
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press any key to continue...
pause > nul

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "start-backend.bat"

echo Waiting 10 seconds for backend to initialize...
timeout /t 10 /nobreak > nul

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "start-frontend.bat"

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Demo Account:
echo Email: demo@example.com
echo Password: demo123
echo.
echo Press any key to exit this window...
echo (Servers will continue running in separate windows)
pause > nul
