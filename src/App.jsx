import React, { useState } from 'react';

// --- 安全图标组件 (无需额外安装，防止部署失败) ---
const Icon = ({ name }) => {
  const icons = {
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
    layout: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></>,
    refresh: <><path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></>,
    camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>,
    check: <polyline points="20 6 9 17 4 12" />,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    chevronRight: <polyline points="9 18 15 12 9 6" />,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
    share: <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {icons[name] || icons.zap}
    </svg>
  );
};

// --- 12 种画像数据库 (完整版) ---
const ARCHETYPES_DB = {
  STRATEGIC_VISIONARY: { id: "1", name: "战略预跑者", eng: "Strategic Visionary", tags: ["深度规划", "战略定力"], strategy: "稳", audit: "你对未来有极强的预判力，但目前的卡点在于大脑带宽被提前透支。你在 1 月就在背负 12 月的压力。", logic: "增长不来自加速，而来自节奏。把一年的赛程拆解为阶段性的窗口，稳步推进更省力。", leverage: "缩减反馈闭环，从年计划收缩至周行动。", guide: [{ s: "Week 1", t: "系统去噪：减少无效输入", g: "释放30%大脑空间" }, { s: "Week 2", t: "战略对齐：只留一个必成KPI", g: "消除决策纠结" }, { s: "Week 3", t: "行动闭环：每天完成一桩小事", g: "建立行动自信" }, { s: "Week 4", t: "节奏锚定：周五复盘习惯", g: "形成可持续闭环" }], weekly: ["战略校准日：只处理核心任务", "深度产出日：90分钟手机隔离", "闭环复盘日：清空待办尾数", "彻底断电日：物理隔离讯息"], quote: "你要的不是万无一失的未来，而是步步为营的现在。", frequency: "4Hz - 稳态", stop: "未来风险担忧", start: "周行动闭环", focus: "大脑精力配置" },
  PRECISION_ALIGNER: { id: "2", name: "精准对齐者", eng: "Precision Aligner", tags: ["目标减法", "高ROI"], strategy: "收", audit: "系统被过多的“好机会”塞满，导致核心精力被稀释。由于选择太多，你在每个方向上都无法投入全力。", logic: "增长来自放弃。砍掉80%的次要目标，你才能在20%的核心赛道上实现10倍爆发。", leverage: "执行“战略减法”，每周强制从清单上删除一个不重要的任务。", guide: [{ s: "Week 1", t: "项目盘点：识别低ROI项", g: "释放决策带宽" }, { s: "Week 2", t: "三选一模型：统一定义核心", g: "明确发力方向" }, { s: "Week 3", t: "建立拒绝机制：对邀约说不", g: "守住时间防线" }, { s: "Week 4", t: "资源优化：向核心赛道倾斜", g: "实现单点突破" }], weekly: ["对齐日：对照目标审计周动作", "深耕日：只处理最高指标任务", "过滤日：清理垃圾待办任务", "留白日：为下周思考预留空间"], quote: "卓越不是因为做了更多，而是因为拒绝了几乎所有事情。", frequency: "6Hz - 聚焦", stop: "多线并行损耗", start: "核心目标全力攻击", focus: "资源投入比" },
  AGILE_EXECUTIONER: { id: "3", name: "即时爆发者", eng: "Agile Executioner", tags: ["极致行动", "反馈驱动"], strategy: "攻", audit: "行动力极强，往往感觉到了就立刻开始。卡点在于即兴决策可能带来后期大量的补坑工作。", logic: "快是你的优势，但带刹车的快才是胜势。在行动和情绪之间增加一个小小的缓冲带。", leverage: "在重要决策前增加 24 小时缓冲期。", guide: [{ s: "Week 1", t: "建立灵感池：记录而非执行", g: "减少临时开坑" }, { s: "Week 2", t: "优先级排序：按价值分配精力", g: "优化行动颗粒度" }, { s: "Week 3", t: "闭环反馈：每日晚间5分复盘", g: "提升决策质量" }, { s: "Week 4", t: "敏捷迭代：根据反馈微调方向", g: "实现快速增长" }], weekly: ["闪电日：集中处理积压事务", "心流日：全神贯注单一产出", "复盘日：总结本周有效经验", "空挡日：不做任何确定性计划"], quote: "快是天赋，但节奏是技术。", frequency: "7Hz - 敏捷", stop: "即兴盲目开坑", start: "决策缓冲机制", focus: "行动产出比" },
  FLOW_OPTIMIZER: { id: "4", name: "心流优化者", eng: "Flow Optimizer", tags: ["创造力", "轻量结构"], strategy: "稳", audit: "追求自由和心流，但如果完全缺乏生活底座，你的轻松感会慢慢变成漂浮感和空虚。", logic: "为生活增加轻量的刚性结构（如固定作息），会让你在创造时拥有更踏实的安全感。", leverage: "每天固定一个 90 分钟的“断网深潜期”。", guide: [{ s: "Week 1", t: "建立锚点：固定起床/入睡时间", g: "稳定系统底层" }, { s: "Week 2", t: "环境设计：打造专属创作角落", g: "加速进入心流" }, { s: "Week 3", t: "任务拆解：将大目标化为微习惯", g: "减少启动内耗" }, { s: "Week 4", t: "结构检查：评估现有节奏弹性", g: "维持持续动力" }], weekly: ["深潜日：全天专注创造性任务", "自由日：完全随性安排时间", "输入日：大量摄取灵感素材", "整理日：清空数字环境杂物"], quote: "在有规律的节奏里，自由才会真正升级。", frequency: "5Hz - 律动", stop: "无序漂浮空耗", start: "刚性时间锚点", focus: "心流环境设计" },
  FOUNDATION_REBUILDER: { id: "5", name: "底盘重塑者", eng: "Foundation Rebuilder", tags: ["掌控感", "微习惯"], strategy: "慢", audit: "目前感觉生活在被事情推着走。与其谈突破，不如先拿回一些微小事情的主权。", logic: "从最小的可控点开始（如整理桌面），只要是你亲手决定的事，都在帮你重建信心。", leverage: "从整理物理环境开始，找回生活的绝对掌控。", guide: [{ s: "Week 1", t: "环境重启：彻底整理工作区", g: "拿回物理掌控感" }, { s: "Week 2", t: "微小成功：每日坚持1个习惯", g: "重建效能信心" }, { s: "Week 3", t: "边界建立：学会对小要求说不", g: "保护个人空间" }, { s: "Week 4", t: "节律回归：规律饮食与饮水", g: "恢复基础能量" }], weekly: ["整理日：全方位清空环境", "极简日：减少决策与社交", "确认日：核对小目标的达成", "陪伴日：与自己深度相处"], quote: "每一件亲手决定的事，都在重建你的力量。", frequency: "2Hz - 觉醒", stop: "随波逐流感", start: "微小可控点实验", focus: "底层基建优化" },
  ASSET_LEVERAGER: { id: "6", name: "资产复利者", eng: "Asset Leverager", tags: ["优势延续", "经验复刻"], strategy: "稳", audit: "你已经拥有了成功的模版和经验。这一年不需要推翻重来，而是要实现躺平式的系统化。", logic: "你的优势在于积累。将已验证有效的路径标准化、自动化，就是你最高效的增长方式。", leverage: "将现有成功路径标准化，写成个人 SOP。", guide: [{ s: "Week 1", t: "资产盘点：总结过去成功经验", g: "识别高产出模版" }, { s: "Week 2", t: "流程优化：剔除多余繁琐步骤", g: "提升单次转化率" }, { s: "Week 3", t: "自动化工具：引入系统辅助", g: "减少人工介入" }, { s: "Week 4", t: "复刻实验：在小范围测试新系统", g: "确认复利逻辑" }], weekly: ["优化日：升级现有工作模板", "收割日：集中获取阶段性成果", "观察日：分析数据与反馈", "保养日：维护系统核心资源"], quote: "持续本身就是一种惊人的力量。", frequency: "4Hz - 稳态", stop: "无效推翻重建", start: "系统模板复刻", focus: "复利增长逻辑" },
  REFINING_NAVIGATOR: { id: "7", name: "复盘进化者", eng: "Refining Navigator", tags: ["认知升级", "避坑指南"], strategy: "收", audit: "过往经历中蕴含大量财富，但目前你还处在“复读”而非“提炼”阶段，这让你感到内耗。", logic: "转化过往冗余信息为“避坑指南”。减少错误率，就是这一年最低成本的跃迁方式。", leverage: "建立个人避坑库，每周反思一个“不再做的事”。", guide: [{ s: "Week 1", t: "负面清理：盘点过往损耗点", g: "建立不为清单" }, { s: "Week 2", t: "规律提炼：识别重复错误模式", g: "升级决策算法" }, { s: "Week 3", t: "系统去燥：减少干扰源输入", g: "清空认知缓存" }, { s: "Week 4", t: "定向精进：针对弱点小步迭代", g: "完成认知闭环" }], weekly: ["复盘日：深度分析周得失", "提炼日：更新个人行动准则", "阅读日：通过外援优化逻辑", "静思日：屏蔽信息纯粹思考"], quote: "避开已知的坑，就是通往成功的最短路径。", frequency: "3Hz - 澄净", stop: "过往信息纠结", start: "深度提炼复盘", focus: "决策逻辑迭代" },
  SAFE_EXPLORER: { id: "8", name: "稳健防御者", eng: "Safe Explorer", tags: ["环境敏感", "安全边界"], strategy: "收", audit: "你对环境噪音和他人评价非常敏感。这不是脆弱，而是你的系统在提醒你需要建立安全隔离带。", logic: "稳定的边界会带来稳定的能量。先让自己感到安全，你的天赋才会真正流露出来。", leverage: "严格筛选社交与信息输入，建立心理恒温箱。", guide: [{ s: "Week 1", t: "物理隔离：打造专属办公区", g: "降低环境噪音" }, { s: "Week 2", t: "社交减法：暂时离开高压圈子", g: "保护情绪能量" }, { s: "Week 3", t: "规律作息：建立高预期的生活", g: "增加内部确定感" }, { s: "Week 4", t: "小步试探：在安全区边缘活动", g: "适度扩展边界" }], weekly: ["沉浸日：无干扰独立工作", "屏蔽日：关闭所有非必要通知", "充电日：接触自然的滋养", "维护日：打理个人私域空间"], quote: "稳定的边界，会为你守住向上的动能。", frequency: "2Hz - 宁静", stop: "外界噪音损耗", start: "安全边界构建", focus: "环境能量调节" },
  HARMONIC_SCALER: { id: "9", name: "全能扩容者", eng: "Harmonic Scaler", tags: ["动态平衡", "潜能激发"], strategy: "攻", audit: "目前的系统运行非常平衡。现在的卡点在于“太过舒适”，需要一个合适的压力点来促成下一次跃迁。", logic: "稳健是为了更勇敢地跃迁。在守住底盘的前提下，开启 21 天的阶段性冲刺。", leverage: "在稳定结构中，增加 20% 的高风险、高收益探索。", guide: [{ s: "Week 1", t: "压力测试：挑战一件略难的事", g: "识别增长瓶颈" }, { s: "Week 2", t: "资源饱和：集中精力攻克一点", g: "实现突破进展" }, { s: "Week 3", t: "反馈整合：将新经验并入系统", g: "扩大能力边界" }, { s: "Week 4", t: "动态平衡：调整高压后的结构", g: "防止系统崩坏" }], weekly: ["挑战日：处理最棘手的问题", "平衡日：协调多方资源配置", "反馈日：向高手请教优化点", "休整日：为大脑增加含氧量"], quote: "最好的平衡，是动态中的向前。", frequency: "6Hz - 律动", stop: "过度安于现状", start: "阶段饱和攻击", focus: "系统承载扩容" },
  PIVOT_STRATEGIST: { id: "10", name: "敏捷转型者", eng: "Pivot Strategist", tags: ["最小实验", "路径探索"], strategy: "稳", audit: "正处于方向切换期。不要急于定下终局，现在的模糊是为了收集更多有效的数据点。", logic: "答案不在思考里。用最小成本的小实验代替反复纠结，在反馈中寻找真正的第二增长曲线。", leverage: "每周尝试一个小实验，用数据代替猜测。", guide: [{ s: "Week 1", t: "假设建立：列出3个可能方向", g: "降低焦虑门槛" }, { s: "Week 2", t: "MVP实验：用最低成本测试", g: "获得一手反馈" }, { s: "Week 3", t: "数据审计：分析实验产出比", g: "快速定位真需求" }, { s: "Week 4", t: "路径选择：根据结果决定留存", g: "实现敏捷转型" }], weekly: ["实验日：投放新内容或测试", "观察日：收集数据与用户声音", "决策日：决定下一步去留", "缓冲日：消化转型期的不确定"], quote: "不要预测未来，去创造反馈。", frequency: "5Hz - 灵动", stop: "低效反复脑补", start: "最小可行性实验", focus: "试错成本控制" },
  PEAK_PERFORMER: { id: "11", name: "巅峰性能者", eng: "Peak Performance", tags: ["高效产出", "指数增长"], strategy: "攻", audit: "你正处于系统巅峰，执行力拉满。唯一的风险是“持续高压”导致的后期报复性反弹。", logic: "巅峰状态更需要带刹车的冲刺。建立强制性的休整期，是为了让系统不陷入彻底的崩溃。", leverage: "设定“强制断电时间”，每晚固定时间停止生产。 ", guide: [{ s: "Week 1", t: "边界建立：安装任务拦截插件", g: "保护系统边界" }, { s: "Week 2", t: "系统外包：识别低产值动作", g: "提升时间产值" }, { s: "Week 3", t: "巅峰产出：固定深潜创造窗口", g: "产生核心资产" }, { s: "Week 4", t: "强制重启：48小时完全断电", g: "防止反弹崩溃" }], weekly: ["锁定日：拆解周核心ROI", "巅峰日：处理高难度创造", "优化日：精简现有流程", "奖励日：完全脱离效能话题"], quote: "会换气的人，才能在巅峰待得更久。", frequency: "8Hz - 极速", stop: "无界过度输出", start: "系统自动运行", focus: "核心产出效率" },
  SYSTEM_REBOOT: { id: "12", name: "能量重启者", eng: "System Reboot", tags: ["底层修复", "系统重置"], strategy: "慢", audit: "系统预警灯已亮。现在的无力不是你不行，而是能量已跌破阈值，任何行动都是在透支。", logic: "修复比前进更重要。将睡眠与补能视为你的年度核心任务。先活过来，方向自然会变清晰。", leverage: "将睡眠与补能对齐视为第一优先级的“核心任务”。", guide: [{ s: "Week 1", t: "睡眠回归：固定23点入睡", g: "恢复基础认知" }, { s: "Week 2", t: "情绪减法：退出所有内耗关系", g: "停止能量外溢" }, { s: "Week 3", t: "身体修复：每天15分钟拉伸", g: "激活代谢循环" }, { s: "Week 4", t: "微小确信：做一件顺手的小事", g: "重建行动信心" }], weekly: ["修复日：完全的身体关照", "低噪日：关闭社交信息摄入", "轻感日：只处理简单日常", "觉察日：记录身体真实感受"], quote: "当你停下勉强，真正的力量才会回归。", frequency: "1Hz - 修复", stop: "自责与内耗", start: "能量基底修复", focus: "系统运行能耗" }
};

