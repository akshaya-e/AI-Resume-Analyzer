# AI Resume & Job Description Matcher

## Enterprise-Grade Resume Analysis Platform

A sophisticated, full-stack application leveraging Natural Language Processing (NLP) and Machine Learning to analyze resumes against job descriptions, providing intelligent insights, skill gap analysis, and personalized career recommendations.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The AI Resume & JD Matcher is a production-ready platform designed to revolutionize the recruitment process through intelligent automation. Built on a modern microservice architecture, it combines:

- **Advanced NLP** for resume parsing and skill extraction
- **Semantic Analysis** for job description matching
- **AI-Powered Recommendations** for career development
- **Comprehensive Analytics** for recruitment insights

---

## Key Features

### Core Functionality

- **Intelligent Resume Parsing**
  - Extracts structured data from unstructured PDF documents
  - Identifies skills, experience, education, and contact information
  - Supports multiple resume formats and layouts

- **Job Description Matching**
  - Calculates semantic similarity between resumes and job requirements
  - Provides percentage-based compatibility scores
  - Identifies matching and missing skills

- **Gap Analysis**
  - Pinpoints skill deficiencies for target roles
  - Offers prioritized learning recommendations
  - Tracks professional development progress

- **Resume Enhancement**
  - AI-driven suggestions for improving resume quality
  - Identifies weak phrases and recommends stronger alternatives
  - Suggests quantifiable metrics and action verbs
  - Detects overclaimed skills without supporting evidence

- **Career Recommendations**
  - Predicts appropriate career fields based on skill profile
  - Suggests relevant courses and certifications
  - Provides curated learning resources and video tutorials

- **Analytics Dashboard**
  - Comprehensive history of all analyses
  - Visual representation of candidate data
  - Export capabilities for further processing

### Advanced Features

- **Dual Analysis Modes**
  - Basic Mode: Fast, keyword-based analysis
  - AI Mode: Comprehensive NLP-powered analysis

- **Overclaim Detection**
  - Identifies skills listed without project/experience evidence
  - Ensures resume authenticity

- **Experience Level Classification**
  - Automatically categorizes candidates (Fresher/Intermediate/Experienced)
  - Based on resume content and structure

- **Scoring System**
  - 100-point resume quality score
  - Detailed feedback on each section
  - Industry-standard evaluation criteria

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                      │
│                                                         │
│  ┌──────────────┐         ┌──────────────┐             │
│  │   React UI   │◄───────►│   Express    │             │
│  │  (Frontend)  │  HTTP   │   (Backend)  │             │
│  │  Port 5173   │         │  Port 5000   │             │
│  └──────────────┘         └──────┬───────┘             │
│                                  │                      │
│                                  │ REST API             │
│                                  ▼                      │
│                          ┌──────────────┐               │
│                          │   Python AI  │               │
│                          │  Microservice│               │
│                          │  Port 5001   │               │
│                          └──────┬───────┘               │
│                                 │                       │
│  ┌──────────────────────────────┴──────────┐            │
│  │                                         │            │
│  ▼                                         ▼            │
│ ┌──────────────┐                  ┌──────────────┐     │
│ │   MongoDB    │                  │  NLP Engine  │     │
│ │   Database   │                  │  (pyresparser│     │
│ │              │                  │   NLTK, spaCy)│     │
│ └──────────────┘                  └──────────────┘     │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend

- **React 18** - Modern UI library with hooks
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - Promise-based HTTP client

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Multer** - File upload middleware
- **pdf-parse** - PDF text extraction
- **Natural** - NLP library for JavaScript

### AI Microservice

- **Python 3.9+** - Programming language
- **Flask** - Lightweight web framework
- **pyresparser** - Resume parsing library
- **NLTK** - Natural Language Toolkit
- **spaCy** - Industrial-strength NLP
- **pdfminer3** - PDF text extraction

### Database

- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling

---

## Prerequisites

Ensure the following software is installed on your system:

| Software    | Version | Purpose         |
| ----------- | ------- | --------------- |
| **Node.js** | 16.0.0+ | Backend runtime |
| **npm**     | 8.0.0+  | Package manager |
| **Python**  | 3.9.0+  | AI microservice |
| **MongoDB** | 4.4+    | Database        |
| **Git**     | Latest  | Version control |

### System Requirements

- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **OS**: Windows 10+, macOS 10.15+, or Linux

---

## Installation

### Quick Start (Automated)

For Windows users, use the automated startup script:

```bash
start-all.bat
```

This will automatically start all three services.

### Manual Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd Resume-JD-Matcher
```

#### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-matcher
PYTHON_SERVICE_URL=http://localhost:5001
NODE_ENV=development
```

Start the server:

```bash
npm start
```

Server will be available at `http://localhost:5000`

#### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

#### 4. Python AI Service Setup

Open a new terminal:

```bash
cd python-service
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python app.py
```

AI service will be available at `http://localhost:5001`

---

## Configuration

### Environment Variables

#### Backend (`server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-matcher
PYTHON_SERVICE_URL=http://localhost:5001
NODE_ENV=development
MAX_FILE_SIZE=16777216  # 16MB in bytes
```

#### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000
```

### Database Configuration

Ensure MongoDB is running:

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

---

## Usage

### For End Users

1. **Access the Application**
   - Navigate to `http://localhost:5173` in your web browser

