import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, FileText, CheckCircle, Loader2, Sparkles, Shield, BarChart3, ArrowRight, PenTool, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

const Home = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Handle File Drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Download Resume Template
  const downloadTemplate = (templateType) => {
    const templates = {
      'software-engineer': {
        filename: 'Software_Engineer_Resume_Template.txt',
        content: `JOHN DOE
Software Engineer
Email: john.doe@email.com | Phone: +1 (555) 123-4567
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

PROFESSIONAL SUMMARY
Experienced Software Engineer with 3+ years developing scalable web applications using modern technologies. 
Proven track record of delivering high-quality solutions and leading development teams.

TECHNICAL SKILLS
• Languages: JavaScript, Python, Java, TypeScript
• Frontend: React.js, Vue.js, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express.js, Django, REST APIs
• Databases: MongoDB, PostgreSQL, MySQL, Redis
• Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD
• Tools: Git, Webpack, Jest, Postman

PROFESSIONAL EXPERIENCE

Senior Software Engineer | TechCorp Inc. | Jan 2022 - Present
• Developed 15+ responsive web applications using React.js and Node.js, serving 100K+ users
• Optimized database queries and API performance, reducing response time by 40%
• Led team of 3 junior developers, implementing agile methodologies and code review processes
• Architected microservices infrastructure using Docker and AWS, improving scalability by 60%

Software Engineer | StartupXYZ | Jun 2020 - Dec 2021
• Built full-stack e-commerce platform handling $2M+ in transactions annually
• Implemented automated testing suite, increasing code coverage from 60% to 95%
• Collaborated with UX team to improve user experience, resulting in 25% increase in conversion rate
• Mentored 2 interns and conducted technical interviews for new hires

PROJECTS

E-Commerce Platform | React, Node.js, MongoDB
• Full-stack application with user authentication, payment processing, and admin dashboard
• Implemented real-time inventory management and order tracking system
• Deployed on AWS with auto-scaling and load balancing

Task Management App | Vue.js, Express.js, PostgreSQL
• Collaborative project management tool with real-time updates using WebSocket
• Integrated third-party APIs for calendar synchronization and email notifications
• Achieved 99.9% uptime with comprehensive error handling and monitoring

EDUCATION
Bachelor of Science in Computer Science | University of Technology | 2020
Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering

CERTIFICATIONS
• AWS Certified Developer Associate (2023)
• MongoDB Certified Developer (2022)

ACHIEVEMENTS
• Winner of Company Hackathon 2023 - Built AI-powered code review tool
• Speaker at TechConf 2023 - "Building Scalable React Applications"
• Open source contributor with 500+ GitHub stars across projects`
      },
      'data-scientist': {
        filename: 'Data_Scientist_Resume_Template.txt',
        content: `JANE SMITH
Data Scientist
Email: jane.smith@email.com | Phone: +1 (555) 987-6543
LinkedIn: linkedin.com/in/janesmith | Portfolio: janesmith.dev

PROFESSIONAL SUMMARY
Results-driven Data Scientist with 4+ years of experience in machine learning, statistical analysis, and data visualization. 
Proven ability to extract actionable insights from complex datasets and drive business growth through data-driven solutions.

TECHNICAL SKILLS
• Programming: Python, R, SQL, Scala, Java
• Machine Learning: Scikit-learn, TensorFlow, PyTorch, Keras, XGBoost
• Data Analysis: Pandas, NumPy, SciPy, Matplotlib, Seaborn
• Big Data: Spark, Hadoop, Kafka, Airflow
• Databases: PostgreSQL, MongoDB, Cassandra, Snowflake
• Cloud Platforms: AWS (SageMaker, S3, EC2), Google Cloud, Azure
• Visualization: Tableau, Power BI, Plotly, D3.js

PROFESSIONAL EXPERIENCE

Senior Data Scientist | DataTech Solutions | Mar 2021 - Present
• Built 20+ machine learning models achieving 90%+ accuracy for customer segmentation and churn prediction
• Analyzed 10M+ customer records using Python and SQL, identifying $5M in revenue opportunities
• Developed real-time recommendation system serving 1M+ users, increasing engagement by 35%
• Led cross-functional team of 5 members to implement MLOps pipeline, reducing model deployment time by 70%

Data Scientist | Analytics Corp | Aug 2019 - Feb 2021
• Created predictive models for fraud detection, reducing false positives by 45%
• Designed A/B testing framework for product optimization, improving conversion rates by 20%
• Built automated reporting dashboards using Tableau, saving 15 hours/week of manual work
• Collaborated with engineering team to productionize 8 ML models in cloud environment

PROJECTS

Customer Lifetime Value Prediction | Python, XGBoost, AWS
• Developed ML model to predict CLV with 92% accuracy using ensemble methods
• Implemented feature engineering pipeline processing 5M+ customer transactions
• Deployed model using AWS SageMaker with real-time inference capabilities

Sales Forecasting System | Python, TensorFlow, Time Series Analysis
• Built LSTM neural network for multi-step sales forecasting with MAPE < 8%
• Integrated external data sources (weather, economic indicators) to improve accuracy
• Created interactive dashboard for stakeholders to visualize predictions and trends

Sentiment Analysis Platform | Python, NLP, Docker
• Developed sentiment analysis system processing 100K+ social media posts daily
• Implemented BERT-based model achieving 94% accuracy on sentiment classification
• Built REST API and deployed using Docker containers on AWS ECS

EDUCATION
Master of Science in Data Science | Stanford University | 2019
Bachelor of Science in Statistics | UC Berkeley | 2017

CERTIFICATIONS
• AWS Certified Machine Learning - Specialty (2023)
• Google Cloud Professional Data Engineer (2022)
• Tableau Desktop Certified Professional (2021)

PUBLICATIONS & ACHIEVEMENTS
• "Deep Learning for Customer Behavior Prediction" - Journal of Data Science (2023)
• Winner of Kaggle Competition - House Prices Prediction (Top 1%)
• Speaker at PyData Conference 2023 - "Scaling ML Models in Production"`
      },
      'ui-ux-designer': {
        filename: 'UI_UX_Designer_Resume_Template.txt',
        content: `ALEX CHEN
UI/UX Designer
Email: alex.chen@email.com | Phone: +1 (555) 456-7890
Portfolio: alexchen.design | LinkedIn: linkedin.com/in/alexchen

PROFESSIONAL SUMMARY
Creative UI/UX Designer with 5+ years of experience designing user-centered digital experiences. 
Expertise in user research, prototyping, and creating design systems that drive engagement and conversion.

DESIGN SKILLS
• Design Tools: Figma, Adobe XD, Sketch, Adobe Creative Suite, InVision
• Prototyping: Principle, Framer, Marvel, Zeplin
• User Research: User Interviews, Surveys, Usability Testing, A/B Testing
• Design Systems: Component Libraries, Style Guides, Design Tokens
• Frontend: HTML5, CSS3, JavaScript (basic), React (basic)
• Analytics: Google Analytics, Hotjar, Mixpanel, Amplitude

PROFESSIONAL EXPERIENCE

Senior UI/UX Designer | DesignTech Inc. | Jan 2021 - Present
• Designed 25+ mobile and web applications with average 4.8+ App Store rating
• Conducted user research with 500+ participants, improving user satisfaction by 40%
• Created comprehensive design system used by 50+ developers across 10 products
• Led design sprints and workshops, reducing product development time by 30%
• Mentored 3 junior designers and established design review processes

UI/UX Designer | Creative Agency | Jun 2019 - Dec 2020
• Redesigned e-commerce platform resulting in 60% increase in conversion rate
• Collaborated with product managers and developers in agile environment
• Created wireframes, prototypes, and high-fidelity designs for 15+ client projects
• Conducted usability testing sessions and implemented feedback to improve UX
• Developed brand guidelines and visual identity for 8 startup clients

FEATURED PROJECTS

Banking Mobile App | iOS & Android
• Designed intuitive banking app for 2M+ users with focus on accessibility
• Conducted extensive user research and created user personas and journey maps
• Implemented biometric authentication and simplified transaction flows
• Achieved 95% user satisfaction score and 40% increase in mobile transactions

E-Learning Platform | Web Application
• Created comprehensive learning management system for 100K+ students
• Designed adaptive interface supporting multiple learning styles and accessibility needs
• Developed interactive course creation tools for educators
• Improved course completion rates by 45% through gamification elements

Healthcare Dashboard | Web Application
• Designed data visualization dashboard for healthcare professionals
• Simplified complex medical data into intuitive charts and actionable insights
• Conducted stakeholder interviews with 20+ doctors and nurses
• Reduced time to find critical patient information by 50%

EDUCATION
Bachelor of Fine Arts in Graphic Design | Art Institute | 2018
UX Design Certificate | General Assembly | 2019

CERTIFICATIONS
• Google UX Design Professional Certificate (2023)
• Adobe Certified Expert - XD (2022)
• Certified Usability Analyst (CUA) (2021)

ACHIEVEMENTS & RECOGNITION
• Winner of UX Design Awards 2023 - Best Mobile App Design
• Featured in Design Weekly - "Top 10 Designers to Watch"
• Speaker at Design Conference 2023 - "Building Inclusive Design Systems"
• Dribbble Top Shot with 50K+ likes and 500+ followers

VOLUNTEER WORK
• UX Mentor at ADPList - Mentored 20+ aspiring designers
• Design volunteer for non-profit organizations - Pro bono work for 5 NGOs`
      },
      'devops-engineer': {
        filename: 'Senior_DevOps_Engineer_Resume.txt',
        content: `MARCUS JOHNSON
Senior DevOps Engineer & Cloud Architect
📧 marcus.johnson@email.com | 📱 +1 (555) 678-9012
🔗 linkedin.com/in/marcusjohnson | ☁️ marcuscloud.dev | 🐙 github.com/marcusj

═══════════════════════════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY
═══════════════════════════════════════════════════════════════════════════════
Innovative Senior DevOps Engineer with 8+ years of experience designing and implementing scalable 
cloud infrastructure and CI/CD pipelines. Expert in containerization, orchestration, and 
infrastructure as code. Led DevOps transformations that reduced deployment time by 90% and 
improved system reliability to 99.99% uptime.

TECHNICAL EXPERTISE
Cloud Platforms: AWS, Google Cloud, Azure • Containerization: Docker, Kubernetes, OpenShift
CI/CD Tools: Jenkins, GitLab CI, GitHub Actions • Infrastructure: Terraform, Ansible
Monitoring: Prometheus, Grafana, ELK Stack • Scripting: Bash, Python, Go

PROFESSIONAL EXPERIENCE

PRINCIPAL DEVOPS ENGINEER | Netflix | Los Gatos, CA | Feb 2021 - Present
• Lead DevOps strategy for streaming platform serving 230M+ global subscribers
• Architected multi-region Kubernetes infrastructure handling 1B+ requests daily
• Implemented chaos engineering practices improving system resilience by 40%
• Reduced deployment time from 4 hours to 15 minutes through advanced CI/CD pipelines
• Led team of 12 DevOps engineers across multiple product teams
• Achieved 99.99% uptime for critical streaming services

SENIOR DEVOPS ENGINEER | Uber | San Francisco, CA | Jan 2019 - Jan 2021
• Managed infrastructure for ride-sharing platform serving 100M+ users globally
• Implemented GitOps workflows reducing configuration drift by 95%
• Built auto-scaling Kubernetes clusters handling 500K+ concurrent requests
• Designed disaster recovery procedures with RTO < 15 minutes
• Reduced infrastructure costs by 35% through resource optimization

KEY ACHIEVEMENTS
🏆 Netflix Engineering Excellence Award (2023)
🥇 Uber Innovation Award - Infrastructure Category (2020)
📊 Top 1% DevOps Engineer - Stack Overflow Developer Survey (2022)
🌟 CNCF Ambassador (2023)

EDUCATION & CERTIFICATIONS
Bachelor of Science in Computer Engineering | Stanford University | 2015
• AWS Certified Solutions Architect - Professional (2023)
• Certified Kubernetes Administrator (CKA) (2023)
• Google Cloud Professional DevOps Engineer (2022)`
      },
      'frontend-developer': {
        filename: 'Senior_Frontend_Developer_Resume.txt',
        content: `EMILY CHEN
Senior Frontend Developer & UI Engineer
📧 emily.chen@email.com | 📱 +1 (555) 789-0123
🌐 emilychen.dev | 🔗 linkedin.com/in/emilychen | 🎨 dribbble.com/emilychen

═══════════════════════════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY
═══════════════════════════════════════════════════════════════════════════════
Passionate Senior Frontend Developer with 6+ years of experience creating exceptional user 
experiences for web and mobile applications. Expert in modern JavaScript frameworks, responsive 
design, and performance optimization. Led frontend initiatives that improved user engagement by 
50% and page load speeds by 70%.

TECHNICAL EXPERTISE
Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, SASS/SCSS
Frameworks: React.js, Next.js, Vue.js, Angular, Svelte
State Management: Redux, Zustand, Vuex, Context API
Styling: Tailwind CSS, Styled Components, CSS Modules, Material-UI
Build Tools: Webpack, Vite, Parcel, Rollup • Testing: Jest, Cypress, Playwright

PROFESSIONAL EXPERIENCE

SENIOR FRONTEND DEVELOPER | Airbnb | San Francisco, CA | Jan 2021 - Present
• Lead frontend development for host dashboard serving 4M+ hosts globally
• Implemented micro-frontend architecture improving development velocity by 40%
• Optimized application performance achieving 95+ Lighthouse scores across all pages
• Built accessible components following WCAG 2.1 AA guidelines
• Mentored team of 6 junior developers and conducted code reviews
• Reduced bundle size by 60% through code splitting and lazy loading

FRONTEND DEVELOPER | Stripe | San Francisco, CA | Mar 2019 - Dec 2020
• Developed payment dashboard and checkout experiences for millions of merchants
• Built reusable React component library with 50+ components
• Implemented real-time data visualization using D3.js and Chart.js
• Achieved 99.9% uptime for critical payment flows
• Reduced customer support tickets by 30% through improved UX design
• Led A/B testing initiatives resulting in 25% increase in conversion rates

KEY PROJECTS
🏠 Host Dashboard Redesign - 40% improvement in user task completion rates
💳 Payment Checkout Optimization - 35% reduction in cart abandonment
🛍️ Mobile PWA Development - 40% reduction in mobile bounce rate
⚡ Performance Optimization - 70% reduction in initial bundle size

AWARDS & RECOGNITION
🏆 Airbnb Engineering Excellence Award (2023)
🥇 Stripe Innovation Award - Frontend Category (2020)
📱 Google Developer Expert - Web Technologies (2022)
🎨 Dribbble Featured Designer - 25K+ followers

EDUCATION & CERTIFICATIONS
Bachelor of Science in Computer Science | UC Berkeley | 2015
• Google Mobile Web Specialist (2023) • AWS Certified Cloud Practitioner (2022)
• React Developer Certification - Meta (2020)`
      },
      'backend-developer': {
        filename: 'Senior_Backend_Developer_Resume.txt',
        content: `ALEX RODRIGUEZ
Senior Backend Developer & System Architect
📧 alex.rodriguez@email.com | 📱 +1 (555) 890-1234
🔗 linkedin.com/in/alexrodriguez | 💻 alexdev.io | 🐙 github.com/alexr

═══════════════════════════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY
═══════════════════════════════════════════════════════════════════════════════
Experienced Senior Backend Developer with 7+ years of expertise in designing and implementing 
scalable server-side applications and distributed systems. Expert in microservices architecture, 
database optimization, and API design. Led backend initiatives that improved system performance 
by 80% and reduced infrastructure costs by 40%.

TECHNICAL EXPERTISE
Languages: Python, Java, Go, Node.js, C#, Rust
Frameworks: Django, FastAPI, Spring Boot, Express.js, .NET Core
Databases: PostgreSQL, MongoDB, Redis, MySQL, Cassandra, Elasticsearch
Cloud Platforms: AWS, Google Cloud, Azure • Message Queues: Apache Kafka, RabbitMQ
API Technologies: REST, GraphQL, gRPC, WebSocket • DevOps: Docker, Kubernetes, Jenkins

PROFESSIONAL EXPERIENCE

PRINCIPAL BACKEND ENGINEER | Discord | San Francisco, CA | Jan 2021 - Present
• Architect backend systems for real-time communication platform serving 150M+ users
• Design and implement microservices handling 1B+ messages daily
• Lead team of 10 backend engineers across multiple product areas
• Optimized database queries reducing response time by 75%
• Implemented event-driven architecture using Apache Kafka
• Achieved 99.99% uptime for critical messaging services

SENIOR BACKEND DEVELOPER | Twitch | San Francisco, CA | Mar 2019 - Dec 2020
• Developed streaming infrastructure supporting 30M+ daily active users
• Built real-time chat system handling 2M+ concurrent connections
• Implemented content delivery optimization reducing latency by 50%
• Designed auto-scaling systems handling traffic spikes during major events
• Led migration from monolithic to microservices architecture
• Reduced infrastructure costs by 35% through optimization initiatives

KEY PROJECTS
💬 Real-time Messaging Platform - 1B+ messages daily with <100ms latency
🎮 Live Streaming Infrastructure - 3M+ concurrent users during major events
📱 Content Recommendation Engine - 35% increase in user engagement
☁️ Distributed File Storage - 99.999% data durability across petabytes

AWARDS & RECOGNITION
🏆 Discord Engineering Excellence Award (2023)
🥇 Twitch Innovation Award - Infrastructure Category (2020)
📊 Top 1% Backend Developer - Stack Overflow (2022)
🌟 GitHub Arctic Code Vault Contributor (2020)

EDUCATION & CERTIFICATIONS
Master of Science in Computer Science | Stanford University | 2017
• AWS Certified Solutions Architect - Professional (2023)
• Google Cloud Professional Cloud Architect (2022)
• MongoDB Certified Developer Associate (2021)`
      }
    };

    const template = templates[templateType];
    if (template) {
      const blob = new Blob([template.content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = template.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  const submitAnalysis = async () => {
    if (!file) return alert('Please upload a resume first');
    
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jd);

    try {
      const { data } = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/results', { state: { data } });
    } catch (err) {
      console.error(err);
      alert('Analysis failed. Ensure server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      
      {/* Professional Navbar */}
      <nav className="border-b border-slate-200/80 bg-white/95 backdrop-blur-2xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-2.5 rounded-2xl shadow-xl">
                <Sparkles size={20} className="text-white" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-black text-2xl tracking-tight text-gradient bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 bg-clip-text text-transparent">ResumeAI</span>
              <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg">
                PRO
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-700">
            <a href="#features" className="hover:text-blue-600 transition-colors duration-200 relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#templates" className="hover:text-blue-600 transition-colors duration-200 relative group">
              Templates
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors duration-200 relative group">
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="https://github.com/irfan/AI-Resume-Analyzer" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-lg font-bold">
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Professional Hero Section */}
          <div className="relative text-center space-y-8 pt-24 pb-20">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-100 rounded-full mb-8 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                </span>
              </div>
              <span className="text-sm font-black text-gradient bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent tracking-wide uppercase">
                ✨ AI-Powered Resume Analysis • Trusted by 500K+ Professionals
              </span>
            </div>
            
            {/* Main Heading with Professional Typography */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                <span className="block text-gradient bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-2">
                  Land Your Dream Job
                </span>
                <span className="block text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  With AI Precision
                </span>
              </h1>
              
              <div className="relative">
                <p className="text-slate-600 text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed font-medium">
                  Advanced AI technology analyzes your resume against job descriptions, 
                  providing <span className="font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">instant insights</span> and 
                  <span className="font-bold text-gradient bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent"> actionable recommendations</span> to maximize your interview chances.
                </p>
              </div>
            </div>
            
            {/* Professional Feature Highlights */}
            <div className="flex items-center justify-center gap-12 pt-12">
              <div className="flex flex-col items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-2xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300">
                    <BarChart3 size={40} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="block text-sm font-black text-slate-900">Deep Analytics</span>
                  <span className="block text-xs text-slate-500 font-semibold">99.9% Accuracy</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl shadow-2xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300">
                    <Shield size={40} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="block text-sm font-black text-slate-900">Enterprise Security</span>
                  <span className="block text-xs text-slate-500 font-semibold">Bank-Grade</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl shadow-2xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300">
                    <Sparkles size={40} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="block text-sm font-black text-slate-900">AI-Powered</span>
                  <span className="block text-xs text-slate-500 font-semibold">GPT-4 Enhanced</span>
                </div>
              </div>
            </div>

            {/* Professional Success Stats */}
            <div className="pt-16">
              <div className="inline-flex items-center gap-12 bg-white/80 backdrop-blur-2xl rounded-3xl p-10 border-2 border-slate-200/50 shadow-2xl">
                <div className="text-center">
                  <div className="text-5xl font-black text-gradient bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">500K+</div>
                  <div className="text-sm font-bold text-slate-600">Resumes Analyzed</div>
                </div>
                <div className="w-px h-20 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                <div className="text-center">
                  <div className="text-5xl font-black text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">94%</div>
                  <div className="text-sm font-bold text-slate-600">Success Rate</div>
                </div>
                <div className="w-px h-20 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                <div className="text-center">
                  <div className="text-5xl font-black text-gradient bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">4.9★</div>
                  <div className="text-sm font-bold text-slate-600">User Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button 
              onClick={() => document.getElementById('fileInput')?.click()}
              className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-black rounded-2xl shadow-2xl transition-all duration-300 text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center gap-3">
                <Upload size={24} />
                <span>Analyze Resume Now</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <Link to="/resume-builder" className="px-12 py-5 bg-white hover:bg-slate-50 text-slate-900 font-black rounded-2xl transition-all shadow-xl border-2 border-slate-200 hover:border-slate-300 text-lg flex items-center gap-3">
              <PenTool size={24} />
              Build Resume
            </Link>
          </div>
        </div>
  
        {/* Professional Upload Section */}
        <div className="relative" id="features">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-pink-50/50 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border-2 border-slate-200/50">
            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-10 md:p-14 grid md:grid-cols-2 gap-14">
              
              {/* Left: Resume Upload */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-30"></div>
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-black shadow-xl">1</div>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-xl">Upload Your Resume</h3>
                    <p className="text-slate-600 text-sm font-semibold">PDF format • Maximum 16MB</p>
                  </div>
                </div>
                
                <div 
                  className={clsx(
                    "relative group cursor-pointer transition-all duration-500 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-12 h-[400px] backdrop-blur-sm",
                    dragging ? "border-blue-500 bg-gradient-to-br from-blue-50/80 to-purple-50/50 shadow-xl" : "border-slate-200 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-purple-50/20",
                    file && "border-emerald-500 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 ring-2 ring-emerald-500/20 shadow-xl"
                  )}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <input 
                    type="file" 
                    id="fileInput" 
                    className="hidden" 
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files?.[0])}
                  />
                  
                  {file ? (
                     <div className="relative z-10 animate-in fade-in zoom-in duration-500">
                       <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                         <CheckCircle size={48} />
                       </div>
                       <h3 className="text-xl font-bold text-slate-800 mb-2 px-4 truncate max-w-[300px]">{file.name}</h3>
                       <p className="text-slate-500 text-lg mb-6 font-semibold">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                       <button 
                         className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl text-sm text-slate-600 font-semibold hover:text-red-500 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300 shadow-lg" 
                         onClick={(e) => { e.stopPropagation(); setFile(null); }}
                       >
                         Remove File
                       </button>
                     </div>
                  ) : (
                    <div className="relative z-10 space-y-6 max-w-sm mx-auto">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500">
                          <Upload size={40} className="text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                          <Sparkles size={14} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Drop your resume here</h3>
                        <p className="text-slate-500 text-base">or click to browse from your device</p>
                      </div>
                      <div className="flex items-center justify-center gap-4">
                         <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-sm font-bold rounded-full border border-blue-100">PDF Only</span>
                         <span className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-sm font-bold rounded-full border border-emerald-100">Max 16MB</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
    
              {/* Right: JD Input */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30"></div>
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-black shadow-xl">2</div>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-xl">Job Description</h3>
                    <p className="text-slate-600 text-sm font-semibold">Paste the complete job requirements</p>
                  </div>
                </div>
                
                <div className="h-[400px] flex flex-col relative">
                  <textarea
                    className="w-full h-full p-8 rounded-3xl bg-gradient-to-br from-white/90 to-slate-50/90 border-2 border-slate-200/60 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 hover:border-slate-300 outline-none transition-all duration-300 resize-none text-slate-700 placeholder:text-slate-400 leading-relaxed text-base backdrop-blur-sm shadow-inner"
                    placeholder="✨ Paste the job description here for advanced AI matching...

Example:
• 3+ years of experience with React & Node.js
• Strong understanding of MongoDB and System Design  
• Experience with AWS/Cloud infrastructure
• Excellent problem-solving and communication skills
• Bachelor's degree in Computer Science or related field

The more detailed the job description, the better our AI can analyze the match!"
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                  />
                  
                  {/* Character Counter */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs text-slate-500 font-medium border border-slate-200">
                    {jd.length} characters
                  </div>
                </div>
              </div>
            </div>
    
            {/* Enhanced Action Bar */}
            <div className="border-t border-gradient-to-r from-slate-100 via-purple-100 to-pink-100 p-8 bg-gradient-to-r from-slate-50/50 via-purple-50/30 to-pink-50/50 rounded-b-3xl backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Pro Tip</p>
                    <p className="text-slate-600 text-sm">Detailed job descriptions yield 40% better matching results</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={submitAnalysis}
                    disabled={loading || !file}
                    className={clsx(
                      "relative overflow-hidden px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 flex items-center gap-3 text-lg group animate-gradient",
                      (loading || !file) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-center gap-3">
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />
                          <span>Analyzing with AI...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={24} className="animate-pulse" />
                          <span>Analyze with AI</span>
                          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resume Templates Section */}
        <div className="space-y-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 border border-violet-200 rounded-full shadow-sm">
              <PenTool size={18} className="text-violet-600" />
              <span className="text-sm font-bold text-gradient bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent tracking-wide uppercase">Premium Templates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Professional Resume Templates
            </h2>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Choose from our expertly crafted, <span className="font-semibold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ATS-optimized</span> resume templates designed by industry professionals for maximum impact
            </p>
            
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-slate-700">9+ Templates</span>
              </div>
              <div className="w-px h-6 bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-slate-700">95% ATS Pass Rate</span>
              </div>
              <div className="w-px h-6 bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-slate-700">50K+ Downloads</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Software Engineer Template */}
            <div className="glass-card p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Software Engineer</h3>
                    <p className="text-sm text-slate-500">Tech & Development</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 mb-4 text-xs font-mono leading-relaxed group-hover:bg-white transition-colors duration-300">
                  <div className="text-slate-800 font-bold mb-2">JOHN DOE</div>
                  <div className="text-slate-600 mb-3">Software Engineer | john@email.com | +1234567890</div>
                  
                  <div className="text-slate-800 font-semibold mb-1">EXPERIENCE</div>
                  <div className="text-slate-600 mb-2">
                    • Developed 15+ web applications using React.js and Node.js<br/>
                    • Optimized database queries, reducing load time by 40%<br/>
                    • Led team of 3 developers in agile environment
                  </div>
                  
                  <div className="text-slate-800 font-semibold mb-1">SKILLS</div>
                  <div className="text-slate-600 mb-2">JavaScript, React, Node.js, MongoDB, AWS, Docker</div>
                  
                  <div className="text-slate-800 font-semibold mb-1">PROJECTS</div>
                  <div className="text-slate-600">E-commerce Platform | Chat Application | Task Manager</div>
                </div>
                
                <button 
                  onClick={() => downloadTemplate('software-engineer')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 font-medium rounded-lg transition-all duration-300 group-hover:shadow-md"
                >
                  Download Template
                </button>
              </div>
            </div>

            {/* Data Scientist Template */}
            <div className="glass-card p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Data Scientist</h3>
                    <p className="text-sm text-slate-500">Analytics & ML</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 mb-4 text-xs font-mono leading-relaxed group-hover:bg-white transition-colors duration-300">
                  <div className="text-slate-800 font-bold mb-2">JANE SMITH</div>
                  <div className="text-slate-600 mb-3">Data Scientist | jane@email.com | +1234567890</div>
                  
                  <div className="text-slate-800 font-semibold mb-1">EXPERIENCE</div>
                  <div className="text-slate-600 mb-2">
                    • Built ML models achieving 95% accuracy on customer data<br/>
                    • Analyzed 1M+ records using Python and SQL<br/>
                    • Increased revenue by $2M through predictive analytics
                  </div>
                  
                  <div className="text-slate-800 font-semibold mb-1">SKILLS</div>
                  <div className="text-slate-600 mb-2">Python, TensorFlow, Pandas, SQL, Tableau, AWS</div>
                  
                  <div className="text-slate-800 font-semibold mb-1">PROJECTS</div>
                  <div className="text-slate-600">Customer Segmentation | Fraud Detection | Sales Forecasting</div>
                </div>
                
                <button 
                  onClick={() => downloadTemplate('data-scientist')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 text-emerald-700 font-medium rounded-lg transition-all duration-300 group-hover:shadow-md"
                >
                  Download Template
                </button>
              </div>
            </div>

            {/* UI/UX Designer Template */}
            <div className="glass-card p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-violet-200 text-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PenTool size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">UI/UX Designer</h3>
                    <p className="text-sm text-slate-500">Design & Creative</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 mb-4 text-xs font-mono leading-relaxed group-hover:bg-white transition-colors duration-300">
                  <div className="text-slate-800 font-bold mb-2">ALEX CHEN</div>
                  <div className="text-slate-600 mb-3">UI/UX Designer | alex@email.com | +1234567890</div>
                  
                  <div className="text-slate-800 font-semibold mb-1">EXPERIENCE</div>
                  <div className="text-slate-600 mb-2">
                    • Designed 20+ mobile apps with 4.8+ App Store rating<br/>
                    • Improved user engagement by 60% through UX research<br/>
                    • Created design systems used by 50+ developers
                  </div>
                  
                  <div className="text-slate-800 font-semibold mb-1">SKILLS</div>
                  <div className="text-slate-600 mb-2">Figma, Adobe XD, Sketch, Prototyping, User Research</div>
                  
                  <div className="text-slate-800 font-semibold mb-1">PROJECTS</div>
                  <div className="text-slate-600">Banking App | E-learning Platform | Healthcare Dashboard</div>
                </div>
                
                <button 
                  onClick={() => downloadTemplate('ui-ux-designer')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-violet-50 to-violet-100 hover:from-violet-100 hover:to-violet-200 text-violet-700 font-medium rounded-lg transition-all duration-300 group-hover:shadow-md"
                >
                  Download Template
                </button>
              </div>
            </div>

          </div>

          {/* View More Templates Button */}
          <div className="text-center">
            <button className="px-8 py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all hover:shadow-md">
              View All Templates (Coming Soon)
            </button>
          </div>

          {/* Template Features */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Why Use Our Templates?</h3>
              <p className="text-slate-600">Professional templates designed to pass ATS systems and impress recruiters</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-emerald-600" size={32} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">ATS-Friendly</h4>
                <p className="text-sm text-slate-600">Optimized to pass Applicant Tracking Systems</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-blue-600" size={32} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Professional Design</h4>
                <p className="text-sm text-slate-600">Clean, modern layouts that stand out</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-violet-600" size={32} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Industry-Specific</h4>
                <p className="text-sm text-slate-600">Tailored for different career fields and roles</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-orange-600" size={32} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Proven Results</h4>
                <p className="text-sm text-slate-600">Based on successful resumes from top companies</p>
              </div>
            </div>

            {/* Template Stats */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-black text-blue-600 mb-1">9+</div>
                  <div className="text-sm text-slate-600 font-medium">Professional Templates</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-emerald-600 mb-1">95%</div>
                  <div className="text-sm text-slate-600 font-medium">ATS Pass Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-violet-600 mb-1">50K+</div>
                  <div className="text-sm text-slate-600 font-medium">Downloads</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-orange-600 mb-1">4.9★</div>
                  <div className="text-sm text-slate-600 font-medium">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Footer */}
        <div className="border-t-2 border-slate-200 pt-16 pb-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
                  <Sparkles size={18} className="text-white" />
                </div>
                <span className="font-black text-xl text-slate-900">ResumeAI</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                AI-powered resume analysis platform trusted by professionals worldwide. Land your dream job with confidence.
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-slate-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">Features</a></li>
                <li><a href="#templates" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">Templates</a></li>
                <li><a href="/resume-builder" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">Resume Builder</a></li>
                <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black text-slate-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">About Us</a></li>
                <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">Blog</a></li>
                <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">Careers</a></li>
                <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">Terms of Service</a></li>
                <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">Cookie Policy</a></li>
                <li><a href="https://github.com/irfan/AI-Resume-Analyzer" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 font-semibold">
              © 2026 ResumeAI. All rights reserved. Built with ❤️ for job seekers worldwide.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://github.com/irfan/AI-Resume-Analyzer" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default Home;
