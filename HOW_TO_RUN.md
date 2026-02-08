# 🚀 How to Run the Application

## ⚡ Super Quick Start (Recommended)

### One Command to Rule Them All:

```bash
npm run dev
```

That's it! This will start both backend and frontend servers with colored logs.

**First time setup?** Run this first:
```bash
npm install
npm run install:all
npm run setup
npm run dev
```

---

## Quick Start (Batch File Method)

### Option 1: Double-Click to Start
1. **Double-click** `START_APPLICATION.bat`
2. Wait for both servers to start
3. Open browser: **http://localhost:3000**
4. Login with demo account:
   - Email: `demo@example.com`
   - Password: `demo123`

---

## Available NPM Scripts

Run these from the **root folder**:

| Command | Description |
|---------|-------------|
| `npm install` | Install root dependencies (concurrently) |
| `npm run install:all` | Install all dependencies (root, backend, frontend) |
| `npm run setup` | Setup database (generate, migrate, seed) |
| `npm run dev` | **Start both servers** (recommended) |
| `npm start` | Same as `npm run dev` |
| `npm run dev:backend` | Start backend only |
| `npm run dev:frontend` | Start frontend only |
| `npm run build` | Build both for production |
| `npm run clean` | Clean all node_modules and build files |

---

## First Time Setup

```bash
# 1. Install all dependencies
npm run install:all

# 2. Setup database
npm run setup

# 3. Start both servers
npm run dev
```

**That's it!** 🎉

---

## What You'll See

When you run `npm run dev`, you'll see colored logs:

```
[BACKEND] Server running on port 3001
[FRONTEND] ready - started server on 0.0.0.0:3000
```

- **Blue logs** = Backend
- **Magenta logs** = Frontend

---

## Manual Start (If Batch Files Don't Work)

### Step 1: Start Backend

Open **Command Prompt** or **PowerShell** and run:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

**Backend will run on:** http://localhost:3001

### Step 2: Start Frontend (New Terminal)

Open a **NEW** Command Prompt/PowerShell window and run:

```bash
cd frontend
npm install
npm run dev
```

**Frontend will run on:** http://localhost:3000

---

## Troubleshooting

### Problem: "npx prisma generate" fails with EPERM error

**Solution:** Close all terminals and VS Code, then try again.

### Problem: Port 3000 or 3001 already in use

**Solution:** Kill the process using the port:

```bash
# Find process on port 3001
netstat -ano | findstr :3001

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Same for port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problem: Database errors

**Solution:** Delete the database and recreate:

```bash
cd backend
del prisma\dev.db
npx prisma migrate dev --name init
npx prisma db seed
```

### Problem: Frontend can't connect to backend

**Solution:** Check that:
1. Backend is running on port 3001
2. Frontend `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`
3. No firewall blocking localhost

---

## What's Running?

### Backend (Port 3001)
- **API Server:** Express.js with TypeScript
- **Database:** SQLite (file: `backend/prisma/dev.db`)
- **Endpoints:** 12 RESTful APIs
- **Health Check:** http://localhost:3001/health

### Frontend (Port 3000)
- **Web App:** Next.js 14+ with React 18+
- **PWA:** Service Worker enabled
- **Offline:** IndexedDB for offline storage
- **UI:** Tailwind CSS

---

## Demo Account

**Email:** demo@example.com  
**Password:** demo123

Or register a new account!

---

## Features to Test

1. **Register/Login** - Create account or use demo
2. **Browse Scenarios** - 12 scenarios across 3 themes
3. **Make Decisions** - Choose and see feedback
4. **Earn Badges** - Complete scenarios to earn badges
5. **Track Progress** - View dashboard with score
6. **Offline Mode** - Disconnect internet and try!

---

## Stopping the Servers

### If using batch files:
- Close the terminal windows

### If running manually:
- Press `Ctrl+C` in each terminal

---

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=file:./dev.db
JWT_SECRET=finlit-hackathon-secret-key-2026-innovate4finlit
JWT_EXPIRY=24h
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_NAME=Financial Literacy Platform for Bharat
NEXT_PUBLIC_APP_VERSION=1.0.0
```

---

## Tech Stack

- **Frontend:** React 18+, Next.js 14+, TypeScript, Tailwind CSS
- **Backend:** Node.js 18+, Express.js, TypeScript
- **Database:** SQLite (via Prisma ORM)
- **Offline:** Service Workers, IndexedDB
- **Auth:** JWT with bcrypt

---

## Need Help?

Check the main README.md for more details or contact the team!

**Happy Testing! 🎉**
