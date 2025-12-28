
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { SaleSmartAI } from '../geminiService';

interface AskViewProps {
  initialPrompt?: string;
  onClearPrompt?: () => void;
}

const AskView: React.FC<AskViewProps> = ({ initialPrompt, onClearPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: '您好！我是 SaleSmart AI。我可以帮您分析商机、撰写邮件或总结客户反馈。请问今天有什么可以帮您的？', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ai = useRef<SaleSmartAI | null>(null);

  // 初始化 AI 服务
  useEffect(() => {
    try {
      ai.current = new SaleSmartAI();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'AI 服务初始化失败，请检查配置');
    }
  }, []);

  // Handle deep-link initial prompt
  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
      onClearPrompt?.();
    }
  }, [initialPrompt]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading || !ai.current) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const responseText = await ai.current.ask(text);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: `❌ 错误：${err.message || '请求失败，请稍后重试'}`, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMsg]);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: '商机分析', prompt: '帮我分析一下最近三个月的核心商机赢率趋势' },
    { label: '客户分析', prompt: '总结一下本周沟通的关键关注点' },
    { label: '写周报', prompt: '根据本周沟通记录生成一份销售周报草稿' },
    { label: '回访邮件', prompt: '帮我写一封演示后的客户跟进邮件' }
  ];

  // 如果 AI 服务初始化失败，显示错误提示
  if (error && !ai.current) {
    return (
      <div className="flex flex-col h-full bg-slate-50 items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-red-200 shadow-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">AI 服务初始化失败</h3>
            <p className="text-sm text-slate-600 mb-4">{error}</p>
            <div className="bg-slate-50 rounded-lg p-4 text-left text-xs text-slate-700">
              <p className="font-semibold mb-2">请检查：</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>网络连接是否正常</li>
                <li>LLM API 服务是否可访问</li>
                <li>如需要，可在环境变量中配置 LLM_API_URL 和 LLM_AUTH_TOKEN</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Suggestions Section */}
      <div className="p-4 flex gap-2 overflow-x-auto hide-scrollbar shrink-0">
        {quickActions.map((action, i) => (
          <button 
            key={i} 
            onClick={() => handleSend(action.prompt)}
            className="whitespace-nowrap bg-white border border-slate-200 px-4 py-2 rounded-2xl text-[11px] font-medium text-slate-700 shadow-sm hover:border-blue-300 transition-colors"
          >
            {action.label} ⚡️
          </button>
        ))}
      </div>

      {/* Chat History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-2">
          <input 
            type="text" 
            placeholder="问问 SaleSmart..." 
            className="flex-1 bg-slate-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-blue-600 text-white rounded-2xl disabled:bg-slate-300 transition-colors shadow-lg shadow-blue-100"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskView;
