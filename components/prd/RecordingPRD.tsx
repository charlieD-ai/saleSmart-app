
import React from 'react';
import PRDLayout from './PRDLayout';
import { LogicCard } from './LogicCard';

const RecordingPRD: React.FC = () => {
  return (
    <PRDLayout title="实时对话监测">
      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          录制与转写逻辑
        </h3>
        <div className="grid gap-3">
          <LogicCard tag="实现" title="实时波形渲染" desc="基于 Web Audio API 采集音频频率，在 Canvas 上实现 60fps 频谱动画。" />
          <LogicCard tag="AI" title="流式转写" desc="每 1.5s 提交一次音频切片，AI 实时返回文本并挂载时间戳。" />
          <LogicCard tag="逻辑" title="信号实时预警" desc="分析文本中的关键词（如金额、竞品名），实时弹出[策略建议]悬浮窗。" />
        </div>
      </section>
    </PRDLayout>
  );
};

export default RecordingPRD;
