
import React, { useState } from 'react';
import { CommunicationRecord } from '../types';

interface CommunicationViewProps {
  communications: CommunicationRecord[];
  onCommClick?: (id: string) => void;
}

type DateRange = {
  label: string;
  start?: Date;
  end?: Date;
};

const CommunicationView: React.FC<CommunicationViewProps> = ({ communications, onCommClick }) => {
  const [search, setSearch] = useState('');
  const [isExpandedMode, setIsExpandedMode] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange>({ label: '全部时间' });

  const datePresets: DateRange[] = [
    { label: '全部时间' },
    { label: '今天', start: new Date(), end: new Date() },
    { label: '最近7天', start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end: new Date() },
    { label: '最近30天', start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() },
    { label: '本季度', start: new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3, 1), end: new Date() },
  ];

  const filtered = communications.filter(c => {
    const matchesSearch = c.customerName.includes(search) || c.title.includes(search);
    
    // Simple date filter logic
    if (selectedRange.start && selectedRange.end) {
      const commDate = new Date(c.date);
      const isWithinRange = commDate >= selectedRange.start && commDate <= new Date(selectedRange.end.getTime() + 86400000);
      return matchesSearch && isWithinRange;
    }

    return matchesSearch;
  });

  return (
    <div className="p-4 space-y-4 bg-slate-50 min-h-full relative">
      {/* Search Bar */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="搜索沟通主题、商机、客户" 
          className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-10 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg className="absolute left-3.5 top-3.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>

      {/* Filter and View Toggle */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar py-1">
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={() => setShowDatePicker(true)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-black transition-all flex items-center gap-1.5 border shadow-sm ${
              selectedRange.label !== '全部时间' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {selectedRange.label} ▾
          </button>
          {['沟通环节', '处理状态'].map((filter, i) => (
            <button key={i} className="whitespace-nowrap bg-white border border-slate-200 px-3 py-1.5 rounded-full text-[10px] text-slate-600 font-medium hover:bg-slate-50 transition-colors">
              {filter} ▾
            </button>
          ))}
        </div>
        
        <div className="flex bg-slate-200/50 p-1 rounded-xl shrink-0">
          <button 
            onClick={() => setIsExpandedMode(false)}
            className={`p-1.5 rounded-lg transition-all ${!isExpandedMode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button 
            onClick={() => setIsExpandedMode(true)}
            className={`p-1.5 rounded-lg transition-all ${isExpandedMode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>
      </div>

      {/* Communication List */}
      <div className="space-y-4 pb-24">
        {filtered.map((comm) => (
          <div 
            key={comm.id} 
            onClick={() => onCommClick?.(comm.id)}
            className={`bg-white rounded-[2.2rem] p-5 border border-slate-100 shadow-sm group active:scale-[0.99] transition-all overflow-hidden relative cursor-pointer space-y-3`}
          >
            {/* Row 1: Communication Name & Status */}
            <div className="flex justify-between items-center gap-3">
              <h3 className="text-sm font-black text-slate-900 truncate tracking-tight">{comm.title}</h3>
              <span className={`bg-emerald-50 text-emerald-600 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider border border-emerald-100/50 shrink-0 ${comm.status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-amber-50 text-amber-600 border-amber-100/50'}`}>
                {comm.status === 'success' ? '已分析' : '分析中'}
              </span>
            </div>

            {/* Row 2: Participants */}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
              <svg className="w-3.5 h-3.5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span className="truncate">{comm.participants?.join(', ') || '董陈晨'}</span>
            </div>

            {/* Row 3: Company, Date, Duration */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-slate-400 font-bold">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-blue-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 21h18M3 7v14m18-14v14M3 7l9-4 9 4M9 21V11h6v10"/></svg>
                <span className="truncate max-w-[140px] text-slate-500">{comm.customerName}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <svg className="w-3.5 h-3.5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{comm.date}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <svg className="w-3.5 h-3.5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>{comm.duration}</span>
              </div>
            </div>

            {/* AI Summary & Scores Section */}
            {isExpandedMode && (
              <div className="pt-2 mt-2 space-y-3">
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100/50">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">
                    <span className="text-blue-600 font-black mr-1 italic">摘要简报:</span>
                    {comm.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {comm.tags.map((tag, i) => (
                    <span key={i} className="bg-orange-50 text-orange-600 text-[10px] px-3 py-1.5 rounded-lg border border-orange-100 font-bold flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-slate-50">
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] text-slate-400 font-bold">能力评估</span>
                      <span className="text-[10px] text-emerald-600 font-black">{comm.scores.ability}分</span>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" style={{ width: `${comm.scores.ability}%` }} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] text-slate-400 font-bold">任务评估</span>
                      <span className="text-[10px] text-blue-600 font-black">{comm.scores.task}分</span>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: `${comm.scores.task}%` }} />
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black shadow-md shadow-blue-100 active:scale-95 transition-all shrink-0">
                    去赋能
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-20 text-center text-slate-300 font-bold">暂无该时间段的沟通记录</div>
        )}
      </div>

      {/* Date Picker Bottom Sheet */}
      {showDatePicker && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setShowDatePicker(false)} />
          <div className="w-full max-w-[375px] bg-white rounded-t-[2.5rem] p-6 pb-12 space-y-6 shadow-2xl relative animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-black text-slate-900">选择日期范围</h4>
              <button onClick={() => setShowDatePicker(false)} className="text-slate-400 p-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {datePresets.map((preset, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setSelectedRange(preset);
                    setShowDatePicker(false);
                  }}
                  className={`py-4 rounded-2xl text-[13px] font-black transition-all border-2 ${
                    selectedRange.label === preset.label 
                      ? 'bg-blue-50 border-blue-600 text-blue-600' 
                      : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              <button className="py-4 rounded-2xl text-[13px] font-black transition-all border-2 bg-slate-50 border-transparent text-slate-400 italic">
                自定义范围...
              </button>
            </div>

            <button 
              onClick={() => setShowDatePicker(false)}
              className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all uppercase tracking-widest text-sm"
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationView;
