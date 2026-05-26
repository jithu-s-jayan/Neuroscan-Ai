import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Edit3, UploadCloud, ArrowLeft, Image as ImageIcon, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HandwritingAnalysis() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const loadSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Draw white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 400);
    
    // Draw a neat hand-drawn-looking spiral with tremor noise
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    const centerX = 200;
    const centerY = 200;
    ctx.moveTo(centerX, centerY);
    
    for (let i = 0; i < 500; i++) {
      const angle = 0.08 * i;
      const r = 0.7 * angle;
      const x = centerX + r * Math.cos(angle) * 7;
      const y = centerY + r * Math.sin(angle) * 7;
      
      // Simulate motor impairment with moderate tremor noise
      const tremorX = (Math.sin(i * 0.5) * 2) + ((Math.random() - 0.5) * 1.5);
      const tremorY = (Math.cos(i * 0.5) * 2) + ((Math.random() - 0.5) * 1.5);
      
      ctx.lineTo(x + tremorX, y + tremorY);
    }
    ctx.stroke();
    
    canvas.toBlob((blob) => {
      if (blob) {
        const sampleFile = new File([blob], 'sample_tremor_spiral.png', { type: 'image/png' });
        setFile(sampleFile);
        setPreview(canvas.toDataURL('image/png'));
        setResult(null);
      }
    }, 'image/png');
  };

  const startAnalysis = async () => {
    if (!file) return;
    setAnalyzing(true);
    setResult(null);
    
    // Local simulation of CNN handwriting classifier
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        probability: 92,
        status: 'Tremor Detected',
        confidence: 88
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-textMain p-8 relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] bottom-[-10%] left-[-10%] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex items-center gap-4 mb-8">
          <Link to="/dashboard" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
              <Edit3 className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold">Handwriting Analysis</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Upload Spiral Drawing</h2>
              <button 
                onClick={loadSample}
                disabled={analyzing}
                className="text-xs font-semibold text-secondary hover:text-secondary-hover bg-secondary/10 hover:bg-secondary/20 px-3 py-1.5 rounded-lg border border-secondary/20 transition-all"
              >
                Use Sample Image
              </button>
            </div>
            
            <label className="border-2 border-dashed border-white/20 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-secondary/50 hover:bg-white/5 transition-all mb-6 min-h-[250px]">
              {preview ? (
                <img src={preview} alt="Spiral Preview" className="max-h-48 object-contain rounded-lg" />
              ) : (
                <>
                  <UploadCloud className="w-12 h-12 text-secondary mb-4" />
                  <p className="text-center font-medium mb-1">Upload spiral drawing image</p>
                  <p className="text-sm text-textMuted text-center">Supports .png, .jpg (Max 5MB)</p>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>

            <button 
              onClick={startAnalysis}
              disabled={!file || analyzing || result}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-secondary to-primary font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <><Activity className="w-5 h-5 animate-pulse" /> Running CNN Classifier...</>
              ) : (
                'Analyze Image'
              )}
            </button>
          </div>

          <div className="glass-panel p-8 relative overflow-hidden flex flex-col">
            <h2 className="text-xl font-semibold mb-6">Prediction Results</h2>
            
            {!result && !analyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-textMuted opacity-50 pb-10">
                <ImageIcon className="w-16 h-16 mb-4" />
                <p>Upload an image to see tremor heatmaps.</p>
              </div>
            )}

            {analyzing && (
              <div className="flex-1 flex flex-col items-center justify-center pb-10">
                <div className="w-24 h-24 relative mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                  <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
                  <Brain className="absolute inset-0 m-auto w-8 h-8 text-secondary animate-pulse" />
                </div>
                <p className="font-medium text-lg text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary animate-pulse">Scanning image pixels...</p>
              </div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 flex-1 flex flex-col"
              >
                <div className="flex flex-col items-center justify-center p-6 bg-surface/50 border border-white/10 rounded-xl relative overflow-hidden mb-auto">
                  <p className={`text-sm font-semibold mb-2 uppercase tracking-wider ${result.probability > 70 ? 'text-danger' : 'text-success'}`}>
                    {result.status}
                  </p>
                  <div className="text-6xl font-bold mb-2">
                    {result.probability}<span className="text-3xl text-textMuted">%</span>
                  </div>
                  <p className="text-sm text-textMuted text-center">Probability of Motor Impairment</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-surface/50 border border-white/5 p-4 rounded-lg text-center">
                    <p className="text-xs text-textMuted mb-1">CNN Confidence</p>
                    <p className="text-lg font-bold text-success">{result.confidence}%</p>
                  </div>
                  <div className="bg-surface/50 border border-white/5 p-4 rounded-lg text-center">
                    <p className="text-xs text-textMuted mb-1">Tremor Density</p>
                    <p className="text-lg font-bold">{result.probability > 70 ? 'High' : 'Low'}</p>
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
