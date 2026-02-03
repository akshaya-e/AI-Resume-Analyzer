import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle, BookOpen, CheckCircle, XCircle, TrendingUp, Award, AlertCircle, Sparkles, ArrowLeft, Copy, Check, BarChart3, FileText, Zap, Shield } from 'lucide-react';
import clsx from 'clsx';

const Results = () => {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Fallback Mock Data for Direct Access / Testing
  const mockData = {
     overallMatchScore: 72,
     category: 'Full Stack Development (Detected)',
     extractedSkills: ['React', 'Node.js', 'JavaScript', 'Tailwind', 'MongoDB', 'Git'],
     missingSkills: ['TypeScript', 'AWS', 'Docker', 'System Design'],
     recommendations: { 
        courses: [
          { name: 'Advanced TypeScript Patterns', link: '#' },
          { name: 'AWS Certified Developer', link: '#' },
          { name: 'System Design for Interviews', link: '#' }
        ], 
        skills: ['TypeScript', 'Docker', 'Redis', 'GraphQL'] 
     },
     overclaims: ['System Architecture'],
     jobFit: { 
        level: 'Moderate', 
        explanation: 'Your profile matches 70% of the core requirements. You have strong frontend skills but lack cloud infrastructure experience mentioned in the JD.' 
     },
     resumeQualityScore: 65,
     userLevel: 'Mid-Level',
     enhancement: {
        overallScore: 65,
        summary: "Good Technical base, but bullet points lack quantifiable impact metrics.",
        breakdown: { strong: 2, moderate: 4, weak: 3 },
        bulletAnalysis: [
           { 
             original: "Worked on frontend using React and Redux.", 
             improvedVersion: "Architected scalable frontend architecture using React.js and Redux, improving page load performance by 40%.", 
             status: 'weak', 
             score: 40,
             suggestions: [{ issue: 'Passive Language', suggestion: 'Use strong action verbs like "Architected" or "Engineered".' }, { issue: 'No Metrics', suggestion: 'Add quantifiable impact (e.g., "improving perf by X%").' }]
           },
           { 
             original: "Developed API endpoints in Node.js.", 
             improvedVersion: "Developed and optimized 15+ RESTful API endpoints in Node.js, supporting 10k+ daily active users.", 
             status: 'moderate', 
             score: 60,
             suggestions: [{ issue: 'Vague Scope', suggestion: 'Specify the scale or volume of the APIs.' }]
           }
        ]
     }
  };

  const data = state?.data || mockData;

  const { 
    overallMatchScore = 0, 
    category = 'General', 
    extractedSkills = [], 
    missingSkills = [], 
    recommendations = { courses: [], skills: [] }, 
    overclaims = [], 
    jobFit = { level: 'Low', explanation: 'No analysis available' }, 
    resumeQualityScore = 0, 
    userLevel = 'Junior', 
    enhancement = null 
  } = data;

  const scoreData = [
    { name: 'Match', value: overallMatchScore },
    { name: 'Gap', value: 100 - overallMatchScore }
  ];
  
  const COLORS = ['#2563eb', '#cbd5e1']; // Blue-600 and Slate-300
  
  const getFitColor = (level) => {
    if (level === 'High') return 'bg-emerald-50 border-emerald-200 text-emerald-800';
    if (level === 'Moderate') return 'bg-amber-50 border-amber-200 text-amber-800';
    return 'bg-rose-50 border-rose-200 text-rose-800';
  };
  
  const getFitIcon = (level) => {
    if (level === 'High') return <CheckCircle className="text-emerald-600" size={24} />;
    if (level === 'Moderate') return <AlertCircle className="text-amber-600" size={24} />;
    return <XCircle className="text-rose-600" size={24} />;
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen pb-12">
      
      {/* Navbar Minimal */}
      <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-2 rounded-xl group-hover:from-slate-200 group-hover:to-slate-300 transition-all duration-300 shadow-sm">
              <ArrowLeft size={18} className="text-slate-600 group-hover:text-slate-900 transition-colors" />
            </div>
            <span className="font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-2 rounded-xl shadow-lg">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-gradient bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">ResumeAI</span>
            <div className="px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
              Results
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Card */}
        <div className="relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 rounded-3xl blur-3xl"></div>
          
          <div className="relative glass-card p-8 border border-white/60 shadow-xl">
            {/* Animated Background Elements */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <BarChart3 size={24} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-black text-gradient bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                      Analysis Report
                    </h1>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm justify-center md:justify-start">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="font-mono font-semibold">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    </div>
                    <span>•</span>
                    <span className="font-medium">Generated just now</span>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Experience Level</p>
                    <div className="px-6 py-3 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl shadow-lg backdrop-blur-sm">
                      <span className="font-black text-blue-800 text-lg">{userLevel || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Detected Field</p>
                    <div className="px-6 py-3 bg-gradient-to-br from-violet-50 to-violet-100 border-2 border-violet-200 rounded-2xl shadow-lg backdrop-blur-sm">
                      <span className="font-black text-violet-800 text-lg">{category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Navigation Tabs */}
              <div className="flex gap-2 bg-gradient-to-r from-slate-100/80 to-slate-200/60 p-2 rounded-2xl w-fit mx-auto backdrop-blur-sm border border-white/50 shadow-inner">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={clsx(
                    "px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-3 relative overflow-hidden",
                    activeTab === 'overview' 
                      ? "bg-gradient-to-r from-white to-blue-50 text-slate-900 shadow-lg ring-2 ring-blue-200/50 scale-105" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  )}
                >
                  <BarChart3 size={18} />
                  <span>Gap Analysis</span>
                  {activeTab === 'overview' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('enhancement')}
                  className={clsx(
                    "px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-3 relative overflow-hidden",
                    activeTab === 'enhancement' 
                      ? "bg-gradient-to-r from-white to-emerald-50 text-slate-900 shadow-lg ring-2 ring-emerald-200/50 scale-105" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  )}
                >
                  <FileText size={18} />
                  <span>Resume Enhancement</span>
                  {activeTab === 'enhancement' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-xl"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Score Card */}
              <div className="lg:col-span-1 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-pink-50/40 rounded-2xl"></div>
                
                <div className="relative glass-card p-8 h-full flex flex-col justify-between border border-white/60 shadow-xl">
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <BarChart3 size={16} className="text-white" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">Match Score</h3>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Compatibility Rating</p>
                    </div>
                    
                    <div className="relative h-56 w-full flex items-center justify-center my-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={scoreData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={15}
                            paddingAngle={8}
                          >
                            {scoreData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? 'url(#gradient)' : '#e2e8f0'} />
                            ))}
                          </Pie>
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="50%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                          </defs>
                        </PieChart>
                      </ResponsiveContainer>
                      
                      {/* Enhanced Center Content */}
                      <div className="absolute text-center">
                        <div className="text-5xl font-black text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                          {overallMatchScore}%
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Match Rate</div>
                        <div className="mt-2 flex justify-center">
                          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl border-2 ${getFitColor(jobFit?.level || 'Low')} flex items-start gap-4 backdrop-blur-sm shadow-lg`}>
                      <div className="mt-1 p-2 bg-white/80 rounded-xl shadow-sm">{getFitIcon(jobFit?.level || 'Low')}</div>
                      <div className="flex-1">
                        <div className="font-black text-base uppercase tracking-wide mb-2 flex items-center gap-2">
                          {jobFit?.level || 'Low'} Match
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed font-medium">{jobFit?.explanation || 'Resume analysis provided.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Analysis */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Missing Skills */}
                <div className="relative overflow-hidden">
                  {/* Background Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-50/80 to-red-50/40 rounded-2xl"></div>
                  
                  <div className="relative glass-card p-8 border-l-4 border-rose-500 shadow-xl">
                    <div className="flex items-center gap-4 mb-8 border-b border-rose-100/60 pb-6">
                      <div className="p-3 bg-gradient-to-br from-rose-500 to-red-500 text-white rounded-2xl shadow-lg">
                        <AlertTriangle size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-slate-900 mb-1">Missing Skills</h3>
                        <p className="text-sm text-slate-600 font-medium">Critical for this role</p>
                      </div>
                      <div className="px-4 py-2 bg-rose-100 border border-rose-200 rounded-full">
                        <span className="text-rose-800 font-bold text-sm">{missingSkills.length} Skills</span>
                      </div>
                    </div>
                    
                    {missingSkills.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {missingSkills.map((skill, index) => (
                          <div key={skill} className="group relative overflow-hidden">
                            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-white/90 to-rose-50/80 border-2 border-rose-100 rounded-xl hover:border-rose-200 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-sm animate-pulse"></div>
                              <span className="text-rose-900 font-bold text-sm flex-1">{skill}</span>
                              <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-xs">
                                {index + 1}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center bg-gradient-to-br from-emerald-50/80 to-teal-50/60 rounded-2xl border-2 border-emerald-200 border-dashed backdrop-blur-sm">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                          <CheckCircle className="text-white" size={32} />
                        </div>
                        <p className="text-emerald-800 font-black text-lg mb-2">Perfect Match!</p>
                        <p className="text-emerald-600 font-medium">No critical skills missing.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Overclaims */}
                <div className="relative overflow-hidden">
                  {/* Background Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-yellow-50/40 rounded-2xl"></div>
                  
                  <div className="relative glass-card p-8 border-l-4 border-amber-500 shadow-xl">
                    <div className="flex items-center gap-4 mb-8 border-b border-amber-100/60 pb-6">
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg">
                        <Shield size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-slate-900 mb-1">Verification Needed</h3>
                        <p className="text-sm text-slate-600 font-medium">Skills without detected evidence</p>
                      </div>
                      <div className="px-4 py-2 bg-amber-100 border border-amber-200 rounded-full">
                        <span className="text-amber-800 font-bold text-sm">{overclaims?.length || 0} Items</span>
                      </div>
                    </div>
                    
                    {overclaims && overclaims.length > 0 ? (
                      <div className="space-y-6">
                        <div className="flex flex-wrap gap-3">
                          {overclaims.map((skill, index) => (
                            <div key={skill} className="group relative">
                              <div className="px-4 py-3 bg-gradient-to-r from-white/90 to-amber-50/80 text-amber-800 border-2 border-amber-200 rounded-xl text-sm font-bold hover:border-amber-300 hover:shadow-lg transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                {skill}?
                                <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-xs">
                                  {index + 1}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-6 bg-gradient-to-r from-amber-50/80 to-orange-50/60 rounded-2xl border border-amber-200 backdrop-blur-sm">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/80 rounded-xl shadow-sm">
                              <AlertCircle size={18} className="text-amber-600" />
                            </div>
                            <div>
                              <p className="text-amber-800 font-bold text-sm mb-1">💡 Pro Tip</p>
                              <p className="text-amber-700 text-sm leading-relaxed">
                                Mention specific projects or work experience that demonstrate these skills to validate them and strengthen your profile.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center bg-gradient-to-br from-emerald-50/80 to-teal-50/60 rounded-2xl border-2 border-emerald-200 border-dashed backdrop-blur-sm">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                          <CheckCircle className="text-white" size={32} />
                        </div>
                        <p className="text-emerald-800 font-black text-lg mb-2">All Validated!</p>
                        <p className="text-emerald-600 font-medium">All skills appear validated by experience.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Recommended Courses */}
              <div className="relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-cyan-50/40 rounded-2xl"></div>
                
                <div className="relative glass-card p-8 h-full shadow-xl">
                  <div className="flex items-center gap-4 mb-8 border-b border-blue-100/60 pb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl shadow-lg">
                      <TrendingUp size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900 mb-1">Recommended Courses</h3>
                      <p className="text-sm text-slate-600 font-medium">Boost your skills</p>
                    </div>
                    <div className="px-4 py-2 bg-blue-100 border border-blue-200 rounded-full">
                      <span className="text-blue-800 font-bold text-sm">{recommendations.courses.length} Courses</span>
                    </div>
                  </div>
                  
                  {recommendations.courses.length > 0 ? (
                    <div className="space-y-4">
                      {recommendations.courses.slice(0, 4).map((course, i) => (
                        <div key={i} className="group relative overflow-hidden">
                          <a href={course.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/90 to-blue-50/80 rounded-xl hover:shadow-lg transition-all duration-300 border-2 border-blue-100 hover:border-blue-200 backdrop-blur-sm">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <BookOpen size={18} />
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-snug">
                                {course.name}
                              </span>
                            </div>
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                              {i + 1}
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                        <BookOpen className="text-slate-400" size={32} />
                      </div>
                      <p className="text-slate-400 font-medium">No specific courses available.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Detected */}
              <div className="relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 to-teal-50/40 rounded-2xl"></div>
                
                <div className="relative glass-card p-8 h-full shadow-xl">
                  <div className="flex items-center gap-4 mb-8 border-b border-emerald-100/60 pb-6">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl shadow-lg">
                      <CheckCircle size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900 mb-1">Skills Detected</h3>
                      <p className="text-sm text-slate-600 font-medium">Found in your resume</p>
                    </div>
                    <div className="px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full">
                      <span className="text-emerald-800 font-bold text-sm">{extractedSkills.length} Skills</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {extractedSkills.map((skill, index) => (
                      <div key={skill} className="group relative">
                        <div className="px-4 py-3 bg-gradient-to-r from-white/90 to-emerald-50/80 text-emerald-800 border-2 border-emerald-200 rounded-xl text-sm font-bold hover:border-emerald-300 hover:shadow-lg transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          {skill}
                          <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xs">
                            ✓
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Videos Section */}
            {data.videos && (
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                
                {/* Resume Tips Video */}
                <div className="relative overflow-hidden group">
                  {/* Background Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 to-purple-50/40 rounded-2xl"></div>
                  
                  <div className="relative glass-card p-8 border-l-4 border-violet-500 shadow-xl">
                    <div className="flex items-center gap-4 mb-6 border-b border-violet-100/60 pb-6">
                      <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 text-white rounded-2xl shadow-lg">
                        <Sparkles size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Resume Tips</h3>
                        <p className="text-sm text-slate-600 font-medium">Expert guidance</p>
                      </div>
                    </div>
                    
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-100 to-slate-200 relative group-hover:shadow-2xl transition-all duration-500">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={data.videos.resume.replace('youtu.be/', 'www.youtube.com/embed/')}
                        title="Resume Tips"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
                
                {/* Interview Prep Video */}
                <div className="relative overflow-hidden group">
                  {/* Background Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-cyan-50/40 rounded-2xl"></div>
                  
                  <div className="relative glass-card p-8 border-l-4 border-blue-500 shadow-xl">
                    <div className="flex items-center gap-4 mb-6 border-b border-blue-100/60 pb-6">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl shadow-lg">
                        <Zap size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Interview Prep</h3>
                        <p className="text-sm text-slate-600 font-medium">Ace your interviews</p>
                      </div>
                    </div>
                    
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-100 to-slate-200 relative group-hover:shadow-2xl transition-all duration-500">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={data.videos.interview.replace('youtu.be/', 'www.youtube.com/embed/')}
                        title="Interview Tips"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Enhancement Tab */}
        {activeTab === 'enhancement' && enhancement && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Enhanced Score Banner */}
            <div className="relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-pink-50/40 rounded-3xl blur-2xl"></div>
              
              <div className="relative glass-card p-10 border-l-4 border-blue-600 shadow-2xl">
                {/* Floating Elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl shadow-xl">
                        <Award className="text-white" size={40} />
                      </div>
                      <div>
                        <h2 className="text-4xl font-black text-gradient bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                          Resume Quality Score
                        </h2>
                        <p className="text-slate-600 text-lg font-medium max-w-2xl leading-relaxed">{enhancement.summary}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center px-12 border-l-2 border-slate-200">
                    <div className="relative">
                      <div className="text-7xl font-black text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight mb-2">
                        {enhancement.overallScore}
                      </div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">/ 100 Points</div>
                      <div className="mt-4 w-20 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Improvement Cards */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText size={24} className="text-white" />
                </div>
                <h3 className="text-3xl font-black text-slate-900">Bullet Point Improvements</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
              </div>
              
              {enhancement.bulletAnalysis && enhancement.bulletAnalysis.map((bullet, index) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden group"
                >
                  {/* Background Decoration */}
                  <div className={clsx(
                    "absolute inset-0 rounded-3xl blur-2xl",
                    bullet.status === 'strong' ? 'bg-gradient-to-br from-emerald-50/80 to-teal-50/40' : 
                    bullet.status === 'moderate' ? 'bg-gradient-to-br from-amber-50/80 to-yellow-50/40' : 
                    'bg-gradient-to-br from-rose-50/80 to-red-50/40'
                  )}></div>
                  
                  <div className={clsx(
                    "relative glass-card p-8 transition-all duration-500 hover:shadow-2xl border-l-4 shadow-xl",
                    bullet.status === 'strong' ? 'border-l-emerald-500' : 
                    bullet.status === 'moderate' ? 'border-l-amber-500' : 'border-l-rose-500'
                  )}>
                    {/* Enhanced Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className={clsx(
                          "p-3 rounded-2xl shadow-lg",
                          bullet.status === 'strong' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' :
                          bullet.status === 'moderate' ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
                          'bg-gradient-to-br from-rose-500 to-red-500'
                        )}>
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <span className={clsx(
                            "px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider flex items-center gap-2",
                            bullet.status === 'strong' ? 'bg-emerald-100 text-emerald-800' :
                            bullet.status === 'moderate' ? 'bg-amber-100 text-amber-800' :
                            'bg-rose-100 text-rose-800'
                          )}>
                            {bullet.status} Quality
                          </span>
                          <div className="text-slate-500 text-sm font-medium mt-1">Score: {bullet.score}/100</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-black text-slate-900">#{index + 1}</div>
                        <div className="text-xs text-slate-400 font-medium">Bullet Point</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      {/* Enhanced Original */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                            <XCircle size={16} className="text-slate-600" />
                          </div>
                          <h4 className="text-sm font-black text-slate-600 uppercase tracking-wider">Original Version</h4>
                        </div>
                        
                        <div className="p-6 bg-gradient-to-br from-slate-50/80 to-slate-100/60 rounded-2xl border-2 border-slate-200 backdrop-blur-sm">
                          <p className="text-slate-700 text-sm leading-relaxed font-medium">
                            {bullet.original}
                          </p>
                        </div>
                        
                        {/* Enhanced Issues */}
                        {bullet.suggestions && bullet.suggestions.length > 0 && (
                          <div className="space-y-3">
                            <h5 className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-2">
                              <AlertCircle size={14} />
                              Issues Found
                            </h5>
                            {bullet.suggestions.map((sug, i) => (
                              <div key={i} className="flex items-start gap-3 p-4 bg-gradient-to-r from-rose-50/80 to-red-50/60 rounded-xl border border-rose-200 backdrop-blur-sm">
                                <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-xs mt-0.5">
                                  {i + 1}
                                </div>
                                <div>
                                  <div className="font-bold text-rose-800 text-sm mb-1">{sug.issue}</div>
                                  <div className="text-rose-600 text-xs">{sug.suggestion}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Enhanced Improved */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                              <CheckCircle size={16} className="text-emerald-600" />
                            </div>
                            <h4 className="text-sm font-black text-emerald-600 uppercase tracking-wider">Improved Version</h4>
                          </div>
                          <button
                            onClick={() => copyToClipboard(bullet.improvedVersion, index)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 text-emerald-700 font-bold text-xs rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                          >
                            {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                            {copiedIndex === index ? 'Copied!' : 'Copy Text'}
                          </button>
                        </div>
                        
                        {bullet.improvedVersion ? (
                          <div className="space-y-4">
                            <div className="p-6 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 rounded-2xl border-2 border-emerald-200 backdrop-blur-sm relative group">
                              <p className="text-slate-800 text-sm font-semibold leading-relaxed mb-4">
                                {bullet.improvedVersion}
                              </p>
                              
                              {/* Improvement Tags */}
                              <div className="flex flex-wrap gap-2">
                                {bullet.suggestions && bullet.suggestions.map((sug, i) => (
                                  <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700 shadow-sm backdrop-blur-sm">
                                    <Sparkles size={12} className="text-emerald-500" />
                                    Fixed: {sug.issue}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50/80 to-slate-100/60 rounded-2xl border-2 border-slate-200 border-dashed backdrop-blur-sm">
                            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                              <CheckCircle className="text-emerald-600" size={32} />
                            </div>
                            <p className="text-slate-600 font-bold text-center mb-2">Already Great!</p>
                            <p className="text-slate-400 text-sm text-center">No major improvements needed.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
