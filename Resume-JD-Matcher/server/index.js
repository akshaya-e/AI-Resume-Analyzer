const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const pdf = pdfParse.default || pdfParse;
const fs = require('fs');
const path = require('path');
const natural = require('natural');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const Analysis = require('./models/Analysis');
const { skillSets } = require('./utils/skillsData');
const { ds_course, web_course, android_course, ios_course, uiux_course, resume_videos, interview_videos } = require('./utils/courseData');
const { actionVerbs, weakPhrases, fillerWords, impactPatterns } = require('./utils/enhancementData');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/resume-matcher')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Multer Setup
const upload = multer({ dest: 'uploads/' });

// Helper: Safe File Deletion (handles Windows file locking issues)
function safeDeleteFile(filePath, maxRetries = 3) {
  let retries = 0;
  const attemptDelete = () => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return true; // File doesn't exist, consider it deleted
    } catch (error) {
      if (error.code === 'EBUSY' || error.code === 'EPERM') {
        retries++;
        if (retries < maxRetries) {
          // Wait a bit and retry (file might be locked by PDF viewer or antivirus)
          setTimeout(attemptDelete, 100 * retries);
          return false;
        } else {
          // Give up after max retries, log warning but don't crash
          console.warn(`Warning: Could not delete file ${filePath} after ${maxRetries} attempts. File may be locked.`);
          return false;
        }
      } else {
        // Other errors, log but don't crash
        console.error(`Error deleting file ${filePath}:`, error.message);
        return false;
      }
    }
  };
  attemptDelete();
}


// Helper: Extract Email
function extractEmail(text) {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
}

// Helper: Extract Phone
function extractPhone(text) {
  const phoneRegex = /[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]/;
  const match = text.match(phoneRegex);
  return match ? match[0] : null;
}

// Helper: Extract Skills
function extractSkills(text, categoryKeywords) {
  const presentSkills = [];
  const lowerText = text.toLowerCase();
  
  // Create a master list of all keywords to check against
  const allKeywords = [];
  skillSets.forEach(set => {
      set.keywords.forEach(k => allKeywords.push(k.toLowerCase()));
  });

  // Basic keyword matching
  // In a real app, use NLP tokenization
  [...new Set(allKeywords)].forEach(skill => {
    if (lowerText.includes(skill)) {
      presentSkills.push(skill);
    }
  });

  return [...new Set(presentSkills)]; // Unique skils
}

// Helper: Determine Category
function determineCategory(skills) {
  let maxCount = 0;
  let category = 'Unknown';
  
  skillSets.forEach(set => {
    const count = set.keywords.filter(k => skills.includes(k.toLowerCase())).length;
    if (count > maxCount) {
      maxCount = count;
      category = set.category;
    }
  });
  
  return category;
}

// Helper: Suggest Courses
function getCourses(category) {
  switch(category) {
    case 'Data Science': return ds_course;
    case 'Web Development': return web_course;
    case 'Android Development': return android_course;
    case 'IOS Development': return ios_course;
    case 'UI-UX Development': return uiux_course;
    default: return [];
  }
}

// Helper: Calculate Resume Quality Score (Ported from Python)
function calculateResumeScore(text) {
  let score = 0;
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('objective') || lowerText.includes('summary')) score += 6;
  if (lowerText.includes('education') || lowerText.includes('school') || lowerText.includes('college')) score += 12;
  if (lowerText.includes('experience') || lowerText.includes('work experience')) score += 16;
  if (lowerText.includes('internship') || lowerText.includes('internships')) score += 6;
  if (lowerText.includes('skill') || lowerText.includes('skills')) score += 7;
  if (lowerText.includes('hobbies') || lowerText.includes('hobby')) score += 4;
  if (lowerText.includes('interests') || lowerText.includes('interest')) score += 5;
  if (lowerText.includes('achievement') || lowerText.includes('achievements')) score += 13;
  if (lowerText.includes('certification') || lowerText.includes('certifications')) score += 12;
  if (lowerText.includes('project') || lowerText.includes('projects')) score += 19;

  return score;
}

