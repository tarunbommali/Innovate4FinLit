const { Client } = require('pg');

const testPasswords = [
  'postgres',
  'admin',
  'root',
  '123456',
  'password',
  '12345678',
  'admin123',
  ''
];

async function testConnection(password) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Innovate4FinLit',
    user: 'postgres',
    password: password
  });

  try {
    await client.connect();
    await client.end();
    return true;
  } catch (error) {
    return false;
  }
}

async function findCorrectPassword() {
  console.log('🔍 Testing PostgreSQL connection with common passwords...\n');
  
  for (const password of testPasswords) {
    const displayPassword = password === '' ? '(empty)' : password;
    process.stdout.write(`Testing password: ${displayPassword}... `);
    
    const success = await testConnection(password);
    
    if (success) {
      console.log('✅ SUCCESS!\n');
      console.log('========================================');
      console.log('Found working credentials:');
      console.log('========================================');
      console.log(`Host: localhost`);
      console.log(`Port: 5432`);
      console.log(`Database: Innovate4FinLit`);
      console.log(`User: postgres`);
      console.log(`Password: ${displayPassword}\n`);
      console.log('Update your backend/.env file with:');
      console.log(`DATABASE_URL=postgresql://postgres:${password}@localhost:5432/Innovate4FinLit\n`);
      return password;
    } else {
      console.log('❌ Failed');
    }
  }
  
  console.log('\n========================================');
  console.log('❌ None of the common passwords worked');
  console.log('========================================\n');
  console.log('Please check your PostgreSQL password:');
  console.log('1. Open pgAdmin');
  console.log('2. Right-click on PostgreSQL 18 server');
  console.log('3. Check connection properties');
  console.log('4. Or reset password using:');
  console.log('   ALTER USER postgres PASSWORD \'newpassword\';\n');
  return null;
}

// Also test if pg module is installed
try {
  require('pg');
  findCorrectPassword();
} catch (error) {
  console.log('Installing pg module...\n');
  const { execSync } = require('child_process');
  execSync('npm install pg', { stdio: 'inherit' });
  console.log('\nRetrying connection test...\n');
  findCorrectPassword();
}
