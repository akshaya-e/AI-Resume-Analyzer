<div align="center">

# AI Resume Analyzer

### Enterprise-Grade Resume Analysis & Job Matching Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Node.js](https://img.shields.io/badge/node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18+-61dafb.svg)](https://reactjs.org/)

An intelligent, AI-powered platform that analyzes resumes, matches them against job descriptions, and provides actionable insights to improve candidate profiles through advanced Natural Language Processing and Machine Learning.

[Features](#features) • [Architecture](#architecture) • [Quick Start](#quick-start) • [Documentation](#documentation) • [License](#license)

</div>

---

## Overview

The AI Resume Analyzer is a comprehensive, production-ready system designed to streamline the recruitment process through intelligent automation. Built on a modern microservice architecture, it combines the power of Python's NLP capabilities with a robust Node.js backend and an intuitive React frontend.

### Key Capabilities

- **Intelligent Resume Parsing**: Leverages advanced NLP algorithms (pyresparser, NLTK, spaCy) to extract structured information from unstructured resume documents
- **Job Description Matching**: Performs semantic analysis to calculate compatibility scores between candidate profiles and job requirements
- **Gap Analysis**: Identifies skill deficiencies and provides targeted recommendations for professional development
- **Resume Enhancement**: Offers AI-driven suggestions to improve resume quality, including stronger action verbs, quantifiable metrics, and professional formatting
- **Overclaim Detection**: Analyzes resumes for unsupported skill claims to ensure authenticity
- **Career Field Prediction**: Classifies candidates into appropriate career domains (Data Science, Web Development, Mobile Development, UI/UX)
- **Comprehensive Scoring**: Implements a 100-point scoring system based on industry best practices

---

## Architecture

The system employs a **microservice-based architecture** designed for scalability, maintainability, and performance:

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Resume Analyzer                       │
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │   Frontend   │  HTTP   │   Backend    │                 │
│  │   React UI   │◄───────►│   Node.js    │                 │
│  │  Port 5173   │         │  Port 5000   │                 │
│  └──────────────┘         └──────┬───────┘                 │
│                                  │                          │
│                                  │ REST API                 │
│                                  ▼                          │
│                          ┌──────────────┐                   │
│                          │   AI Engine  │                   │
│                          │   Python     │                   │
│                          │  Port 5001   │                   │
│                          └──────────────┘                   │
│                                  │                          │
│                          ┌──────────────┐                   │
│                          │   Database   │                   │
│                          │   MongoDB    │                   │
│                          └──────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer         | Technology                   | Purpose                                           |
| ------------- | ---------------------------- | ------------------------------------------------- |
| **Frontend**  | React 18, Tailwind CSS       | Modern, responsive user interface                 |
| **Backend**   | Node.js, Express             | RESTful API, business logic, JD matching          |
| **AI Engine** | Python, Flask, NLP libraries | Resume parsing, skill extraction, predictions     |
| **Database**  | MongoDB                      | Persistent storage for analyses and user data     |
| **NLP**       | pyresparser, NLTK, spaCy     | Natural language processing and entity extraction |

---

## Features

### For Candidates

- **Resume Analysis**: Upload your resume and receive instant, comprehensive feedback
- **Skill Gap Identification**: Understand which skills you need to develop for your target role
- **Resume Scoring**: Get an objective quality score with specific improvement recommendations
- **Career Guidance**: Receive personalized course and certification recommendations
- **Enhancement Suggestions**: Improve your resume with AI-powered writing tips

### For Recruiters

- **Batch Processing**: Analyze multiple resumes efficiently
- **Job Matching**: Automatically match candidates to job descriptions
- **Candidate Ranking**: Sort applicants by compatibility score
- **Analytics Dashboard**: Visualize candidate data and trends
- **Export Capabilities**: Download analysis results in various formats

### Technical Features

- **Dual Analysis Modes**: Choose between fast basic analysis or comprehensive AI-powered analysis
- **Fallback Mechanism**: Ensures system reliability even if AI service is unavailable
- **Scalable Architecture**: Microservices can be scaled independently
- **RESTful API**: Well-documented endpoints for easy integration
- **Error Handling**: Robust error management with graceful degradation

---

## Project Structure

```
AI-Resume-Analyzer/
├── Resume-JD-Matcher/
│   ├── client/                     # React Frontend Application
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   ├── server/                     # Node.js Backend Service
│   │   ├── models/
│   │   ├── utils/
│   │   ├── index.js
│   │   └── package.json
│   ├── python-service/             # Python AI Microservice
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── README.md
│   ├── docs/                       # Documentation
│   │   ├── INTEGRATION_GUIDE.md
│   │   ├── QUICKSTART.md
│   │   └── API_REFERENCE.md
│   └── start-all.bat               # Automated startup script
├── LICENSE
└── README.md
```

---

## Quick Start

### Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9.0 or higher) - [Download](https://www.python.org/downloads/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)

### Installation

#### Option 1: Automated Setup (Windows)

```bash
cd Resume-JD-Matcher
start-all.bat
```

This script automatically starts all three services (Frontend, Backend, AI Engine).

#### Option 2: Manual Setup

**1. Clone the Repository**

```bash
git clone https://github.com/yourusername/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer/Resume-JD-Matcher
```

**2. Setup Python AI Service**

```bash
cd python-service
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python app.py
```

**3. Setup Node.js Backend** (New Terminal)

```bash
cd server
npm install
npm start
```

**4. Setup React Frontend** (New Terminal)

```bash
cd client
npm install
npm run dev
```

**5. Access the Application**

Open your browser and navigate to: `http://localhost:5173`

---

## Documentation

Comprehensive documentation is available in the following guides:

| Document                                                           | Description                                  |
| ------------------------------------------------------------------ | -------------------------------------------- |
| [Quick Start Guide](./Resume-JD-Matcher/QUICKSTART.md)             | Step-by-step setup instructions              |
| [Integration Guide](./Resume-JD-Matcher/INTEGRATION_GUIDE.md)      | Technical architecture and API documentation |
| [Integration Summary](./Resume-JD-Matcher/INTEGRATION_SUMMARY.md)  | Overview of system integration               |
| [File Locking Fix](./Resume-JD-Matcher/server/FILE_LOCKING_FIX.md) | Windows file handling documentation          |

---

## API Endpoints

### Backend Service (Port 5000)

- `POST /api/analyze` - Basic resume analysis
- `POST /api/ai-analyze` - AI-powered comprehensive analysis
- `GET /api/history` - Retrieve analysis history

### Python AI Service (Port 5001)

- `GET /health` - Service health check
- `POST /api/analyze-resume` - NLP-based resume parsing
- `POST /api/extract-text` - PDF text extraction

For detailed API documentation, see [Integration Guide](./Resume-JD-Matcher/INTEGRATION_GUIDE.md).

---

## Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-matcher
PYTHON_SERVICE_URL=http://localhost:5001
NODE_ENV=development
```

### Database Setup

Ensure MongoDB is running:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

---

## Testing

Run the test suite:

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

---

## Deployment

### Production Build

```bash
# Build frontend
cd client
npm run build

# Start backend in production mode
cd server
NODE_ENV=production npm start
```

### Docker Deployment

```bash
docker-compose up -d
```

---

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **pyresparser** - Resume parsing library
- **NLTK** - Natural Language Toolkit
- **spaCy** - Industrial-strength NLP
- **React** - Frontend framework
- **Node.js** - Backend runtime
- **MongoDB** - Database solution

---

## Support

For issues, questions, or contributions:

- **Issues**: [GitHub Issues](https://github.com/yourusername/AI-Resume-Analyzer/issues)
- **Documentation**: See the `docs/` directory
- **Email**: support@example.com

---

<div align="center">

**Built with precision and care for the recruitment industry**

Made with ❤️ using React, Node.js, Python, and AI/NLP

© 2026 AI Resume Analyzer. All rights reserved.

</div>