// Helper: Predict User Level (Ported from Python)
function predictUserLevel(text, pageCount = 1) {
  const lowerText = text.toLowerCase();
  if (pageCount < 1) return 'Fresher';
  
  if (lowerText.includes('experience') || lowerText.includes('work experience')) {
    return 'Experienced';
  } else if (lowerText.includes('internship') || lowerText.includes('internships')) {
    return 'Intermediate';
  }
  return 'Fresher';
}

// Helper: Detect Overclaimed Skills (Skills without evidence)
function detectOverclaims(resumeText, skills) {
  const overclaims = [];
  const lowerText = resumeText.toLowerCase();
  
  // Check if resume has project/experience sections
  const hasProjects = lowerText.includes('project') || lowerText.includes('projects');
  const hasExperience = lowerText.includes('experience') || lowerText.includes('work experience');
  const hasCertifications = lowerText.includes('certification') || lowerText.includes('certifications');
  
  if (!hasProjects && !hasExperience && !hasCertifications) {
    // If no supporting sections at all, flag all technical skills
    return skills.filter(s => !['communication', 'leadership', 'teamwork', 'english'].includes(s));
  }
  
  // For each skill, check if it appears in context of projects/experience
  skills.forEach(skill => {
    const skillPattern = new RegExp(skill, 'gi');
    const mentions = resumeText.match(skillPattern) || [];
    
    // If skill appears only once (likely just in skills section), flag it
    if (mentions.length <= 1) {
      // Double check it's not in a project/experience context
      const contextCheck = resumeText.toLowerCase();
      const projectIndex = contextCheck.indexOf('project');
      const expIndex = contextCheck.indexOf('experience');
      const skillIndex = contextCheck.indexOf(skill.toLowerCase());
      
      // If skill mention is NOT near project/experience sections, flag it
      if (skillIndex !== -1) {
        const nearProject = projectIndex !== -1 && Math.abs(skillIndex - projectIndex) < 200;
        const nearExp = expIndex !== -1 && Math.abs(skillIndex - expIndex) < 200;
        
        if (!nearProject && !nearExp) {
          overclaims.push(skill);
        }
      }
    }
  });
  
  return overclaims.slice(0, 5); // Limit to top 5 suspicious claims
}

// Helper: Generate Job Fit Explanation
function generateJobFitExplanation(matchScore, missingSkills, resumeSkills, jdSkills) {
  let level = 'Low';
  let explanation = '';
  
  if (matchScore >= 70) {
    level = 'High';
    explanation = `Strong candidate! You possess ${resumeSkills.filter(s => jdSkills.includes(s)).length} out of ${jdSkills.length} required skills.`;
    if (missingSkills.length > 0) {
      explanation += ` Consider learning: ${missingSkills.slice(0, 3).join(', ')} to become an even stronger fit.`;
    }
  } else if (matchScore >= 40) {
    level = 'Moderate';
    explanation = `You have a decent foundation with ${resumeSkills.filter(s => jdSkills.includes(s)).length}/${jdSkills.length} required skills.`;
    if (missingSkills.length > 0) {
      explanation += ` Key gaps: ${missingSkills.slice(0, 3).join(', ')}. Upskilling in these areas will significantly improve your chances.`;
    }
  } else {
    level = 'Low';
    explanation = `Limited alignment detected. Only ${resumeSkills.filter(s => jdSkills.includes(s)).length} out of ${jdSkills.length} required skills found.`;
    if (missingSkills.length > 0) {
      explanation += ` Critical missing skills: ${missingSkills.slice(0, 5).join(', ')}. Consider gaining experience in these areas before applying.`;
    }
  }
  
  return { level, explanation };
}

