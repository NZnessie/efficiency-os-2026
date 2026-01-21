import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, ClipboardCheck, Zap, Target, 
  RefreshCcw, Camera, Download, Share2, 
  ArrowRight, BarChart3, Clock, Layout
} from 'lucide-react';

/**
 * 2026 Efficiency OS - 12 Archetypes Database
 */
const ARCHETYPES_DB = {
  STRATEGIC_VISIONARY: {
    id: "STRATEGIC_VISIONARY",
    name: "战略预跑者",
    eng: "Strategic Visionary",
    tags: ["深度规划", "战略定力", "高效对齐"],
    audit: "你目前的系统正处于“高频预热、战略前置”状态。优势在于极强的洞察力，但卡点在于大脑带宽被提前透支。你在 1 月份就在背负 12 月份的压力。",
    strategy: "稳 (Strategic Stability)",
    logic: "增长不来自加速，而来自节奏的颗粒度。你需要把“一年的赛程”拆解为“阶段性的窗口”。",
    leverage: "缩减反馈闭环，从“年度计划”收缩至“周行动闭环”。",
    guide: [
      { step: "Week 1", task: "卸载3个高频干扰App，拒绝非必要社交", goal: "释放30%大脑空间" },
      { step: "Week 2", task: "锁定本月唯一核心任务，砍掉80%远期目标", goal: "消除决策纠结" },
      { step: "Week 3", task: "开启15分钟启动法，每天完成最小交付物", goal: "建立行动自信" },
      { step: "Week 4", task: "建立周五复盘习惯，锁定下周唯一核心", goal: "形成可持续闭环" }
    ],
    weekly: ["战略校准日：只处理唯一核心任务", "深度产出日：90分钟手机隔离窗口", "闭环复盘日：清空待办尾数", "彻底断电日：完全物理隔离讯息"],
    quote: "你要的不是万无一失的未来，而是步步为营的现在。",
    frequency: "4Hz - 稳态",
    directives: { stop: "停止远期风险担忧", start: "开启周行动闭环", optimize: "优化大脑精力配置" }
  },
  PEAK_PERFORMER: {
    id: "PEAK_PERFORMER",
    name: "巅峰性能者",
    eng: "Peak Performance",
    tags: ["高效产出", "系统边界", "指数增长"],
    audit: "你目前的系统处于高频运转状态，负载接近峰值。执行力极强，但长期满格运行让系统面临过热和反弹风险。",
    strategy: "攻 (Controlled Sprint)",
    logic: "增长不来自更努力，而来自更有弹性的发力。设定强制冷却期是为了下一次更高能量的跃迁。",
    leverage: "建立“能量波峰”制度，在能量最高的时间段解决80%的核心问题。",
    guide: [
      { step: "Week 1", task: "划定绝对不工作时间，物理隔离电子设备", goal: "保护核心能量" },
      { step: "Week 2", task: "识别非核心低效任务，寻求外包或自动化", goal: "提升时间产值" },
      { step: "Week 3", task: "每天固定2小时无干扰深度创作窗口", goal: "产出核心资产" },
      { step: "Week 4", task: "完成阶段任务后进行48小时完全断电休整", goal: "预防系统崩溃" }
    ],
    weekly: ["目标锁定日：拆解周核心ROI", "巅峰执行日：集中处理高难度任务", "优化日：精简现有冗余流程", "奖励日：完全脱离生产力话题"],
    quote: "真正的高手，不是跑得最快的人，而是懂得何时换气的人。",
    frequency: "8Hz - 高能",
    directives: { stop: "停止无边界过度输出", start: "开启系统化自动化", optimize: "优化核心产出效率" }
  },
  SYSTEM_REBOOT: {
    id: "SYSTEM_REBOOT",
    name: "能量重启者",
    eng: "System Reboot",
    tags: ["底层修复", "节律回归", "蓄势待发"],
    audit: "当前信号不是迷茫而是疲惫。能量不足时，任何规划都是负担。这不代表你不行，而是需要重新初始化你的生活节律。",
    strategy: "慢 (Deep Restoration)",
    logic: "修复比前进更重要。先把节律找回来，方向会自然变清晰。今年的好运来自“先让自己活过来”。",
    leverage: "将睡眠与基础补能视为“第一优先级任务”，而非休息手段。",
    guide: [
      { step: "Week 1", task: "固定入睡时间，晚间进行电子设备强制隔离", goal: "恢复大脑机能" },
      { step: "Week 2", task: "退出消耗情绪的群组，停止所有无意义比较", goal: "停止能量外溢" },
      { step: "Week 3", task: "每天15分钟基础能量修复（拉伸/散步）", goal: "激活身体机能" },
      { step: "Week 4", task: "尝试一件让你感到轻松且有微小成就感的事", goal: "重建行动信心" }
    ],
    weekly: ["修复日：完全的身体照顾计划", "低噪日：减少社交与无效信息摄入", "轻感日：只处理最简单的日常任务", "觉察日：记录身体感受而非任务进度"],
    quote: "当你不再勉强自己前进，真正的方向反而会浮现。",
    frequency: "1Hz - 修复",
    directives: { stop: "停止自我指责与纠结", start: "开启能量基底修复", optimize: "优化系统运行能耗" }
  },
  PRECISION_ALIGNER: {
    id: "PRECISION_ALIGNER",
    name: "精准对齐者",
    eng: "Precision Aligner",
    tags: ["目标减法", "战略焦点", "高ROI"],
    audit: "你的系统目前被过多的“好机会”塞满，导致核心精力被稀释。由于选择太多，你在每一个方向上都无法投入全力。",
    strategy: "收 (Focued Reduction)",
    logic: "增长来自放弃。砍掉80%的次要目标，你才能在20%的核心赛道上实现10倍爆发。",
    leverage: "执行“战略减法”，每周强制从清单上删除一个不重要的任务。",
    guide: [
      { step: "Week 1", task: "盘点所有项目，停掉回报率最低的3项", goal: "释放决策带宽" },
      { step: "Week 2", task: "使用三选一模型，重新定义今年的唯一核心", goal: "统一发力方向" },
      { step: "Week 3", task: "建立拒绝机制，对所有非核心邀约说不", goal: "守住时间防线" },
      { step: "Week 4", task: "优化现有资源，将其向核心赛道倾斜", goal: "实现单点突破" }
    ],
    weekly: ["对齐日：对照核心目标审计本周动作", "深耕日：只处理与最高指标相关的任务", "过滤日：清理掉入收件箱的垃圾任务", "留白日：为下周思考预留空间"],
    quote: "卓越不是因为做了更多，而是因为拒绝了几乎所有事情。",
    frequency: "6Hz - 聚焦",
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
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900 selection:bg-indigo-100 font-sans">
      <header className="fixed top-0 inset-x-0 h-16 bg-white/70 backdrop-blur-lg border-b border-neutral-100 z-50">
        <div className="max-w-screen-md mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs italic">OS</div>
            <span className="font-black tracking-tighter text-lg uppercase">Efficiency 2026</span>
          </div>
          {view !== 'landing' && (
            <button onClick={() => { setView('landing'); setCurrentQ(0); setAnswers([]); }} className="text-xs font-bold text-neutral-400 hover:text-black flex items-center gap-1 transition-all uppercase tracking-widest">
              <RefreshCcw size={12} /> Reset
            </button>
          )}
        </div>
      </header>

      <main className="max-w-screen-md mx-auto pt-24 pb-20 px-6">
        
        {view === 'landing' && (
          <div className="space-y-12 py-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                <Zap size={10} fill="currentColor" /> 2026 Action Guide
              </div>
              <h1 className="text-5xl font-black leading-[1.1] tracking-tighter text-neutral-900">
                深度剖析年度状态<br/>开启 2026 <span className="text-indigo-600">高效人生</span>
              </h1>
              <p className="text-neutral-500 text-lg leading-relaxed max-w-md">
                别再盲目努力。我们会通过深度状态分析，为你匹配专属的 10 倍增长攻略与行动手册。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white border border-neutral-100 rounded-3xl space-y-2 shadow-sm">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><BarChart3 size={20}/></div>
                <h3 className="font-bold">状态审计</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">精准识别你当前的大脑负荷与行动阻力。</p>
              </div>
              <div className="p-6 bg-white border border-neutral-100 rounded-3xl space-y-2 shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><Layout size={20}/></div>
                <h3 className="font-bold">增长护照</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">生成一张可视觉化保存的 2026 效能身份卡。</p>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => setView('quiz')}
                className="group relative w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-100 transition-all shadow-2xl shadow-indigo-200"
              >
                <div className="absolute inset-0 rounded-[2rem] bg-indigo-600 animate-pulse opacity-20 blur-xl group-hover:opacity-40"></div>
                <span className="relative z-10">立即开始</span>
                <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {view === 'quiz' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-6 duration-500">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest tracking-widest">Analysis Progress</span>
                <span className="text-sm font-black italic">{currentQ + 1} / {QUESTIONS.length}</span>
              </div>
              <div className="h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-black transition-all duration-300" style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-black leading-tight tracking-tight">{QUESTIONS[currentQ].text}</h2>
              <div className="grid gap-3">
                {QUESTIONS[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt.v)}
                    className="group w-full p-6 text-left bg-white border border-neutral-200 rounded-2xl hover:border-black hover:shadow-lg hover:shadow-neutral-100 transition-all flex justify-between items-center"
                  >
                    <span className="font-bold text-neutral-600 group-hover:text-black">{opt.t}</span>
                    <ChevronRight size={18} className="text-neutral-300 group-hover:text-black" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'report' && result && (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center space-y-4">
              <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded">Audit Complete</div>
              <h2 className="text-4xl font-black tracking-tighter">{result.name}</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {result.tags.map(t => <span key={t} className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">#{t}</span>)}
              </div>
            </div>

            <section className="p-8 bg-white border border-neutral-100 rounded-[2.5rem] space-y-4 shadow-sm">
              <div className="flex items-center gap-2 font-black text-xs uppercase text-indigo-600">
                <ClipboardCheck size={16} /> 状态审计 Audit
              </div>
              <p className="text-neutral-600 leading-relaxed italic font-medium">“{result.audit}”</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-8 bg-black text-white rounded-[2.5rem] space-y-4 shadow-xl shadow-neutral-200">
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Action Rhythm</div>
                <h3 className="text-xl font-black tracking-tight text-indigo-400">年度主节奏：{result.strategy.split(' ')[0]}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">{result.logic}</p>
              </div>
              <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] space-y-4">
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">10X Move</div>
                <h3 className="text-lg font-black text-indigo-900 leading-tight">增长杠杆：{result.leverage}</h3>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Zap size={16} className="text-yellow-500" /> 30天重启手册
              </h3>
              <div className="overflow-hidden border border-neutral-100 rounded-3xl bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 border-b border-neutral-100">
                    <tr>
                      <th className="p-4 font-black text-[10px] text-neutral-400 uppercase text-left">阶段</th>
                      <th className="p-4 font-black text-[10px] text-neutral-400 uppercase text-left">核心任务</th>
                      <th className="p-4 font-black text-[10px] text-neutral-400 uppercase text-left">效能目标</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {result.guide.map((g, i) => (
                      <tr key={i}>
                        <td className="p-4 font-black text-indigo-600">{g.step}</td>
                        <td className="p-4 text-neutral-600 font-medium">{g.task}</td>
                        <td className="p-4 text-neutral-400 text-[10px] italic">{g.goal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-8 pt-10 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest">2026 增长护照 (截图保存)</h3>
                <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-bold italic"><Camera size={12}/> SAVE PASSPORT</span>
              </div>
              
              <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#0A0A0A] rounded-[3rem] p-10 text-white overflow-hidden shadow-2xl flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-full h-full opacity-40 pointer-events-none">
                   <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600 rounded-full blur-[100px]" />
                   <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-600 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Efficiency OS</p>
                    <h4 className="text-2xl font-black italic tracking-tighter text-indigo-500 uppercase">Passport 2026</h4>
                  </div>
                  <div className="px-3 py-1 border border-white/20 rounded-full text-[8px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Active Node
                  </div>
                </div>

                <div className="relative z-10">
                   <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[4px] mb-2">Archetype / 画像</p>
                   <h1 className="text-5xl font-black tracking-tighter">{result.name}</h1>
                   <p className="text-sm font-mono opacity-40 uppercase italic mt-1 tracking-wider">{result.eng}</p>
                </div>

                <div className="relative z-10 grid grid-cols-2 border-y border-white/10 py-6">
                   <div className="space-y-1">
                      <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Frequency / 节奏</p>
                      <p className="text-lg font-black">{result.frequency}</p>
                   </div>
                   <div className="space-y-1 text-right">
                      <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Strategy / 策略</p>
                      <p className="text-lg font-black">{result.strategy.split(' ')[0]}</p>
                   </div>
                </div>

                <div className="relative z-10 space-y-2">
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                      <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">Stop: {result.directives.stop}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
                      <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">Start: {result.directives.start}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                      <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">Focus: {result.directives.optimize}</p>
                   </div>
                </div>

                <div className="relative z-10 pt-6 flex justify-between items-end">
                   <p className="text-[10px] text-neutral-500 leading-tight uppercase font-mono tracking-tighter">
                      ISSUED: 21 JAN 2026<br/>
                      AUTH: {result.eng.slice(0,3).toUpperCase()}-OS-99X
                   </p>
                   <div className="flex gap-1 opacity-20">
                      <div className="w-4 h-4 bg-white rounded-sm" />
                      <div className="w-4 h-4 bg-white rounded-sm" />
                   </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-4 bg-white border border-neutral-200 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-neutral-50 active:scale-95 transition-all">
                  <Download size={16} /> 保存报告
                </button>
                <button className="flex-1 py-4 bg-black text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-95 transition-all">
                  <Share2 size={16} /> 分享到小红书
                </button>
              </div>
            </section>

            <footer className="py-20 text-center space-y-6">
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto italic">
                “{result.quote}”
              </p>
              <div className="w-px h-10 bg-neutral-100 mx-auto" />
              <p className="text-[10px] font-black text-neutral-200 uppercase tracking-[0.2em]">Efficiency Growth AI System</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}
