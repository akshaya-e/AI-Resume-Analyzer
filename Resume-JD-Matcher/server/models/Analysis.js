const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  resumeName: String,
  candidateName: String,
  candidateEmail: String,
  candidatePhone: String,
  extractedSkills: [String],
  jobDescription: String, // Or just the role name if we parse it
  overallMatchScore: Number,
  category: String, // Data Science, Web Dev, etc.
  resumeQualityScore: Number, // 0-100 based on structure
  userLevel: String, // Fresher, Intermediate, Experienced
  matchBreakdown: {
    skillMatch: Number,
    experienceMatch: Number,
    toolMatch: Number
  },
  missingSkills: [String],
  overclaims: [String],
  jobFit: {
    level: String, // Low, Moderate, High
    explanation: String
  },
  enhancement: {
    overallScore: Number,
    totalBullets: Number,
    breakdown: {
      strong: Number,
      moderate: Number,
      weak: Number
    },
    bulletAnalysis: [{
      original: String,
      score: Number,
      suggestions: Array,
      improvedVersion: String,
      status: String
    }],
    topIssues: Array,
    summary: String
  },
  recommendations: {
    skills: [String],
    courses: [
      {
        name: String,
        link: String
      }
    ],
    tips: [String]
  },
  rawText: String
});

module.exports = mongoose.model('Analysis', AnalysisSchema);