// Helper: Extract Bullet Points from Resume
function extractBulletPoints(text) {
  const bullets = [];
  const lines = text.split('\n');
  
  lines.forEach(line => {
    const trimmed = line.trim();
    // Look for lines that start with bullet markers or look like achievements
    if (
      trimmed.match(/^[•\-*]/) || 
      trimmed.match(/^\d+\./) ||
      (trimmed.length > 30 && trimmed.length < 200 && trimmed.match(/^[A-Z]/))
    ) {
      const cleaned = trimmed.replace(/^[•\-*\d.]+\s*/, '');
      if (cleaned.length > 20) { // Filter out very short lines
        bullets.push(cleaned);
      }
    }
  });
  
  return bullets.slice(0, 15); // Limit to top 15 bullets for analysis
}

// Helper: Analyze and Enhance a Single Bullet Point
function analyzeBulletPoint(bullet) {
  const suggestions = [];
  let score = 100; // Start with perfect score
  const lowerBullet = bullet.toLowerCase();
  
  // Skip analysis for contact info, education headers, or very short entries
  if (bullet.includes('@') || bullet.includes('C.G.P.A.') || bullet.includes('B.Tech') || bullet.length < 20) {
    return {
      original: bullet,
      score: 70,
      suggestions: [{
        type: 'info',
        issue: 'Contact/Education information',
        suggestion: 'This appears to be contact or education information - no enhancement needed',
        reason: 'Standard resume information'
      }],
      improvedVersion: null,
      status: 'moderate'
    };
  }
  
  // Check for weak phrases
  weakPhrases.forEach(({ phrase, replacement, reason }) => {
    if (lowerBullet.includes(phrase)) {
      suggestions.push({
        type: 'weak_phrase',
        issue: `Contains "${phrase}"`,
        suggestion: `Replace with "${replacement}"`,
        reason: reason,
        highlighted: bullet.replace(new RegExp(phrase, 'gi'), `**${phrase}**`)
      });
      score -= 15;
    }
  });
  
  // Check for filler words
  const foundFillers = [];
  fillerWords.forEach(word => {
    if (lowerBullet.includes(word)) {
      foundFillers.push(word);
      score -= 5;
    }
  });
  
  if (foundFillers.length > 0) {
    suggestions.push({
      type: 'filler_words',
      issue: `Contains filler words: ${foundFillers.join(', ')}`,
      suggestion: 'Remove unnecessary words for conciseness',
      reason: 'Filler words dilute impact'
    });
  }
  
  // Check for quantifiable impact
  let hasImpact = false;
  const impactRegex = /\d+[\+%]?|\d+k\+?|\d+,\d+|\d+\.\d+|increased|improved|reduced|achieved|delivered|managed|led/i;
  if (bullet.match(impactRegex)) {
    hasImpact = true;
  }
  
  if (!hasImpact && !bullet.includes('Rating') && !bullet.includes('Rank')) {
    suggestions.push({
      type: 'missing_impact',
      issue: 'No quantifiable metrics or impact verbs',
      suggestion: 'Add specific numbers, percentages, or strong action verbs',
      reason: 'Quantified achievements are more impressive',
      example: 'e.g., "Developed 5+ projects" or "Achieved 90% accuracy"'
    });
    score -= 20;
  }
  
  // Check starting verb strength
  const firstWord = bullet.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');
  const strongVerbs = ['developed', 'built', 'created', 'designed', 'implemented', 'achieved', 'led', 'managed', 'optimized', 'delivered'];
  const isStrongVerb = strongVerbs.includes(firstWord);
  
  if (!isStrongVerb && !hasImpact && !bullet.includes('Rating') && !bullet.includes('Rank')) {
    suggestions.push({
      type: 'weak_verb',
      issue: `Starts with "${firstWord}" - could be stronger`,
      suggestion: `Consider starting with: Developed, Built, Created, Achieved`,
      reason: 'Strong action verbs make accomplishments stand out'
    });
    score -= 10;
  }
  
  // Check length (too short or too long)
  if (bullet.length < 30 && !bullet.includes('@') && !bullet.includes('Rating')) {
    suggestions.push({
      type: 'too_short',
      issue: 'Entry could be more detailed',
      suggestion: 'Add more context about your role and impact',
      reason: 'Provide enough detail to understand your contribution'
    });
    score -= 10;
  } else if (bullet.length > 200) {
    suggestions.push({
      type: 'too_long',
      issue: 'Entry is too lengthy',
      suggestion: 'Break into multiple points or condense',
      reason: 'Keep it concise for better readability'
    });
    score -= 5;
  }
  
  // Generate improved version based on content type
  let improvedVersion = null;
  
  if (suggestions.length > 0 && !bullet.includes('@') && !bullet.includes('C.G.P.A.')) {
    // For project entries
    if (bullet.includes('React') || bullet.includes('Node') || bullet.includes('JavaScript')) {
      improvedVersion = `Developed full-stack web application using ${bullet.match(/(React|Node|JavaScript|MongoDB|Express)/gi)?.join(', ') || 'modern technologies'}, implementing responsive design and optimizing performance for enhanced user experience`;
    }
    // For competitive programming achievements
    else if (bullet.includes('Rating') || bullet.includes('Rank')) {
      improvedVersion = `Achieved competitive programming excellence with ${bullet.match(/Rating\s*\d+/i)?.[0] || 'high rating'} and ${bullet.match(/Rank\s*\d+/i)?.[0] || 'top ranking'}, demonstrating strong problem-solving skills and algorithmic thinking`;
    }
    // For internship/work experience
    else if (bullet.includes('Intern') || bullet.includes('Developer')) {
      improvedVersion = `Contributed as ${bullet.match(/(Full Stack|SDE|Developer)\s*Intern?/i)?.[0] || 'Software Developer Intern'}, collaborating with development team to deliver high-quality solutions and gaining hands-on experience with industry best practices`;
    }
    // Generic improvement
    else {
      improvedVersion = bullet.replace(/^[a-z]/, c => c.toUpperCase());
      if (!improvedVersion.match(/^(Developed|Built|Created|Achieved|Led|Managed)/)) {
        improvedVersion = `Developed ${improvedVersion.toLowerCase()}`;
      }
    }
  }
  
  return {
    original: bullet,
    score: Math.max(score, 0),
    suggestions,
    improvedVersion: improvedVersion !== bullet ? improvedVersion : null,
    status: score >= 80 ? 'strong' : score >= 50 ? 'moderate' : 'weak'
  };
}

