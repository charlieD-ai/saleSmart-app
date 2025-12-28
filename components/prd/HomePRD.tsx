
import React from 'react';
import PRDLayout from './PRDLayout';
import { LogicCard } from './LogicCard';

const HomePRD: React.FC = () => {
  return (
    <PRDLayout title="首页 / 核心看板">
        <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                顶部欢迎看板 (Welcome Board)
              </h3>
              <div className="grid gap-3">
                <LogicCard 
                  tag="字段" 
                  title="动态字段逻辑" 
                  desc="1. [时间段招呼语]：根据设备系统时间段（5-11点早安，11-13点午安，以此类推）自动切换。2. [用户姓名]：从 Session 中读取当前登录人真实姓名。3. [日期标识]：显示星期与当前日期。"
                />
                <LogicCard 
                  tag="逻辑" 
                  title="金句库推送策略" 
                  desc="后台维护一个销售格言库。App 启动时根据日期戳 (DateStamp) 进行哈希计算，确保同一用户全天看到同一条格言，降低认知负荷。格言涵盖策略分析、客户关怀、谈判博弈三大类别。"
                />
                <LogicCard 
                  tag="逻辑" 
                  title="背景交互实现" 
                  desc="采用双层渐变背景，左侧文字区域保留充足负空间，确保在不同尺寸屏幕下，背景装饰块不会干扰文字阅读。"
                />
              </div>
            </section>

            {/* 今日日程区块 */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                今日日程模块 (Today's Schedule)
              </h3>
              <div className="grid gap-3">
                <LogicCard 
                  tag="字段" 
                  title="核心显示字段" 
                  desc="[时间块]、[日程标题]、[关联客户/商机名称]、[业务环节标签]、[协访标识]。"
                />
                <LogicCard 
                  tag="逻辑" 
                  title="数据过滤规则" 
                  desc="1. 仅显示日期匹配当前系统时间的记录。2. 默认按起始时间升序排列。3. 已结束的日程(当前时间 > 结束时间)自动降低透明度。"
                />
                <LogicCard 
                  tag="交互" 
                  title="录制触发逻辑" 
                  desc="点击'开始沟通'：校验当前用户 UID 与日程 Owner ID。若匹配，唤起录制界面并自动透传客户上下文；若不匹配，弹出权限提示气泡。"
                />
              </div>
            </section>

            {/* 全部日程区块 */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                全部日程视图 (Schedule Explorer)
              </h3>
              <div className="grid gap-3">
                <LogicCard 
                  tag="交互" 
                  title="日历轴联动" 
                  desc="顶部滑动日历点击特定日期，下方列表自动滚动至该日期锚点。当前日期以'今'字高亮显示。"
                />
                <LogicCard 
                  tag="逻辑" 
                  title="历史沉淀处理" 
                  desc="历史日程统一降低显示强度。目的：降低信息密度，减少认知负担，引导销售关注后续商机进展。"
                />
              </div>
            </section>

            {/* 今日待办区块 */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                今日待办模块 (Today's Todos)
              </h3>
              <div className="grid gap-3">
                <LogicCard 
                  tag="字段" 
                  title="核心显示字段" 
                  desc="[任务标题]、[关联商机/客户名称]、[计划时间]、[逾期标识]。每个待办项支持复选框快速完成操作。"
                />
                <LogicCard 
                  tag="数据过滤" 
                  title="任务筛选规则" 
                  desc="1. 仅显示未完成状态 (completed = false) 的任务。2. 按日期分为两类：逾期任务 (date < 今天) 和今日任务 (date = 今天)。3. 逾期任务强制置顶显示，使用不同主题区分。"
                />
                <LogicCard 
                  tag="优先级" 
                  title="逾期强提醒机制" 
                  desc="1. 逾期任务统一显示在顶部。2. 默认仅显示前 2 条逾期任务，超过 2 条时显示'查看更多逾期 (N)'按钮。3. 点击展开/收起可切换显示全部逾期任务。4. 逾期任务自动标记'逾期'标签，日期使用不同颜色显示。"
                />
                <LogicCard 
                  tag="交互" 
                  title="任务操作逻辑" 
                  desc="1. 点击复选框：立即切换完成状态，触发乐观更新。2. 完成后的任务自动从列表中移除（仅显示未完成）。3. 操作后异步调用后台接口同步状态。4. 若任务关联商机，完成后在商机时间轴插入[动作闭环]记录。"
                />
                <LogicCard 
                  tag="交互" 
                  title="查看全部待办跳转" 
                  desc="点击右上角'全部待办 >'按钮，切换至 AllTodosView 全屏视图。传递参数：todos（全部待办列表）、todayStr（当前日期字符串）、onAction（操作回调函数）。"
                />
                <LogicCard 
                  tag="逻辑" 
                  title="空状态处理" 
                  desc="当今日无待办且无逾期时，显示空列表容器。保持布局一致性，避免布局跳动。"
                />
              </div>
            </section>

            {/* 全部待办视图区块 */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                全部待办视图 (All Todos View)
              </h3>
              <div className="grid gap-3">
                <LogicCard 
                  tag="导航" 
                  title="三栏筛选器" 
                  desc="顶部提供三个筛选标签：'全部'、'今日'、'逾期'。点击切换时，列表实时过滤并重新渲染。当前激活标签使用不同样式突出显示。"
                />
                <LogicCard 
                  tag="数据分组" 
                  title="全部模式分组逻辑" 
                  desc="当选择'全部'时，按时间维度自动分组：1. [历史逾期]：date < 今天，显示在顶部。2. [今日核心动作]：date = 今天，使用不同主题突出。3. [未来计划]：date > 今天，显示在底部。每组都有独立的标题和分隔线。"
                />
                <LogicCard 
                  tag="交互" 
                  title="滑动操作手势" 
                  desc="每个待办项支持左右滑动（左滑显示操作按钮）。滑动阈值：-160px。滑动后显示两个操作按钮：1. [推迟至今日]：将任务日期更新为今天。2. [忽略/删除]：永久删除任务。操作后自动收起滑动菜单。"
                />
                <LogicCard 
                  tag="交互" 
                  title="批量操作（逾期模式）" 
                  desc="当筛选器选择'逾期'且存在逾期任务时，顶部显示批量操作卡片。提供两个按钮：1. [全部放弃]：批量删除所有逾期任务。2. [一键推迟]：将所有逾期任务日期更新为今天。操作前无需二次确认，采用乐观更新策略。"
                />
                <LogicCard 
                  tag="逻辑" 
                  title="任务状态反馈" 
                  desc="1. 已完成任务：降低显示强度 + 标题删除线。2. 逾期任务：特殊边框复选框 + '逾期'标签 + 特殊颜色时间显示。3. 正常任务：标准边框复选框 + 完成态标识。"
                />
                <LogicCard 
                  tag="交互" 
                  title="返回首页逻辑" 
                  desc="点击左上角返回按钮，调用 onBack 回调，切换回 HomeView 的 dashboard 子视图。状态保持：待办列表的修改会通过 onAction 回调同步到父组件。"
                />
                <LogicCard 
                  tag="空状态" 
                  title="列表为空处理" 
                  desc="当筛选结果为空时，显示居中空状态：对勾图标 + '列表已清空'文字 + 'Inbox Zero Achieved'副标题。营造完成感，鼓励用户保持高效。"
                />
                <LogicCard 
                  tag="功能" 
                  title="浮动添加按钮" 
                  desc="底部右侧固定悬浮按钮。点击后应弹出新建待办表单（当前为占位，需后续实现）。按钮使用动画增强交互反馈。"
                />
              </div>
            </section>

            {/* 情报中心区块 */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                情报中心 (Intelligence Center)
              </h3>
              <div className="grid gap-3">
                <LogicCard 
                  tag="字段" 
                  title="核心显示字段" 
                  desc="[客户/商机名称]、[信号标签列表]、[AI 摘要]、[数据来源]、[查看沟通按钮]。每个信号卡片支持多个标签同时显示。"
                />
                <LogicCard 
                  tag="数据源" 
                  title="信号数据来源" 
                  desc="信号数据来源于近两周的沟通记录。系统自动从沟通记录中提取关键信息，包括：高层对话、商务洽谈、需求调研等不同类型的沟通场景。"
                />
                <LogicCard 
                  tag="模型" 
                  title="AI 摘要抽取机制" 
                  desc="调用 Gemini API 对沟通记录进行增量分析。提示词要求：1. 总结不得超过 50 字。2. 必须包含[核心冲突点]或[关键资源承诺]中的至少一项。3. 摘要需突出对销售决策有直接影响的关键信息。"
                />
                <LogicCard 
                  tag="逻辑" 
                  title="信号分级规则" 
                  desc="系统根据关键词自动分级：1. Critical（高危）：包含'竞品'、'质疑'、'拒绝'等高危词。2. Positive（利好）：包含'预算'、'确认'、'同意'等利好词。3. Warning（风险）：包含'担心'、'周期'、'延迟'等风险词。不同级别使用不同标识和主题区分，便于快速识别优先级。"
                />
                <LogicCard 
                  tag="逻辑" 
                  title="标签提取与展示" 
                  desc="每个信号可包含多个标签，标签从沟通记录中自动提取。标签显示在卡片顶部，每个标签包含一个动态指示点。标签支持多行换行显示，确保信息完整展示。"
                />
                <LogicCard 
                  tag="交互" 
                  title="查看沟通快速跳转" 
                  desc="点击卡片右下角'查看沟通'按钮，直接跳转至该信号对应的沟通详情页。传递沟通记录 ID 作为路由参数，展示完整的沟通内容、录音、AI 分析等信息。"
                />
                <LogicCard 
                  tag="交互" 
                  title="长按深度分析" 
                  desc="长按信号卡片 3 秒触发深度分析功能。长按期间显示进度条动画反馈。触发后自动跳转至 Ask AI 界面，预填深度分析 Prompt：'[深度分析] 针对 {客户名称} 的最新信号（{标签列表}），AI 认为存在哪些潜在成交风险？请提供应对建议。'。松开手指或移出卡片区域可取消长按操作。"
                />
                <LogicCard 
                  tag="逻辑" 
                  title="数据更新策略" 
                  desc="每产生一条新的沟通记录时，系统实时分析该沟通内容。当检测到沟通中存在信号（符合信号分级规则的关键词）时，立即推送至情报中心。情报中心显示'近两周核心信号'，信号按时间倒序排列，最新的信号显示在顶部。超过两周的信号自动从列表中移除。"
                />
                <LogicCard 
                  tag="逻辑" 
                  title="空状态处理" 
                  desc="当近两周内无有效信号时，显示空状态提示，引导用户进行更多客户沟通以生成信号数据。"
                />
              </div>
            </section>
    </PRDLayout>
  );
};

export default HomePRD;
