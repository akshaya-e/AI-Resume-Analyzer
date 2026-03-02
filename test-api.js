// Simple API test script
const axios = require('axios');

async function testAPI() {
    console.log('🧪 Testing AI Resume Analyzer API...\n');
    
    try {
        // Test 1: Health check (Python service)
        console.log('1. Testing Python service health...');
        const healthResponse = await axios.get('http://localhost:5001/health');
        console.log('✅ Python service:', healthResponse.data);
        
        // Test 2: History endpoint (Node.js)
        console.log('\n2. Testing Node.js history endpoint...');
        const historyResponse = await axios.get('http://localhost:5000/api/history');
        console.log('✅ History endpoint: Found', historyResponse.data.length, 'records');
        
        // Test 3: Check if analyze endpoints exist (should return method not allowed for GET)
        console.log('\n3. Testing analyze endpoints (expecting method errors)...');
        
        try {
            await axios.get('http://localhost:5000/api/analyze');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('❌ /api/analyze endpoint not found (404)');
            } else {
                console.log('✅ /api/analyze endpoint exists (method not allowed for GET)');
            }
        }
        
        try {
            await axios.get('http://localhost:5000/api/ai-analyze');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('❌ /api/ai-analyze endpoint not found (404)');
            } else {
                console.log('✅ /api/ai-analyze endpoint exists (method not allowed for GET)');
            }
        }
        
        console.log('\n🎉 API test completed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testAPI();