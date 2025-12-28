
import React, { useState, useEffect } from 'react';

interface FloatingRecorderProps {
  onExpand: () => void;
  onClose: () => void;
}

const FloatingRecorder: React.FC<FloatingRecorderProps> = ({ onExpand, onClose }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-top duration-500">
      <div 
        onClick={onExpand}
        className="bg-black/80 backdrop-blur-2xl text-white px-5 py-2.5 rounded-full flex items-center gap-4 shadow-2xl border border-white/20 active:scale-95 transition-all cursor-pointer group"
      >
        {/* 声纹动画 */}
        <div className="flex items-center gap-0.5 h-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div 
              key={i} 
              className="w-0.5 bg-blue-400 rounded-full animate-bounce" 
              style={{ height: `${20 + Math.random() * 80}%`, animationDuration: `${0.4 + i * 0.1}s` }} 
            />
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          <span className="text-xs font-black tracking-widest font-mono">{formatTime(seconds)}</span>
        </div>

        <div className="w-px h-4 bg-white/20" />

        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="p-1 hover:bg-white/10 rounded-full transition-colors opacity-40 group-hover:opacity-100"
        >
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  );
};

export default FloatingRecorder;
