@echo off
echo ========================================
echo Starting Financial Literacy Backend
echo ========================================
echo.

cd backend

echo [1/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/5] Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: Failed to generate Prisma client
    pause
    exit /b 1
)
echo.

echo [3/5] Running database migrations...
call npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo WARNING: Migration may have failed, continuing...
)
echo.

echo [4/5] Seeding database...
call npx prisma db seed
if %errorlevel% neq 0 (
    echo ERROR: Failed to seed database
    pause
    exit /b 1
)
echo.

echo [5/5] Starting backend server...
echo Backend will run on http://localhost:3001
echo Press Ctrl+C to stop
echo.
call npm run dev
