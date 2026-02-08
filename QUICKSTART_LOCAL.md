# Quick Start Guide - Local PostgreSQL Setup

## Prerequisites
- Node.js 18+ installed
- PostgreSQL installed and running locally
- Database `Innovate4FinLit` created in PostgreSQL

## Setup Steps

### Step 1: Initialize Database
Double-click or run:
```bash
INIT_DATABASE.bat
```

This will:
- ✅ Generate Prisma Client
- ✅ Create database tables
- ✅ Seed initial data (10+ scenarios, demo user)

### Step 2: Start Application
Double-click or run:
```bash
START_APPLICATION.bat
```

This starts both backend (port 3001) and frontend (port 3000).

## Alternative: All-in-One Setup
```bash
INIT_AND_START.bat
```

Does everything: installs dependencies, initializes database, and starts servers.

## Verify Setup

Check if database is properly set up:
```bash
cd backend
npm run verify
```

## Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/v1
- **Health Check**: http://localhost:3001/health

## Demo Account
- **Email**: `demo@example.com`
- **Password**: `demo123`

## What Gets Created

### Database Tables
- User (accounts and profiles)
- Scenario (financial literacy scenarios)
- Choice (multiple choice options)
- Decision (user responses)
- Progress (learning progress tracking)

### Seed Data
- 10+ scenarios across themes:
  - Budgeting
  - Saving
  - Investing
  - Credit Management
  - Insurance
- Demo user account
- Sample progress data

## Troubleshooting

### "Database connection failed"
1. Ensure PostgreSQL is running
2. Verify database `Innovate4FinLit` exists:
   ```sql
   CREATE DATABASE "Innovate4FinLit";
   ```
3. Check credentials in `backend/.env`

### "Environment variable not found: DATABASE_URL"
Check that `backend/.env` exists with:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/Innovate4FinLit
```

### Backend won't start
Run database initialization:
```bash
cd backend
npm run init-db
```

### Need to reset database
```bash
cd backend
npx prisma migrate reset
npm run prisma:seed
```

## Manual Setup (if batch files don't work)

### Backend
```bash
cd backend
npm install
npm run init-db
npm run build
npm run dev
```

### Frontend (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

## More Help

- **Database Setup**: See `DATABASE_SETUP.md`
- **API Documentation**: See `API_LIST.md`
- **Troubleshooting**: See `TROUBLESHOOTING.md`
- **Full Setup Guide**: See `SETUP.md`

## Quick Commands

| Command | Description |
|---------|-------------|
| `INIT_DATABASE.bat` | Initialize database only |
| `START_APPLICATION.bat` | Start both servers |
| `INIT_AND_START.bat` | Complete setup + start |
| `cd backend && npm run verify` | Verify database setup |
| `cd backend && npm run dev` | Start backend only |
| `cd frontend && npm run dev` | Start frontend only |

---

**Ready to start?** Run `INIT_DATABASE.bat` then `START_APPLICATION.bat`
