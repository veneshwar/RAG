
import React, { useState } from 'react';
import { Document } from '../types';

interface IngestViewProps {
  onUpload: (doc: Document) => void;
}

const IngestView: React.FC<IngestViewProps> = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Complete upload after progress finishes
          setTimeout(() => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const content = event.target?.result as string;
              onUpload({
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
                size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                uploadDate: new Date().toISOString().split('T')[0],
                content: content.length > 2000 ? content.substring(0, 2000) + '...' : content,
                mimeType: file.type
              });
              setIsUploading(false);
            };
            reader.readAsText(file);
          }, 500);

          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold">Ingest Data</h1>
        <p className="text-slate-400 mt-2">Upload and index new documents into the system.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-10 border-dashed border-2 border-slate-700 flex flex-col items-center justify-center text-center group hover:border-indigo-500/50 transition-all cursor-pointer relative overflow-hidden">
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600/20 group-hover:text-indigo-400 transition-all">
            <i className="fas fa-cloud-arrow-up text-3xl text-slate-400 group-hover:text-indigo-400"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Drop files here or click to browse</h3>
          <p className="text-slate-500 max-w-xs mb-8">Support for PDF, DOCX, TXT, and JSON. Files up to 50MB.</p>
          
          <div className="flex gap-4">
             <span className="flex items-center gap-2 text-xs bg-slate-800 px-3 py-1.5 rounded-full text-slate-400">
               <i className="fas fa-check text-indigo-500"></i> Auto-Indexing
             </span>
             <span className="flex items-center gap-2 text-xs bg-slate-800 px-3 py-1.5 rounded-full text-slate-400">
               <i className="fas fa-check text-indigo-500"></i> OCR Enabled
             </span>
          </div>

          {isUploading && (
            <div className="absolute inset-0 glass-dark flex flex-col items-center justify-center p-10">
              <div className="w-full bg-slate-800 h-2 rounded-full mb-4">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-indigo-400 font-bold animate-pulse">Uploading {uploadProgress}%</p>
              <p className="text-slate-500 text-xs mt-1">Extracting text and running semantic index...</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <i className="fas fa-circle-info text-indigo-400"></i>
              Pipeline Configuration
            </h3>
            <div className="space-y-4">
              <ConfigToggle label="Extract Metadata" active={true} />
              <ConfigToggle label="Full-Text Search" active={true} />
              <ConfigToggle label="PII Redaction" active={false} />
              <ConfigToggle label="Summarization" active={true} />
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-slate-800">
             <h3 className="font-bold text-lg mb-4">Ingestion Status</h3>
             <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <div className="flex-1">
                 <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider">All Systems Online</p>
                 <p className="text-xs text-emerald-300/60">Worker nodes are ready for heavy ingestion.</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfigToggle: React.FC<{ label: string; active: boolean }> = ({ label, active }) => (
  <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
    <span className="text-sm font-medium text-slate-300">{label}</span>
    <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-indigo-600' : 'bg-slate-700'}`}>
      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-6' : 'left-1'}`}></div>
    </div>
  </div>
);

export default IngestView;
