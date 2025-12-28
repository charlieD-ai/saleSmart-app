
import React, { useState } from 'react';
import { CommunicationRecord } from '../types';

interface CommunicationDetailViewProps {
  comm: CommunicationRecord;
  onBack: () => void;
}

const TABS = ['发言人', '字幕', '总结', '分析', '辅导'];

const CommunicationDetailView: React.FC<CommunicationDetailViewProps> = ({ comm, onBack }) => {
  const [activeTab, setActiveTab] = useState('字幕');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [progress, setProgress] = useState(40); // 0:40 progress
  const [search, setSearch] = useState('');

  const transcript = [
    { speaker: 'amy', time: '10:58:20', text: '暂未识别到发言人再进来。', current: true },
    { speaker: 'petty', time: '10:58:25', text: '还是难，难不成你刚进去的时候立马开始说话。', current: false },
    { speaker: 'amy', time: '10:58:30', text: '我刚进这个页面的时候，还是刚刚点快速支持也挺慢的。', current: false },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8faff] relative overflow-hidden">
      {/* Header Area - Matching the blue-ish light background and meta layout */}
      <header className="px-5 pt-12 pb-6 bg-gradient-to-b from-[#eef4ff] to-white shrink-0">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="p-1 -ml-1 text-slate-700 active:scale-90 transition-transform">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="p-1 text-slate-700">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{comm.title}</h1>
          <p className="text-[12px] text-slate-400 font-medium">
            {comm.customerName} | {comm.participants[0]} | 2025-12-12 10:58 | 12分钟45秒
          </p>
        </div>
      </header>

      {/* Tab Bar - Matching the 16:50 screenshot with blue underline */}
      <div className="flex px-4 border-b border-slate-100 shrink-0 bg-white">
        {TABS.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-[15px] font-bold transition-all relative ${
              activeTab === tab ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar bg-[#f8faff]">
        {activeTab === '字幕' ? (
          <div className="p-4 space-y-4">
            {/* Search Bar - Matching the rounded input and edit icon */}
            <div className="flex items-center gap-3 mb-2">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="搜索" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#f1f4f9] border-none rounded-lg py-2.5 px-10 text-[14px] focus:ring-0 outline-none text-slate-600"
                />
                <svg className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <button className="p-2 bg-white border border-blue-100 rounded-lg text-blue-600 shadow-sm active:scale-95 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>

            {/* Transcript Cards - Card-style as requested in the '16:50' screenshot */}
            <div className="space-y-3">
              {transcript.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-[#f1f4f9]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[14px] font-bold text-slate-800">{item.speaker}</span>
                    {item.current && (
                      <div className="w-4 h-4 rounded-full border-2 border-rose-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                      </div>
                    )}
                    <span className="text-[12px] text-slate-300 font-medium ml-auto">{item.time}</span>
                  </div>
                  <div className="h-px bg-[#f1f4f9] w-full mb-4" />
                  <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-300 p-8 text-center space-y-4">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
             </div>
             <p className="text-xs font-bold uppercase tracking-widest text-slate-400">"{activeTab}" 内容分析中</p>
          </div>
        )}
      </main>

      {/* Footer Controls - Circular play button and blue progress bar */}
      <footer className="px-6 py-6 bg-white border-t border-slate-50 shrink-0 space-y-5">
        <div className="relative h-1 bg-slate-100 rounded-full group cursor-pointer">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full" 
            style={{ width: `${progress}%` }} 
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-md" 
            style={{ left: `calc(${progress}% - 7px)` }} 
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[12px] text-slate-400 font-bold font-mono">0:40 / 12:47</span>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-100 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-6 h-6 ml-1 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button 
            onClick={() => setSpeed(speed === 1.0 ? 1.5 : speed === 1.5 ? 2.0 : 1.0)}
            className="text-[14px] font-bold text-slate-600 min-w-[40px] text-right"
          >
            {speed.toFixed(1)} x
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CommunicationDetailView;
