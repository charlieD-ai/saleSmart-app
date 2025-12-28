
import React from 'react';
import HomePRD from './prd/HomePRD';
import CommunicationPRD from './prd/CommunicationPRD';
import RecordingPRD from './prd/RecordingPRD';
import CustomerPRD from './prd/CustomerPRD';
import ProfilePRD from './prd/ProfilePRD';
import PRDLayout from './prd/PRDLayout';

type ViewType = 'home' | 'communications' | 'comm_detail' | 'customers' | 'ask' | 'profile' | 'recording' | 'schedule_detail';

interface PRDViewProps {
  currentView: ViewType;
}

const PRDView: React.FC<PRDViewProps> = ({ currentView }) => {
  switch (currentView) {
    case 'home':
      return <HomePRD />;
    case 'communications':
      return <CommunicationPRD />;
    case 'recording':
      return <RecordingPRD />;
    case 'comm_detail':
      return <PRDLayout title="沟通详情分析"><p className="text-slate-400">详情页 PRD 正在整理中...</p></PRDLayout>;
    case 'customers':
      return <CustomerPRD />;
    case 'profile':
      return <ProfilePRD />;
    case 'ask':
      return <PRDLayout title="AI 助手交互"><p className="text-slate-400">AI 助手 PRD 正在整理中...</p></PRDLayout>;
    default:
      return (
        <PRDLayout title="未定义视图">
          <div className="p-12 text-center space-y-4 text-slate-300">
            <p>该界面的 PRD 说明文档尚未配置</p>
          </div>
        </PRDLayout>
      );
  }
};

export default PRDView;