// Helper: Generate Resume Enhancement Report
function generateEnhancementReport(resumeText) {
  const bullets = extractBulletPoints(resumeText);
  const analyzedBullets = bullets.map(b => analyzeBulletPoint(b));
  
  const overallScore = analyzedBullets.length > 0 
    ? Math.round(analyzedBullets.reduce((sum, b) => sum + b.score, 0) / analyzedBullets.length)
    : 0;
  
  const weakBullets = analyzedBullets.filter(b => b.status === 'weak');
  const moderateBullets = analyzedBullets.filter(b => b.status === 'moderate');
  const strongBullets = analyzedBullets.filter(b => b.status === 'strong');
  
  return {
    overallScore,
    totalBullets: analyzedBullets.length,
    breakdown: {
      strong: strongBullets.length,
      moderate: moderateBullets.length,
      weak: weakBullets.length
    },
    bulletAnalysis: analyzedBullets,
    topIssues: getTopIssues(analyzedBullets),
    summary: generateEnhancementSummary(overallScore, analyzedBullets)
  };
}

function getTopIssues(analyzedBullets) {
  const issueCount = {};
  
  analyzedBullets.forEach(bullet => {
    bullet.suggestions.forEach(sug => {
      issueCount[sug.type] = (issueCount[sug.type] || 0) + 1;
    });
  });
  
  return Object.entries(issueCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([type, count]) => ({ type, count }));
}

function generateEnhancementSummary(score, bullets) {
  if (score >= 80) {
    return "Excellent! Your resume has strong, impact-driven bullet points. Minor tweaks could make it even better.";
  } else if (score >= 60) {
    return "Good foundation, but several bullet points need improvement. Focus on quantifying achievements and using stronger action verbs.";
  } else {
    return "Significant improvement needed. Many bullet points lack impact metrics and use weak language. Review suggestions carefully.";
  }
}

