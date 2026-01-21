import React, { useState } from 'react';

// 自定义极简图标组件，不依赖任何第三方库
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

const ARCHETYPES_DB = {
  STRATEGIC_VISIONARY: {
    id: "STRATEGIC_VISIONARY", name: "战略预跑者", eng: "Strategic Visionary", tags: ["深度规划", "战略定力", "高效对齐"],
    audit: "你目前的系统正处于“高频预热、战略前置”状态。优势在于极强的洞察力，但卡点在于大脑带宽被提前透支。你在 1 月份就在背负 12 月份的压力。",
    strategy: "稳 (Strategic Stability)", logic: "增长不来自加速，而来自节奏的颗粒度。你需要把“一年的赛程”拆解为“阶段性的窗口”。",
    leverage: "缩减反馈闭环，从“年度计划”收缩至“周行动闭环”。",
    guide: [{ step: "Week 1", task: "卸载3个高频干扰App，拒绝非必要社交", goal: "释放30%空间" }, { step: "Week 2", task: "锁定本月唯一核心任务，砍掉80%远期目标", goal: "消除决策纠结" }, { step: "Week 3", task: "开启15分钟启动法，每天完成最小交付物", goal: "建立行动自信" }, { step: "Week 4", task: "建立周五复盘习惯，锁定下周唯一核心", goal: "形成可持续闭环" }],
    weekly: ["战略校准日：只处理唯一核心任务", "深度产出日：90分钟手机隔离窗口", "闭环复盘日：清空待办尾数", "彻底断电日：完全物理隔离讯息"],
    quote: "你要的不是万无一失的未来，而是步步为营的现在。", frequency: "4Hz - 稳态",
    directives: { stop: "停止远期风险担忧", start: "开启周行动闭环", optimize: "优化大脑精力配置" }
  },
  PEAK_PERFORMER: {
    id: "PEAK_PERFORMER", name: "巅峰性能者", eng: "Peak Performance", tags: ["高效产出", "系统边界", "指数增长"],
    audit: "你目前的系统处于高频运转状态，负载接近峰值。执行力极强，但长期满格运行让系统面临过热和反弹风险。",
    strategy: "攻 (Controlled Sprint)", logic: "增长不来自更努力，而来自更有弹性的发力。设定强制冷却期是为了下一次更高能量的跃迁。",
    leverage: "建立“能量波峰”制度，在能量最高的时间段解决80%的核心问题。",
    guide: [{ step: "Week 1", task: "划定绝对不工作时间，物理隔离电子设备", goal: "保护核心能量" }, { step: "Week 2", task: "识别非核心低效任务，寻求外包或自动化", goal: "提升时间产值" }, { step: "Week 3", task: "每天固定2小时无干扰深度创作窗口", goal: "产出核心资产" }, { step: "Week 4", task: "完成阶段任务后进行48小时完全断电休整", goal: "预防系统崩溃" }],
    weekly: ["目标锁定日：拆解周核心ROI", "巅峰执行日：集中处理高难度任务", "优化日：精简现有冗余流程", "奖励日：完全脱离生产力话题"],
    quote: "真正的高手，不是跑得最快的人，而是懂得何时换气的人。", frequency: "8Hz - 高能",
    directives: { stop: "停止无边界过度输出", start: "开启系统化自动化", optimize: "优化核心产出效率" }
  },
  SYSTEM_REBOOT: {
    id: "SYSTEM_REBOOT", name: "能量重启者", eng: "System Reboot", tags: ["底层修复", "节律回归", "蓄势待发"],
    audit: "当前信号不是迷茫而是疲惫。能量不足时，任何规划都是负担。这不代表你不行，而是需要重新初始化你的生活节律。",
    strategy: "慢 (Deep Restoration)", logic: "修复比前进更重要。先把节律找回来，方向会自然变清晰。今年的好运来自“先让自己活过来”。",
    leverage: "将睡眠与基础补能视为“第一优先级任务”，而非休息手段。",
    guide: [{ step: "Week 1", task: "固定入睡时间，晚间进行电子设备强制隔离", goal: "恢复大脑机能" }, { step: "Week 2", task: "退出消耗情绪的群组，停止所有无意义比较", goal: "停止能量外溢" }, { step: "Week 3", task: "每天15分钟基础能量修复（拉伸/散步）", goal: "激活身体机能" }, { step: "Week 4", task: "尝试一件让你感到轻松且有微小成就感的事", goal: "重建行动信心" }],
    weekly: ["修复日：完全的身体照顾计划", "低噪日：减少社交与无效信息摄入", "轻感日：只处理最简单的日常任务", "觉察日：记录身体感受而非任务进度"],
    quote: "当你不再勉强自己前进，真正的方向反而会浮现。", frequency: "1Hz - 修复",
    directives: { stop: "停止自我指责与纠结", start: "开启能量基底修复", optimize: "优化系统运行能耗" }
  },
  PRECISION_ALIGNER: {
    id: "PRECISION_ALIGNER", name: "精准对齐者", eng: "Precision Aligner", tags: ["目标减法", "战略焦点", "高ROI"],
    audit: "你的系统目前被过多的“好机会”塞满，导致核心精力被稀释。由于选择太多，你在每一个方向上都无法投入全力。",
    strategy: "收 (Focued Reduction)", logic: "增长来自放弃。砍掉80%的次要目标，你才能在20%的核心赛道上实现10倍爆发。",
    leverage: "执行“战略减法”，每周强制从清单上删除一个不重要的任务。",
    guide: [{ step: "Week 1", task: "盘点所有项目，停掉回报率最低的3项", goal: "释放决策带宽" }, { step: "Week 2", task: "使用三选一模型，重新定义今年的唯一核心", goal: "统一发力方向" }, { step: "Week 3", task: "建立拒绝机制，对所有非核心邀约说不", goal: "守住时间防线" }, { step: "Week 4", task: "优化现有资源，将其向核心赛道倾斜", goal: "实现单点突破" }],
    weekly: ["对齐日：对照核心目标审计本周动作", "深耕日：只处理与最高指标相关的任务", "过滤日：清理掉入收件箱的垃圾任务", "留白日：为下周思考预留空间"],
    quote: "卓越不是因为做了更多，而是因为拒绝了几乎所有事情。", frequency: "6Hz - 聚焦",
    directives: { stop: "停止多线并行损耗", start: "开启核心目标全力攻击", optimize: "优化资源投入比" }
  }
};

