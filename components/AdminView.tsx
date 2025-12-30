
import React from 'react';
import { SystemStats } from '../types';

interface AdminViewProps {
  stats: SystemStats;
}

const AdminView: React.FC<AdminViewProps> = ({ stats }) => {
  const users = [
    { id: 1, name: 'Alice Johnson', role: 'Admin', status: 'Online', lastActive: '2m ago' },
    { id: 2, name: 'Bob Smith', role: 'Editor', status: 'Offline', lastActive: '4h ago' },
    { id: 3, name: 'Charlie Davis', role: 'Viewer', status: 'Online', lastActive: 'Just now' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-slate-400 mt-2">Manage users, view system health, and configure security settings.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-bold">Active Users</h3>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors">
                Add User
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-800/30 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Active</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-slate-800 text-[10px] uppercase font-bold text-slate-400">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                        <span className="text-sm">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{user.lastActive}</td>
                    <td className="px-6 py-4">
                      <button className="text-slate-500 hover:text-red-400"><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="glass p-6 rounded-2xl flex items-center gap-4">
                <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-xl">
                  <i className="fas fa-shield-halved text-2xl"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Security Level</p>
                  <p className="text-xl font-bold">Enterprise</p>
                </div>
             </div>
             <div className="glass p-6 rounded-2xl flex items-center gap-4">
                <div className="p-4 bg-indigo-500/10 text-indigo-500 rounded-xl">
                  <i className="fas fa-database text-2xl"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Vector Storage</p>
                  <p className="text-xl font-bold">Elastic 8.1</p>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-bold mb-4">System Health</h3>
            <div className="space-y-6">
              <HealthBar label="CPU Usage" percentage={12} color="bg-emerald-500" />
              <HealthBar label="Memory" percentage={65} color="bg-amber-500" />
              <HealthBar label="Storage" percentage={48} color="bg-indigo-500" />
              <HealthBar label="API Latency" percentage={5} color="bg-emerald-500" />
            </div>
            <button className="w-full mt-8 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-bold text-sm transition-colors">
              VIEW SYSTEM LOGS
            </button>
          </div>

          <div className="glass p-6 rounded-2xl border-2 border-red-500/20">
            <h3 className="font-bold text-red-400 mb-2">Danger Zone</h3>
            <p className="text-xs text-slate-500 mb-4">Permanent actions for the entire workspace.</p>
            <button className="w-full border border-red-500/30 hover:bg-red-500/10 text-red-400 py-2 rounded-lg text-xs font-bold transition-all">
              PURGE ALL DOCUMENTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthBar: React.FC<{ label: string; percentage: number; color: string }> = ({ label, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-medium">
      <span className="text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-slate-300">{percentage}%</span>
    </div>
    <div className="w-full bg-slate-800 h-1.5 rounded-full">
      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default AdminView;
