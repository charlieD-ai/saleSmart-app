
import React, { useState, useMemo } from 'react';
import { Todo } from '../types';

interface AllTodosViewProps {
  todos: Todo[];
  onBack: () => void;
  onAction: (action: 'complete' | 'delete' | 'postpone' | 'add', payload?: any) => void;
  todayStr: string;
}

type FilterType = 'all' | 'today' | 'overdue';

const AllTodosView: React.FC<AllTodosViewProps> = ({ todos, onBack, onAction, todayStr }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', sub: '', date: todayStr, time: '09:00' });

  const filteredTodos = useMemo(() => {
    let list = [...todos];
    if (activeFilter === 'overdue') {
      list = list.filter(t => !t.completed && t.date < todayStr);
    } else if (activeFilter === 'today') {
      list = list.filter(t => t.date === todayStr);
    } else {
      list = list.filter(t => !t.completed || t.date >= todayStr);
    }
    // Sort: Incomplete first, then by date/time
    return list.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
    });
  }, [todos, activeFilter, todayStr]);

  const handleAddSubmit = () => {
    if (!newTodo.title.trim()) return;
    onAction('add', { ...newTodo, id: Date.now(), urgent: false, completed: false });
    setNewTodo({ title: '', sub: '', date: todayStr, time: '09:00' });
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden relative">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-20 border-b border-slate-100">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-1 -ml-1 text-slate-900 active:scale-90 transition-transform">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
             </button>
             <h2 className="text-xl font-bold text-slate-900 tracking-tight">全部待办</h2>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100 active:scale-90 transition-all"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 p-1 rounded-2xl flex relative h-12 shadow-inner">
          <TabButton active={activeFilter === 'all'} label="全部" onClick={() => setActiveFilter('all')} />
          <TabButton active={activeFilter === 'today'} label="今日" onClick={() => setActiveFilter('today')} />
          <TabButton active={activeFilter === 'overdue'} label="逾期" onClick={() => setActiveFilter('overdue')} />
        </div>
      </header>

      {/* List Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-4 pb-32">
        {filteredTodos.map(t => (
          <SwipeableTodoItem 
            key={t.id} 
            todo={t} 
            onAction={(action, id) => onAction(action as any, id)} 
            isOverdue={t.date < todayStr && !t.completed} 
          />
        ))}

        {filteredTodos.length === 0 && (
          <div className="py-32 text-center space-y-5">
             <div className="w-20 h-20 bg-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
                <svg className="w-10 h-10 text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
             </div>
             <div className="space-y-1">
                <p className="text-sm font-black text-slate-400">当前没有待办事项</p>
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Everything is up to date</p>
             </div>
          </div>
        )}
      </div>

      {/* Add Todo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="w-full max-w-[375px] bg-white rounded-t-[2.5rem] p-8 pb-12 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center">
                 <h4 className="text-xl font-black text-slate-900">新建待办</h4>
                 <button onClick={() => setShowAddModal(false)} className="text-slate-400 p-1">
                   <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                 </button>
              </div>
              
              <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">任务名称</label>
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="例如：发送合同给张总"
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition-all"
                      value={newTodo.title}
                      onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">关联信息</label>
                    <input 
                      type="text" 
                      placeholder="例如：数字化运营平台升级项目"
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition-all"
                      value={newTodo.sub}
                      onChange={(e) => setNewTodo({...newTodo, sub: e.target.value})}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">日期</label>
                       <input 
                         type="date" 
                         className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition-all"
                         value={newTodo.date}
                         onChange={(e) => setNewTodo({...newTodo, date: e.target.value})}
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">时间</label>
                       <input 
                         type="time" 
                         className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition-all"
                         value={newTodo.time}
                         onChange={(e) => setNewTodo({...newTodo, time: e.target.value})}
                       />
                    </div>
                 </div>
              </div>

              <button 
                onClick={handleAddSubmit}
                disabled={!newTodo.title.trim()}
                className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 active:scale-95 transition-all uppercase tracking-widest text-sm disabled:bg-slate-200"
              >
                保存并创建
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center rounded-xl transition-all duration-300 z-10 ${active ? 'bg-white shadow-sm' : ''}`}
  >
    <span className={`text-[13px] font-black transition-colors ${active ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
  </button>
);

const SwipeableTodoItem: React.FC<{ todo: Todo; onAction: (action: string, taskId: string | number) => void; isOverdue?: boolean }> = ({ todo, onAction, isOverdue }) => {
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const threshold = -160;

  const onStart = (clientX: number) => {
    setStartX(clientX);
    setIsSwiping(true);
  };

  const onMove = (clientX: number) => {
    if (!isSwiping) return;
    const diff = clientX - startX;
    const currentOffset = isOpened ? threshold + diff : diff;
    setOffsetX(Math.min(0, currentOffset));
  };

  const onEnd = () => {
    setIsSwiping(false);
    if (offsetX < threshold / 2.5) {
      setOffsetX(threshold);
      setIsOpened(true);
    } else {
      setOffsetX(0);
      setIsOpened(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all duration-300">
      {/* Action Buttons Background */}
      <div className="absolute inset-0 flex justify-end items-stretch pointer-events-none">
        <div className="w-[160px] flex items-stretch">
          <button 
            onClick={() => { onAction('postpone', todo.id); setOffsetX(0); setIsOpened(false); }}
            className="flex-1 bg-blue-500 text-white flex flex-col items-center justify-center gap-1.5 pointer-events-auto active:bg-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[8px] font-black uppercase tracking-widest">推迟</span>
          </button>
          <button 
            onClick={() => { onAction('delete', todo.id); setOffsetX(0); setIsOpened(false); }}
            className="flex-1 bg-slate-900 text-white flex flex-col items-center justify-center gap-1.5 pointer-events-auto active:bg-black transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <span className="text-[8px] font-black uppercase tracking-widest">删除</span>
          </button>
        </div>
      </div>

      {/* Main Content Layer - Styled to match HomeView */}
      <div 
        onMouseDown={(e) => onStart(e.clientX)}
        onMouseMove={(e) => onMove(e.clientX)}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={(e) => onStart(e.touches[0].clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
        onTouchEnd={onEnd}
        style={{ transform: `translateX(${offsetX}px)`, transition: isSwiping ? 'none' : 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)' }}
        className="relative bg-white p-5 flex items-center gap-4 active:bg-slate-50 transition-colors select-none"
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onAction('complete', todo.id); }}
          className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all shrink-0 ${
            todo.completed ? 'bg-emerald-500 border-emerald-500 shadow-sm' : isOverdue ? 'border-red-200 bg-red-50/50' : 'border-slate-100'
          }`}
        >
          {todo.completed && (
            <svg className="w-5 h-5 text-white animate-in zoom-in duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className={`text-sm font-bold truncate tracking-tight transition-all duration-300 ${
              todo.completed ? 'line-through text-slate-300 decoration-slate-300' : 'text-slate-900'
            }`}>
              {todo.title}
            </h4>
            {isOverdue && (
              <span className="text-[7px] font-black px-1.5 py-0.5 bg-red-500 text-white rounded-[4px] uppercase tracking-tighter shrink-0">逾期</span>
            )}
          </div>
          <p className={`text-[10px] font-bold truncate tracking-tight transition-colors duration-300 ${
            todo.completed ? 'text-slate-300' : 'text-slate-400'
          }`}>
            {todo.sub}
          </p>
        </div>

        <div className="flex flex-col items-end gap-0.5 shrink-0 ml-2">
           <span className={`text-[10px] font-black tabular-nums ${
             todo.completed ? 'text-slate-300' : isOverdue ? 'text-red-500' : 'text-slate-400'
           }`}>
             {todo.time}
           </span>
           <span className={`text-[8px] font-black uppercase tracking-widest ${
             todo.completed ? 'text-slate-200' : 'text-slate-300'
           }`}>
             {todo.date.substring(5)}
           </span>
        </div>
      </div>
    </div>
  );
};

export default AllTodosView;
