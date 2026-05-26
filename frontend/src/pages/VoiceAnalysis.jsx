import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, FileAudio, UploadCloud, ArrowLeft, Play, Pause, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VoiceAnalysis() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!file) return;
    setAnalyzing(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Import axios at the top if not already imported
      const axios = (await import('axios')).default;
      const response = await axios.post('https://neuroscan-ai-svg1.onrender.com/api/predict/voice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResult(response.data.data);
    } catch (error) {
      console.error("Error analyzing voice:", error);
      alert("Failed to analyze voice data. Make sure backend is running.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-textMain p-8 relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] top-[-10%] right-[-10%] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex items-center gap-4 mb-8">
          <Link to="/dashboard" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <FileAudio className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold">Voice Tremor Analysis</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="glass-panel p-8">
            <h2 className="text-xl font-semibold mb-6">Upload Audio Sample</h2>
            
            <label className="border-2 border-dashed border-white/20 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all mb-6">
              <UploadCloud className="w-12 h-12 text-primary mb-4" />
              <p className="text-center font-medium mb-1">Click or drag file to upload</p>
              <p className="text-sm text-textMuted text-center">Supports .wav format (Max 10MB)</p>
              <input type="file" accept=".wav" className="hidden" onChange={handleFileUpload} />
            </label>

            {file && (
              <div className="bg-surface/50 border border-white/10 rounded-lg p-4 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-textMuted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={startAnalysis}
              disabled={!file || analyzing || result}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <Activity className="w-5 h-5 animate-pulse" /> Analyzing Data...
                </>
              ) : (
                'Run AI Analysis'
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="glass-panel p-8 relative overflow-hidden">
            <h2 className="text-xl font-semibold mb-6">Prediction Results</h2>
            
            {!result && !analyzing && (
              <div className="h-full flex flex-col items-center justify-center text-textMuted opacity-50 pb-20">
                <Brain className="w-16 h-16 mb-4" />
                <p>Upload data and run analysis to see results.</p>
              </div>
            )}

            {analyzing && (
              <div className="h-full flex flex-col items-center justify-center pb-20">
                <div className="w-24 h-24 relative mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <Brain className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                </div>
                <p className="font-medium text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-pulse">Extracting MFCC features...</p>
              </div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col items-center justify-center p-6 bg-danger/10 border border-danger/20 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-danger/20 rounded-full blur-[40px]" />
                  <p className="text-sm font-semibold text-danger mb-2 uppercase tracking-wider">{result.status}</p>
                  <div className="text-6xl font-bold mb-2">
                    {result.probability}<span className="text-3xl text-textMuted">%</span>
                  </div>
                  <p className="text-sm text-textMuted text-center">Probability of Parkinson's Disease</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface/50 border border-white/5 p-4 rounded-lg">
                    <p className="text-xs text-textMuted mb-1">AI Confidence</p>
                    <p className="text-lg font-bold text-success">{result.confidence}%</p>
                  </div>
                  <div className="bg-surface/50 border border-white/5 p-4 rounded-lg">
                    <p className="text-xs text-textMuted mb-1">Jitter (Freq)</p>
                    <p className="text-sm font-bold">{result.features.jitter}</p>
                  </div>
                  <div className="bg-surface/50 border border-white/5 p-4 rounded-lg">
                    <p className="text-xs text-textMuted mb-1">Shimmer (Amp)</p>
                    <p className="text-sm font-bold">{result.features.shimmer}</p>
                  </div>
                  <div className="bg-surface/50 border border-white/5 p-4 rounded-lg">
                    <p className="text-xs text-textMuted mb-1">MFCC Pattern</p>
                    <p className="text-sm font-bold">{result.features.mfcc}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
