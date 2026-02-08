@echo off
echo ========================================
echo CLEAN START - Financial Literacy Platform
echo ========================================
echo.
echo This will clean all caches and start fresh
echo.

echo [BACKEND] Cleaning...
cd backend
if exist dist rmdir /s /q dist
if exist node_modules\.prisma rmdir /s /q node_modules\.prisma
if exist prisma\dev.db del /q prisma\dev.db
if exist prisma\dev.db-journal del /q prisma\dev.db-journal
echo Backend cleaned!
echo.

echo [BACKEND] Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: Failed to generate Prisma client
    echo.
    echo Try closing VS Code and all terminals, then run this again.
    pause
    exit /b 1
)
echo.

echo [BACKEND] Creating database...
call npx prisma migrate dev --name init
echo.

echo [BACKEND] Seeding database with 12 scenarios...
call npx prisma db seed
if %errorlevel% neq 0 (
    echo ERROR: Failed to seed database
    pause
    exit /b 1
)
echo.
echo Backend setup complete!
echo.

cd ..

echo [FRONTEND] Cleaning...
cd frontend
if exist .next rmdir /s /q .next
echo Frontend cleaned!
echo.

cd ..

echo ========================================
echo CLEAN COMPLETE!
echo ========================================
echo.
echo Now starting servers...
echo.
pause

echo Starting Backend...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo Waiting 10 seconds for backend...
timeout /t 10 /nobreak > nul

echo Starting Frontend...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo SERVERS STARTED!
echo ========================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Demo Account:
echo Email: demo@example.com
echo Password: demo123
echo.
echo Press any key to close this window...
pause > nul
