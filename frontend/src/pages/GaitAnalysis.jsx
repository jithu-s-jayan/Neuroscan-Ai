import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Video, UploadCloud, ArrowLeft, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GaitAnalysis() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const loadSample = () => {
    const sampleBlob = new Blob(["dummy_video_data"], { type: "video/mp4" });
    const sampleFile = new File([sampleBlob], "sample_walking_gait.mp4", { type: "video/mp4" });
    setFile(sampleFile);
    setResult(null);
  };

  const startAnalysis = async () => {
    if (!file) return;
    setAnalyzing(true);
    setResult(null);
    
    // Simulate Video processing which takes longer
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        probability: 82,
        status: 'High Risk Detected',
        confidence: 91,
        features: {
          stepLength: 'Reduced',
          armSwing: 'Asymmetrical',
          balance: 'Poor'
        }
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-background text-textMain p-8 relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] top-[-10%] right-[20%] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex items-center gap-4 mb-8">
          <Link to="/dashboard" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <Video className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold">Gait & Pose Analysis</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Upload Walking Video</h2>
              <button 
                onClick={loadSample}
                disabled={analyzing}
                className="text-xs font-semibold text-accent hover:text-accent-hover bg-accent/10 hover:bg-accent/20 px-3 py-1.5 rounded-lg border border-accent/20 transition-all"
              >
                Use Sample Video
              </button>
            </div>
            
            <label className="border-2 border-dashed border-white/20 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-accent/50 hover:bg-white/5 transition-all mb-6">
              <UploadCloud className="w-12 h-12 text-accent mb-4" />
              <p className="text-center font-medium mb-1">Upload video of patient walking</p>
              <p className="text-sm text-textMuted text-center">Supports .mp4, .mov (Max 50MB)</p>
              <input type="file" accept="video/mp4,video/quicktime" className="hidden" onChange={handleFileUpload} />
            </label>

            {file && (
              <div className="bg-surface/50 border border-white/10 rounded-lg p-4 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-textMuted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={startAnalysis}
              disabled={!file || analyzing || result}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-accent to-primary font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <><Activity className="w-5 h-5 animate-pulse" /> Running MediaPipe Pose...</>
              ) : (
                'Extract Pose Data'
              )}
            </button>
          </div>

          <div className="glass-panel p-8 relative overflow-hidden flex flex-col">
            <h2 className="text-xl font-semibold mb-6">Kinematic Results</h2>
            
            {!result && !analyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-textMuted opacity-50 pb-10">
                <Video className="w-16 h-16 mb-4" />
                <p>Upload a video to see pose estimation results.</p>
              </div>
            )}

            {analyzing && (
              <div className="flex-1 flex flex-col items-center justify-center pb-10">
                <div className="w-24 h-24 relative mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                  <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" />
                  <Brain className="absolute inset-0 m-auto w-8 h-8 text-accent animate-pulse" />
                </div>
                <p className="font-medium text-lg text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary animate-pulse">Analyzing kinematics...</p>
              </div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 flex-1 flex flex-col"
              >
                <div className="flex flex-col items-center justify-center p-6 bg-surface/50 border border-white/10 rounded-xl relative overflow-hidden mb-auto">
                  <p className={`text-sm font-semibold mb-2 uppercase tracking-wider ${result.probability > 75 ? 'text-danger' : 'text-warning'}`}>
                    {result.status}
                  </p>
                  <div className="text-6xl font-bold mb-2">
                    {result.probability}<span className="text-3xl text-textMuted">%</span>
                  </div>
                  <p className="text-sm text-textMuted text-center">Probability of Parkinsonian Gait</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-surface/50 border border-white/5 p-4 rounded-lg">
                    <p className="text-xs text-textMuted mb-1">Step Length</p>
                    <p className="text-sm font-bold text-danger">{result.features.stepLength}</p>
                  </div>
                  <div className="bg-surface/50 border border-white/5 p-4 rounded-lg">
                    <p className="text-xs text-textMuted mb-1">Arm Swing</p>
                    <p className="text-sm font-bold text-warning">{result.features.armSwing}</p>
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