2. **Upload Resume**
   - Click the upload button
   - Select a PDF resume file (max 16MB)

3. **Provide Job Description** (Optional)
   - Paste the job description text
   - This enables job matching and gap analysis

4. **Choose Analysis Mode**
   - **Quick Analysis**: Fast, basic parsing
   - **AI Analysis**: Comprehensive NLP-based analysis

5. **Review Results**
   - View match score and compatibility
   - Examine skill gaps and recommendations
   - Review resume enhancement suggestions
   - Access personalized learning resources

### For Developers

#### Running Tests

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test

# Python service tests
cd python-service
pytest
```

#### Development Mode

```bash
# Backend with auto-reload
cd server
npm run dev

# Frontend with HMR
cd client
npm run dev
```

---

## API Documentation

### Backend Endpoints (Port 5000)

#### POST /api/analyze

Basic resume analysis (Node.js only)

**Request:**

```http
POST /api/analyze
Content-Type: multipart/form-data

resume: <PDF file>
jobDescription: <string> (optional)
```

**Response:**

```json
{
  "candidateEmail": "john@example.com",
  "extractedSkills": ["python", "react", "mongodb"],
  "overallMatchScore": 75,
  "missingSkills": ["docker", "kubernetes"],
  "recommendations": {
    "skills": ["..."],
    "courses": ["..."]
  }
}
```

#### POST /api/ai-analyze

AI-powered comprehensive analysis

**Request:**

```http
POST /api/ai-analyze
Content-Type: multipart/form-data

resume: <PDF file>
jobDescription: <string> (optional)
```

**Response:**

```json
{
  "success": true,
  "analysis": {
    "aiPowered": true,
    "pythonAnalysis": {
      /* AI analysis data */
    },
    "jdMatching": {
      /* Job matching data */
    }
  }
}
```

#### GET /api/history

Retrieve analysis history

**Response:**

```json
[
  {
    "_id": "...",
    "resumeName": "john_doe.pdf",
    "timestamp": "2026-02-03T...",
    "overallMatchScore": 75
  }
]
```

### Python AI Service Endpoints (Port 5001)

#### GET /health

Health check

**Response:**

```json
{
  "status": "healthy",
  "service": "AI Resume Analyzer"
}
```

#### POST /api/analyze-resume

NLP-based resume analysis

**Request:**

```http
POST /api/analyze-resume
Content-Type: multipart/form-data

resume: <PDF file>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "basic_info": {
      /* ... */
    },
    "skills": {
      /* ... */
    },
    "experience": {
      /* ... */
    },
    "score": {
      /* ... */
    }
  }
}
```

For complete API documentation, see [INTEGRATION_GUIDE.md](./docs/INTEGRATION_GUIDE.md).

---

## Project Structure

```
Resume-JD-Matcher/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── App.jsx              # Main application
│   │   └── main.jsx             # Entry point
│   ├── public/                  # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Node.js Backend
│   ├── models/                  # Mongoose models
│   │   └── Analysis.js
│   ├── utils/                   # Utility functions
│   │   ├── skillsData.js
│   │   ├── courseData.js
│   │   └── enhancementData.js
│   ├── uploads/                 # Temporary file storage
│   ├── index.js                 # Main server file
│   ├── cleanup-uploads.js       # Utility script
│   └── package.json
│
├── python-service/              # Python AI Microservice
│   ├── app.py                   # Flask application
│   ├── requirements.txt         # Python dependencies
│   ├── resume_parser_fix.py     # pyresparser fix
│   ├── courses_data.py          # Course recommendations
│   └── README.md
│
├── docs/                        # Documentation
│   ├── INTEGRATION_GUIDE.md     # Full integration details
│   ├── QUICKSTART.md            # Quick setup guide
│   ├── SCORING_FIX.md           # Scoring logic updates
│   ├── FILE_LOCKING_FIX.md      # Windows file locking fix
│   └── ...                      # Other docs
│
├── start-all.bat                # Windows startup script
├── README.md
└── LICENSE
```

---

## Contributing

We welcome contributions from the community! Please follow these guidelines:

### Development Workflow

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Make Your Changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation as needed
4. **Commit Your Changes**
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```
5. **Push to Your Fork**
   ```bash
   git push origin feature/YourFeatureName
   ```
6. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues

### Code Style

- **JavaScript**: Follow Airbnb style guide
- **Python**: Follow PEP 8
- **React**: Use functional components with hooks
- **Commits**: Use conventional commit messages

---

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## Support & Contact

For questions, issues, or contributions:

- **Documentation**: See the `docs/` directory
- **Issues**: [GitHub Issues](https://github.com/yourusername/AI-Resume-Analyzer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/AI-Resume-Analyzer/discussions)

---

## Acknowledgments

Special thanks to the open-source community and the following projects:

- [pyresparser](https://github.com/OmkarPathak/pyresparser) - Resume parsing library
- [NLTK](https://www.nltk.org/) - Natural Language Toolkit
- [spaCy](https://spacy.io/) - Industrial-strength NLP
- [React](https://reactjs.org/) - Frontend framework
- [Express](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database solution

---

<div align="center">

**Built with precision for the modern recruitment industry**

© 2026 AI Resume Analyzer. All rights reserved.

</div>