// API Routes

// 1. Upload & Analyze
app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    const jdText = req.body.jobDescription || '';
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(dataBuffer);
    const resumeText = pdfData.text;

    // 1. Basic Extraction
    const email = extractEmail(resumeText);
    const phone = extractPhone(resumeText);
    
    // 2. Skill Extraction (Resume)
    const resumeSkills = extractSkills(resumeText);
    
    // 3. Category Detection
    const category = determineCategory(resumeSkills);

    // 4. JD Analysis (if provided)
    let jdSkills = [];
    let missingSkills = [];
    let matchScore = 0;
    
    if (jdText) {
      jdSkills = extractSkills(jdText);
      
      // Calculate Match
      const matchingSkills = resumeSkills.filter(s => jdSkills.includes(s));
      
      // 1. Skill Match Score
      let skillMatchScore = 0;
      if (jdSkills.length > 0) {
        skillMatchScore = (matchingSkills.length / jdSkills.length) * 100;
      }

      // 2. Text Similarity Score (TF-IDF)
      const TfIdf = natural.TfIdf;
      const tfidf = new TfIdf();
      tfidf.addDocument(jdText);
      tfidf.addDocument(resumeText);
      
      // Get similarity measure (using vector space model simulation)
      // Since natural doesn't have direct cosine similarity for 2 docs easily exposed, 
      // we'll use a simplified Jaccard index on tokenized stems for text match
      const tokenizer = new natural.WordTokenizer();
      const resumeTokens = new Set(tokenizer.tokenize(resumeText.toLowerCase()));
      const jdTokens = new Set(tokenizer.tokenize(jdText.toLowerCase()));
      
      const intersection = new Set([...resumeTokens].filter(x => jdTokens.has(x)));
      const union = new Set([...resumeTokens, ...jdTokens]);
      
      const textSimilarityScore = (intersection.size / union.size) * 100 * 3; // Boost Jaccard (usually low)
      
      // Cap at 100
      const contentScore = Math.min(textSimilarityScore, 100);

      // 3. Final Weighted Score
      // If we found skills, prioritize skill match (70%) + text match (30%)
      // If no skills found in JD, rely 100% on text match
      if (jdSkills.length > 0) {
        matchScore = Math.round((skillMatchScore * 0.7) + (contentScore * 0.3));
      } else {
        matchScore = Math.round(contentScore);
      }
      
      // Ensure reasonable range (minimum 20 for effort, max 95 to leave room for improvement)
      matchScore = Math.max(20, Math.min(matchScore, 98));
      
      // Find Gaps
      missingSkills = jdSkills.filter(s => !resumeSkills.includes(s));
    } else {
      // If no JD, just score based on "richness" of resume? 
      // Or 0. The prompt assumes JD is provided for "Match Analysis".
      matchScore = 0; 
    }

    // 4.5. Overclaim Detection
    const overclaims = detectOverclaims(resumeText, resumeSkills);
    
    // 4.6. Job Fit Explanation
    const jobFit = jdText ? generateJobFitExplanation(matchScore, missingSkills, resumeSkills, jdSkills) : { level: 'N/A', explanation: 'No job description provided' };

    // 5. Recommendations
    // Get Recs from our static data based on Category
    const categoryData = skillSets.find(s => s.category === category);
    const recommendedSkills = categoryData ? categoryData.recommended : [];
    
    // Filter out skills user already has
    const skillsToLearn = recommendedSkills.filter(s => !resumeSkills.includes(s.toLowerCase()));
    
    const courses = getCourses(category).map(c => ({ name: c[0], link: c[1] }));

    // 6. Resume Enhancement Analysis
    const enhancementReport = generateEnhancementReport(resumeText);

    // 6. Save to DB
    const analysis = new Analysis({
      resumeName: req.file.originalname,
      candidateEmail: email,
      candidatePhone: phone,
      extractedSkills: resumeSkills,
      jobDescription: jdText,
      overallMatchScore: matchScore,
      resumeQualityScore: calculateResumeScore(resumeText),
      userLevel: predictUserLevel(resumeText, pdfData.numpages),
      category: category,
      missingSkills: missingSkills,
      overclaims: overclaims,
      jobFit: jobFit,
      enhancement: enhancementReport,
      recommendations: {
        skills: skillsToLearn.slice(0, 10), // Top 10
        courses: courses.slice(0, 5) // Top 5
      },
      rawText: resumeText.substring(0, 1000) // Truncate for storage
    });
    
    await analysis.save();

    // Cleanup
    safeDeleteFile(req.file.path);

    // Add video recommendations
    const resumeVideo = resume_videos[Math.floor(Math.random() * resume_videos.length)];
    const interviewVideo = interview_videos[Math.floor(Math.random() * interview_videos.length)];

    res.json({
      ...analysis.toObject(),
      videos: {
        resume: resumeVideo,
        interview: interviewVideo
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error during analysis' });
  }
});

