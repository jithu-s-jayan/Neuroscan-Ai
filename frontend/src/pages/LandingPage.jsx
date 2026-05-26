import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-panel p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
  >
    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-textMuted text-sm">{description}</p>
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-textMain overflow-x-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px]"
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          <Brain className="text-primary w-8 h-8" />
          NeuroScan AI
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-2 rounded-full bg-primary hover:bg-primary/80 transition-colors font-semibold">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          <span className="text-sm font-medium">Next-Gen Predictive AI is Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
        >
          Predict Parkinson’s <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
            Early with AI
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-textMuted max-w-3xl mb-12"
        >
          An advanced multi-modal platform utilizing voice, gait, and handwriting analysis powered by cutting-edge Deep Learning.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-6"
        >
          <Link to="/dashboard" className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary font-bold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center gap-2">
            Enter Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Multi-Modal Prediction Engine</h2>
          <p className="text-textMuted max-w-2xl mx-auto">Upload clinical data and let our hybrid CNN-LSTM models analyze it with unprecedented accuracy.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard 
            icon={<Activity className="w-8 h-8" />}
            title="Voice Analysis"
            description="Extracts jitter, shimmer, and MFCC features to detect early vocal tremors."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Brain className="w-8 h-8" />}
            title="Handwriting Analysis"
            description="Analyzes spiral drawings using Convolutional Neural Networks to identify motor impairments."
            delay={0.4}
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8" />}
            title="Gait & Pose"
            description="Real-time video analysis of walking stability using advanced pose estimation."
            delay={0.6}
          />
        </div>
      </section>
    </div>
  );
}
