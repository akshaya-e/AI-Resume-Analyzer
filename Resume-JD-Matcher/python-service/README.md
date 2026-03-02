# AI Resume Analyzer Python Microservice

This Python microservice integrates the old Python project's resume parsing functionality with the Resume-JD-Matcher Node.js/React application.

## Features

- **Resume Parsing**: Extract information from PDF resumes using NLP
- **Skill Detection**: Identify technical and soft skills
- **Field Prediction**: Predict career field (Data Science, Web Dev, Android, iOS, UI/UX)
- **Experience Level**: Determine candidate experience level (Fresher, Intermediate, Experienced)
- **Resume Scoring**: Score resume based on key sections (0-100)
- **Skill Recommendations**: Suggest skills to add based on predicted field

## Setup

### 1. Install Python Dependencies

```bash
cd python-service
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

### 2. Copy pyresparser fix

Copy the `resume_parser.py` from `Old_Python_Project/pyresparser/` to your Python environment's site-packages:

```bash
# Find your Python site-packages location
python -c "import site; print(site.getsitepackages())"

# Copy the file
# Example: cp ../Old_Python_Project/pyresparser/resume_parser.py C:\Users\irfan\AppData\Local\Programs\Python\Python39\Lib\site-packages\pyresparser\
```

### 3. Run the Service

```bash
python app.py
```

The service will run on `http://localhost:5001`

## API Endpoints

### Health Check

```
GET /health
```

### Analyze Resume

```
POST /api/analyze-resume
Content-Type: multipart/form-data

Body:
- resume: PDF file

Response:
{
  "success": true,
  "data": {
    "basic_info": {...},
    "skills": {...},
    "experience": {...},
    "score": {...}
  }
}
```

### Extract Text

```
POST /api/extract-text
Content-Type: multipart/form-data

Body:
- resume: PDF file

Response:
{
  "success": true,
  "text": "..."
}
```

## Integration with Node.js Backend

The Node.js backend can call this Python service using HTTP requests to leverage the resume parsing functionality.
