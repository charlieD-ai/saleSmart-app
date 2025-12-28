
import React, { useState, useRef, useEffect, useMemo } from 'react';

interface MeddicStatus {
  M: 'full' | 'half' | 'none';
  E: 'full' | 'half' | 'none';
  D1: 'full' | 'half' | 'none';
  D2: 'full' | 'half' | 'none';
  I: 'full' | 'half' | 'none';
  C: 'full' | 'half' | 'none';
}

interface Opportunity {
  id: string;
  name: string;
  type: '软件新签' | '软件增购';
  status: '进行中' | '已赢单' | '已输单';
  stage: '立项首访' | '需求调研' | '方案呈现' | '商务谈判' | '合同签署';
  commCount: number;
  lastCommTime: string;
  meddic: MeddicStatus;
  summary: {
    progress: string;
    nextStep: string;
    competitors: string;
    concerns: string;
  };
}

interface OpportunityViewProps {
  onNavigateToAsk?: (prompt: string) => void;
}

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    name: '云学堂总部采购项目',
    type: '软件新签',
    status: '进行中',
    stage: '商务谈判',
    commCount: 12,
    lastCommTime: '12/23 10:00',
    meddic: { M: 'full', E: 'full', D1: 'full', D2: 'half', I: 'half', C: 'none' },
    summary: {
      progress: '已完成三轮演示，进入合同初审。对方决策链清晰。',
      nextStep: '周五确认法务条款，下周一启动电子签。',
      competitors: '某友商（价格低 20%）。',
      concerns: '数据安全性证明材料合规性。'
    }
  },
  {
    id: '2',
    name: '华东区数字化转型二期',
    type: '软件增购',
    status: '进行中',
    stage: '方案呈现',
    commCount: 5,
    lastCommTime: '12/22 15:30',
    meddic: { M: 'half', E: 'none', D1: 'none', D2: 'none', I: 'none', C: 'none' },
    summary: {
      progress: 'IT侧已确认需求，业务侧访谈中。',
      nextStep: '预约业务总监访谈，确认二期核心指标。',
      competitors: '暂无明确竞争对手。',
      concerns: '实施周期是否影响现有业务。'
    }
  },
  {
    id: '3',
    name: '苏州智慧园区二期建设',
    type: '软件新签',
    status: '已赢单',
    stage: '合同签署',
    commCount: 22,
    lastCommTime: '12/24 09:15',
    meddic: { M: 'full', E: 'full', D1: 'full', D2: 'full', I: 'full', C: 'full' },
    summary: {
      progress: '合同已寄出，款项首笔预计下月到账。',
      nextStep: '对接实施团队，召开启动会。',
      competitors: '某大厂（功能不匹配）。',
      concerns: '售后响应速度。'
    }
  }
];

const STAGES = ['全部环节', '立项首访', '需求调研', '方案呈现', '商务谈判', '合同签署'];
const STATUSES = ['全部状态', '进行中', '已赢单', '已输单'];
const TYPE_FILTERS = ['全部类型', '软件新签', '软件增购'];

