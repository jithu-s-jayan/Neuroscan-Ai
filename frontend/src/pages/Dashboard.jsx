import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Shield, User, FileAudio, Video, Edit3, Settings, LogOut, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { name: 'Mon', accuracy: 92, predictions: 45 },
  { name: 'Tue', accuracy: 94, predictions: 52 },
  { name: 'Wed', accuracy: 91, predictions: 38 },
  { name: 'Thu', accuracy: 96, predictions: 65 },
  { name: 'Fri', accuracy: 95, predictions: 48 },
  { name: 'Sat', accuracy: 98, predictions: 30 },
  { name: 'Sun', accuracy: 97, predictions: 41 },
];

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-primary/20 text-primary' : 'text-textMuted hover:bg-white/5 hover:text-white'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-textMain flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-surface/30 backdrop-blur-xl flex flex-col p-4">
        <div className="flex items-center gap-2 text-xl font-bold mb-10 mt-2 px-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          <Brain className="text-primary w-6 h-6" />
          NeuroScan AI
        </div>
        
        <div className="flex-1 space-y-2">
          <NavItem icon={<Activity className="w-5 h-5" />} label="Overview" active={true} />
          <Link to="/predict/voice" className="block">
            <NavItem icon={<FileAudio className="w-5 h-5" />} label="Voice Analysis" />
          </Link>
          <Link to="/predict/handwriting" className="block">
            <NavItem icon={<Edit3 className="w-5 h-5" />} label="Handwriting" />
          </Link>
          <Link to="/predict/gait" className="block">
            <NavItem icon={<Video className="w-5 h-5" />} label="Gait Analysis" />
          </Link>
          <Link to="/predict/multimodal" className="block">
            <NavItem icon={<Layers className="w-5 h-5" />} label="Multi-Modal AI" />
          </Link>
        </div>
        
        <div className="border-t border-white/10 pt-4 space-y-2 mt-4">
          <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors text-danger hover:bg-danger/10">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <header className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome, Dr. Smith</h1>
            <p className="text-textMuted">Here is the latest overview of patient predictions.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center">
            <User className="text-primary w-6 h-6" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
          {[
            { title: "Total Scans", value: "1,248", trend: "+12%", color: "text-primary", bg: "bg-primary/20" },
            { title: "High Risk Detected", value: "84", trend: "-5%", color: "text-danger", bg: "bg-danger/20" },
            { title: "Avg. Accuracy", value: "98.4%", trend: "+1.2%", color: "text-success", bg: "bg-success/20" },
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="glass-panel p-6"
            >
              <h3 className="text-textMuted text-sm font-medium mb-4">{stat.title}</h3>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className={`text-sm font-medium ${stat.color}`}>{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>


        {/* Main Dashboard Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 mb-8">
          <div className="lg:col-span-2 glass-panel p-6 min-h-[400px]">
            <h3 className="text-lg font-semibold mb-6">AI Confidence Trend</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" domain={[80, 100]} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <Tooltip contentStyle={{ backgroundColor: '#1A233A', borderColor: '#ffffff20', color: '#fff' }} />
                  <Area type="monotone" dataKey="accuracy" stroke="#3B82F6" fillOpacity={1} fill="url(#colorAccuracy)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="glass-panel p-6 min-h-[400px]">
            <h3 className="text-lg font-semibold mb-6">Recent Predictions</h3>
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">P{i}</div>
                    <div>
                      <div className="font-medium">Patient ID #{1000+i}</div>
                      <div className="text-xs text-textMuted">Multi-modal Analysis</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-danger">88% PD</div>
                    <div className="text-xs text-textMuted">10:42 AM</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
