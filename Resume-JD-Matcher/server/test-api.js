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
        
        console.log('\n🎉 API services are working correctly!');
        console.log('\n📝 Note: /api/analyze and /api/ai-analyze are POST endpoints');
        console.log('   They require file uploads and should be tested via the web interface.');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);
        }
    }
}

testAPI();