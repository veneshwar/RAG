
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { Document } from '../types';

interface AnalyticsViewProps {
  documents: Document[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ documents }) => {
  // Mock data for analytics
  const typeData = [
    { name: 'PDF', value: 45 },
    { name: 'DOCX', value: 30 },
    { name: 'TXT', value: 15 },
    { name: 'JSON', value: 10 },
  ];

  const activityData = [
    { day: 'Mon', queries: 40, docs: 12 },
    { day: 'Tue', queries: 30, docs: 15 },
    { day: 'Wed', queries: 60, docs: 10 },
    { day: 'Thu', queries: 80, docs: 25 },
    { day: 'Fri', queries: 55, docs: 18 },
    { day: 'Sat', queries: 20, docs: 5 },
    { day: 'Sun', queries: 15, docs: 3 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header>
        <h1 className="text-3xl font-bold">Visual Analytics</h1>
        <p className="text-slate-400 mt-2">System-wide usage and document distribution statistics.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl h-[400px] flex flex-col">
          <h3 className="font-bold mb-6 flex justify-between">
            <span>Query Activity</span>
            <span className="text-xs text-slate-500 uppercase">Last 7 Days</span>
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="queries" stroke="#6366f1" fillOpacity={1} fill="url(#colorQueries)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl h-[400px] flex flex-col">
          <h3 className="font-bold mb-6 flex justify-between">
            <span>Document Types</span>
            <span className="text-xs text-slate-500 uppercase">Distribution</span>
          </h3>
          <div className="flex-1 min-h-0 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pr-8 space-y-4">
              {typeData.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-sm font-medium text-slate-300">{item.name}</span>
                  <span className="text-sm text-slate-500">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-2xl">
         <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
               <i className="fas fa-lightbulb text-xl"></i>
            </div>
            <div>
               <h3 className="font-bold text-lg">AI Generated Insight</h3>
               <p className="text-slate-400 text-sm">System intelligence has detected a pattern in recent uploads.</p>
            </div>
         </div>
         <p className="text-slate-300 leading-relaxed italic border-l-4 border-indigo-500 pl-6 py-2">
           "Based on the last 50 queries, users are primarily searching for 'compliance' and 'renewal dates'. We recommend highlighting these fields in the document metadata extraction pipeline to reduce search latency by an estimated 20%."
         </p>
         <button className="mt-6 text-indigo-400 text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
           Apply Recommended Configuration <i className="fas fa-arrow-right"></i>
         </button>
      </div>
    </div>
  );
};

export default AnalyticsView;
