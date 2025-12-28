
import React from 'react';

export const LogicCard: React.FC<{ tag: string; title: string; desc: string }> = ({ tag, title, desc }) => {
  const tagColors: Record<string, string> = {
    AI: 'bg-indigo-100 text-indigo-600',
    实时: 'bg-rose-100 text-rose-600',
    交互: 'bg-blue-100 text-blue-600',
    逻辑: 'bg-amber-100 text-amber-600',
    权限: 'bg-red-100 text-red-600',
    模型: 'bg-emerald-100 text-emerald-600',
    优先级: 'bg-slate-100 text-slate-500',
    业务: 'bg-sky-100 text-sky-600',
    信息: 'bg-teal-100 text-teal-600',
    视觉: 'bg-purple-100 text-purple-600',
    字段: 'bg-cyan-100 text-cyan-600',
    实现: 'bg-slate-900 text-white',
  };

  return (
    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1 group">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter shadow-sm ${tagColors[tag] || 'bg-slate-100 text-slate-600'}`}>
          {tag}
        </span>
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{title}</h4>
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed font-bold">{desc}</p>
    </div>
  );
};
