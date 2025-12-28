
import React, { useState } from 'react';

interface AuthViewProps {
  onLogin: () => void;
  lang: 'zh' | 'en';
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin, lang }) => {
  const [view, setView] = useState<'welcome' | 'login' | 'signup'>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const t = {
    zh: {
      welcome: "让销售更有智慧",
      sub: "AI 驱动的对话智能平台",
      getStarted: "开始使用",
      login: "登录",
      create: "创建账号",
      email: "邮箱地址",
      pass: "密码",
      forgot: "忘记密码？",
      social: "或者通过以下方式登录",
      agree: "登录即代表您同意我们的服务条款",
    },
    en: {
      welcome: "Sell Smarter with AI",
      sub: "The premier conversation intelligence platform",
      getStarted: "Get Started",
      login: "Log In",
      create: "Create Account",
      email: "Email Address",
      pass: "Password",
      forgot: "Forgot Password?",
      social: "Or continue with",
      agree: "By continuing, you agree to our Terms of Service",
    }
  }[lang];

  if (view === 'welcome') {
    return (
      <div className="h-full flex flex-col bg-white px-8 pb-12">
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-200">
             <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t.welcome}</h1>
            <p className="text-slate-400 font-medium">{t.sub}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => setView('signup')}
            className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            {t.getStarted}
          </button>
          <button 
            onClick={() => setView('login')}
            className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl border-2 border-slate-100 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            {t.login}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white px-8 pt-20">
      <button onClick={() => setView('welcome')} className="mb-8 text-slate-400">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>

      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{view === 'login' ? t.login : t.create}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.email}</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition-all"
            placeholder="name@company.com"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.pass}</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
        
        {view === 'login' && (
          <button className="text-[11px] font-bold text-blue-600 ml-1">{t.forgot}</button>
        )}

        <button 
          onClick={onLogin}
          className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 active:scale-95 transition-all uppercase tracking-widest text-sm mt-4"
        >
          {view === 'login' ? t.login : t.create}
        </button>

        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <div className="relative flex justify-center"><span className="bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">{t.social}</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SocialBtn icon="google" />
          <SocialBtn icon="apple" />
        </div>

        <p className="text-center text-[10px] text-slate-400 font-medium px-6 leading-relaxed pt-8">
          {t.agree}
        </p>
      </div>
    </div>
  );
};

const SocialBtn: React.FC<{ icon: 'google' | 'apple' }> = ({ icon }) => (
  <button className="flex items-center justify-center py-4 rounded-2xl border-2 border-slate-100 active:bg-slate-50 transition-colors">
    {icon === 'google' ? (
      <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
    ) : (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96.95-2.04 1.43-3.23 1.43-1.18 0-2.2-.41-3.05-1.23-.84-.81-1.76-1.23-2.75-1.23-.99 0-2 .41-3.03 1.23-.81.65-1.81 1.01-2.98 1.08C1.1 21.64 0 20.54 0 19.33c0-.9.23-1.74.69-2.52L4.08 9.9c.77-1.29 1.76-2.29 2.97-2.97 1.21-.69 2.53-1.03 3.95-1.03 1.42 0 2.7.35 3.84 1.06.91.56 1.84 1.04 2.78 1.04.94 0 1.96-.48 3.05-1.04 1.14-.59 2.37-.88 3.69-.88 1.42 0 2.68.34 3.78 1.02.81.5 1.47 1.13 1.99 1.89-1.32.79-2.23 1.73-2.73 2.81-.51 1.08-.76 2.22-.76 3.42s.25 2.33.76 3.4c.5 1.07 1.34 2.01 2.52 2.83-.54.9-1.25 1.69-2.12 2.37-1.34 1.04-2.87 1.56-4.58 1.56-1.71 0-3.09-.52-4.14-1.56-1.05-1.04-2.12-1.56-3.21-1.56s-2.16.52-3.21 1.56zM12 5.03c0 1.36-.48 2.53-1.44 3.51-.96.98-2.12 1.47-3.48 1.47-.07 0-.21 0-.42-.01V10c0-1.33.48-2.48 1.43-3.45.95-.97 2.11-1.45 3.47-1.45.14 0 .32.01.53.03.01.14.01.28.01.42z"/></svg>
    )}
  </button>
);

export default AuthView;
