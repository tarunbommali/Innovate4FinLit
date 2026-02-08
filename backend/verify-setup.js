const { PrismaClient } = require('@prisma/client');

async function verifySetup() {
  console.log('🔍 Verifying database setup...\n');
  
  const prisma = new PrismaClient();
  
  try {
    // Test connection
    console.log('1. Testing database connection...');
    await prisma.$connect();
    console.log('   ✅ Connected to database\n');

    // Check tables
    console.log('2. Checking tables...');
    const userCount = await prisma.user.count();
    const scenarioCount = await prisma.scenario.count();
    const choiceCount = await prisma.choice.count();
    
    console.log(`   ✅ Users table: ${userCount} records`);
    console.log(`   ✅ Scenarios table: ${scenarioCount} records`);
    console.log(`   ✅ Choices table: ${choiceCount} records\n`);

    // Check demo user
    console.log('3. Checking demo user...');
    const demoUser = await prisma.user.findUnique({
      where: { email: 'demo@example.com' }
    });
    
    if (demoUser) {
      console.log('   ✅ Demo user exists');
      console.log(`      Email: demo@example.com`);
      console.log(`      Password: demo123`);
      console.log(`      User Group: ${demoUser.userGroup}\n`);
    } else {
      console.log('   ⚠️  Demo user not found\n');
    }

    // Check scenarios by theme
    console.log('4. Checking scenarios by theme...');
    const themes = await prisma.scenario.groupBy({
      by: ['theme'],
      _count: { theme: true }
    });
    
    themes.forEach(t => {
      console.log(`   ✅ ${t.theme}: ${t._count.theme} scenarios`);
    });
    console.log();

    await prisma.$disconnect();
    
    console.log('========================================');
    console.log('✨ Database setup verified successfully!');
    console.log('========================================\n');
    console.log('You can now start the backend server with:');
    console.log('  npm run dev\n');
    
    return true;
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    console.error('\nPlease run: npm run init-db\n');
    await prisma.$disconnect();
    process.exit(1);
  }
}

verifySetup();
