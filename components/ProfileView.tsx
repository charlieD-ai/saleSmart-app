
import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const radarData = [
  { subject: '沟通能力', 个人: 120, 团队平均: 110, fullMark: 150 },
  { subject: '方案能力', 个人: 98, 团队平均: 105, fullMark: 150 },
  { subject: '商务能力', 个人: 86, 团队平均: 90, fullMark: 150 },
  { subject: '执行能力', 个人: 99, 团队平均: 92, fullMark: 150 },
  { subject: '学习能力', 个人: 85, 团队平均: 88, fullMark: 150 },
  { subject: '协作能力', 个人: 65, 团队平均: 80, fullMark: 150 },
];

const achievementData = [
  { month: '7月', 达成: 80, 团队平均: 75 },
  { month: '8月', 达成: 82, 团队平均: 76 },
  { month: '9月', 达成: 85, 团队平均: 77 },
  { month: '10月', 达成: 88, 团队平均: 79 },
  { month: '11月', 达成: 84, 团队平均: 78 },
  { month: '12月', 达成: 92, 团队平均: 82 },
];

type TimeRange = 'week' | 'month' | 'quarter' | 'year';

interface ProfileViewProps {
  onBack: () => void;
  lang: 'zh' | 'en';
  onLangChange: (lang: 'zh' | 'en') => void;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onBack, lang, onLangChange, onLogout }) => {
  const [currentSubView, setCurrentSubView] = useState<'dashboard' | 'settings'>('dashboard');
  const [activeRange, setActiveRange] = useState<TimeRange>('month');

  const statsData: Record<TimeRange, { count: number, countAvg: number, duration: number, durationAvg: number }> = {
    week: { count: 8, countAvg: 6, duration: 12.5, durationAvg: 10.2 },
    month: { count: 28, countAvg: 22, duration: 45.8, durationAvg: 38.5 },
    quarter: { count: 92, countAvg: 78, duration: 152.0, durationAvg: 128.4 },
    year: { count: 365, countAvg: 310, duration: 624.5, durationAvg: 540.2 },
  };

  const t = {
    zh: { title: "个人主页", team: "切换至团队端", stats1: "沟通次数", stats2: "沟通时长", portrait: "能力画像", taskEval: "任务评估", logout: "退出登录", settings: "设置", lang: "语言设置" },
    en: { title: "Profile", team: "Switch to Team", stats1: "Comms Count", stats2: "Comms Duration", portrait: "Ability Portrait", taskEval: "Task Evaluation", logout: "Sign Out", settings: "Settings", lang: "Language" }
  }[lang];

  if (currentSubView === 'settings') {
    return <SettingsView onBack={() => setCurrentSubView('dashboard')} lang={lang} onLangChange={onLangChange} />;
  }

  const currentStats = statsData[activeRange];

  return (
    <div className="min-h-full bg-slate-50 pb-24">
      <div className="bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 text-slate-400">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h2 className="text-base font-bold text-slate-900">{t.title}</h2>
        </div>
        <button 
          onClick={() => setCurrentSubView('settings')}
          className="p-2 text-slate-600 active:scale-95 transition-transform"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>

      <div className="p-4 space-y-5">
        {/* User Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-200 border-2 border-white">董</div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">董陈晨</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Senior Account Manager</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="px-1 flex gap-6 border-b border-slate-100 overflow-x-auto hide-scrollbar">
           <RangeButton active={activeRange === 'week'} label="本周" onClick={() => setActiveRange('week')} />
           <RangeButton active={activeRange === 'month'} label="本月" onClick={() => setActiveRange('month')} />
           <RangeButton active={activeRange === 'quarter'} label="本季度" onClick={() => setActiveRange('quarter')} />
           <RangeButton active={activeRange === 'year'} label="本年" onClick={() => setActiveRange('year')} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatBox 
            label={t.stats1} 
            val={currentStats.count.toString()} 
            unit="次" 
            subLabel="团队平均" 
            subVal={`${currentStats.countAvg}次`}
          />
          <StatBox 
            label={t.stats2} 
            val={Math.round(currentStats.duration).toString()} 
            unit="小时" 
            subLabel="团队平均" 
            subVal={`${Math.round(currentStats.durationAvg)}h`}
          />
        </div>

        {/* 能力画像 */}
        <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            {t.portrait}
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} />
                <Radar name="个人" dataKey="个人" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} strokeWidth={2} />
                <Radar name="团队平均" dataKey="团队平均" stroke="#cbd5e1" fill="#94a3b8" fillOpacity={0.1} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 任务评估 */}
        <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              {t.taskEval}
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-0.5 bg-blue-500 rounded-full"></div>
                <span className="text-[9px] text-slate-400 font-bold">达成</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-0.5 bg-slate-300 rounded-full border-dashed border"></div>
                <span className="text-[9px] text-slate-400 font-bold">平均</span>
              </div>
            </div>
          </h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={achievementData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                />
                <YAxis 
                  domain={[0, 100]} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="达成" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="团队平均" 
                  stroke="#cbd5e1" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={{ r: 3, fill: '#cbd5e1' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="pt-4 space-y-4">
          <button className="relative w-full overflow-hidden bg-white p-6 rounded-[2.2rem] flex items-center justify-between border border-slate-100 shadow-sm active:scale-[0.98] transition-all group">
            <div className="relative z-10 flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <span className="block text-slate-900 text-base font-black tracking-tight leading-none">{t.team}</span>
                <span className="block text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Team Insights Hub</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-slate-300 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          <button 
            onClick={onLogout}
            className="w-full py-4 bg-white text-rose-500 text-sm font-black rounded-[2rem] border border-rose-50 shadow-sm active:bg-rose-50 transition-colors uppercase tracking-widest"
          >
            {t.logout}
          </button>
        </div>
      </div>
    </div>
  );
};

const RangeButton: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`pb-3 pt-1 relative transition-all ${active ? 'text-blue-600' : 'text-slate-400'}`}
  >
    <span className={`text-sm font-black ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full animate-in fade-in slide-in-from-bottom-1 duration-300" />
    )}
  </button>
);

const StatBox: React.FC<{ label: string; val: string; unit?: string; subLabel?: string; subVal?: string }> = ({ label, val, unit, subLabel, subVal }) => (
  <div className="bg-blue-50/30 p-5 rounded-[2.2rem] shadow-sm border border-slate-100 flex-1">
    <p className="text-[11px] text-slate-400 font-bold mb-3">{label}</p>
    <div className="flex items-baseline gap-1.5 mb-2">
      <span className="text-2xl font-black text-slate-900 tabular-nums">{val}</span>
      <span className="text-[11px] font-black text-slate-900">{unit}</span>
    </div>
    {subLabel && (
        <p className="text-[10px] text-blue-500 font-bold tracking-tight">
            {subLabel} <span className="opacity-80 ml-0.5">{subVal}</span>
        </p>
    )}
  </div>
);

const SettingsView: React.FC<{ onBack: () => void, lang: 'zh' | 'en', onLangChange: (l: 'zh' | 'en') => void }> = ({ onBack, lang, onLangChange }) => {
  const [scheduleNotif, setScheduleNotif] = useState(true);
  const [showDuration, setShowDuration] = useState(true);
  
  const t = {
    zh: { title: "设置", lang: "语言设置", currentLang: lang === 'zh' ? '中文' : 'English', notif: "日程开启通知", duration: "显示录制持续时长", voice: "声纹绑定", device: "工牌设备绑定", about: "关于", bound: "已绑定" },
    en: { title: "Settings", lang: "Language", currentLang: lang === 'zh' ? '中文' : 'English', notif: "Schedule Alerts", duration: "Show Recording Duration", voice: "Voice ID", device: "ID Badge Binding", about: "About", bound: "Verified" }
  }[lang];

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      <div className="bg-white/95 backdrop-blur-sm px-4 py-4 flex items-center justify-center border-b border-slate-100 relative shrink-0">
        <button onClick={onBack} className="absolute left-4 p-2 text-slate-600">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h2 className="text-base font-bold text-slate-900">{t.title}</h2>
      </div>

      <div className="flex-1">
        <div className="h-4" />
        
        {/* Switch Section */}
        <div className="bg-white border-y border-slate-100 divide-y divide-slate-100 px-5">
          <div className="py-4 flex items-center justify-between">
            <span className="text-[15px] text-slate-800 font-medium">{t.notif}</span>
            <Toggle active={scheduleNotif} onToggle={() => setScheduleNotif(!scheduleNotif)} />
          </div>
          <div className="py-4 flex items-center justify-between">
            <span className="text-[15px] text-slate-800 font-medium">{t.duration}</span>
            <Toggle active={showDuration} onToggle={() => setShowDuration(!showDuration)} />
          </div>
        </div>

        <div className="h-4" />

        {/* Action List Section */}
        <div className="bg-white border-y border-slate-100 divide-y divide-slate-100 px-5">
          <button className="w-full py-4 flex items-center justify-between group active:bg-slate-50 -mx-5 px-5 transition-colors">
            <span className="text-[15px] text-slate-800 font-medium">{t.voice}</span>
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-slate-400">{t.bound}</span>
              <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </button>
          <button className="w-full py-4 flex items-center justify-between group active:bg-slate-50 -mx-5 px-5 transition-colors">
            <span className="text-[15px] text-slate-800 font-medium">{t.device}</span>
            <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          
          <div className="py-4 flex items-center justify-between">
            <span className="text-[15px] text-slate-800 font-medium">{t.lang}</span>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => onLangChange('zh')}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === 'zh' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
              >
                中文
              </button>
              <button 
                onClick={() => onLangChange('en')}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        <div className="h-4" />

        <div className="bg-white border-y border-slate-100 px-5">
          <button className="w-full py-4 flex items-center justify-between group active:bg-slate-50 -mx-5 px-5 transition-colors">
            <span className="text-[15px] text-slate-800 font-medium">{t.about}</span>
            <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const Toggle: React.FC<{ active: boolean; onToggle: () => void }> = ({ active, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`w-11 h-6 rounded-full transition-colors relative ${active ? 'bg-blue-500' : 'bg-slate-200'}`}
  >
    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${active ? 'left-[22px]' : 'left-0.5'}`} />
  </button>
);

export default ProfileView;
