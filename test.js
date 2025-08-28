// Simple test file to verify transaction functionality
// Run this with Node.js to test the API endpoints

const testTransactions = async () => {
  const baseUrl = 'http://localhost:3001/api';
  
  console.log('🧪 Testing Transaction API...\n');
  
  try {
    // Test 1: Health Check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);
    
    // Test 2: Get initial transactions (should be empty)
    console.log('\n2. Testing GET /transactions (initial)...');
    const getResponse = await fetch(`${baseUrl}/transactions`);
    const getData = await getResponse.json();
    console.log('✅ Initial transactions count:', getData.data.length);
    
    // Test 3: Create a valid transaction
    console.log('\n3. Testing POST /transactions (valid)...');
    const postResponse = await fetch(`${baseUrl}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 99.99,
        description: 'Test transaction for API testing'
      })
    });
    const postData = await postResponse.json();
    console.log('✅ Transaction created:', postData.success ? 'SUCCESS' : 'FAILED');
    if (postData.success) {
      console.log('   Transaction ID:', postData.data.id);
      console.log('   Amount:', postData.data.amount);
      console.log('   Description:', postData.data.description);
    }
    
    // Test 4: Get transactions after creation
    console.log('\n4. Testing GET /transactions (after creation)...');
    const getAfterResponse = await fetch(`${baseUrl}/transactions`);
    const getAfterData = await getAfterResponse.json();
    console.log('✅ Transactions count after creation:', getAfterData.data.length);
    
    // Test 5: Test validation - invalid amount
    console.log('\n5. Testing POST /transactions (invalid amount)...');
    const invalidAmountResponse = await fetch(`${baseUrl}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: -50,
        description: 'Invalid amount test'
      })
    });
    const invalidAmountData = await invalidAmountResponse.json();
    console.log('✅ Invalid amount validation:', invalidAmountData.success ? 'FAILED (should fail)' : 'PASSED (correctly failed)');
    
    // Test 6: Test validation - missing description
    console.log('\n6. Testing POST /transactions (missing description)...');
    const missingDescResponse = await fetch(`${baseUrl}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 100
      })
    });
    const missingDescData = await missingDescResponse.json();
    console.log('✅ Missing description validation:', missingDescData.success ? 'FAILED (should fail)' : 'PASSED (correctly failed)');
    
    console.log('\n🎉 All tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the server is running on port 3001');
  }
};

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  testTransactions();
} else {
  // Browser environment
  console.log('Run this file with Node.js to test the API');
}
