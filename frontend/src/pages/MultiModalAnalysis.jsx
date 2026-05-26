import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Layers, Activity, FileAudio, Video, Edit3, ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MultiModalAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [files, setFiles] = useState({ voice: null, gait: null, handwriting: null });

  const handleFileChange = (type, e) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0] });
    }
  };

  const startAnalysis = async () => {
    if (!files.voice && !files.gait && !files.handwriting) return;
    setAnalyzing(true);
    
    // Simulate complex hybrid CNN-LSTM processing
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        probability: 93,
        status: 'Critical Risk Detected',
        confidence: 98,
        insights: 'The hybrid model detected correlating tremor patterns across both voice MFCCs and handwriting kinematics, highly indicative of Parkinsonian motor impairment.'
      });
    }, 4000);
  };

  const downloadReport = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const element = document.getElementById('report-container');
      if (!element) return;
      
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#0B0F19' });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('NeuroScan_AI_Report.pdf');
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-textMain p-8 relative overflow-hidden">
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-[150px] top-[-20%] left-[10%] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10" id="report-container">
        <header className="flex items-center gap-4 mb-8">
          <Link to="/dashboard" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold">Multi-Modal Hybrid Analysis</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-panel p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FileAudio className="w-5 h-5 text-primary"/> Voice Data</h2>
              <input type="file" accept=".wav" className="w-full text-sm text-textMuted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30" onChange={(e) => handleFileChange('voice', e)} />
            </div>
            <div className="glass-panel p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Edit3 className="w-5 h-5 text-secondary"/> Handwriting Data</h2>
              <input type="file" accept="image/*" className="w-full text-sm text-textMuted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/20 file:text-secondary hover:file:bg-secondary/30" onChange={(e) => handleFileChange('handwriting', e)} />
            </div>
            <div className="glass-panel p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Video className="w-5 h-5 text-accent"/> Gait Data</h2>
              <input type="file" accept="video/*" className="w-full text-sm text-textMuted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/20 file:text-accent hover:file:bg-accent/30" onChange={(e) => handleFileChange('gait', e)} />
            </div>

            <button 
              onClick={startAnalysis}
              disabled={(!files.voice && !files.gait && !files.handwriting) || analyzing || result}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary via-accent to-secondary font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {analyzing ? <><Activity className="w-5 h-5 animate-pulse" /> Fusing Modalities...</> : 'Run Hybrid CNN-LSTM Model'}
            </button>
          </div>

          <div className="glass-panel p-8 relative overflow-hidden flex flex-col">
            <h2 className="text-xl font-semibold mb-6">Comprehensive Results</h2>
            
            {!result && !analyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-textMuted opacity-50">
                <Layers className="w-16 h-16 mb-4" />
                <p className="text-center">Upload multiple data types to leverage<br/>cross-modal AI correlations.</p>
              </div>
            )}

            {analyzing && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-32 h-32 relative mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-secondary border-b-accent border-l-transparent animate-spin" />
                  <Brain className="absolute inset-0 m-auto w-10 h-10 text-white animate-pulse" />
                </div>
                <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse text-lg">Running PCA & Feature Normalization...</p>
              </div>
            )}

            {result && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 flex-1 flex flex-col">
                <div className="flex flex-col items-center justify-center p-8 bg-surface/50 border border-white/10 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-danger/10 rounded-full blur-[50px]" />
                  <p className="text-sm font-semibold mb-2 uppercase tracking-wider text-danger">{result.status}</p>
                  <div className="text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                    {result.probability}<span className="text-4xl text-textMuted">%</span>
                  </div>
                  <p className="text-sm text-textMuted">Combined Probability</p>
                </div>

                <div className="bg-surface/50 border border-white/5 p-5 rounded-xl">
                  <p className="text-sm text-textMuted mb-2 font-medium">AI Clinical Insights</p>
                  <p className="text-sm leading-relaxed">{result.insights}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="bg-surface/50 border border-white/5 p-4 rounded-xl text-center">
                    <p className="text-xs text-textMuted mb-1">Hybrid Confidence</p>
                    <p className="text-xl font-bold text-success">{result.confidence}%</p>
                  </div>
                  <button onClick={downloadReport} className="bg-primary/20 hover:bg-primary/30 border border-primary/30 p-4 rounded-xl text-center flex flex-col items-center justify-center transition-colors text-primary cursor-pointer">
                    <Download className="w-5 h-5 mb-1" />
                    <span className="text-xs font-bold">Download PDF</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
