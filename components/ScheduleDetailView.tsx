
import React from 'react';
import { ICONS } from '../constants';

interface ScheduleDetailViewProps {
  schedule: {
    id: string;
    title: string;
    time: string;
    endTime: string;
    date: string;
    customer: string;
    stage: string;
    owner: string;
    internalParticipants: string[];
    clientParticipants: string[];
  };
  onBack: () => void;
  onStart: () => void;
}

const ScheduleDetailView: React.FC<ScheduleDetailViewProps> = ({ schedule, onBack, onStart }) => {
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header - Reduced pt from 12 to 6 */}
      <header className="px-5 pt-6 pb-4 flex items-center justify-between shrink-0 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-900">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h2 className="text-base font-bold text-slate-900">计划详情</h2>
        <div className="flex gap-4">
          <button className="text-slate-900"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          <button className="text-slate-900"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
            {schedule.title}
          </h1>
          <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-xs font-bold border border-blue-100">
            {schedule.stage}
          </span>
        </div>

        {/* Time Card */}
        <div className="bg-[#f4f7ff] rounded-2xl p-6 flex items-center justify-between border border-blue-50/50">
          <div className="text-center space-y-2">
            <div className="text-2xl font-black text-slate-900 leading-none">{schedule.time}</div>
            <div className="text-[11px] text-slate-400 font-bold">{schedule.date}</div>
          </div>
          <div className="flex-1 flex items-center justify-center px-4 relative">
             <div className="w-full h-px bg-blue-200" />
             <div className="absolute bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">1小时</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-black text-slate-900 leading-none">{schedule.endTime}</div>
            <div className="text-[11px] text-slate-400 font-bold">{schedule.date}</div>
          </div>
        </div>

        {/* Info Rows */}
        <div className="space-y-6">
          <InfoRow icon={<ICONS.Customer className="w-5 h-5" />} label="关联客户" content={schedule.customer} />
          <InfoRow icon={<ICONS.Home className="w-5 h-5" />} label="内部参与人" content={schedule.internalParticipants.join('、')} />
          <InfoRow icon={<ICONS.Opportunity className="w-5 h-5" />} label="客户参与人" content={schedule.clientParticipants.length > 0 ? schedule.clientParticipants.join('、') : '暂无'} />
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="p-6 border-t border-slate-50 grid grid-cols-2 gap-4 shrink-0">
        <button className="py-4 border-2 border-blue-600 text-blue-600 font-black rounded-xl text-sm active:bg-blue-50 transition-colors">
          准备
        </button>
        <button 
          onClick={onStart}
          className="py-4 bg-blue-600 text-white font-black rounded-xl text-sm shadow-xl shadow-blue-100 active:scale-95 transition-all"
        >
          开始
        </button>
      </footer>
    </div>
  );
};

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; content: string }> = ({ icon, label, content }) => (
  <div className="flex items-start gap-4">
    <div className="text-slate-400 mt-0.5 shrink-0">{icon}</div>
    <div className="space-y-1">
      <div className="text-[11px] text-slate-400 font-black tracking-widest uppercase">{label}</div>
      <div className="text-sm font-bold text-slate-800">{content}</div>
    </div>
  </div>
);

export default ScheduleDetailView;