const QUESTIONS = [
  { id: 1, text: "你最近的行动主要由什么驱动？", options: [{ t: "清晰的目标计划", v: "PEAK" }, { t: "必须解决的压力", v: "REBOOT" }, { t: "突发的灵感/兴趣", v: "AGILE" }, { t: "惯性的生活节奏", v: "VISIONARY" }] },
  { id: 2, text: "当你思考下个月的工作时，大脑的第一反应是？", options: [{ t: "迫不及待想推进", v: "PEAK" }, { t: "感到待办事项过载", v: "REBOOT" }, { t: "模糊且没有重点", v: "AGILE" }, { t: "担心路径的正确性", v: "VISIONARY" }] },
  { id: 3, text: "你觉得自己大部分的时间损耗在哪里？", options: [{ t: "规划太完美无法开始", v: "VISIONARY" }, { t: "被琐事和他人打断", v: "AGILE" }, { t: "对过去结果的反复纠结", v: "REBOOT" }, { t: "找不到行动的意义", v: "STABLE" }] },
  { id: 4, text: "为了实现 2026 年 10 倍增长，你目前最缺的是？", options: [{ t: "更强的执行力", v: "PEAK" }, { t: "更清晰的选择方向", v: "VISIONARY" }, { t: "持续的能量供给", v: "REBOOT" }, { t: "一个稳定的节奏感", v: "STABLE" }] },
  { id: 5, text: "面对突发的不确定性时，你的典型动作是？", options: [{ t: "快速反应并行动", v: "PEAK" }, { t: "停下来反复评估风险", v: "VISIONARY" }, { t: "感到疲惫想逃避", v: "REBOOT" }, { t: "按照原定计划执行", v: "STABLE" }] },
  { id: 6, text: "你目前的身体与睡眠状态给你的信号是？", options: [{ t: "电量充沛，可以冲刺", v: "PEAK" }, { t: "勉强维持，经常断电", v: "VISIONARY" }, { t: "需要深度休整", v: "REBOOT" }, { t: "稳定但缺乏活力", v: "STABLE" }] },
  { id: 7, text: "你更倾向于如何提升效能？", options: [{ t: "学习新方法和工具", v: "AGILE" }, { t: "反思复盘避坑", v: "VISIONARY" }, { t: "维持现状并精进", v: "STABLE" }, { t: "彻底更换赛道探索", v: "PEAK" }] },
  { id: 8, text: "你最希望这一年带给你的感觉是？", options: [{ t: "突破极限的成就感", v: "PEAK" }, { t: "掌控生活的安定感", v: "VISIONARY" }, { t: "探索新知的惊喜感", v: "AGILE" }, { t: "轻松低耗的顺滑感", v: "STABLE" }] }
];

