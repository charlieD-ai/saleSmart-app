
import React, { useState } from 'react';
import { Todo } from '../types';

interface OverdueTaskModalProps {
  tasks: Todo[];
  onClose: () => void;
  onAction: (action: 'complete' | 'delete' | 'postpone', taskId?: string | number) => void;
}

type ActionTarget = 'complete' | 'postpone' | 'delete' | 'none';

const OverdueTaskModal: React.FC<OverdueTaskModalProps> = ({ tasks, onClose, onAction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, startX: 0, startY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionTarget>('none');
  const [exitDirection, setExitDirection] = useState<ActionTarget>('none');

  if (tasks.length === 0 || currentIndex >= tasks.length) return null;

  const currentTask = tasks[currentIndex];

  const handleStart = (clientX: number, clientY: number) => {
    setDrag({ x: 0, y: 0, startX: clientX, startY: clientY });
    setIsDragging(true);
    setExitDirection('none');
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const dx = clientX - drag.startX;
    const dy = clientY - drag.startY;
    setDrag(prev => ({ ...prev, x: dx, y: dy }));

    const HORIZONTAL_THRESHOLD = 60;
    const VERTICAL_SPLIT = 0;

    // Logic: Left Swipe = Delete | Right Swipe = Complete (Top) or Postpone (Bottom)
    if (dx < -HORIZONTAL_THRESHOLD) {
      setActiveAction('delete');
    } else if (dx > HORIZONTAL_THRESHOLD) {
      if (dy < VERTICAL_SPLIT) setActiveAction('complete');
      else setActiveAction('postpone');
    } else {
      setActiveAction('none');
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const COMMIT_THRESHOLD = 120;
    const isCommitted = Math.abs(drag.x) > COMMIT_THRESHOLD;

    if (isCommitted && activeAction !== 'none') {
      setExitDirection(activeAction);
      setTimeout(() => {
        onAction(activeAction as any, currentTask.id);
        setExitDirection('none');
        setActiveAction('none');
        setDrag({ x: 0, y: 0, startX: 0, startY: 0 });
      }, 400);
    } else {
      setDrag({ x: 0, y: 0, startX: 0, startY: 0 });
      setActiveAction('none');
    }
  };

  const getCardStyle = () => {
    if (exitDirection !== 'none') {
      const x = exitDirection === 'delete' ? -1000 : 1000;
      const y = exitDirection === 'complete' ? -400 : exitDirection === 'postpone' ? 400 : 0;
      return {
        transform: `translate(${x}px, ${y}px) rotate(${x / 10}deg) scale(0.6)`,
        opacity: 0,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      };
    }

    const rotation = drag.x / 15;
    const scale = isDragging ? 1.05 : 1;
    
    return {
      transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rotation}deg) scale(${scale})`,
      transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: isDragging ? 'grabbing' : 'grab',
    };
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden touch-none"
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleEnd}
    >
      {/* Dynamic Immersive Background */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          activeAction === 'complete' ? 'bg-emerald-900/95' : 
          activeAction === 'postpone' ? 'bg-blue-900/95' : 
          activeAction === 'delete' ? 'bg-rose-950/95' : 'bg-slate-950/95'
        }`}
        onClick={onClose}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
      </div>

      {/* Swipe Goal Indicators */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-10">
        {/* LEFT: DELETE AREA */}
        <div className={`flex flex-col items-center gap-3 transition-all duration-300 ${activeAction === 'delete' ? 'scale-125 opacity-100 translate-x-0' : 'scale-90 opacity-10 -translate-x-10'}`}>
          <div className="w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.4)]">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </div>
          <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">彻底删除</span>
        </div>

        {/* RIGHT: DUAL ACTION AREA */}
        <div className="flex flex-col gap-24 h-[60%] justify-center">
           {/* TOP RIGHT: COMPLETE */}
           <div className={`flex flex-col items-center gap-3 transition-all duration-300 ${activeAction === 'complete' ? 'scale-125 opacity-100 translate-x-0' : 'scale-90 opacity-10 translate-x-10'}`}>
             <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)]">
               <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M20 6L9 17l-5-5"/></svg>
             </div>
             <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">标记完成</span>
           </div>

           {/* BOTTOM RIGHT: POSTPONE */}
           <div className={`flex flex-col items-center gap-3 transition-all duration-300 ${activeAction === 'postpone' ? 'scale-125 opacity-100 translate-x-0' : 'scale-90 opacity-10 translate-x-10'}`}>
             <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.4)]">
               <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
             </div>
             <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">推迟今日</span>
           </div>
        </div>
      </div>

      {/* Main Task Card */}
      <div className="relative w-full max-w-[320px] aspect-[3/4]">
        {/* Stack Effect */}
        {tasks.length > 1 && (
          <div className="absolute inset-0 translate-y-4 scale-95 bg-white/5 rounded-[3.5rem] -z-10 blur-[1px]" />
        )}
        
        <div 
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onTouchStart={(e) => handleStart(e.targetTouches[0].clientX, e.targetTouches[0].clientY)}
          style={getCardStyle()}
          className={`relative w-full h-full bg-white rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] flex flex-col p-10 border border-white/20 overflow-hidden overflow-visible`}
        >
          {/* Visual Feedback Overlay */}
          <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none opacity-0 ${activeAction !== 'none' ? 'opacity-[0.08]' : ''} ${
            activeAction === 'complete' ? 'bg-emerald-500' : activeAction === 'postpone' ? 'bg-blue-500' : 'bg-rose-500'
          }`} />

          <div className="flex-1 flex flex-col justify-center text-center space-y-8">
            <div className="relative mx-auto mb-4">
              <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all duration-500 shadow-inner ${
                activeAction === 'complete' ? 'bg-emerald-100 rotate-12 scale-110' : 
                activeAction === 'postpone' ? 'bg-blue-100 -rotate-12 scale-110' : 
                activeAction === 'delete' ? 'bg-rose-100 scale-90' : 'bg-slate-50'
              }`}>
                <svg className={`w-12 h-12 transition-colors duration-500 ${
                  activeAction === 'complete' ? 'text-emerald-600' : 
                  activeAction === 'postpone' ? 'text-blue-600' : 
                  activeAction === 'delete' ? 'text-rose-600' : 'text-slate-300'
                }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                   <circle cx="12" cy="12" r="10"/><path d="M12 8v4l2.5 2.5"/>
                </svg>
              </div>
            </div>

            <div className="space-y-3 px-2">
              <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">
                {currentTask.title}
              </h3>
              <p className="text-[13px] text-slate-400 font-bold leading-relaxed line-clamp-2">
                {currentTask.sub}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 pt-4">
               <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 uppercase tracking-widest">
                 逾期任务 · {currentTask.date}
               </span>
            </div>
          </div>

          {/* Swipe Instructions */}
          <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-300">
             <div className="flex items-center gap-1 group">
                <svg className="w-3 h-3 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6"/></svg>
                左滑删除
             </div>
             <div className="flex items-center gap-1">
                右滑处理
                <svg className="w-3 h-3 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Skip */}
      <footer className="absolute bottom-12 inset-x-0 text-center z-10 flex flex-col items-center gap-6">
        <div className="flex gap-2">
           {tasks.map((_, i) => (
             <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/20'}`} />
           ))}
        </div>
        <button 
          onClick={onClose}
          className="text-white/40 text-[11px] font-black uppercase tracking-[0.5em] hover:text-white transition-all py-2"
        >
          暂不清理，直接进入
        </button>
      </footer>
    </div>
  );
};

export default OverdueTaskModal;
