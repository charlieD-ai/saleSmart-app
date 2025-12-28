
import React, { useState, useEffect } from 'react';
import { TabType, CommunicationRecord, Schedule, Todo } from './types';
import { ICONS } from './constants';
import HomeView from './components/HomeView';
import CustomersMainView from './components/CustomersMainView';
import CommunicationView from './components/CommunicationView';
import CommunicationDetailView from './components/CommunicationDetailView';
import AskView from './components/AskView';
import ProfileView from './components/ProfileView';
import RecordingView from './components/RecordingView';
import FloatingRecorder from './components/FloatingRecorder';
import AuthView from './components/AuthView';
import PRDView from './components/PRDView';
import ScheduleDetailView from './components/ScheduleDetailView';
import AllSchedulesView from './components/AllSchedulesView';
import AllTodosView from './components/AllTodosView';

type RecordingStatus = 'none' | 'recording' | 'paused' | 'minimized';
type Language = 'zh' | 'en';

const INITIAL_COMMUNICATIONS: CommunicationRecord[] = [
  {
    id: '1',
    customerName: '绚星智慧科技有限公司',
    title: '云学堂总部采购项目 - 立项后首访',
    participants: ['董陈晨', '张总'],
    date: '2025/12/20 14:30',
    duration: '12:45',
    summary: '项目初步需求和目标达成一致，客户团队反馈积极。针对功能集成和数据同步问题进行了详细探讨，提出了优化方案。确定下阶段时间节点，双方将制定详细实施计划。',
    tags: ['竞品威胁: 价格更低'],
    scores: { ability: 85, task: 92 },
    status: 'success'
  },
  {
    id: '2',
    customerName: '苏州智慧园区管委会',
    title: '云学堂演示平台 - 需求调研',
    participants: ['董陈晨', '李经理', '王总监'],
    date: '2025/12/19 16:20',
    duration: '18:21',
    summary: '团队讨论了云学堂演示平台的具体需求，包括功能模块、用户权限、数据安全等方面。客户提出了多个关键问题，涉及系统集成、性能优化和后续维护等。',
    tags: ['异议提出: 价格太高'],
    scores: { ability: 78, task: 82 },
    status: 'success'
  }
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [language, setLanguage] = useState<Language>('zh');
  const [activeTab, setActiveTab] = useState<TabType | 'comm_detail' | 'schedule_detail' | 'all_schedules' | 'all_todos'>('home');
  const [selectedCommId, setSelectedCommId] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>('none');
  const [aiPreFill, setAiPreFill] = useState('');
  const [communications, setCommunications] = useState<CommunicationRecord[]>(INITIAL_COMMUNICATIONS);
  
  // Mock schedules and todos data
  const [allSchedules] = useState<Schedule[]>([
    { id: '3', time: '14:00', endTime: '15:00', date: '2025年12月24日', title: '云学堂演示平台 - 需求调研', customer: '绚星智慧科技有限公司', stage: '需求调研', type: 'today', isCoVisit: false, owner: '董陈晨', internalParticipants: ['董陈晨', '产品专家'], clientParticipants: ['张总', 'IT总监'] },
    { id: '4', time: '16:30', endTime: '17:30', date: '2025年12月24日', title: '跟进回访：采购意向确认', customer: '张总 (个人)', stage: '商务谈判', type: 'today', isCoVisit: true, owner: '王经理', internalParticipants: ['董陈晨', '王经理'], clientParticipants: ['张总'] },
    { id: '5', time: '10:00', endTime: '12:00', date: '2025年12月25日', title: '专利技术交底沟通会', customer: '13951682173', stage: '方案呈现', type: 'upcoming', isCoVisit: false, owner: '董陈晨', internalParticipants: ['董陈晨'], clientParticipants: [] },
  ]);
  
  const [allTodos, setAllTodos] = useState<Todo[]>([
    { id: 1, title: '发送合同给 张总', sub: '数字化运营平台升级项目', date: '2025-12-20', time: '18:00', urgent: false, completed: false },
    { id: 2, title: '约客户确认项目里程碑', sub: '云学堂演示平台', date: '2025-12-21', time: '14:00', urgent: true, completed: false },
    { id: 4, title: '核对回款账期', sub: '纳星智慧', date: '2025-12-22', time: '10:00', urgent: false, completed: false },
    { id: 3, title: '预约演示时间', sub: '苏州智慧园区', date: '2025-12-24', time: '14:00', urgent: false, completed: false },
  ]);

  const labels = {
    zh: { home: '首页', comm: '沟通', cust: '客户', ask: 'Ask AI', hi: '嗨，董陈晨 👋', sub: 'SaleSmart 销售智能助手' },
    en: { home: 'Home', comm: 'Comms', cust: 'Clients', ask: 'Ask AI', hi: 'Hi, Chen 👋', sub: 'SaleSmart AI Assistant' }
  }[language];

  const triggerAskAI = (prompt: string) => {
    setAiPreFill(prompt);
    setActiveTab('ask');
  };

  const handleStartRecording = () => {
    setRecordingStatus('recording');
  };

  const handleCommClick = (commId: string) => {
    setSelectedCommId(commId);
    setActiveTab('comm_detail');
  };

  const handleScheduleClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setActiveTab('schedule_detail');
  };

  const handleNavigateToAllSchedules = () => {
    setActiveTab('all_schedules');
  };

  const handleNavigateToAllTodos = () => {
    setActiveTab('all_todos');
  };

  const handleTodoAction = (action: 'complete' | 'delete' | 'postpone' | 'add', payload?: any) => {
    setAllTodos(prev => {
      if (action === 'add' && payload) {
        return [...prev, payload];
      }
      if (action === 'delete' && payload) {
        return prev.filter(t => t.id !== payload);
      }
      if (payload) {
        return prev.map(t => {
          if (t.id === payload) {
            if (action === 'complete') return { ...t, completed: !t.completed };
            if (action === 'postpone') return { ...t, date: '2025-12-24' };
          }
          return t;
        });
      }
      return prev;
    });
  };

  const handleFinishRecording = (newRecord: any) => {
    const record: CommunicationRecord = {
      id: Date.now().toString(),
      customerName: newRecord.customerName || '未知客户',
      title: newRecord.title || '新沟通记录',
      participants: ['董陈晨'],
      date: new Date().toLocaleString(),
      duration: newRecord.duration,
      summary: newRecord.summary,
      tags: newRecord.signals || [],
      scores: { ability: newRecord.abilityScore || 0, task: newRecord.taskScore || 0 },
      status: 'success'
    };
    setCommunications([record, ...communications]);
    setRecordingStatus('none');
    handleCommClick(record.id);
  };

  if (!isLoggedIn) {
    return <AuthView onLogin={() => setIsLoggedIn(true)} lang={language} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView onNavigateToAsk={triggerAskAI} communications={communications} onCommClick={handleCommClick} onStartRecording={handleStartRecording} onScheduleClick={handleScheduleClick} onNavigateToAllSchedules={handleNavigateToAllSchedules} onNavigateToAllTodos={handleNavigateToAllTodos} />;
      case 'communications': return <CommunicationView communications={communications} onCommClick={handleCommClick} />;
      case 'comm_detail': {
        const comm = communications.find(c => c.id === selectedCommId);
        return comm ? <CommunicationDetailView comm={comm} onBack={() => setActiveTab('communications')} /> : null;
      }
      case 'schedule_detail': {
        return selectedSchedule ? <ScheduleDetailView schedule={selectedSchedule} onBack={() => setActiveTab('home')} onStart={() => { handleStartRecording(); setActiveTab('home'); }} /> : null;
      }
      case 'all_schedules': return <AllSchedulesView schedules={allSchedules} onBack={() => setActiveTab('home')} onScheduleClick={handleScheduleClick} />;
      case 'all_todos': return <AllTodosView todos={allTodos} onBack={() => setActiveTab('home')} onAction={handleTodoAction} todayStr="2025-12-24" />;
      case 'customers': return <CustomersMainView onNavigateToAsk={triggerAskAI} />;
      case 'ask': return <AskView initialPrompt={aiPreFill} onClearPrompt={() => setAiPreFill('')} />;
      case 'profile': return <ProfileView onBack={() => setActiveTab('home')} lang={language} onLangChange={setLanguage} onLogout={() => setIsLoggedIn(false)} />;
      default: return <HomeView onNavigateToAsk={triggerAskAI} communications={communications} onCommClick={handleCommClick} onStartRecording={handleStartRecording} onScheduleClick={handleScheduleClick} onNavigateToAllSchedules={handleNavigateToAllSchedules} onNavigateToAllTodos={handleNavigateToAllTodos} />;
    }
  };

  const showFooter = !['profile', 'comm_detail', 'schedule_detail', 'all_schedules', 'all_todos'].includes(activeTab) && recordingStatus !== 'recording' && recordingStatus !== 'paused';

  const getPrdViewType = () => {
    if (recordingStatus === 'recording' || recordingStatus === 'paused') return 'recording';
    return activeTab as any;
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-200/50">
        <div className="flex flex-col h-[812px] w-[375px] bg-slate-50 relative overflow-hidden rounded-[3rem] shadow-2xl border-[8px] border-slate-900 shrink-0">
          {!['profile', 'comm_detail', 'schedule_detail', 'all_schedules', 'all_todos'].includes(activeTab) && (
            <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
              <button onClick={() => setActiveTab('profile')} className="flex items-center gap-3 active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md border-2 border-white text-xs">董</div>
                <div className="text-left">
                  <h1 className="text-sm font-semibold text-slate-900 leading-none mb-1">{labels.hi}</h1>
                  <p className="text-[10px] text-slate-500">{labels.sub}</p>
                </div>
              </button>
              <div className="flex gap-2">
                <button onClick={handleStartRecording} className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-100 active:scale-90 transition-all">
                  <ICONS.Mic className="w-5 h-5" />
                </button>
              </div>
            </header>
          )}

          <main className={`flex-1 overflow-y-auto hide-scrollbar ${showFooter ? 'pb-24' : ''}`}>
            {renderContent()}
          </main>

          {showFooter && (
            <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-2 py-2 pb-6 flex justify-around items-end z-30">
              <NavItem active={activeTab === 'home'} label={labels.home} icon={<ICONS.Home />} onClick={() => setActiveTab('home')} />
              <NavItem active={activeTab === 'communications'} label={labels.comm} icon={<ICONS.Communication />} onClick={() => setActiveTab('communications')} />
              <NavItem active={activeTab === 'customers'} label={labels.cust} icon={<ICONS.Customer />} onClick={() => setActiveTab('customers')} />
              <NavItem active={activeTab === 'ask'} label={labels.ask} icon={<ICONS.Ask />} onClick={() => setActiveTab('ask')} />
            </nav>
          )}

          {(recordingStatus === 'recording' || recordingStatus === 'paused') && (
            <RecordingView 
              status={recordingStatus}
              onStatusChange={setRecordingStatus}
              onMinimize={() => setRecordingStatus('minimized')}
              onFinish={handleFinishRecording}
            />
          )}
          {recordingStatus === 'minimized' && (
            <FloatingRecorder onExpand={() => setRecordingStatus('recording')} onClose={() => setRecordingStatus('none')} />
          )}
        </div>
      </div>

      <div className="w-[600px] shrink-0 hidden lg:block overflow-hidden">
        <PRDView currentView={getPrdViewType()} />
      </div>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; label: string; icon: React.ReactNode; onClick: () => void }> = ({ active, label, icon, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 w-16 transition-all duration-200 ${active ? 'text-blue-600' : 'text-slate-400'}`}>
    <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-blue-50' : 'bg-transparent'}`}>{icon}</div>
    <span className="text-[10px] font-medium tracking-wide">{label}</span>
  </button>
);

export default App;
