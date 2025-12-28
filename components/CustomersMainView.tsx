
import React, { useState, useEffect } from 'react';
import CustomerView from './CustomerView';
import OpportunityView from './OpportunityView';

type AppMode = 'B2B' | 'B2C';

interface CustomersMainViewProps {
  onNavigateToAsk?: (prompt: string) => void;
}

const CustomersMainView: React.FC<CustomersMainViewProps> = ({ onNavigateToAsk }) => {
  const [mode, setMode] = useState<AppMode>('B2B');
  const [activeSubTab, setActiveSubTab] = useState<'customers' | 'opportunities'>('opportunities');

  // 当切换模式时，B2C 只有客户列表，B2B 有商机和客户两个子页签
  useEffect(() => {
    if (mode === 'B2C') {
      setActiveSubTab('customers');
    } else {
      setActiveSubTab('opportunities');
    }
  }, [mode]);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Mode Toggle and Tab Switcher */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100">
        {mode === 'B2B' && activeSubTab === 'opportunities' ? (
          <>
            <div className="flex justify-between items-center mb-1">
              <div className="flex-1" />
              <button 
                onClick={() => setMode('B2C')}
                className="text-[9px] text-blue-500 font-black hover:text-blue-700 transition-colors uppercase tracking-widest px-2 py-1 bg-blue-50 rounded-lg"
              >
                当前模式: {mode}
              </button>
            </div>
            <div className="bg-slate-100 p-1 rounded-2xl flex w-full max-w-xs mx-auto">
              <button 
                onClick={() => setActiveSubTab('opportunities')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                  activeSubTab === 'opportunities' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                商机
              </button>
              <button 
                onClick={() => setActiveSubTab('customers')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                  activeSubTab === 'customers' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                客户
              </button>
            </div>
          </>
        ) : mode === 'B2B' && activeSubTab === 'customers' ? (
          <div className="bg-slate-100 p-1 rounded-2xl flex w-full max-w-xs mx-auto">
            <button 
              onClick={() => setActiveSubTab('opportunities')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                activeSubTab === 'opportunities' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              商机
            </button>
            <button 
              onClick={() => setActiveSubTab('customers')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                activeSubTab === 'customers' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              客户
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-1">
              <div className="flex-1" />
              <button 
                onClick={() => setMode('B2B')}
                className="text-[9px] text-blue-500 font-black hover:text-blue-700 transition-colors uppercase tracking-widest px-2 py-1 bg-blue-50 rounded-lg"
              >
                当前模式: {mode}
              </button>
            </div>
            <div className="text-center py-2">
              <h2 className="text-sm font-bold text-slate-800">C端客户管理</h2>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {activeSubTab === 'customers' ? (
          <CustomerView onNavigateToAsk={onNavigateToAsk} mode={mode} />
        ) : (
          <OpportunityView onNavigateToAsk={onNavigateToAsk} />
        )}
      </div>
    </div>
  );
};

export default CustomersMainView;
