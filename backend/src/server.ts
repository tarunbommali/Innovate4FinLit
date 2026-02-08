import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import scenarioRoutes from './routes/scenario.routes';
import decisionRoutes from './routes/decision.routes';
import rulesRoutes from './routes/rules.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/scenarios', scenarioRoutes);
app.use('/api/v1/decisions', decisionRoutes);
app.use('/api/v1/rules', rulesRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Something went wrong',
      timestamp: new Date().toISOString()
    }
  });
});

// Database connection check and server start
async function startServer() {
  try {
    console.log('🔌 Checking database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Test query to ensure tables exist
    await prisma.user.count();
    console.log('✅ Database tables verified');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API Base URL: http://localhost:${PORT}/api/v1`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error: any) {
    console.error('❌ Failed to start server:', error.message);
    console.error('\n⚠️  Database connection failed!');
    console.error('Please run: npm run init-db');
    console.error('This will initialize the database schema and seed data.\n');
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

export default app;
