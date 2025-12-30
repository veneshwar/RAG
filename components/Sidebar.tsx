
import React from 'react';
import { AppRoute } from '../types';

interface SidebarProps {
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeRoute, onNavigate }) => {
  const navItems = [
    { route: AppRoute.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-pie' },
    { route: AppRoute.QUERY, label: 'RAG Query', icon: 'fa-brain' },
    { route: AppRoute.INGEST, label: 'Ingest Data', icon: 'fa-cloud-arrow-up' },
    { route: AppRoute.ANALYTICS, label: 'Analytics', icon: 'fa-chart-line' },
    { route: AppRoute.ADMIN, label: 'Admin', icon: 'fa-gears' },
  ];

  return (
    <aside className="w-20 md:w-64 glass-dark border-r border-slate-800 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
          <i className="fas fa-microchip text-lg"></i>
        </div>
        <span className="hidden md:block font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          RAG Intelligence
        </span>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.route}
            onClick={() => onNavigate(item.route)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeRoute === item.route
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-blue-500/10 shadow-lg'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
            }`}
          >
            <i className={`fas ${item.icon} text-lg`}></i>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="hidden md:flex glass p-4 rounded-xl flex-col gap-2">
          <p className="text-xs text-slate-400 font-medium">INDEX HEALTH</p>
          <div className="w-full bg-slate-800 rounded-full h-1.5">
            <div className="bg-cyan-500 h-1.5 rounded-full w-[88%]"></div>
          </div>
          <p className="text-[10px] text-slate-500">88% Semantic Accuracy</p>
        </div>
        <button className="w-full mt-4 flex items-center justify-center gap-2 p-2 rounded-lg text-slate-500 hover:text-red-400 transition-colors">
          <i className="fas fa-right-from-bracket"></i>
          <span className="hidden md:block text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