export default function App() {
  const [view, setView] = useState('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const processResult = (finalAnswers) => {
    const counts = finalAnswers.reduce((acc, val) => { acc[val] = (acc[val] || 0) + 1; return acc; }, {});
    if (counts.REBOOT >= 3) return ARCHETYPES_DB.SYSTEM_REBOOT;
    if (counts.PEAK >= 3) return ARCHETYPES_DB.PEAK_PERFORMER;
    if (counts.VISIONARY >= 3) return ARCHETYPES_DB.STRATEGIC_VISIONARY;
    return ARCHETYPES_DB.PRECISION_ALIGNER;
  };

  const handleSelect = (val) => {
    const nextAnswers = [...answers, val];
    setAnswers(nextAnswers);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const res = processResult(nextAnswers);
      setResult(res);
      setView('report');
      window.scrollTo(0, 0);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFDFD', color: '#171717', fontFamily: 'sans-serif' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #E5E5E5', zIndex: 50 }}>
        <div style={{ maxWidth: '768px', margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: 'black', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic', fontSize: '12px' }}>OS</div>
            <span style={{ fontWeight: '900', letterSpacing: '-0.05em', fontSize: '18px', textTransform: 'uppercase' }}>Efficiency 2026</span>
          </div>
          {view !== 'landing' && (
            <button onClick={() => { setView('landing'); setCurrentQ(0); setAnswers([]); }} style={{ fontSize: '12px', fontWeight: 'bold', color: '#A3A3A3', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase' }}>
              <Icon name="refresh" /> Reset
            </button>
          )}
        </div>
      </header>

      <main style={{ maxWidth: '768px', margin: '0 auto', paddingTop: '96px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px' }}>
        {view === 'landing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', backgroundColor: 'black', color: 'white', borderRadius: '999px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', width: 'fit-content' }}><Icon name="zap" /> 2026 Action Guide</div>
              <h1 style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-0.05em' }}>深度剖析年度状态<br/>开启 2026 <span style={{ color: '#4F46E5' }}>高效人生</span></h1>
              <p style={{ color: '#737373', fontSize: '18px', lineHeight: '1.6', maxWidth: '400px' }}>别再盲目努力。我们会通过深度状态分析，为你匹配专属的 10 倍增长攻略与行动手册。</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '24px', backgroundColor: 'white', border: '1px solid #E5E5E5', borderRadius: '24px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#EEF2FF', color: '#4F46E5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}><Icon name="chart" /></div>
                <h3 style={{ fontWeight: 'bold' }}>状态审计</h3>
                <p style={{ fontSize: '12px', color: '#A3A3A3' }}>精准识别你当前的大脑负荷与行动阻力。</p>
              </div>
              <div style={{ padding: '24px', backgroundColor: 'white', border: '1px solid #E5E5E5', borderRadius: '24px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#ECFDF5', color: '#10B981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}><Icon name="layout" /></div>
                <h3 style={{ fontWeight: 'bold' }}>增长护照</h3>
                <p style={{ fontSize: '12px', color: '#A3A3A3' }}>生成一张可视觉化保存的 2026 效能身份卡。</p>
              </div>
            </div>
            <button onClick={() => setView('quiz')} style={{ width: '100%', padding: '24px', backgroundColor: 'black', color: 'white', borderRadius: '32px', fontWeight: '900', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', border: 'none', boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.2)' }}>立即开始 <Icon name="arrowRight" /></button>
          </div>
        )}
        {view === 'quiz' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}><span style={{ fontSize: '10px', fontWeight: '900', color: '#A3A3A3', textTransform: 'uppercase' }}>Analysis Progress</span><span style={{ fontSize: '14px', fontWeight: '900', fontStyle: 'italic' }}>{currentQ + 1} / {QUESTIONS.length}</span></div>
              <div style={{ height: '4px', width: '100%', backgroundColor: '#E5E5E5', borderRadius: '999px', overflow: 'hidden' }}><div style={{ height: '100%', backgroundColor: 'black', width: `${((currentQ + 1) / QUESTIONS.length) * 100}%`, transition: 'width 0.3s' }} /></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: '900', letterSpacing: '-0.02em' }}>{QUESTIONS[currentQ].text}</h2>
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
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'inline-block', margin: '0 auto', padding: '4px 12px', backgroundColor: '#EEF2FF', color: '#4F46E5', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', borderRadius: '4px' }}>Audit Complete</div>
              <h2 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.05em' }}>{result.name}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>{result.tags.map(t => <span key={t} style={{ fontSize: '10px', fontWeight: 'bold', color: '#A3A3A3', backgroundColor: '#F5F5F5', padding: '2px 8px', borderRadius: '4px' }}>#{t}</span>)}</div>
            </div>
            <section style={{ padding: '32px', backgroundColor: 'white', border: '1px solid #E5E5E5', borderRadius: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase', color: '#4F46E5' }}><Icon name="check" /> 状态审计 Audit</div>
              <p style={{ color: '#525252', lineHeight: '1.6', fontStyle: 'italic', fontWeight: '500' }}>“{result.audit}”</p>
            </section>
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '32px', backgroundColor: 'black', color: 'white', borderRadius: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#737373', textTransform: 'uppercase' }}>Action Rhythm</div>
                <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#818CF8' }}>年度主节奏：{result.strategy.split(' ')[0]}</h3>
                <p style={{ fontSize: '14px', color: '#A3A3A3', lineHeight: '1.6', fontWeight: '300' }}>{result.logic}</p>
              </div>
              <div style={{ padding: '32px', backgroundColor: '#EEF2FF', border: '1px solid #E0E7FF', borderRadius: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#4F46E5', textTransform: 'uppercase' }}>10X Move</div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#312E81' }}>增长杠杆：{result.leverage}</h3>
              </div>
            </section>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontWeight: '900', fontSize: '14px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}><Icon name="zap" /> 30天重启手册</h3>
              <div style={{ overflow: 'hidden', border: '1px solid #E5E5E5', borderRadius: '24px', backgroundColor: 'white' }}>
                <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #F5F5F5' }}>
                    <tr>
                      <th style={{ padding: '16px', fontWeight: '900', fontSize: '10px', color: '#A3A3A3', textTransform: 'uppercase', textAlign: 'left' }}>阶段</th>
                      <th style={{ padding: '16px', fontWeight: '900', fontSize: '10px', color: '#A3A3A3', textTransform: 'uppercase', textAlign: 'left' }}>核心任务</th>
                      <th style={{ padding: '16px', fontWeight: '900', fontSize: '10px', color: '#A3A3A3', textTransform: 'uppercase', textAlign: 'left' }}>效能目标</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: '#525252' }}>
                    {result.guide.map((g, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #F5F5F5' }}>
                        <td style={{ padding: '16px', fontWeight: '900', color: '#4F46E5' }}>{g.step}</td>
                        <td style={{ padding: '16px', fontWeight: '500' }}>{g.task}</td>
                        <td style={{ padding: '16px', color: '#A3A3A3', fontSize: '10px', fontStyle: 'italic' }}>{g.goal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid #E5E5E5', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontWeight: '900', fontSize: '14px', textTransform: 'uppercase' }}>2026 增长护照 (截图保存)</h3>
                <span style={{ fontSize: '10px', color: '#A3A3A3', fontWeight: 'bold', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}><Icon name="camera" /> SAVE PASSPORT</span>
              </div>
              <div style={{ position: 'relative', width: '100%', backgroundColor: '#0A0A0A', borderRadius: '48px', padding: '40px', color: 'white', display: 'flex', flexDirection: 'column', gap: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div><p style={{ fontSize: '10px', fontWeight: '900', color: '#525252', textTransform: 'uppercase' }}>Efficiency OS</p><h4 style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic', color: '#6366F1', textTransform: 'uppercase' }}>Passport 2026</h4></div>
                  <div style={{ padding: '4px 12px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', fontSize: '8px', fontWeight: 'bold', color: '#10B981', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%' }} /> Active Node</div>
                </div>
                <div><p style={{ fontSize: '10px', fontWeight: 'bold', color: '#525252', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '8px' }}>Archetype / 画像</p><h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-0.05em' }}>{result.name}</h1><p style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.4, textTransform: 'uppercase', fontStyle: 'italic' }}>{result.eng}</p></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '24px 0' }}>
                   <div><p style={{ fontSize: '8px', fontWeight: 'bold', color: '#525252', textTransform: 'uppercase' }}>Frequency / 节奏</p><p style={{ fontSize: '18px', fontWeight: '900' }}>{result.frequency}</p></div>
                   <div style={{ textAlign: 'right' }}><p style={{ fontSize: '8px', fontWeight: 'bold', color: '#525252', textTransform: 'uppercase' }}>Status / 策略</p><p style={{ fontSize: '18px', fontWeight: '900' }}>{result.strategy.split(' ')[0]}</p></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', backgroundColor: '#EF4444', borderRadius: '50%' }} /><p style={{ fontSize: '10px', fontWeight: 'bold', color: '#D4D4D4', textTransform: 'uppercase' }}>Stop: {result.directives.stop}</p></div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', backgroundColor: '#22C55E', borderRadius: '50%' }} /><p style={{ fontSize: '10px', fontWeight: 'bold', color: '#D4D4D4', textTransform: 'uppercase' }}>Start: {result.directives.start}</p></div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', backgroundColor: '#3B82F6', borderRadius: '50%' }} /><p style={{ fontSize: '10px', fontWeight: 'bold', color: '#D4D4D4', textTransform: 'uppercase' }}>Focus: {result.directives.optimize}</p></div>
                </div>
                <div style={{ paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}><p style={{ fontSize: '10px', color: '#525252', textTransform: 'uppercase', fontFamily: 'monospace' }}>ISSUED: 21 JAN 2026<br/>AUTH: {result.eng.slice(0,3).toUpperCase()}-OS-99X</p></div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ flex: 1, padding: '16px', backgroundColor: 'white', border: '1px solid #E5E5E5', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}><Icon name="download" /> 保存报告</button>
                <button style={{ flex: 1, padding: '16px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}><Icon name="share" /> 分享到小红书</button>
              </div>
            </section>
            <footer style={{ padding: '80px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px' }}><p style={{ color: '#A3A3A3', fontSize: '14px', fontStyle: 'italic', maxWidth: '320px', margin: '0 auto', lineHeight: '1.6' }}>“{result.quote}”</p><div style={{ width: '1px', height: '40px', backgroundColor: '#E5E5E5', margin: '0 auto' }} /><p style={{ fontSize: '10px', fontWeight: '900', color: '#D4D4D4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Efficiency Growth AI System</p></footer>
          </div>
        )}
      </main>
    </div>
  );
}
