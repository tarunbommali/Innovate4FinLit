# Quick Start Guide for Judges & Evaluators

## 🚀 Get Started in 5 Minutes

This guide will help you quickly set up and evaluate the Financial Literacy Platform for Bharat.

## Prerequisites

- Docker and Docker Compose installed
- OR Node.js 18+ and PostgreSQL 15+ installed

## Option 1: Docker (Recommended - Fastest)

### Step 1: Start the Application
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database
- Backend API (port 3001)
- Frontend application (port 3000)

### Step 2: Initialize Database
```bash
# Wait 30 seconds for services to start, then:
docker exec -it finlit-backend npx prisma migrate deploy
docker exec -it finlit-backend npx prisma db seed
```

### Step 3: Open the Application
Navigate to: **http://localhost:3000**

## Option 2: Manual Setup

### Step 1: Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Step 2: Setup Frontend (in new terminal)
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1" > .env.local
npm run dev
```

### Step 3: Open the Application
Navigate to: **http://localhost:3000**

## 🎯 Demo Flow

### 1. Register a New Account
- Click "Create a new account"
- Fill in the form:
  - Name: Test Student
  - Email: student@test.com
  - Password: password123
  - User Group: Student
  - Language: English
- Click "Create account"

### 2. Explore the Dashboard
You'll see:
- **Financial Score**: Starts at 0
- **Completed Scenarios**: 0
- **Badges Earned**: 0
- Click "Start Learning" to begin

### 3. Browse Scenarios
You'll see 7 scenarios across 3 themes:
- **Savings** (2 scenarios)
- **Budgeting** (2 scenarios)
- **Fraud Prevention** (3 scenarios)

Filter by theme or browse all scenarios.

### 4. Play a Scenario

#### Try "Pocket Money Planning" (Easy - Savings)
1. Click on the scenario card
2. Read the context: You have ₹500 pocket money
3. Choose from 4 options:
   - Save all ₹500 (Best choice: +25 points)
   - Go to movie and save ₹300 (Good: +15 points)
   - Buy book and movie (Okay: +5 points)
   - Spend all on snacks (Poor: -10 points)
4. See immediate feedback with:
   - Score change
   - Visual indicator (green/red/yellow)
   - Explanation
   - Tips for improvement

#### Try "Suspicious UPI Request" (Easy - Fraud Prevention)
1. Read about a prize scam
2. Choose how to respond:
   - Ignore and block (Best: +30 points)
   - Ask parents (Good: +25 points)
   - Send money (Scam: -25 points)
3. Learn about UPI fraud prevention

### 5. Earn Your First Badge
- Complete your first scenario
- See the "First Steps" badge appear
- Badge shows on dashboard

### 6. View Progress
- Return to dashboard
- See updated score
- View earned badges
- Track completed scenarios

## 🎮 Key Features to Evaluate

### 1. Behavior-Driven Learning
- No quizzes - only realistic decisions
- Meaningful consequences
- Immediate feedback with explanations
- Tips for improvement

### 2. Indian Cultural Context
- All amounts in ₹ (Rupees)
- Diwali festival scenario
- UPI fraud prevention
- Indian financial challenges

### 3. Gamification
- Financial Score (0-1000)
- Achievement badges
- Visual feedback (colors, emojis)
- Progress tracking

### 4. Offline-First Architecture
- IndexedDB for local storage
- Decision queuing (ready for Service Worker)
- Cached scenarios
- PWA configuration

### 5. User Experience
- Clean, modern UI
- Responsive design
- Intuitive navigation
- Clear visual hierarchy

## 📊 Test Different Scenarios

### Savings Theme
1. **Pocket Money Planning** - Basic budgeting decisions
2. **Diwali Gift Money** - Festival money management

### Budgeting Theme
1. **Monthly Budget Challenge** - Creating a budget plan
2. **Festival Shopping Dilemma** - Prioritizing expenses

### Fraud Prevention Theme
1. **Suspicious UPI Request** - Identifying prize scams
2. **Phishing Email Alert** - Email security
3. **Online Shopping Safety** - E-commerce fraud

## 🔍 Technical Evaluation Points

### Backend
- RESTful API with versioning (/api/v1)
- JWT authentication
- PostgreSQL with Prisma ORM
- Idempotent operations (clientEventId)
- Proper error handling
- Consistent response format

### Frontend
- Next.js 14+ with React 18+
- TypeScript for type safety
- Tailwind CSS for styling
- IndexedDB with Dexie.js
- PWA configuration
- Responsive design

### Database
- 7 tables with proper relationships
- Indexes for performance
- 7 scenarios with 21 choices
- 6 achievement badges
- Seed data included

## 🐛 Troubleshooting

### Docker Issues
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs backend
docker-compose logs frontend

# Restart services
docker-compose restart
```

### Port Already in Use
```bash
# Stop existing services
docker-compose down

# Or change ports in docker-compose.yml
```

### Database Not Seeded
```bash
# Manually seed
docker exec -it finlit-backend npx prisma db seed
```

## 📝 Evaluation Checklist

- [ ] Application starts successfully
- [ ] User registration works
- [ ] User login works
- [ ] Dashboard displays correctly
- [ ] Scenarios load and display
- [ ] Can make decisions
- [ ] Feedback appears correctly
- [ ] Score updates
- [ ] Badges are earned
- [ ] Progress tracks correctly
- [ ] UI is responsive
- [ ] Indian context is evident
- [ ] Visual feedback is clear
- [ ] Navigation is intuitive

## 🎯 Key Differentiators

1. **Offline-First**: IndexedDB ready, PWA configured
2. **Behavior Over Theory**: No quizzes, only decisions
3. **Indian Context**: ₹, festivals, UPI, cultural relevance
4. **Gamification**: Scores, badges, visual feedback
5. **Scalable Architecture**: Modular services, clean separation
6. **Production-Ready**: Docker, TypeScript, proper error handling

## 📞 Support

For issues or questions:
- Check SETUP.md for detailed setup
- Check IMPLEMENTATION_SUMMARY.md for technical details
- Review specs/ directory for requirements and design

## 🏆 Expected Outcomes

After 5-10 minutes of testing, you should see:
- ✅ Working authentication system
- ✅ 7 playable scenarios
- ✅ Real-time score updates
- ✅ Badge earning system
- ✅ Progress tracking
- ✅ Indian cultural context
- ✅ Clean, modern UI
- ✅ Responsive design

## 🚀 Next Steps

This is a Phase 1 prototype. Future enhancements include:
- Full Service Worker with background sync
- ML-based personalized recommendations
- Extended language support (Hindi, Tamil, Telugu)
- Young Adult scenarios
- Parental dashboard
- Advanced analytics

---

**Thank you for evaluating the Financial Literacy Platform for Bharat!**

Built with ❤️ for Innovate4FinLit Hackathon 2026
