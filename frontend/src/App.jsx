import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import VoiceAnalysis from './pages/VoiceAnalysis';
import HandwritingAnalysis from './pages/HandwritingAnalysis';
import GaitAnalysis from './pages/GaitAnalysis';
import MultiModalAnalysis from './pages/MultiModalAnalysis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predict/voice" element={<VoiceAnalysis />} />
        <Route path="/predict/handwriting" element={<HandwritingAnalysis />} />
        <Route path="/predict/gait" element={<GaitAnalysis />} />
        <Route path="/predict/multimodal" element={<MultiModalAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
