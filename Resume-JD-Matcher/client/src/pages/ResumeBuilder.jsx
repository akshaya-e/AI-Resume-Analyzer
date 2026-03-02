import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Plus, Trash2, User, Briefcase, Code } from 'lucide-react';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    experience: [],
    skills: []
  });

  const [activeSection, setActiveSection] = useState('personal');

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { id: Date.now(), title: '', company: '', description: '' }]
    });
  };

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(e => e.id !== id)
    });
  };

  const updateExperience = (id, field, value) => {
    const updated = resumeData.experience.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setResumeData({ ...resumeData, experience: updated });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { id: Date.now(), name: '' }]
    });
  };

  const removeSkill = (id) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(s => s.id !== id)
    });
  };

  const updateSkill = (id, value) => {
    const updated = resumeData.skills.map(item =>
      item.id === id ? { ...item, name: value } : item
    );
    setResumeData({ ...resumeData, skills: updated });
  };

  const downloadResume = () => {
    let text = resumeData.fullName + '\n' + resumeData.email + ' | ' + resumeData.phone + '\n\n';
    
    if (resumeData.summary) {
      text += 'PROFESSIONAL SUMMARY\n' + resumeData.summary + '\n\n';
    }
    
    if (resumeData.experience.length > 0) {
      text += 'WORK EXPERIENCE\n';
      resumeData.experience.forEach(exp => {
        text += '\n' + exp.title + ' at ' + exp.company + '\n';
        if (exp.description) text += exp.description + '\n';
      });
      text += '\n';
    }
    
    if (resumeData.skills.length > 0) {
      const skillNames = resumeData.skills.map(s => s.name).filter(n => n).join(', ');
      text += 'SKILLS\n' + skillNames;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (resumeData.fullName || 'resume') + '.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-semibold">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={downloadResume}
            disabled={!resumeData.fullName}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            <Download size={18} />
            Download Resume
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-4">
            <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resume Builder
            </span>
          </h1>
          <p className="text-slate-600 text-lg">Create your professional resume in minutes</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">Sections</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveSection('personal')}
                  className={'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ' + (activeSection === 'personal' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100')}
                >
                  <User size={18} />
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveSection('experience')}
                  className={'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ' + (activeSection === 'experience' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100')}
                >
                  <Briefcase size={18} />
                  Experience
                </button>
                <button
                  onClick={() => setActiveSection('skills')}
                  className={'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ' + (activeSection === 'skills' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100')}
                >
                  <Code size={18} />
                  Skills
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
              
              {activeSection === 'personal' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Personal Information</h2>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={resumeData.fullName}
                      onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={resumeData.email}
                        onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={resumeData.phone}
                        onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Professional Summary</label>
                    <textarea
                      value={resumeData.summary}
                      onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                      rows="5"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                      placeholder="Write a brief summary about your professional background, skills, and career goals..."
                    />
                  </div>
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-slate-900">Work Experience</h2>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all shadow-lg font-semibold"
                    >
                      <Plus size={18} />
                      Add Experience
                    </button>
                  </div>
                  
                  {resumeData.experience.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No work experience added yet. Click "Add Experience" to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, index) => (
                        <div key={exp.id} className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border-2 border-slate-200">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-slate-900 text-lg">Experience #{index + 1}</h3>
                            <button
                              onClick={() => removeExperience(exp.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
                                <input
                                  type="text"
                                  value={exp.title}
                                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                                  placeholder="Software Engineer"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Company</label>
                                <input
                                  type="text"
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                                  placeholder="Tech Corp"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                              <textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                rows="3"
                                className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none bg-white"
                                placeholder="Describe your responsibilities and achievements..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}


              {activeSection === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-slate-900">Skills</h2>
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all shadow-lg font-semibold"
                    >
                      <Plus size={18} />
                      Add Skill
                    </button>
                  </div>
                  
                  {resumeData.skills.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <Code size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No skills added yet. Click "Add Skill" to get started.</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-3 p-4 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border-2 border-slate-200">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, e.target.value)}
                            className="flex-1 px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                            placeholder="e.g., JavaScript, React, Python"
                          />
                          <button
                            onClick={() => removeSkill(skill.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