// 1.5. Advanced AI Analysis (Using Python Microservice)
app.post('/api/ai-analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5001';

    // Create form data to send to Python service
    const formData = new FormData();
    formData.append('resume', fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: 'application/pdf'
    });

    try {
      // Call Python microservice for advanced NLP analysis
      const pythonResponse = await axios.post(
        `${PYTHON_SERVICE_URL}/api/analyze-resume`,
        formData,
        {
          headers: {
            ...formData.getHeaders()
          },
          timeout: 30000 // 30 second timeout
        }
      );

      const aiAnalysis = pythonResponse.data;

      // Also do our own analysis for JD matching if JD is provided
      const jdText = req.body.jobDescription || '';
      let jdAnalysis = null;

      if (jdText) {
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdf(dataBuffer);
        const resumeText = pdfData.text;

        const resumeSkills = extractSkills(resumeText);
        const jdSkills = extractSkills(jdText);
        const matchingSkills = resumeSkills.filter(s => jdSkills.includes(s));
        // Advanced Match Calculation (Hybrid: Skills + TF-IDF)
        // 1. Skill Match Score
        let skillMatchScore = 0;
        if (jdSkills.length > 0) {
          skillMatchScore = (matchingSkills.length / jdSkills.length) * 100;
        }

        // 2. Text Similarity Score (TF-IDF)
        const TfIdf = natural.TfIdf;
        const tfidf = new TfIdf();
        tfidf.addDocument(jdText);
        tfidf.addDocument(resumeText);
        
        const tokenizer = new natural.WordTokenizer();
        const resumeTokens = new Set(tokenizer.tokenize(resumeText.toLowerCase()));
        const jdTokens = new Set(tokenizer.tokenize(jdText.toLowerCase()));
        
        const intersection = new Set([...resumeTokens].filter(x => jdTokens.has(x)));
        const union = new Set([...resumeTokens, ...jdTokens]);
        
        const textSimilarityScore = (intersection.size / union.size) * 100 * 3; // Boost Jaccard
        const contentScore = Math.min(textSimilarityScore, 100);

        // 3. Final Weighted Score
        let matchScore = 0;
        if (jdSkills.length > 0) {
          matchScore = Math.round((skillMatchScore * 0.7) + (contentScore * 0.3));
        } else {
          matchScore = Math.round(contentScore);
        }
        
        matchScore = Math.max(20, Math.min(matchScore, 98));
        const missingSkills = jdSkills.filter(s => !resumeSkills.includes(s));
        const overclaims = detectOverclaims(resumeText, resumeSkills);
        const jobFit = generateJobFitExplanation(matchScore, missingSkills, resumeSkills, jdSkills);

        jdAnalysis = {
          matchScore,
          missingSkills,
          overclaims,
          jobFit,
          jdSkills,
          matchingSkills
        };
      }

      // Combine AI analysis with JD analysis
      const combinedAnalysis = {
        aiPowered: true,
        pythonAnalysis: aiAnalysis.data,
        jdMatching: jdAnalysis,
        timestamp: new Date()
      };

      // Save to database
      const analysis = new Analysis({
        resumeName: req.file.originalname,
        candidateEmail: aiAnalysis.data?.basic_info?.email || null,
        candidatePhone: aiAnalysis.data?.basic_info?.mobile || null,
        extractedSkills: aiAnalysis.data?.skills?.detected || [],
        jobDescription: jdText,
        overallMatchScore: jdAnalysis?.matchScore || 0,
        resumeQualityScore: aiAnalysis.data?.score?.total || 0,
        userLevel: aiAnalysis.data?.experience?.level || 'Unknown',
        category: aiAnalysis.data?.skills?.predicted_field || 'Unknown',
        missingSkills: jdAnalysis?.missingSkills || [],
        overclaims: jdAnalysis?.overclaims || [],
        jobFit: jdAnalysis?.jobFit || { level: 'N/A', explanation: 'No JD provided' },
        recommendations: {
          skills: aiAnalysis.data?.skills?.recommended || [],
          courses: []
        },
        rawText: aiAnalysis.data?.raw_text || ''
      });

      await analysis.save();

      // Cleanup uploaded file
      safeDeleteFile(req.file.path);

      res.json({
        success: true,
        analysis: combinedAnalysis,
        savedAnalysis: analysis.toObject()
      });

    } catch (pythonError) {
      console.error('Python service error:', pythonError.message);
      
      // Fallback to regular analysis if Python service is down
      console.log('Falling back to regular analysis...');
      
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdf(dataBuffer);
      const resumeText = pdfData.text;
      
      const email = extractEmail(resumeText);
      const phone = extractPhone(resumeText);
      const resumeSkills = extractSkills(resumeText);
      const category = determineCategory(resumeSkills);
      
      const fallbackAnalysis = {
        aiPowered: false,
        fallback: true,
        message: 'Python AI service unavailable, using basic analysis',
        basic_info: { email, phone },
        skills: { detected: resumeSkills, predicted_field: category },
        score: { total: calculateResumeScore(resumeText) },
        experience: { level: predictUserLevel(resumeText, pdfData.numpages) }
      };

      safeDeleteFile(req.file.path);

      res.json({
        success: true,
        analysis: fallbackAnalysis,
        warning: 'Advanced AI analysis unavailable'
      });
    }

  } catch (error) {
    console.error('Error in AI analysis:', error);
    
    // Cleanup file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      safeDeleteFile(req.file.path);
    }
    
    res.status(500).json({ 
      error: 'Server Error during AI analysis',
      details: error.message 
    });
  }
});

