const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');

async function initializeDatabase() {
  console.log('🔄 Starting database initialization...\n');

  try {
    // Step 1: Generate Prisma Client
    console.log('📦 Generating Prisma Client...');
    execSync('npx prisma generate', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Prisma Client generated\n');

    // Step 2: Test database connection
    console.log('🔌 Testing database connection...');
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log('✅ Database connection successful\n');

    // Step 3: Push schema to database
    console.log('📋 Pushing schema to database...');
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Schema pushed successfully\n');

    // Step 4: Seed database
    console.log('🌱 Seeding database...');
    execSync('npx prisma db seed', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Database seeded successfully\n');

    await prisma.$disconnect();
    
    console.log('✨ Database initialization completed successfully!\n');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.error('\nPlease ensure:');
    console.error('1. PostgreSQL is running');
    console.error('2. Database "Innovate4FinLit" exists');
    console.error('3. Connection credentials in .env are correct');
    console.error('4. Database user has proper permissions\n');
    process.exit(1);
  }
}

// Run initialization
initializeDatabase();