const MeddicIcon: React.FC<{ label: string; status: 'full' | 'half' | 'none'; onClick: () => void }> = ({ label, status, onClick }) => {
  const styles = {
    full: "bg-blue-600 text-white shadow-sm ring-2 ring-blue-100",
    half: "bg-blue-300 text-white",
    none: "bg-slate-100 text-slate-300 border border-slate-200"
  };

  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 transition-transform active:scale-90 ${styles[status]}`}
    >
      {label}
    </button>
  );
};

const OpportunityView: React.FC<OpportunityViewProps> = ({ onNavigateToAsk }) => {
  const [search, setSearch] = useState('');
  const [isExpandedMode, setIsExpandedMode] = useState(true);
  const [selectedStage, setSelectedStage] = useState('全部环节');
  const [selectedStatus, setSelectedStatus] = useState('全部状态');
  const [selectedType, setSelectedType] = useState('全部类型');
  
  const [pressingId, setPressingId] = useState<string | null>(null);
  const pressTimer = useRef<number | null>(null);

  const startPress = (id: string, name: string) => {
    setPressingId(id);
    pressTimer.current = window.setTimeout(() => {
      onNavigateToAsk?.(`[深度洞察] 请基于商机 "${name}" 提供 5 秒长按触发的专项 AI 建议分析。`);
      setPressingId(null);
    }, 5000);
  };

  const cancelPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    setPressingId(null);
  };

  useEffect(() => {
    return () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
    };
  }, []);

  const filteredOpps = useMemo(() => {
    return mockOpportunities.filter(opp => {
      const matchSearch = opp.name.toLowerCase().includes(search.toLowerCase());
      const matchStage = selectedStage === '全部环节' || opp.stage === selectedStage;
      const matchStatus = selectedStatus === '全部状态' || opp.status === selectedStatus;
      const matchType = selectedType === '全部类型' || opp.type === selectedType;
      return matchSearch && matchStage && matchStatus && matchType;
    });
  }, [search, selectedStage, selectedStatus, selectedType]);

  return (
    <div className="p-4 space-y-4 bg-slate-50 min-h-full select-none">
      {/* 搜索栏 */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="搜索商机名称" 
          className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 px-10 text-[11px] focus:ring-1 focus:ring-blue-500 shadow-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg className="absolute left-3.5 top-3 text-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>

      {/* 筛选与操作栏 */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 overflow-x-auto hide-scrollbar">
          {/* 商机类型筛选 */}
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 shadow-sm outline-none active:bg-slate-50 shrink-0"
          >
            {TYPE_FILTERS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          {/* 商机环节筛选 */}
          <select 
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 shadow-sm outline-none active:bg-slate-50 shrink-0"
          >
            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          
          {/* 商机状态筛选 */}
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 shadow-sm outline-none active:bg-slate-50 shrink-0"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex bg-slate-200/50 p-0.5 rounded-xl shrink-0">
          <button onClick={() => setIsExpandedMode(false)} className={`p-1.5 rounded-lg transition-all ${!isExpandedMode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button onClick={() => setIsExpandedMode(true)} className={`p-1.5 rounded-lg transition-all ${isExpandedMode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>
      </div>

      {/* 商机列表 */}
      <div className="space-y-4 pb-24">
        {filteredOpps.length > 0 ? filteredOpps.map((opp) => (
          <div 
            key={opp.id} 
            onTouchStart={() => startPress(opp.id, opp.name)}
            onTouchEnd={cancelPress}
            onMouseDown={() => startPress(opp.id, opp.name)}
            onMouseUp={cancelPress}
            onMouseLeave={cancelPress}
            className={`bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm space-y-4 transition-all duration-[5000ms] ease-linear overflow-hidden relative ${
              pressingId === opp.id ? 'scale-[0.98] bg-blue-50/50 ring-2 ring-blue-400/20' : 'active:bg-slate-50'
            }`}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                   <h3 className="text-sm font-black text-slate-900 truncate tracking-tight">{opp.name}</h3>
                   <div className="flex gap-1">
                      <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg font-black shrink-0 uppercase tracking-tighter border border-blue-100">
                        {opp.stage}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-lg font-black shrink-0 uppercase tracking-tighter border ${
                        opp.status === '已赢单' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        opp.status === '已输单' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                        'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        {opp.status}
                      </span>
                   </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold">
                  <div className="flex items-center gap-1 shrink-0">
                    <svg className="w-3.5 h-3.5 text-blue-500/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    {opp.commCount}次
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <svg className="w-3.5 h-3.5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {opp.lastCommTime}
                  </div>
                </div>
              </div>
            </div>

            {/* MEDDIC 指标 */}
            <div className="flex items-center justify-between gap-1.5 py-1">
              <div className="flex gap-2.5">
                <MeddicIcon label="M" status={opp.meddic.M} onClick={() => onNavigateToAsk?.(`分析商机 "${opp.name}" 的 Money (资金/预算) 准备情况。`)} />
                <MeddicIcon label="E" status={opp.meddic.E} onClick={() => onNavigateToAsk?.(`分析商机 "${opp.name}" 的 Economic Buyer (经济决策者) 情况。`)} />
                <MeddicIcon label="D" status={opp.meddic.D1} onClick={() => onNavigateToAsk?.(`分析商机 "${opp.name}" 的 Decision Criteria 情况。`)} />
                <MeddicIcon label="D" status={opp.meddic.D2} onClick={() => onNavigateToAsk?.(`分析商机 "${opp.name}" 的 Decision Process 情况。`)} />
                <MeddicIcon label="I" status={opp.meddic.I} onClick={() => onNavigateToAsk?.(`分析商机 "${opp.name}" 的 Identify Pain 情况。`)} />
                <MeddicIcon label="C" status={opp.meddic.C} onClick={() => onNavigateToAsk?.(`分析商机 "${opp.name}" 的 Champion 情况。`)} />
              </div>
            </div>

            {isExpandedMode && (
              <div className="bg-slate-50/70 rounded-[1.5rem] p-4 border border-slate-100/50 space-y-3 pointer-events-none">
                <div className="grid grid-cols-1 gap-2.5">
                  <CompactItem label="核心进展" content={opp.summary.progress} color="blue" />
                  <CompactItem label="下一步动作" content={opp.summary.nextStep} color="emerald" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200/60">
                  <CompactItem label="竞争格局" content={opp.summary.competitors} color="orange" />
                  <CompactItem label="关键顾虑" content={opp.summary.concerns} color="rose" />
                </div>
              </div>
            )}

            {pressingId === opp.id && (
              <div className="absolute bottom-0 left-0 h-1 bg-blue-500/20 w-full overflow-hidden">
                <div className="h-full bg-blue-600 animate-[progress_5s_linear_forwards]"></div>
              </div>
            )}
          </div>
        )) : (
          <div className="py-20 text-center space-y-2">
            <div className="text-slate-300 font-bold text-sm italic">未找到匹配的商机</div>
            <button onClick={() => {setSearch(''); setSelectedStage('全部环节'); setSelectedStatus('全部状态'); setSelectedType('全部类型');}} className="text-blue-500 text-[11px] font-black underline">重置所有筛选</button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

const CompactItem: React.FC<{ label: string; content: string; color: 'blue' | 'emerald' | 'orange' | 'rose' }> = ({ label, content, color }) => {
  const colors = { 
    blue: "text-blue-600", 
    emerald: "text-emerald-600", 
    orange: "text-orange-600", 
    rose: "text-rose-600" 
  };
  return (
    <div className="min-w-0">
      <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${colors[color]}`}>{label}</div>
      <p className="text-[11px] text-slate-600 font-medium leading-relaxed font-bold line-clamp-2">{content}</p>
    </div>
  );
};

export default OpportunityView;