// 2. Get Recent Analyses (Admin Dashboard)
app.get('/api/history', async (req, res) => {
  try {
    const history = await Analysis.find().sort({ timestamp: -1 }).limit(20);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

// API Status endpoint for testing
app.get('/api/status', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      'GET /api/status': 'API status check',
      'GET /api/history': 'Get analysis history',
      'POST /api/analyze': 'Basic resume analysis (requires file upload)',
      'POST /api/ai-analyze': 'AI-powered analysis (requires file upload)'
    },
    services: {
      'Node.js Backend': 'http://localhost:5000',
      'Python AI Service': 'http://localhost:5001',
      'React Frontend': 'http://localhost:5173'
    }
  });
});

// Handle undefined routes
app.get('/api/analyze', (req, res) => {
  res.status(405).json({
    error: 'Method Not Allowed',
    message: 'This endpoint requires POST method with file upload',
    usage: 'Use the web interface at http://localhost:5173 to upload and analyze resumes',
    example: 'curl -X POST http://localhost:5000/api/analyze -F "resume=@file.pdf"'
  });
});

app.get('/api/ai-analyze', (req, res) => {
  res.status(405).json({
    error: 'Method Not Allowed',
    message: 'This endpoint requires POST method with file upload',
    usage: 'Use the web interface at http://localhost:5173 to upload and analyze resumes',
    example: 'curl -X POST http://localhost:5000/api/ai-analyze -F "resume=@file.pdf"'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
