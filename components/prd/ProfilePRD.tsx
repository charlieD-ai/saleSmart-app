
import React from 'react';
import PRDLayout from './PRDLayout';
import { LogicCard } from './LogicCard';

const ProfilePRD: React.FC = () => {
  return (
    <PRDLayout title="个人主页与设置 (Profile & Settings)">
      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          页面导航 (Navigation)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="交互" 
            title="页面入口" 
            desc="个人主页通过底部导航栏的'个人'标签进入。页面顶部提供返回按钮，点击后返回上一页面。页面右上角提供设置按钮，点击后跳转至设置页面。"
          />
          <LogicCard 
            tag="交互" 
            title="子页面切换" 
            desc="个人主页和设置页为同一组件的两个子视图。通过状态管理切换显示。从个人主页点击设置按钮进入设置页，从设置页点击返回按钮返回个人主页。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          用户信息展示 (User Information)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="用户基本信息" 
            desc="个人主页顶部显示用户基本信息：1. [用户头像]：显示用户头像标识，支持自定义头像或默认头像。2. [用户姓名]：显示当前登录用户的真实姓名。3. [职位信息]：显示用户的职位或角色，如Senior Account Manager。"
          />
          <LogicCard 
            tag="逻辑" 
            title="数据来源" 
            desc="用户信息从用户账户系统获取，包括头像、姓名、职位等字段。数据在用户登录时加载，并在个人主页显示时实时获取最新信息。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          统计数据 (Statistics)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="统计指标" 
            desc="个人主页提供两个核心统计指标：1. [沟通次数]：显示选定时间周期内的总沟通次数。2. [累计时长]：显示选定时间周期内的沟通总时长，单位为分钟。"
          />
          <LogicCard 
            tag="交互" 
            title="时间周期切换" 
            desc="统计数据支持四个时间周期切换：1. [本周]：统计当前自然周（周一到周日）的数据。2. [本月]：统计当前自然月的数据。3. [本季]：统计当前自然季度（1-3月、4-6月、7-9月、10-12月）的数据。4. [本年]：统计当前自然年的数据。用户可通过切换按钮选择不同的时间周期，统计数据实时更新。"
          />
          <LogicCard 
            tag="逻辑" 
            title="数据对比" 
            desc="统计数据支持查看个人数据和团队数据。个人数据显示当前用户在选定时间周期内的统计值。团队数据显示团队整体在相同时间周期内的统计平均值。两个指标并排显示，便于用户对比个人表现与团队平均水平。"
          />
          <LogicCard 
            tag="逻辑" 
            title="数据计算规则" 
            desc="沟通次数统计选定时间周期内的所有沟通记录数量。累计时长统计选定时间周期内的所有沟通记录的总时长。统计数据实时更新，反映最新的沟通活动情况。切换时间周期时，个人数据和团队数据同步更新。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          综合能力画像 (Ability Portrait)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="能力维度" 
            desc="综合能力画像通过雷达图展示多个维度的能力评估。能力维度为可配置项，系统根据业务需求动态展示不同的能力维度。每个维度评估用户在特定方面的能力水平，通过雷达图直观展示各维度的得分情况。"
          />
          <LogicCard 
            tag="逻辑" 
            title="数据对比" 
            desc="雷达图同时显示个人能力和团队平均能力两个数据系列。个人能力数据反映当前用户在各维度的得分。团队平均数据反映团队整体在各维度的平均水平。通过对比帮助用户了解自身能力与团队平均水平的差异。"
          />
          <LogicCard 
            tag="模型" 
            title="能力评估机制" 
            desc="能力画像显示整体的能力情况，为历史所有数据的加权平均。能力评估基于用户的历史沟通记录、任务完成情况、客户反馈等多维度数据。系统通过AI分析用户的沟通内容、任务达成率、客户满意度等指标，自动计算各维度的能力得分。评估数据综合考虑历史所有数据，通过加权平均算法得出整体能力画像，反映用户长期的能力水平。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          任务评估 (Task Evaluation)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="评估指标" 
            desc="任务评估通过折线图展示达成率趋势：1. [达成率]：显示个人任务达成率，以百分比表示。2. [团队平均]：显示团队平均任务达成率，用于对比参考。3. [时间维度]：按月份展示历史达成率数据，支持查看多个月份的趋势变化。"
          />
          <LogicCard 
            tag="逻辑" 
            title="数据计算规则" 
            desc="达成率计算公式为：已完成任务数 / 总任务数 × 100%。个人达成率基于当前用户的任务完成情况计算。团队平均达成率基于团队所有成员的任务完成情况计算平均值。数据按月统计，支持查看历史趋势。"
          />
          <LogicCard 
            tag="交互" 
            title="图表交互" 
            desc="折线图支持悬停查看具体数值。图表显示图例，区分个人达成率和团队平均达成率。用户可以通过图表直观了解自身任务完成情况与团队平均水平的对比。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          功能操作 (Actions)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="交互" 
            title="切换至团队端" 
            desc="个人主页提供'切换至团队端'按钮。点击后跳转至团队管理界面，用户可以查看团队整体数据、团队成员信息、团队统计等。该功能用于从个人视角切换到团队管理视角。"
          />
          <LogicCard 
            tag="交互" 
            title="退出登录" 
            desc="个人主页底部提供'退出登录'按钮。点击后清除用户登录状态，返回登录页面。退出登录会清除本地存储的用户信息和会话数据。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          设置页面 (Settings Page)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="交互" 
            title="页面入口" 
            desc="设置页面通过个人主页右上角的设置按钮进入。设置页面顶部提供返回按钮，点击后返回个人主页。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          开关设置 (Toggle Settings)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="日程开启通知" 
            desc="提供开关控制日程提醒通知功能。开启后，系统在日程开始前发送通知提醒用户。关闭后，不再发送日程提醒通知。开关状态保存在用户设置中，跨会话保持。"
          />
          <LogicCard 
            tag="字段" 
            title="显示录制持续时长" 
            desc="提供开关控制是否在录制界面显示录制持续时长。开启后，录制界面显示实时录制时长。关闭后，录制界面不显示时长信息。开关状态保存在用户设置中，跨会话保持。"
          />
          <LogicCard 
            tag="交互" 
            title="开关操作" 
            desc="开关控件支持点击切换状态。开关状态变化后立即生效，无需保存操作。状态变化会实时同步到用户设置中。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          绑定功能 (Binding Features)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="声纹绑定" 
            desc="显示声纹识别功能的绑定状态。已绑定时显示'已绑定'标识，表示用户已完成声纹录入和绑定。未绑定时可点击进入绑定流程。声纹绑定用于语音识别和身份验证。"
          />
          <LogicCard 
            tag="交互" 
            title="声纹绑定操作" 
            desc="点击声纹绑定项进入绑定流程。已绑定时显示绑定状态，可点击查看绑定详情或重新绑定。未绑定时引导用户完成声纹录入和验证流程。"
          />
          <LogicCard 
            tag="字段" 
            title="工牌设备绑定" 
            desc="显示工牌设备的绑定状态。支持绑定物理工牌设备，用于快速身份识别和签到。点击后进入设备绑定流程，支持扫描或手动输入设备信息完成绑定。"
          />
          <LogicCard 
            tag="交互" 
            title="设备绑定操作" 
            desc="点击工牌设备绑定项进入绑定流程。支持查看已绑定设备信息、解绑设备、绑定新设备等操作。设备绑定后可用于快速身份识别和签到功能。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          语言设置 (Language Settings)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="支持语言" 
            desc="系统支持两种语言：1. [中文]：简体中文界面。2. [English]：英文界面。用户可在设置页面切换界面语言。"
          />
          <LogicCard 
            tag="交互" 
            title="语言切换" 
            desc="语言设置提供两个选项按钮，当前选中的语言使用不同样式标识。点击语言选项后立即切换界面语言，无需保存操作。语言设置保存在用户偏好中，跨会话保持。切换语言后，所有界面文本立即更新为对应语言。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          关于 (About)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="交互" 
            title="关于页面" 
            desc="设置页面底部提供'关于'选项。点击后显示应用版本信息、开发团队信息、使用说明等。关于页面用于展示应用的基本信息和帮助内容。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          数据与状态 (Data & State)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="逻辑" 
            title="数据持久化" 
            desc="用户设置数据（开关状态、语言偏好等）保存在用户账户设置中。设置变更后立即同步到服务器，确保跨设备同步。本地缓存设置数据，提升加载速度。"
          />
          <LogicCard 
            tag="逻辑" 
            title="数据更新策略" 
            desc="统计数据（沟通次数、累计时长、能力画像、任务评估）实时从服务器获取最新数据。能力评估和任务评估数据定期更新，反映用户最新的活动情况。图表数据支持按需刷新。"
          />
        </div>
      </section>
    </PRDLayout>
  );
};

export default ProfilePRD;

