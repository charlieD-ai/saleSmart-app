
import React, { useState, useEffect, useRef } from 'react';
import { SaleSmartAI } from '../geminiService';

interface RecordingViewProps {
  status: 'recording' | 'paused';
  onStatusChange: (status: 'recording' | 'paused' | 'none') => void;
  onMinimize: () => void;
  onFinish: (analysis: any) => void;
}

const RecordingView: React.FC<RecordingViewProps> = ({ status, onStatusChange, onMinimize, onFinish }) => {
  const [seconds, setSeconds] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ai = useRef(new SaleSmartAI());

  const [transcript, setTranscript] = useState([
    { 
      id: 1, 
      speaker: '董陈晨 (我)', 
      time: '00:01', 
      text: '您好，张总。关于这次云学堂总部的采购项目，贵司在数字化转型的预算分配上有具体的考量吗？', 
      isMe: true,
      isKeyword: false 
    },
    { 
      id: 2, 
      speaker: '绚星智慧科技有限公司', 
      time: '00:15', 
      text: '我们目前重点看重系统的集成度。预算这块，管理层初步批复了大约在 50w 左右，但需要看到明确的 ROI。', 
      isMe: false,
      isKeyword: true, 
      keyword: '预算 50w / 关注 ROI' 
    },
  ]);

  useEffect(() => {
    startAudioVisualizer();
    return () => stopAudioVisualizer();
  }, []);

  const startAudioVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!canvasRef.current || status !== 'recording') return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 2;
          ctx.fillStyle = `rgb(59, 130, 246)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };
      draw();
    } catch (err) {
      console.error("Audio error:", err);
    }
  };

  const stopAudioVisualizer = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    audioContextRef.current?.close();
  };

  useEffect(() => {
    let interval: number;
    if (status === 'recording') {
      interval = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleStop = async () => {
    setIsAnalyzing(true);
    const textToAnalyze = transcript.map(t => `${t.speaker}: ${t.text}`).join('\n');
    const result = await ai.current.analyzeConversation(textToAnalyze);
    setIsAnalyzing(false);
    
    if (result) {
      onFinish({
        ...result,
        duration: formatTime(seconds),
        customerName: '绚星智慧科技有限公司',
        title: '新录制的沟通分析'
      });
    } else {
      onStatusChange('none');
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#0A0F1D]">
      {/* 动态背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[100%] h-[70%] bg-blue-900/30 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* 顶部 */}
      <header className="relative z-10 px-6 pt-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            {status === 'recording' ? (
              <>
                <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-ping opacity-40" />
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full relative z-10" />
              </>
            ) : (
              <div className="w-2.5 h-2.5 bg-slate-500 rounded-full" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-white text-xl font-black tracking-tighter leading-none uppercase">
              {isAnalyzing ? 'Analyzing' : status}
            </span>
            <span className="text-blue-400 text-xs font-mono font-bold mt-1 tracking-widest">{formatTime(seconds)}</span>
          </div>
        </div>

        <button 
          onClick={onMinimize} 
          className="p-3 bg-white/5 backdrop-blur-2xl rounded-2xl text-white/70 border border-white/10"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </button>
      </header>

      {/* 可视化波形 */}
      <div className="relative z-10 px-6 mt-4 h-12">
        <canvas ref={canvasRef} className="w-full h-full rounded-lg" width={300} height={50} />
      </div>

      {/* 转写流 */}
      <main ref={scrollRef} className="relative z-10 flex-1 px-6 mt-4 overflow-y-auto hide-scrollbar space-y-6">
        {transcript.map((item) => (
          <div key={item.id} className={`flex flex-col gap-2 ${item.isMe ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`flex items-center gap-2 px-1 ${item.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className={`text-[10px] font-black tracking-widest uppercase ${item.isMe ? 'text-blue-400' : 'text-slate-400'}`}>
                {item.speaker}
              </span>
              <span className="text-[9px] font-bold text-white/20 font-mono">{item.time}</span>
            </div>
            <div className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              item.isMe ? 'bg-blue-600/20 text-blue-50 border border-blue-500/20' : 'bg-white/5 text-white/90 border border-white/10'
            }`}>
              {item.text}
              {item.isKeyword && (
                <div className="mt-2 flex items-center gap-1.5 text-[9px] font-black text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20 w-fit">
                  AI: {item.keyword}
                </div>
              )}
            </div>
          </div>
        ))}

        {(status === 'recording' || isAnalyzing) && (
          <div className="flex items-center gap-3 text-white/30 px-1 py-4 animate-pulse">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-[10px] font-bold tracking-wide italic">
              {isAnalyzing ? 'Gemini 正在为您深度解析对话...' : 'AI 正在实时监测关键信号...'}
            </span>
          </div>
        )}
      </main>

      {/* 决策建议 */}
      <div className="relative z-10 px-6 py-4">
        <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/5 border border-indigo-500/30 p-4 rounded-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-3.5 h-3.5 text-indigo-400">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <span className="text-[10px] font-black text-white tracking-widest uppercase">实时策略建议</span>
          </div>
          <p className="text-[11px] text-indigo-100/70 leading-relaxed">
            建议提及 <span className="text-indigo-300 font-bold">绚星科技</span> 的成功案例，强调 3 个月内实现成本回收。
          </p>
        </div>
      </div>

      {/* 控制台 */}
      <footer className="relative z-20 px-6 pb-12">
        <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-3 flex items-center gap-3">
          <button 
            onClick={() => onStatusChange('none')}
            className="w-14 h-14 flex items-center justify-center bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/20 active:scale-90"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          
          <button 
            onClick={isAnalyzing ? undefined : handleStop}
            disabled={isAnalyzing}
            className="flex-1 h-14 bg-blue-600 text-white font-black rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-blue-900/40 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <span className="animate-pulse">ANALYZING...</span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                <span className="tracking-widest">FINISH & ANALYZE</span>
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default RecordingView;
