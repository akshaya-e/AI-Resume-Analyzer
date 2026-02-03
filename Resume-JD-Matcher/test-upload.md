# Testing Resume Upload Endpoints

## Method 1: Using curl (if you have a PDF file)

```bash
# Test basic analysis
curl -X POST http://localhost:5000/api/analyze \
  -F "resume=@path/to/your/resume.pdf" \
  -F "jobDescription=Software Engineer with React and Node.js experience"

# Test AI analysis  
curl -X POST http://localhost:5000/api/ai-analyze \
  -F "resume=@path/to/your/resume.pdf" \
  -F "jobDescription=Software Engineer with React and Node.js experience"
```

## Method 2: Using the Web Interface (Recommended)

1. Go to: http://localhost:5173
2. Upload a PDF resume file
3. Add job description text
4. Click "Analyze Resume" or "AI Analyze"

## Method 3: Check Available Data

```bash
# View existing analysis history
curl http://localhost:5000/api/history

# Check Python service health
curl http://localhost:5001/health
```

## Expected Response Format

```json
{
  "candidateEmail": "john@example.com",
  "extractedSkills": ["react", "node.js", "javascript"],
  "overallMatchScore": 75,
  "missingSkills": ["docker", "aws"],
  "recommendations": {
    "skills": ["docker", "kubernetes"],
    "courses": [{"name": "Docker Course", "link": "..."}]
  }
}
```