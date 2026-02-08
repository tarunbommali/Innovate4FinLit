@echo off
echo ========================================
echo Database Initialization
echo ========================================
echo.

echo Checking PostgreSQL connection...
echo.

call npm run init-db

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo Database initialization FAILED!
    echo ========================================
    echo.
    echo Troubleshooting steps:
    echo 1. Ensure PostgreSQL is running
    echo 2. Verify database "Innovate4FinLit" exists
    echo 3. Check backend/.env for correct credentials
    echo 4. Ensure database user has CREATE/ALTER permissions
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Database initialized successfully!
echo ========================================
echo.
echo You can now start the application with:
echo   npm start
echo.
echo Or use the backend only:
echo   cd backend
echo   npm run dev
echo.
pause