const QUESTIONS = [
  { id: 1, text: "你最近的行动主要由什么驱动？", options: [{ t: "清晰的目标计划", v: "11" }, { t: "必须解决的压力", v: "12" }, { t: "突发的灵感/兴趣", v: "3" }, { t: "惯性的生活节奏", v: "1" }] },
  { id: 2, text: "当你思考下个月的工作时，大脑的第一反应是？", options: [{ t: "迫不及待想推进", v: "9" }, { t: "感到待办事项过载", v: "2" }, { t: "模糊且没有重点", v: "10" }, { t: "担心路径的正确性", v: "1" }] },
  { id: 3, text: "你觉得自己大部分的时间损耗在哪里？", options: [{ t: "规划太完美无法开始", v: "1" }, { t: "被琐事和他人打断", v: "3" }, { t: "对结果的反复纠结", v: "7" }, { t: "找不到行动的意义", v: "5" }] },
  { id: 4, text: "为了实现 10 倍增长，你目前最缺的是？", options: [{ t: "更强的执行力", v: "11" }, { t: "更清晰的选择方向", v: "2" }, { t: "持续的能量供给", v: "12" }, { t: "一个稳定的节奏感", v: "4" }] },
  { id: 5, text: "面对突发的不确定性时，你的典型动作是？", options: [{ t: "快速反应并行动", v: "3" }, { t: "停下来反复评估", v: "8" }, { t: "感到疲惫想逃避", v: "12" }, { t: "按照原定计划执行", v: "6" }] },
  { id: 6, text: "你目前的身体与睡眠状态给你的信号是？", options: [{ t: "电量充沛，可以冲刺", v: "11" }, { t: "勉强维持，经常断电", v: "1" }, { t: "需要深度休整", v: "12" }, { t: "稳定但缺乏活力", v: "5" }] },
  { id: 7, text: "你更倾向于如何提升效能？", options: [{ t: "学习新方法和工具", v: "10" }, { t: "反思复盘避坑", v: "7" }, { t: "维持现状并精进", v: "6" }, { t: "彻底更换赛道探索", v: "9" }] },
  { id: 8, text: "你最希望这一年带给你的感觉是？", options: [{ t: "突破极限的成就感", v: "11" }, { t: "掌控生活的安定感", v: "1" }, { t: "探索新知的惊喜感", v: "10" }, { t: "轻松低耗的顺滑感", v: "4" }] }
];

