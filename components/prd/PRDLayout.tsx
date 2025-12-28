
import React from 'react';

interface PRDLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PRDLayout: React.FC<PRDLayoutProps> = ({ title, children }) => {
  return (
    <div className="h-full bg-white border-l border-slate-200 flex flex-col shadow-inner">
      <header className="p-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">PRD: {title}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">SaleSmart Mobile Platform v1.0.0</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 hide-scrollbar">
        {children}
      </div>

      <footer className="p-8 border-t border-slate-100 bg-slate-50/30 shrink-0">
        <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
          <span>SaleSmart AI Dept.</span>
          <span>内部绝密 · 严禁外传</span>
        </div>
      </footer>
    </div>
  );
};

export default PRDLayout;
