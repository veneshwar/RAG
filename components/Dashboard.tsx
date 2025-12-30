
import React from 'react';
import { SystemStats, Document } from '../types';

interface DashboardProps {
  stats: SystemStats;
  recentDocs: Document[];
}

const Dashboard: React.FC<DashboardProps> = ({ stats, recentDocs }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold">RAG Intelligence Dashboard</h1>
        <p className="text-slate-400 mt-2">Source-grounded AI metrics and document inventory.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Knowledge Base" 
          value={stats.totalDocs.toString()} 
          icon="fa-database" 
          color="indigo" 
        />
        <StatCard 
          label="Inference Tokens" 
          value={`${(stats.totalQueries * 1.2).toFixed(1)}k`} 
          icon="fa-microchip" 
          color="amber" 
        />
        <StatCard 
          label="Avg Grounding" 
          value="94%" 
          icon="fa-bullseye" 
          color="emerald" 
        />
        <StatCard 
          label="Verification Uptime" 
          value={stats.uptime} 
          icon="fa-circle-check" 
          color="blue" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-2xl overflow-hidden border border-slate-800">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="font-semibold text-xl">Ingested Sources</h2>
            <button className="text-blue-400 text-sm hover:underline">Manage All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs uppercase text-slate-500 bg-slate-800/30">
                <tr>
                  <th className="px-6 py-4">Source Name</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">Weight</th>
                  <th className="px-6 py-4">Index Date</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${doc.type === 'PDF' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                         <i className={`fas ${doc.type === 'PDF' ? 'fa-file-pdf' : 'fa-file-word'}`}></i>
                      </div>
                      <span className="font-medium">{doc.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-400 uppercase font-bold">{doc.type}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{doc.size}</td>
                    <td className="px-6 py-4 text-slate-400">{doc.uploadDate}</td>
                    <td className="px-6 py-4">
                      <button className="text-slate-500 hover:text-slate-100"><i className="fas fa-ellipsis-v"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-slate-800">
            <h2 className="font-semibold text-lg mb-4">RAG Core Control</h2>
            <div className="grid grid-cols-2 gap-3">
              <QuickActionButton icon="fa-plus" label="New Source" color="blue" />
              <QuickActionButton icon="fa-arrows-rotate" label="Reindex" color="slate" />
              <QuickActionButton icon="fa-shield-halved" label="Verify" color="slate" />
              <QuickActionButton icon="fa-sliders" label="Config" color="slate" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 p-6 rounded-2xl shadow-xl border border-blue-400/20">
            <h2 className="font-bold text-lg mb-2 text-white flex items-center gap-2">
              <i className="fas fa-sparkles"></i> Intelligence Log
            </h2>
            <p className="text-blue-100 text-sm opacity-90 leading-relaxed italic">
              "Grounding scores for the Q3 dataset have reached 98% confidence. Verification engine suggests adding more technical documentation to reduce 'general_knowledge' fallback."
            </p>
            <button className="mt-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-bold py-2 px-4 rounded-lg backdrop-blur-md transition-all uppercase tracking-widest">
              Review Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; icon: string; color: string }> = ({ label, value, icon, color }) => {
  const colorMap: any = {
    indigo: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20',
    amber: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20',
    emerald: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20',
    blue: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/20',
  };

  return (
    <div className={`glass rounded-2xl p-6 border bg-gradient-to-br ${colorMap[color]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="p-3 bg-slate-900/40 rounded-xl shadow-inner border border-slate-700/30">
          <i className={`fas ${icon} text-lg`}></i>
        </div>
      </div>
    </div>
  );
};

const QuickActionButton: React.FC<{ icon: string; label: string; color: string }> = ({ icon, label, color }) => (
  <button className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border ${
    color === 'blue' 
      ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20' 
      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700'
  }`}>
    <i className={`fas ${icon} mb-2`}></i>
    <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default Dashboard;
