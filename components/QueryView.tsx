
import React, { useState, useRef, useEffect } from 'react';
import { Document, Message } from '../types';
import { queryDocuments } from '../services/geminiService';

interface QueryViewProps {
  documents: Document[];
}

const QueryView: React.FC<QueryViewProps> = ({ documents }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "System initialized. RAG engine online. I can process your documents to provide verified intelligence. What would you like to know?",
      timestamp: new Date(),
      confidence: 100,
      hallucinationRisk: 0,
      source: 'document'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const result = await queryDocuments(inputValue, documents);
    
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: result.answer,
      timestamp: new Date(),
      confidence: result.confidence,
      hallucinationRisk: result.hallucinationRisk,
      source: result.source
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">RAG Intelligence Query</h1>
          <p className="text-slate-400 mt-2">Retrieval-Augmented Generation with Confidence & Verification</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Index</span>
             <span className="text-xs text-blue-400">{documents.length} Source Documents</span>
          </div>
          <div className="flex -space-x-2">
            {documents.slice(0, 5).map(d => (
               <div key={d.id} title={d.name} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                 {d.name.substring(0, 1)}
               </div>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 glass rounded-2xl flex flex-col overflow-hidden relative border border-slate-800">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-8"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 p-4 text-white rounded-tr-none shadow-lg' 
                  : 'glass-dark border border-slate-700/50 text-slate-200 rounded-tl-none overflow-hidden'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="bg-slate-800/80 px-4 py-2 flex justify-between items-center border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">
                        {msg.source === 'document' ? 'Verified Source' : 'General Knowledge'}
                      </span>
                      {msg.source === 'document' && <i className="fas fa-circle-check text-emerald-400 text-[10px]"></i>}
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-slate-500 font-bold uppercase">Confidence</span>
                        <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div className={`h-full ${msg.confidence && msg.confidence > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${msg.confidence}%` }}></div>
                        </div>
                        <span className="text-[10px] text-slate-300 font-mono">{msg.confidence}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-slate-500 font-bold uppercase">Risk</span>
                        <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div className={`h-full ${msg.hallucinationRisk && msg.hallucinationRisk < 20 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${msg.hallucinationRisk}%` }}></div>
                        </div>
                        <span className="text-[10px] text-slate-300 font-mono">{msg.hallucinationRisk}%</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700/30">
                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                       {msg.role === 'user' ? 'Client' : 'Intelligence Engine'}
                     </span>
                     <span className="text-[9px] opacity-40 font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="glass-dark border-slate-700/50 p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <span className="text-[10px] text-slate-500 uppercase font-bold ml-2">Analyzing Sources...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-800/40 backdrop-blur-md border-t border-slate-700/50">
          <div className="max-w-4xl mx-auto relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query documents with RAG verification..."
              className="w-full bg-slate-900/80 border border-slate-700/50 rounded-2xl py-4 pl-6 pr-14 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all shadow-lg"
            >
              <i className="fas fa-bolt-lightning"></i>
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-3">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
               <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">Document Grounding Active</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>
               <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">Verification Logic Online</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryView;
