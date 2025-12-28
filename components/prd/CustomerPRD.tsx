
import React from 'react';
import PRDLayout from './PRDLayout';
import { LogicCard } from './LogicCard';

const CustomerPRD: React.FC = () => {
  return (
    <PRDLayout title="客户管理 (Customer Management)">
      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          商机列表功能 (Opportunity List)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="商机卡片字段" 
            desc="商机卡片包含：1. [商机名称]：商机的项目名称，显示在卡片顶部。2. [阶段标签]：显示当前阶段（立项首访、需求调研、方案呈现、商务谈判、合同签署），使用标签形式展示。3. [状态标签]：显示商机状态（进行中、已赢单、已输单），不同状态使用不同颜色标识。4. [沟通次数]：与该商机的总沟通记录数，显示为'X次'。5. [最近沟通时间]：最后一次沟通的时间，格式为'MM/DD HH:mm'。6. [成交模型字段]：自定义的销售评估指标状态，显示为6个圆形按钮（M、E、D、D、I、C）。"
          />
          <LogicCard 
            tag="逻辑" 
            title="标签显示规则" 
            desc="阶段标签和状态标签显示在商机名称右侧。阶段标签使用蓝色背景标识。状态标签根据状态值使用不同颜色：进行中为灰色、已赢单为绿色、已输单为红色。标签支持快速识别商机的当前状态和阶段。"
          />
          <LogicCard 
            tag="字段" 
            title="成交模型字段" 
            desc="每个商机显示自定义的成交模型字段。成交模型为自定义的销售评估体系，通过多个维度指标评估商机的成交可能性。每个指标有三种状态：full（完整）、half（部分）、none（缺失）。"
          />
          <LogicCard 
            tag="交互" 
            title="长按深度分析" 
            desc="长按商机卡片5秒触发深度分析功能。长按期间显示进度条动画反馈。触发后自动跳转至Ask AI界面，预填深度分析Prompt：'[深度洞察] 请基于商机 {商机名称} 提供 5 秒长按触发的专项 AI 建议分析。'。松开手指或移出卡片区域可取消长按操作。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          商机搜索与筛选 (Opportunity Search & Filter)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="交互" 
            title="关键词搜索" 
            desc="搜索框支持关键词搜索，搜索范围为商机名称。搜索使用精确匹配（includes方法），不区分大小写。匹配到商机名称即显示该商机。搜索框提供搜索图标提示，支持实时搜索，输入关键词后立即过滤结果。"
          />
          <LogicCard 
            tag="字段" 
            title="筛选器选项" 
            desc="提供三个下拉筛选器：1. [全部类型]：按商机类型筛选（全部类型、软件新签、软件增购）。仅当当前销售明显有多个沟通流程的客户时显示。2. [全部环节]：按商机阶段筛选（全部环节、立项首访、需求调研、方案呈现、商务谈判、合同签署）。3. [全部状态]：按商机状态筛选（全部状态、进行中、已赢单、已输单）。"
          />
          <LogicCard 
            tag="逻辑" 
            title="筛选逻辑" 
            desc="筛选器与搜索功能可叠加使用。先应用搜索过滤，再应用选择的筛选器。多个筛选器之间为'且'关系。当所有筛选器都选择'全部'时，显示所有商机记录。筛选结果实时更新，无需手动刷新。"
          />
          <LogicCard 
            tag="交互" 
            title="空状态处理" 
            desc="当搜索或筛选后无匹配结果时，显示空状态提示：'未找到匹配的商机'。空状态区域提供'重置所有筛选'按钮，点击后清除所有筛选条件和搜索关键词，恢复显示全部商机。"
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
            title="视图模式切换" 
            desc="商机列表提供两种视图模式切换：1. [列表模式]：紧凑布局，仅显示商机核心信息（名称、阶段、状态、沟通统计、成交模型指标）。2. [卡片模式]：展开布局，在列表模式基础上增加AI生成的简述信息（核心进展、下一步动作、竞争格局、关键顾虑）。"
          />
          <LogicCard 
            tag="逻辑" 
            title="视图状态保持" 
            desc="用户选择的视图模式在组件内部维护。切换视图模式时，搜索和筛选状态保持不变。视图模式切换为即时响应，无需重新加载数据。简述内容仅在卡片模式下显示。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          商机简述 (Opportunity Summary)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="简述字段" 
            desc="卡片模式下，商机显示AI生成的简述信息，分为两个区域：1. 上半区域（单列布局）：[核心进展]：商机当前的状态和关键进展描述，使用蓝色标签。[下一步动作]：针对该商机的下一步行动建议，使用绿色标签。2. 下半区域（双列布局）：[竞争格局]：竞争对手信息和竞争态势，使用橙色标签。[关键顾虑]：客户表达的主要担忧或疑虑，使用红色标签。"
          />
          <LogicCard 
            tag="模型" 
            title="简述生成机制" 
            desc="简述信息由AI自动从沟通记录中提取和总结生成。系统分析商机的所有沟通记录，识别关键信息点，生成结构化的简述内容。简述内容实时更新，反映最新的沟通进展。每个字段内容支持最多2行显示，超出部分自动截断。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          B2C客户列表功能 (B2C Customer List)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="客户卡片核心字段" 
            desc="B2C客户卡片包含以下核心信息：1. [客户姓名]：个人客户的姓名，显示在卡片顶部。2. [阶段标签]：客户所处的销售阶段（如方案报价、意向确认等），使用蓝色标签展示，显示在客户姓名右侧。3. [意向度标签]：客户购买意向等级，高意向度显示为红色标签'意向度高'，中意向度显示为黄色标签'意向度中'，低意向度不显示标签。4. [沟通次数]：与该客户的总沟通记录数，显示为'X次'，使用图标+文字形式展示。5. [最近沟通时间]：最后一次沟通的时间，格式为'MM/DD HH:mm'，使用图标+文字形式展示。6. [客户画像标签]：从沟通记录中提取的客户特征标签，分为两类：行为特征标签（如关注优惠活动、关注颜色搭配）使用橙色，需求特征标签（如新房装修、客厅卧室）使用蓝色。"
          />
          <LogicCard 
            tag="逻辑" 
            title="客户画像标签生成" 
            desc="系统自动从客户的所有沟通记录中提取客户特征，生成画像标签。标签分为两类：1. 行为特征标签：反映客户的购买行为特征（如关注优惠活动、关注颜色搭配、夫妻俩一起来）。2. 需求特征标签：反映客户的实际需求（如新房装修、客厅卧室、别墅配套、注重品牌）。标签用于快速了解客户偏好和需求，帮助销售人员制定针对性的沟通策略。"
          />
          <LogicCard 
            tag="交互" 
            title="关键词搜索" 
            desc="搜索框支持关键词搜索，搜索范围为客户姓名。搜索使用精确匹配（includes方法），不区分大小写。匹配到客户姓名即显示该客户。搜索框提供搜索图标提示，支持实时搜索，输入关键词后立即过滤结果。搜索功能与筛选功能可叠加使用。"
          />
          <LogicCard 
            tag="字段" 
            title="筛选器选项" 
            desc="B2C客户列表提供两个下拉筛选器：1. [全部阶段]：按客户所处销售阶段筛选（全部阶段、方案报价、意向确认等）。2. [意向度]：按客户购买意向等级筛选（全部、高、中、低）。筛选器显示为下拉按钮，点击后显示选项菜单。筛选器与搜索功能可叠加使用，多个筛选器之间为'且'关系。"
          />
          <LogicCard 
            tag="交互" 
            title="视图模式切换" 
            desc="B2C客户列表提供两种视图模式切换，通过右上角的切换按钮控制：1. [列表模式]：紧凑布局，仅显示客户核心信息（姓名、阶段标签、意向度标签、沟通统计、画像标签）。2. [卡片模式]：展开布局，在列表模式基础上增加AI生成的简述信息区域。视图模式切换为即时响应，无需重新加载数据。切换视图模式时，搜索和筛选状态保持不变。"
          />
          <LogicCard 
            tag="字段" 
            title="客户简述字段" 
            desc="卡片模式下，B2C客户显示AI生成的简述信息，分为两个区域：1. 上半区域（单列布局）：[最新进展]：客户当前的状态和关键进展描述，使用蓝色标签标识。[下一步计划]：针对该客户的下一步行动建议，使用绿色标签标识。2. 下半区域（双列布局）：[主要对手]：客户正在对比的竞争对手信息，使用橙色标签标识。[客户顾虑]：客户表达的主要担忧或疑虑，使用红色标签标识。每个字段内容支持最多2行显示，超出部分自动截断。"
          />
          <LogicCard 
            tag="模型" 
            title="简述生成机制" 
            desc="简述信息由AI自动从客户的所有沟通记录中提取和总结生成。系统分析客户的沟通内容，识别关键信息点（如进展状态、下一步动作、竞争对手、客户担忧），生成结构化的简述内容。简述内容实时更新，当产生新的沟通记录时，系统重新分析并更新简述信息，反映最新的沟通进展。"
          />
          <LogicCard 
            tag="功能" 
            title="新建客户" 
            desc="客户列表顶部提供'新建客户'按钮，位于筛选器区域的首位。点击后弹出新建表单，填写必要信息（客户姓名、阶段、意向度等）后创建新的客户记录。新建成功后自动刷新列表，新创建的记录显示在列表顶部。"
          />
          <LogicCard 
            tag="逻辑" 
            title="列表排序" 
            desc="B2C客户列表默认按最近沟通时间倒序排列，最近有沟通的记录显示在列表顶部。排序依据为最近沟通时间字段。当应用搜索或筛选后，排序规则保持不变。"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          B2B客户列表功能 (B2B Customer List)
        </h3>
        <div className="grid gap-3">
          <LogicCard 
            tag="字段" 
            title="客户卡片字段" 
            desc="B2B客户卡片包含：1. [客户名称]：企业客户的公司名称，显示在卡片顶部。2. [联系人数量]：该客户关联的联系人总数，显示为'X名'，使用图标+文字形式展示。3. [沟通次数]：与该客户的总沟通记录数，显示为'X次'，使用图标+文字形式展示。4. [最近沟通时间]：最后一次沟通的时间，格式为'MM/DD HH:mm'，使用图标+文字形式展示。"
          />
          <LogicCard 
            tag="交互" 
            title="关键词搜索" 
            desc="搜索框支持关键词搜索，搜索范围为客户名称和联系人。搜索使用精确匹配（includes方法），不区分大小写。匹配到客户名称或联系人即显示该客户。搜索框提供搜索图标提示，支持实时搜索，输入关键词后立即过滤结果。"
          />
          <LogicCard 
            tag="逻辑" 
            title="列表排序" 
            desc="B2B客户列表默认按最近沟通时间倒序排列，最近有沟通的记录显示在列表顶部。排序依据为最近沟通时间字段。B2B客户列表不提供筛选器和视图切换功能，始终显示列表模式。"
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
            desc="客户和商机数据通过组件内部维护的mock数据或从后台API获取。数据格式根据模式不同而有所差异：B2B客户、B2C客户、商机各自有不同的数据结构。B2C客户数据包含阶段、意向度、画像标签、简述信息等字段。B2B客户数据包含联系人数量、沟通统计等字段。"
          />
        </div>
      </section>
    </PRDLayout>
  );
};

export default CustomerPRD;

