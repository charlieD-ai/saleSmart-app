
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CommunicationRecord, Schedule, Todo } from '../types';
import OverdueTaskModal from './OverdueTaskModal';

interface Signal {
  id: string;
  tags: string[];
  aiSummary: string;
  source: string;
  customer: string;
  icon: string;
  type: 'critical' | 'positive' | 'warning' | 'info';
}

interface HomeViewProps {
  onNavigateToAsk?: (prompt: string) => void;
  communications?: CommunicationRecord[];
  onCommClick?: (id: string) => void;
  onStartRecording?: () => void;
  onScheduleClick?: (schedule: Schedule) => void;
  onNavigateToAllTodos?: () => void;
  onNavigateToAllSchedules?: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  onNavigateToAsk, 
  communications, 
  onCommClick, 
  onStartRecording, 
  onScheduleClick,
  onNavigateToAllTodos,
  onNavigateToAllSchedules
}) => {
  const [isOverdueExpanded, setIsOverdueExpanded] = useState(false);
  const [showOverdueModal, setShowOverdueModal] = useState(false);
  
  // Intelligence Center Long Press State
  const [pressingSignalId, setPressingSignalId] = useState<string | null>(null);
  const signalPressTimer = useRef<number | null>(null);

  // Mock todos for visual reference if global state not passed (though App.tsx handles it now)
  const [localTodos, setLocalTodos] = useState<Todo[]>([
    { id: 1, title: '发送合同给 张总', sub: '数字化运营平台升级项目', date: '2025-12-20', time: '18:00', urgent: false, completed: false },
    { id: 2, title: '约客户确认项目里程碑', sub: '云学堂演示平台', date: '2025-12-21', time: '14:00', urgent: true, completed: false },
    { id: 4, title: '核对回款账期', sub: '纳星智慧', date: '2025-12-22', time: '10:00', urgent: false, completed: false },
    { id: 3, title: '预约演示时间', sub: '苏州智慧园区', date: '2025-12-24', time: '14:00', urgent: false, completed: false },
  ]);

  const TODAY_STR = '2025-12-24';

  const mockSchedules: Schedule[] = useMemo(() => [
    { id: '3', time: '14:00', endTime: '15:00', date: '2025年12月24日', title: '云学堂演示平台 - 需求调研', customer: '绚星智慧科技有限公司', stage: '需求调研', type: 'today', isCoVisit: false, owner: '董陈晨', internalParticipants: ['董陈晨', '产品专家'], clientParticipants: ['张总', 'IT总监'] },
    { id: '4', time: '16:30', endTime: '17:30', date: '2025年12月24日', title: '跟进回访：采购意向确认', customer: '张总 (个人)', stage: '商务谈判', type: 'today', isCoVisit: true, owner: '王经理', internalParticipants: ['董陈晨', '王经理'], clientParticipants: ['张总'] },
    { id: '5', time: '10:00', endTime: '12:00', date: '2025年12月25日', title: '专利技术交底沟通会', customer: '13951682173', stage: '方案呈现', type: 'upcoming', isCoVisit: false, owner: '董陈晨', internalParticipants: ['董陈晨'], clientParticipants: [] },
  ], []);

  const { overdueTodos, todayTodos } = useMemo(() => {
    return {
      overdueTodos: localTodos.filter(t => !t.completed && t.date < TODAY_STR),
      todayTodos: localTodos.filter(t => !t.completed && t.date === TODAY_STR),
    };
  }, [localTodos]);

  useEffect(() => {
    if (overdueTodos.length > 0) {
      const timer = setTimeout(() => {
        setShowOverdueModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []); 

  const handleTaskAction = (action: 'complete' | 'delete' | 'postpone', taskId?: string | number) => {
    setLocalTodos(prev => {
      if (action === 'delete') return prev.filter(t => t.id !== taskId);
      return prev.map(t => {
        if (t.id === taskId) {
          if (action === 'complete') return { ...t, completed: !t.completed };
          if (action === 'postpone') return { ...t, date: TODAY_STR };
        }
        return t;
      });
    });
  };

  const startSignalPress = (signal: Signal) => {
    setPressingSignalId(signal.id);
    signalPressTimer.current = window.setTimeout(() => {
      onNavigateToAsk?.(`[深度分析] 针对 ${signal.customer} 的最新信号（${signal.tags.join('、')}），AI 认为存在哪些潜在成交风险？请提供应对建议。`);
      setPressingSignalId(null);
    }, 3000);
  };

  const cancelSignalPress = () => {
    if (signalPressTimer.current) {
      clearTimeout(signalPressTimer.current);
      signalPressTimer.current = null;
    }
    setPressingSignalId(null);
  };

  const OVERDUE_LIMIT = 2;
  const displayedOverdue = isOverdueExpanded ? overdueTodos : overdueTodos.slice(0, OVERDUE_LIMIT);

  const signals: Signal[] = useMemo(() => [
    { id: 's1', tags: ['竞品介入：钉钉', 'CEO质疑 价格体系'], aiSummary: '本次沟通 CEO 对价格体系提出强烈质疑，且明确提到正在对比 [钉钉]，并担心我们的交付能力无法支撑现有的业务复杂度。', source: '高层对话', customer: '云学堂演示平台', icon: '🔴', type: 'critical' },
    { id: 's2', tags: ['预算确认：50万'], aiSummary: '客户明确表示当前项目已批复 50 万专项预算，且要求在下周五之前完成首轮技术方案的最终闭环。', source: '商务洽谈', customer: '苏州智慧园区', icon: '🟢', type: 'positive' },
    { id: 's3', tags: ['采购经理担心 实施时间'], aiSummary: '采购经理表达了对实施周期的深度担忧，认为 3 个月的上线周期会影响年底的业务冲刺，需要提供更紧凑的交付计划。', source: '需求调研', customer: '纳星智慧', icon: '🟡', type: 'warning' }
  ], []);

  const getSignalColors = (type: Signal['type']) => {
    switch (type) {
      case 'critical': return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', dot: 'bg-red-500' };
      case 'positive': return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', dot: 'bg-emerald-500' };
      case 'warning': return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', dot: 'bg-amber-500' };
      default: return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', dot: 'bg-slate-400' };
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      <div className="p-4 space-y-6 flex-1">
        {/* 欢迎看板 */}
        <section className="relative h-44 rounded-[2.2rem] overflow-hidden shadow-2xl shadow-blue-900/10 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#303f9f]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
          </div>
          <div className="relative z-10 h-full p-8 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">Thursday • Dec 24</span>
              <h2 className="text-2xl font-black text-white tracking-tight">早安，董陈晨 <span className="text-blue-400">.</span></h2>
            </div>
            <p className="text-[13px] text-blue-50/70 font-medium leading-relaxed italic border-l-2 border-blue-500/30 pl-3">
              “销售策略的核心是：比客户更懂他的业务痛点。”
            </p>
          </div>
        </section>

        {/* 今日日程 */}
        <section className="space-y-3 shrink-0">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-slate-800">今日日程</h2>
            <button onClick={onNavigateToAllSchedules} className="text-[10px] text-slate-400 font-bold hover:text-blue-600 transition-colors">
              全部日程 {'>'}
            </button>
          </div>
          <div className="space-y-4">
            {mockSchedules.filter(s => s.type === 'today').map((schedule) => (
              <div key={schedule.id} onClick={() => onScheduleClick?.(schedule)} className="bg-white p-5 rounded-[2.2rem] border border-slate-100 shadow-sm relative overflow-hidden active:scale-95 transition-all cursor-pointer group">
                <div className="flex gap-5 items-stretch">
                  <div className="flex flex-col items-center shrink-0 w-10 py-1">
                    <span className="text-sm font-black text-slate-900 leading-none">{schedule.time}</span>
                    <div className="w-0.5 flex-1 bg-blue-100 my-2 rounded-full min-h-[30px]" />
                    <span className="text-xs font-bold text-slate-300 leading-none">{schedule.endTime}</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">{schedule.title}</h3>
                        {schedule.isCoVisit && <span className="bg-emerald-50 text-emerald-600 text-[8px] font-black px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-tighter shrink-0">协访</span>}
                      </div>
                      <div className="text-slate-400 text-[10px] font-bold mt-1 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-blue-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {schedule.customer}
                      </div>
                    </div>
                    <div className="mt-4">
                      <button onClick={(e) => { e.stopPropagation(); onStartRecording?.(); }} className="w-full bg-blue-600 text-white py-2 rounded-xl text-xs font-bold shadow-md shadow-blue-100">开始沟通</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 今日待办 */}
        <section className="space-y-3 shrink-0">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-slate-800">今日待办</h2>
            <button onClick={onNavigateToAllTodos} className="text-[10px] text-slate-400 font-bold hover:text-blue-600 transition-colors">
              全部待办 {'>'}
            </button>
          </div>
          <div className="bg-white rounded-[2.2rem] border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
            {displayedOverdue.map((todo) => (
              <div key={todo.id} className="p-4 flex items-center gap-4 active:bg-slate-50 transition-colors">
                <button onClick={() => handleTaskAction('complete', todo.id)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${todo.completed ? 'bg-emerald-500 border-emerald-500' : 'border-red-200 bg-red-50/50'}`}>
                   {todo.completed && <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-bold truncate ${todo.completed ? 'line-through text-slate-300' : 'text-slate-900'}`}>{todo.title}</h4>
                    <span className="text-[7px] font-black px-1.5 py-0.5 bg-red-500 text-white rounded uppercase tracking-tighter shrink-0">逾期</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium truncate">{todo.sub}</p>
                </div>
                <div className="text-[10px] font-bold text-red-500 shrink-0">{todo.date.substring(5)}</div>
              </div>
            ))}
            {todayTodos.map((todo) => (
              <div key={todo.id} className="p-4 flex items-center gap-4 active:bg-slate-50 transition-colors">
                <button onClick={() => handleTaskAction('complete', todo.id)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${todo.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200'}`}>
                   {todo.completed && <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>}
                </button>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-bold truncate ${todo.completed ? 'line-through text-slate-300' : 'text-slate-900'}`}>{todo.title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium truncate">{todo.sub}</p>
                </div>
                <div className="text-[10px] font-bold text-slate-400 shrink-0">今天 {todo.time}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 情报中心 */}
        <section className="space-y-4 pb-8">
          <div className="px-1 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800">情报中心</h2>
            <span className="text-[10px] text-slate-400 font-bold tracking-tight">近两周核心信号</span>
          </div>
          <div className="space-y-3">
            {signals.map((signal) => {
              const colors = getSignalColors(signal.type);
              return (
                <div key={signal.id} onMouseDown={() => startSignalPress(signal)} onMouseUp={cancelSignalPress} onMouseLeave={cancelSignalPress} onTouchStart={() => startSignalPress(signal)} onTouchEnd={cancelSignalPress} className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3 relative overflow-hidden transition-all select-none ${pressingSignalId === signal.id ? 'scale-[0.98] bg-blue-50/50 ring-2 ring-blue-400/20' : 'active:bg-slate-50'}`}>
                  <div className="flex items-center justify-between"><h3 className="text-sm font-black text-slate-900 tracking-tight leading-none truncate">{signal.customer}</h3></div>
                  <div className="flex flex-wrap gap-2">
                    {signal.tags.map((tag, idx) => (
                      <div key={idx} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border ${colors.bg} ${colors.text} ${colors.border} text-[9px] font-black uppercase tracking-tighter shadow-sm`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-dashed border-slate-100"><p className="text-[11px] text-slate-600 leading-relaxed font-medium"><span className="text-slate-900 font-black">AI 摘要：</span>{signal.aiSummary}</p></div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-[9px] font-bold tracking-tight text-slate-400"><span>来自 </span><span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200/50">{signal.source}</span></div>
                    <button onClick={(e) => { e.stopPropagation(); onNavigateToAsk?.(`分析一下 ${signal.customer} 的信号。`); }} className="flex items-center gap-1 text-[10px] font-black text-blue-600 hover:text-blue-700 active:scale-95 transition-all">查看沟通<svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg></button>
                  </div>
                  {pressingSignalId === signal.id && <div className="absolute bottom-0 left-0 h-1 bg-blue-600 animate-[signal-press-progress_3s_linear_forwards]" />}
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <style>{`@keyframes signal-press-progress { from { width: 0%; } to { width: 100%; } }`}</style>
      {showOverdueModal && <OverdueTaskModal tasks={overdueTodos} onClose={() => setShowOverdueModal(false)} onAction={handleTaskAction} />}
    </div>
  );
};

export default HomeView;
