import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, LayoutDashboard, PenTool } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass-card sticky top-4 z-50 mx-4 mt-4 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
        <FileText size={28} />
        <span>ResumeAI Matcher</span>
      </Link>
      
      <div className="flex gap-6">
        <Link to="/" className="hover:text-primary transition font-medium">Analyze</Link>
        <Link to="/resume-builder" className="flex items-center gap-1 hover:text-primary transition font-medium">
          <PenTool size={18} />
          Resume Builder
        </Link>
        <Link to="/admin" className="flex items-center gap-1 hover:text-primary transition font-medium">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