export default function App() {
  const [view, setView] = useState('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const processResult = (finalAnswers) => {
    const counts = finalAnswers.reduce((acc, val) => { acc[val] = (acc[val] || 0) + 1; return acc; }, {});
    let maxId = "1"; let maxCount = 0;
    for (const id in counts) { if (counts[id] > maxCount) { maxCount = counts[id]; maxId = id; } }
    const resultKey = Object.keys(ARCHETYPES_DB).find(key => ARCHETYPES_DB[key].id === maxId);
    return ARCHETYPES_DB[resultKey || "STRATEGIC_VISIONARY"];
  };

  const handleSelect = (val) => {
    const nextAnswers = [...answers, val];
    setAnswers(nextAnswers);
    if (currentQ < QUESTIONS.length - 1) { setCurrentQ(currentQ + 1); } 
    else { setResult(processResult(nextAnswers)); setView('report'); window.scrollTo(0, 0); }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFDFD', color: '#171717', fontFamily: 'sans-serif' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #E5E5E5', zIndex: 50 }}>
        <div style={{ maxWidth: '768px', margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: 'black', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '12px' }}>OS</div>
            <span style={{ fontWeight: '900', fontSize: '18px', textTransform: 'uppercase' }}>Efficiency 2026</span>
          </div>
          {view !== 'landing' && <button onClick={() => { setView('landing'); setCurrentQ(0); setAnswers([]); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A3A3A3', fontSize: '12px' }}><Icon name="refresh" /> RESET</button>}
        </div>
      </header>

      <main style={{ maxWidth: '768px', margin: '0 auto', paddingTop: '96px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px' }}>
        {view === 'landing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', backgroundColor: 'black', color: 'white', borderRadius: '999px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', width: 'fit-content' }}><Icon name="zap" /> 2026 Action Guide</div>
              <h1 style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1.1' }}>深度剖析年度状态<br/>开启 2026 <span style={{ color: '#4F46E5' }}>高效人生</span></h1>
              <p style={{ color: '#737373', fontSize: '18px', lineHeight: '1.6' }}>别再盲目努力。我们会通过深度状态分析，为你匹配专属的 10 倍增长攻略与行动手册。</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '24px', backgroundColor: 'white', border: '1px solid #E5E5E5', borderRadius: '24px' }}><div style={{ width: '40px', height: '40px', backgroundColor: '#EEF2FF', color: '#4F46E5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}><Icon name="chart" /></div><h3 style={{ fontWeight: 'bold' }}>状态审计</h3><p style={{ fontSize: '12px', color: '#A3A3A3' }}>识别当前大脑负荷与行动阻力。</p></div>
              <div style={{ padding: '24px', backgroundColor: 'white', border: '1px solid #E5E5E5', borderRadius: '24px' }}><div style={{ width: '40px', height: '40px', backgroundColor: '#ECFDF5', color: '#10B981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}><Icon name="layout" /></div><h3 style={{ fontWeight: 'bold' }}>增长护照</h3><p style={{ fontSize: '12px', color: '#A3A3A3' }}>生成可视觉化保存的身份卡。</p></div>
            </div>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setView('quiz')} style={{ position: 'relative', zIndex: 10, width: '100%', padding: '24px', backgroundColor: 'black', color: 'white', borderRadius: '32px', fontWeight: '900', fontSize: '20px', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>立即开始 <Icon name="arrowRight" /></button>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#4F46E5', borderRadius: '32px', filter: 'blur(15px)', opacity: 0.3, zIndex: 1 }} />
            </div>
          </div>
        )}

        {view === 'quiz' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}><span style={{ fontSize: '10px', fontWeight: '900', color: '#A3A3A3' }}>Analysis Progress</span><span style={{ fontWeight: '900' }}>{currentQ + 1} / {QUESTIONS.length}</span></div>
              <div style={{ height: '4px', width: '100%', backgroundColor: '#E5E5E5', borderRadius: '999px', overflow: 'hidden' }}><div style={{ height: '100%', backgroundColor: 'black', width: `${((currentQ + 1) / QUESTIONS.length) * 100}%`, transition: 'width 0.3s' }} /></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: '900' }}>{QUESTIONS[currentQ].text}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {QUESTIONS[currentQ].options.map((opt, i) => (
                  <button key={i} onClick={() => handleSelect(opt.v)} style={{ width: '100%', padding: '24px', textAlign: 'left', backgroundColor: 'white', border: '1px solid #E5E5E5', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ fontWeight: 'bold', color: '#525252' }}>{opt.t}</span><Icon name="chevronRight" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'report' && result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ textAlign: 'center', gap: '16px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'inline-block', margin: '0 auto', padding: '4px 12px', backgroundColor: '#EEF2FF', color: '#4F46E5', fontSize: '10px', fontWeight: '900', borderRadius: '4px' }}>AUDIT COMPLETE</div>
              <h2 style={{ fontSize: '36px', fontWeight: '900' }}>{result.name}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>{result.tags.map(t => <span key={t} style={{ fontSize: '10px', color: '#A3A3A3', backgroundColor: '#F5F5F5', padding: '2px 8px', borderRadius: '4px' }}>#{t}</span>)}</div>
            </div>

            <section style={{ padding: '32px', backgroundColor: 'white', border: '1px solid #E5E5E5', borderRadius: '40px' }}>
              <div style={{ display: 'flex', gap: '8px', fontWeight: '900', fontSize: '12px', color: '#4F46E5', marginBottom: '16px' }}><Icon name="check" /> 状态审计 Audit</div>
              <p style={{ color: '#525252', lineHeight: '1.6', fontStyle: 'italic' }}>“{result.audit}”</p>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '32px', backgroundColor: 'black', color: 'white', borderRadius: '40px' }}>
                <div style={{ fontSize: '10px', color: '#737373', marginBottom: '8px' }}>Action Rhythm</div>
                <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#818CF8' }}>主节奏：{result.strategy}</h3>
                <p style={{ fontSize: '14px', color: '#A3A3A3', lineHeight: '1.6' }}>{result.logic}</p>
              </div>
              <div style={{ padding: '32px', backgroundColor: '#EEF2FF', borderRadius: '40px' }}>
                <div style={{ fontSize: '10px', color: '#4F46E5', marginBottom: '8px' }}>10X Move</div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#312E81' }}>增长杠杆：{result.leverage}</h3>
              </div>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontWeight: '900', fontSize: '14px', textTransform: 'uppercase' }}><Icon name="zap" /> 30天重启手册</h3>
              <div style={{ overflow: 'hidden', border: '1px solid #E5E5E5', borderRadius: '24px', backgroundColor: 'white' }}>
                <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #F5F5F5' }}>
                    <tr>
                      <th style={{ padding: '16px', fontSize: '10px', color: '#A3A3A3', textAlign: 'left' }}>阶段</th>
                      <th style={{ padding: '16px', fontSize: '10px', color: '#A3A3A3', textAlign: 'left' }}>核心任务</th>
                      <th style={{ padding: '16px', fontSize: '10px', color: '#A3A3A3', textAlign: 'left' }}>目标</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.guide.map((g, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #F5F5F5' }}>
                        <td style={{ padding: '16px', fontWeight: '900', color: '#4F46E5' }}>{g.s}</td>
                        <td style={{ padding: '16px' }}>{g.t}</td>
                        <td style={{ padding: '16px', color: '#A3A3A3', fontSize: '10px', fontStyle: 'italic' }}>{g.g}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section style={{ padding: '32px', backgroundColor: 'white', border: '1px solid #E5E5E5', borderRadius: '40px' }}>
              <h3 style={{ fontWeight: '900', fontSize: '14px', marginBottom: '16px' }}>稳态周计划模板</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {result.weekly.map((item, i) => (
                  <li key={i} style={{ fontSize: '14px', color: '#525252', padding: '8px 0', borderBottom: '1px solid #F5F5F5', display: 'flex', gap: '12px' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%', marginTop: '6px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section style={{ position: 'relative', width: '100%', backgroundColor: '#0A0A0A', borderRadius: '48px', padding: '40px', color: 'white', display: 'flex', flexDirection: 'column', gap: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><p style={{ fontSize: '10px', color: '#525252' }}>Efficiency OS</p><h4 style={{ fontSize: '24px', fontWeight: '900', color: '#6366F1' }}>Passport 2026</h4></div>
                <div style={{ padding: '4px 12px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', fontSize: '8px', color: '#10B981' }}>ACTIVE NODE</div>
              </div>
              <div><p style={{ fontSize: '10px', color: '#525252', letterSpacing: '4px' }}>Archetype / 画像</p><h1 style={{ fontSize: '48px', fontWeight: '900' }}>{result.name}</h1><p style={{ fontSize: '14px', opacity: 0.4 }}>{result.eng}</p></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
                 <div><p style={{ fontSize: '8px', color: '#525252' }}>Frequency / 节奏</p><p style={{ fontSize: '18px', fontWeight: '900' }}>{result.frequency}</p></div>
                 <div style={{ textAlign: 'right' }}><p style={{ fontSize: '8px', color: '#525252' }}>Status / 策略</p><p style={{ fontSize: '18px', fontWeight: '900' }}>{result.strategy}</p></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 <p style={{ fontSize: '10px', color: '#D4D4D4' }}>STOP: {result.stop}</p>
                 <p style={{ fontSize: '10px', color: '#D4D4D4' }}>START: {result.start}</p>
                 <p style={{ fontSize: '10px', color: '#D4D4D4' }}>FOCUS: {result.focus}</p>
              </div>
              <div style={{ textAlign: 'center', marginTop: '24px' }}><p style={{ fontSize: '12px', fontStyle: 'italic', opacity: 0.6 }}>“{result.quote}”</p></div>
            </section>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ flex: 1, padding: '16px', backgroundColor: 'white', border: '1px solid #E5E5E5', borderRadius: '16px', fontWeight: 'bold' }}>保存报告</button>
              <button style={{ flex: 1, padding: '16px', backgroundColor: 'black', color: 'white', borderRadius: '16px', fontWeight: 'bold' }}>分享到小红书</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
