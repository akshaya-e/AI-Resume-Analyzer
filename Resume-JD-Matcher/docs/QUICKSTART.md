# AI Resume Analyzer - Quick Start Guide

## 🚀 Quick Start (Easiest Way)

### Windows:

```bash
# Double-click or run:
start-all.bat
```

This will automatically start:

1. Python AI Service (Port 5001)
2. Node.js Backend (Port 5000)
3. React Frontend (Port 5173)

## 📋 Prerequisites

Before running, ensure you have:

### 1. Python Setup

```bash
cd python-service
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

### 2. Fix pyresparser

Copy the fixed `resume_parser.py`:

```bash
# Find your Python site-packages
python -c "import site; print(site.getsitepackages())"

# Copy the file
copy ..\Old_Python_Project\pyresparser\resume_parser.py <YOUR_PYTHON_PATH>\site-packages\pyresparser\resume_parser.py
```

### 3. Node.js Dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 4. MongoDB

Ensure MongoDB is running on `localhost:27017`

## 🎯 Manual Start (Alternative)

### Terminal 1: Python Service

```bash
cd python-service
python app.py
```

### Terminal 2: Node.js Backend

```bash
cd server
npm start
```

### Terminal 3: React Frontend

```bash
cd client
npm run dev
```

## 🧪 Testing the Integration

### Test Python Service:

```bash
curl http://localhost:5001/health
```

Expected response:

```json
{
  "status": "healthy",
  "service": "AI Resume Analyzer"
}
```

### Test Node.js Backend:

```bash
curl http://localhost:5000/api/history
```

### Test Full Integration:

1. Open http://localhost:5173
2. Upload a resume PDF
3. (Optional) Paste a job description
4. Click "Analyze with AI" (uses Python service)
   OR
   Click "Quick Analyze" (uses Node.js only)

## 📊 Features Available

### From Old Python Project:

- ✅ Advanced NLP resume parsing
- ✅ Skill extraction using pyresparser
- ✅ Field prediction (Data Science, Web Dev, etc.)
- ✅ Experience level detection
- ✅ Resume scoring (0-100)
- ✅ Skill recommendations

### From Resume-JD-Matcher:

- ✅ Job Description matching
- ✅ Gap analysis
- ✅ Overclaim detection
- ✅ Resume enhancement suggestions
- ✅ Modern React UI
- ✅ Admin dashboard

### New Integrated Features:

- ✅ Dual analysis modes (Basic + AI)
- ✅ Hybrid Python + Node.js analysis
- ✅ Fallback mechanism for reliability
- ✅ Combined comprehensive reports

## 🔧 Troubleshooting

### Python Service Issues:

```bash
# Check if running
curl http://localhost:5001/health

# View logs in the Python terminal window
```

### Node.js Issues:

```bash
# Check if running
curl http://localhost:5000/api/history

# Restart server
cd server
npm start
```

### Port Already in Use:

```bash
# Windows: Find and kill process
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

## 📖 API Documentation

See `INTEGRATION_GUIDE.md` for complete API documentation.

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Python service shows: "Running on http://0.0.0.0:5001"
2. ✅ Node.js shows: "Server running on port 5000"
3. ✅ React shows: "Local: http://localhost:5173/"
4. ✅ You can upload and analyze resumes in the browser

## 📞 Need Help?

Check the detailed integration guide:

- `INTEGRATION_GUIDE.md` - Complete integration documentation
- `python-service/README.md` - Python service documentation

## 🎨 Next Steps

1. Try analyzing a resume with both methods
2. Compare results from Basic vs AI analysis
3. Explore the admin dashboard
4. Check the enhancement suggestions
5. Review the gap analysis for job descriptions

Enjoy your integrated AI Resume Analyzer! 🚀
