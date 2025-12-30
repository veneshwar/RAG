
import React, { useState, useEffect } from 'react';
import { AppRoute, Document, Message, SystemStats } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import QueryView from './components/QueryView';
import IngestView from './components/IngestView';
import AnalyticsView from './components/AnalyticsView';
import AdminView from './components/AdminView';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.DASHBOARD);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Q3_Financial_Report.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2023-10-24',
      content: 'Revenue increased by 15% year-over-year. Operating costs remained stable. Net profit margin is 22%.',
      mimeType: 'application/pdf'
    },
    {
      id: '2',
      name: 'Employee_Handbook_2024.docx',
      type: 'DOCX',
      size: '1.1 MB',
      uploadDate: '2023-11-12',
      content: 'Standard work hours are 9 AM to 5 PM. Remote work policy allows for 2 days a week home-office.',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
  ]);
  
  const [stats, setStats] = useState<SystemStats>({
    totalDocs: 2,
    totalQueries: 145,
    avgResponseTime: '1.2s',
    uptime: '99.9%'
  });

  const handleAddDocument = (doc: Document) => {
    setDocuments(prev => [doc, ...prev]);
    setStats(prev => ({ ...prev, totalDocs: prev.totalDocs + 1 }));
  };

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.DASHBOARD:
        return <Dashboard stats={stats} recentDocs={documents.slice(0, 5)} />;
      case AppRoute.QUERY:
        return <QueryView documents={documents} />;
      case AppRoute.INGEST:
        return <IngestView onUpload={handleAddDocument} />;
      case AppRoute.ANALYTICS:
        return <AnalyticsView documents={documents} />;
      case AppRoute.ADMIN:
        return <AdminView stats={stats} />;
      default:
        return <Dashboard stats={stats} recentDocs={documents.slice(0, 5)} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden text-slate-100">
      <Sidebar activeRoute={currentRoute} onNavigate={setCurrentRoute} />
      <main className="flex-1 overflow-y-auto relative p-4 md:p-8">
        <div className="max-w-7xl mx-auto h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
