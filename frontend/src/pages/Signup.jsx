import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, User, ArrowRight, Eye, EyeOff, ArrowLeft, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-textMain flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] bottom-[-20%] right-[-10%]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-10 w-full max-w-md relative z-10 my-8"
      >
        <Link to="/" className="absolute top-6 left-6 text-textMuted hover:text-white transition-colors" title="Back to Home">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex flex-col items-center mb-8">
          <Brain className="text-primary w-12 h-12 mb-4 mt-2" />
          <h2 className="text-3xl font-bold text-center">Create Account</h2>
          <p className="text-textMuted text-center mt-2">Join NeuroScan AI platform</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted w-5 h-5" />
              <input 
                type="text" 
                className="w-full bg-surface/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors text-white"
                placeholder="Dr. John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted w-5 h-5" />
              <input 
                type="email" 
                className="w-full bg-surface/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors text-white"
                placeholder="doctor@hospital.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted w-5 h-5" />
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full bg-surface/50 border border-white/10 rounded-lg py-3 pl-10 pr-12 focus:outline-none focus:border-primary transition-colors text-white"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textMuted hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <><Loader className="w-5 h-5 animate-spin" /> Creating Account...</> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-textMuted">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
        </div>
      </motion.div>
    </div>
  );
}
