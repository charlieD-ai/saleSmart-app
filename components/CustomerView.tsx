
import React, { useState } from 'react';

interface PortraitTag {
  text: string;
  color: 'orange' | 'blue';
}

interface CustomerSummary {
  progress: string;
  nextStep: string;
  competitors: string;
  concerns: string;
}

interface B2CCustomer {
  id: string;
  name: string;
  stage: string;
  intention: 'High' | 'Medium' | 'Low';
  commCount: number;
  lastCommTime: string;
  portraits: PortraitTag[];
  summary: CustomerSummary;
}

interface B2BCustomer {
  id: string;
  name: string;
  contactsCount: number;
  commCount: number;
  lastCommTime: string;
  keyContact: string;
}

interface CustomerViewProps {
  onNavigateToAsk?: (prompt: string) => void;
  mode?: 'B2B' | 'B2C';
}

const mockB2BCustomers: B2BCustomer[] = [
  { id: '1', name: '绚星智慧科技有限公司', contactsCount: 4, poolCount: 28, lastCommTime: '12/24 09:30', keyContact: '张总 (CEO)' },
  { id: '2', name: '苏州智慧园区管委会', contactsCount: 12, poolCount: 15, lastCommTime: '12/23 14:20', keyContact: '李处长' },
  { id: '3', name: '华东数字化转型研究中心', contactsCount: 2, poolCount: 8, lastCommTime: '12/21 16:00', keyContact: '王博士' },
].map(c => ({...c, commCount: (c as any).poolCount })); // Mapping for backward compatibility if needed

const mockB2CCustomers: B2CCustomer[] = [
  {
    id: 'c1',
    name: '李晓明',
    stage: '方案报价',
    intention: 'High',
    commCount: 6,
    lastCommTime: '12/24 11:00',
    portraits: [
      { text: '关注优惠活动', color: 'orange' },
      { text: '关注颜色搭配', color: 'orange' },
      { text: '夫妻俩一起来', color: 'orange' },
      { text: '新房装修', color: 'blue' },
      { text: '客厅,卧室', color: 'blue' }
    ],
    summary: {
      progress: '已看中新款意式极简沙发，正在对比双十一折扣。',
      nextStep: '周六带夫人来店试坐，确认面料颜色。',
      competitors: '某凯龙实体店。',
      concerns: '甲醛释放量及配送安装时间。'
    }
  },
  {
    id: 'c2',
    name: '王女士',
    stage: '意向确认',
    intention: 'Medium',
    commCount: 3,
    lastCommTime: '12/23 15:30',
    portraits: [
      { text: '别墅配套', color: 'blue' },
      { text: '注重品牌', color: 'blue' },
      { text: '极简风格', color: 'orange' }
    ],
    summary: {
      progress: '初次进店，主要看全屋定制大样，对样板间配色满意。',
      nextStep: '上门量房并预约出初稿方案。',
      competitors: '欧派全屋定制。',
      concerns: '定制周期是否能赶在入伙前完成。'
    }
  }
];

const CustomerView: React.FC<CustomerViewProps> = ({ onNavigateToAsk, mode = 'B2B' }) => {
  const [search, setSearch] = useState('');
  const [isExpandedMode, setIsExpandedMode] = useState(true);
  const isB2C = mode === 'B2C';

  return (
    <div className="p-4 space-y-4 bg-slate-50 min-h-full">
      {/* Search & Actions Bar */}
      <div className="space-y-3">
        <div className="relative">
          <input 
            type="text" 
            placeholder={isB2C ? "搜索客户名称" : "搜索客户名称、联系人..."}
            className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 px-10 text-[11px] focus:ring-1 focus:ring-blue-500 shadow-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg className="absolute left-3.5 top-3 text-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 flex gap-2 overflow-x-auto hide-scrollbar">
            {/* 新建客户按钮 - 移至首位并统一高度 */}
            <button className="bg-blue-600 text-white px-3 py-2 rounded-xl text-[10px] font-black shadow-md shadow-blue-100 active:scale-95 transition-all shrink-0">
              + 新建客户
            </button>
            
            {/* 筛选项 - 仅在 B2C 模式下显示对应筛选项，B2B 移除行业筛选 */}
            {isB2C && (
              <>
                <button className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 shadow-sm flex items-center gap-1.5 shrink-0 active:bg-slate-50">
                  全部阶段
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <button className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 shadow-sm flex items-center gap-1.5 shrink-0 active:bg-slate-50">
                  意向度
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"/></svg>
                </button>
              </>
            )}
          </div>

          {/* 简述切换开关 - 仅在 B2C 模式下显示 */}
          {isB2C && (
            <div className="flex bg-slate-200/50 p-0.5 rounded-xl shrink-0">
              <button onClick={() => setIsExpandedMode(false)} className={`p-1.5 rounded-lg transition-all ${!isExpandedMode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </button>
              <button onClick={() => setIsExpandedMode(true)} className={`p-1.5 rounded-lg transition-all ${isExpandedMode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Customer List */}
      <div className="space-y-4 pb-24">
        {(isB2C ? mockB2CCustomers : mockB2BCustomers).map((cust) => (
          <div key={cust.id} className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm space-y-4 group active:bg-slate-50 transition-all overflow-hidden relative">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-black text-slate-900 truncate tracking-tight">{cust.name}</h3>
                  {isB2C && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg font-black border border-blue-100 uppercase tracking-tighter">
                        {(cust as B2CCustomer).stage}
                      </span>
                      {(cust as B2CCustomer).intention === 'High' && (
                        <span className="text-[9px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-lg font-black border border-rose-100 tracking-tighter">意向度高</span>
                      )}
                      {(cust as B2CCustomer).intention === 'Medium' && (
                        <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg font-black border border-amber-100 tracking-tighter">意向度中</span>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                    <svg className="w-3.5 h-3.5 text-blue-500/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    沟通: <span className="text-slate-900">{cust.commCount}次</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                    <svg className="w-3.5 h-3.5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    最近: <span className="text-slate-900">{cust.lastCommTime}</span>
                  </div>
                </div>

                {isB2C ? (
                  <div className="pt-1">
                    {/* 客户画像标签组 */}
                    <div className="flex flex-wrap gap-2">
                      {(cust as B2CCustomer).portraits.map((p, idx) => (
                        <span 
                          key={idx} 
                          className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold shadow-sm border border-transparent transition-all active:scale-95 ${
                            p.color === 'orange' 
                              ? 'bg-[#fff7ed] text-[#fb923c] border-[#ffedd5]' 
                              : 'bg-[#eff6ff] text-[#3b82f6] border-[#dbeafe]'
                          }`}
                        >
                          {p.text}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                      <svg className="w-3.5 h-3.5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                      联系人: <span className="text-slate-900">{(cust as B2BCustomer).contactsCount}名</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 可展开的简述内容 (仅B2C及展开模式显示) */}
            {isB2C && isExpandedMode && (cust as B2CCustomer).summary && (
              <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100/50 space-y-3 mt-1">
                <div className="grid grid-cols-1 gap-2.5">
                  <CompactItem label="最新进展" content={(cust as B2CCustomer).summary.progress} color="blue" />
                  <CompactItem label="下一步计划" content={(cust as B2CCustomer).summary.nextStep} color="emerald" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200/60">
                  <CompactItem label="主要对手" content={(cust as B2CCustomer).summary.competitors} color="orange" />
                  <CompactItem label="客户顾虑" content={(cust as B2CCustomer).summary.concerns} color="rose" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
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

export default CustomerView;
