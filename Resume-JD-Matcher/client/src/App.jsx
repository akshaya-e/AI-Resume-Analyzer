import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Results from './pages/Results';
import Admin from './pages/Admin';
import ResumeBuilder from './pages/ResumeBuilder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
