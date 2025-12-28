import React, { useMemo } from 'react';
import { Schedule } from '../types';

interface AllSchedulesViewProps {
  schedules: Schedule[];
  onBack: () => void;
  onScheduleClick?: (schedule: Schedule) => void;
}

const AllSchedulesView: React.FC<AllSchedulesViewProps> = ({ schedules, onBack, onScheduleClick }) => {
  const grouped = useMemo(() => {
    const groups: Record<string, Schedule[]> = {};
    schedules.forEach(s => {
      const dateKey = s.date;
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(s);
    });
    return Object.entries(groups).sort(([dateA], [dateB]) => {
      // Simple date comparison - assuming format like "2025年12月24日"
      return dateA.localeCompare(dateB);
    });
  }, [schedules]);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <header className="px-5 pt-6 pb-2 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-1 -ml-1 text-slate-900 active:scale-90 transition-transform">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
             </button>
             <h2 className="text-xl font-bold text-slate-900 tracking-tight">全部日程</h2>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-blue-50 active:scale-95 transition-all">
            安排沟通
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-5 space-y-10 pb-20">
        {grouped.map(([date, items], gIdx) => (
          <div key={gIdx} className="space-y-5">
             <div className="flex items-center gap-4">
                <span className="text-sm font-black text-slate-900 shrink-0">{date}</span>
                <div className="flex-1 h-px bg-slate-200" />
             </div>
             <div className="space-y-3">
                {items.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => onScheduleClick?.(item)}
                    className="bg-[#f0f9f4] rounded-xl p-4 border-l-4 border-emerald-400 shadow-sm flex items-center justify-between active:scale-98 transition-all cursor-pointer"
                  >
                     <div className="space-y-1 min-w-0 flex-1 pr-4">
                        <h4 className="text-[13px] font-bold text-emerald-900 truncate">{item.title}</h4>
                        <div className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-widest">{item.time} {item.endTime ? `- ${item.endTime}` : ''}</div>
                     </div>
                     <div className="text-[11px] font-black text-emerald-600 bg-white/60 px-2.5 py-1.5 rounded-lg border border-emerald-100 shrink-0 max-w-[120px] truncate">
                        {item.customer}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        ))}
        {grouped.length === 0 && (
          <div className="py-32 text-center space-y-5">
             <div className="w-20 h-20 bg-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
                <svg className="w-10 h-10 text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
             </div>
             <div className="space-y-1">
                <p className="text-sm font-black text-slate-400">当前没有日程安排</p>
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">No schedules found</p>
             </div>
          </div>
        )}
      </div>

      <button className="fixed bottom-10 right-8 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all z-20">
         <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>
  );
};

export default AllSchedulesView;

