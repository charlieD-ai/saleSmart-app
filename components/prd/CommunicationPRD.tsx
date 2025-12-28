
import React from 'react';
import PRDLayout from './PRDLayout';
import { LogicCard } from './LogicCard';

const CommunicationPRD: React.FC = () => {
  return (
    <PRDLayout title="沟通列表 (Communication)">
      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          搜索功能 (Search)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="交互" 
            title="关键词搜索" 
            desc="用户输入关键词后，系统对沟通记录进行过滤。支持针对[客户名称]和[沟通主题]的跨字段关键词检索。搜索使用精确匹配（includes方法），匹配到任一字段即显示该沟通记录。"
          />
          <LogicCard 
            tag="逻辑" 
            title="搜索范围" 
            desc="搜索范围包括：1. 客户名称（customerName）字段。2. 沟通标题（title）字段。匹配到任一字段即显示该沟通记录。"
          />
          <LogicCard 
            tag="交互" 
            title="搜索框交互" 
            desc="搜索框支持清空操作。当搜索框为空时，显示所有沟通记录。搜索状态在组件内部维护，切换视图模式时保持搜索状态。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          过滤功能 (Filter)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="过滤器选项" 
            desc="提供三个过滤器按钮：1. [时间范围]：按日期筛选沟通记录（全部时间、今天、最近7天、最近30天、本季度、自定义范围）。2. [沟通环节]：按沟通阶段筛选（立项、调研、谈判等）。3. [处理状态]：按分析状态筛选（分析中、已分析）。"
          />
          <LogicCard 
            tag="逻辑" 
            title="过滤逻辑" 
            desc="过滤器与搜索功能可叠加使用。先应用搜索过滤，再应用选择的过滤器。多个过滤器之间为'且'关系。当所有过滤器都未激活时，显示全部沟通记录。"
          />
          <LogicCard 
            tag="交互" 
            title="时间过滤器交互" 
            desc="点击时间过滤器按钮，从底部弹出选择面板（Bottom Sheet）。面板显示预设时间选项（全部时间、今天、最近7天、最近30天、本季度）和自定义范围选项。点击预设选项后立即应用筛选并关闭面板。选择'全部时间'时清除时间筛选。激活状态时，按钮背景变为蓝色，文字变为白色，显示当前选择的时间范围标签。"
          />
          <LogicCard 
            tag="交互" 
            title="沟通环节/处理状态过滤器交互" 
            desc="点击'沟通环节'或'处理状态'过滤器按钮，从按钮下方弹出下拉菜单。菜单显示该过滤器的所有可选选项。点击选项后应用筛选并关闭菜单。当前激活的选项在菜单中高亮显示。激活状态时，按钮使用不同样式标识（如蓝色背景或边框）。点击已激活的过滤器按钮可快速清除该过滤器。"
          />
          <LogicCard 
            tag="交互" 
            title="清除过滤器" 
            desc="清除过滤器的方式：1. 点击已激活的过滤器按钮，再次选择默认选项（如'全部时间'、'全部环节'、'全部状态'）。2. 在过滤器下拉菜单中提供'清除'或'重置'选项。3. 当有多个过滤器激活时，可在过滤器区域显示'清除全部'快捷按钮。清除后列表恢复显示所有沟通记录。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          视图切换 (View Toggle)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="交互" 
            title="双模式切换" 
            desc="提供两种视图模式：1. [列表模式]：紧凑布局，仅展示核心字段（客户名称、标题、日期、参与人、时长、状态）。2. [卡片模式]：展开布局，包含完整信息（摘要简报、信号标签、能力评分、去赋能按钮）。"
          />
          <LogicCard 
            tag="逻辑" 
            title="视图状态保持" 
            desc="用户选择的视图模式在组件内部维护。切换视图模式时，搜索和过滤状态保持不变。视图模式切换为即时响应，无需重新加载数据。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          沟通卡片字段 (Card Fields)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="基础信息字段" 
            desc="每个沟通卡片包含：1. [客户名称]：显示沟通关联的客户或商机名称。2. [沟通标题]：沟通记录的主题标题。3. [日期]：沟通发生的日期时间。4. [参与人]：参与沟通的人员列表，多个参与人用逗号分隔。5. [时长]：沟通录音的时长。6. [状态]：显示'已分析'或'分析中'状态标识。"
          />
          <LogicCard 
            tag="字段" 
            title="展开模式额外字段" 
            desc="卡片模式下额外显示：1. [摘要简报]：AI生成的沟通摘要，默认显示2行，悬停可展开显示完整内容。2. [信号标签]：从沟通中提取的关键信号标签列表，每个标签包含动态指示点。3. [能力评估]：销售话术与技巧得分（0-100），显示百分比和进度条。4. [任务评估]：目标达成度得分（0-100），显示百分比和进度条。5. [去赋能按钮]：跳转至详情页辅导功能的快捷入口。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          AI 分析功能 (AI Analysis)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="模型" 
            title="摘要简报生成" 
            desc="调用 Gemini API 对沟通录音转写文本进行摘要分析。摘要要求：1. 长度控制在2-3行内。2. 突出核心业务要点和关键决策。3. 支持悬停展开显示完整摘要内容。"
          />
          <LogicCard 
            tag="逻辑" 
            title="双维度能力评分" 
            desc="系统对每次沟通进行双维度评分：1. [能力评估]：评估销售人员的沟通技巧、话术运用、客户互动能力等，显示为分值（非百分比）。2. [任务评估]：评估本次沟通是否达成预设目标、完成关键任务等，显示为分值（非百分比）。评分通过进度条可视化展示，进度条长度反映分值大小。"
          />
          <LogicCard 
            tag="逻辑" 
            title="信号标签提取" 
            desc="系统自动从沟通内容中提取关键信号，生成标签。标签类型包括：异议提出、竞品威胁、预算确认、时间节点等。每个标签显示动态指示点，表示信号的重要性或紧迫性。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          交互操作 (Interactions)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="交互" 
            title="卡片点击跳转" 
            desc="点击任意沟通卡片，跳转至该沟通记录的详情页。传递沟通记录 ID 作为路由参数。详情页展示完整的沟通内容、录音播放、AI分析结果、辅导建议等信息。"
          />
          <LogicCard 
            tag="交互" 
            title="去赋能按钮" 
            desc="点击卡片中的'去赋能'按钮，跳转至沟通详情页的[辅导]页签。自动定位到AI改进建议部分，提供针对本次沟通的个性化辅导内容。"
          />
          <LogicCard 
            tag="交互" 
            title="摘要展开交互" 
            desc="在卡片模式下，摘要默认显示2行，超出部分截断。鼠标悬停或点击摘要区域时，展开显示完整摘要内容。展开后摘要区域可滚动查看。"
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
            title="数据来源" 
            desc="沟通列表数据通过 props 从父组件传入。数据格式为 CommunicationRecord[] 数组。每个记录包含完整的沟通信息、分析结果、评分数据等。"
          />
          <LogicCard 
            tag="逻辑" 
            title="列表排序" 
            desc="沟通记录默认按时间倒序排列，最新的沟通显示在列表顶部。排序依据为沟通日期（date字段）。"
          />
          <LogicCard 
            tag="逻辑" 
            title="空状态处理" 
            desc="当搜索或过滤后无匹配结果时，显示空状态提示：'暂无沟通记录'。空状态提示居中显示，引导用户调整搜索条件或清除过滤器。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          处理状态映射 (Processing Status Mapping)
        </h3>
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 px-4 font-black text-slate-900">核心状态</th>
                  <th className="text-left py-3 px-4 font-black text-slate-900">前端展示文案</th>
                  <th className="text-left py-3 px-4 font-black text-slate-900">辅助信息/Tooltip</th>
                  <th className="text-left py-3 px-4 font-black text-slate-900">对应原状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-700">待处理</td>
                  <td className="py-3 px-4 text-slate-600">待上传</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">请打开工牌上传录音文件</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">文件处理中 - 录音待上传</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-700">待处理</td>
                  <td className="py-3 px-4 text-slate-600">待生成</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">需补充沟通参与人身份/点击生成</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">身份未标注/按钮未点击</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-700">处理中</td>
                  <td className="py-3 px-4 text-slate-600">转写中</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">音频正在转为文字...</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">文件处理中 - 字幕处理中</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-700">处理中</td>
                  <td className="py-3 px-4 text-slate-600">分析中</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">智能总结生成中...</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">报告生成中</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-700">已完成</td>
                  <td className="py-3 px-4 text-slate-600">生成成功</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">点击查看报告</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">生成成功</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-700">失败</td>
                  <td className="py-3 px-4 text-slate-600">无法生成</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">原因: 录制时长不足</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">录制时长不足</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-700">失败</td>
                  <td className="py-3 px-4 text-slate-600">无法生成</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">原因: 有效对话量不足</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">会话字幕量不足</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-700">失败</td>
                  <td className="py-3 px-4 text-slate-600">转写失败</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">音频转文字失败, 重试转写</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">处理失败</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-700">失败</td>
                  <td className="py-3 px-4 text-slate-600">生成失败</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">智能总结生成失败, 重新生成</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">生成失败</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid gap-3">
          <LogicCard 
            tag="逻辑" 
            title="状态分类规则" 
            desc="沟通处理状态分为四大类：1. [待处理]：需要用户操作或等待前置条件满足。2. [处理中]：系统正在处理音频转写或AI分析。3. [已完成]：处理成功，可查看完整报告。4. [失败]：处理过程中出现错误，需要重试或处理。"
          />
          <LogicCard 
            tag="交互" 
            title="状态展示逻辑" 
            desc="前端根据核心状态显示对应的展示文案。当状态为'处理中'时，可显示进度动画或加载指示器。失败状态需显示具体的失败原因和操作提示（如重试按钮）。Tooltip 提供更详细的状态说明和操作指引。"
          />
          <LogicCard 
            tag="逻辑" 
            title="状态流转规则" 
            desc="状态流转顺序：待处理 → 处理中 → 已完成/失败。待处理状态包括：待上传、待生成。处理中状态包括：转写中、分析中。失败状态可重新触发处理流程，回到待处理或处理中状态。"
          />
        </div>
      </section>
    </PRDLayout>
  );
};

export default CommunicationPRD;

