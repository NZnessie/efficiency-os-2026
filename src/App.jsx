import React, { useState, useEffect } from 'react';

// --- 未来感 SVG 图标组件 ---
const TechIcon = ({ name, color = "currentColor" }) => {
  const icons = {
    zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    compass: (
      <g>
        <circle cx="12" cy="12" r="10" />
        <polyline points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </g>
    ),
    cpu: (
      <g>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
      </g>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    refresh: (
      <g>
        <path d="M23 4v6h-6" />
        <path d="M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
        <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </g>
    ),
    save: (
      <g>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </g>
    ),
    copy: (
      <g>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </g>
    )
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// --- 核心数据库 ---
const ARCHETYPES = {
  STRATEGIC_VISIONARY: { name: "战略预跑者", eng: "Strategic Visionary", theme: "#818CF8", audit: "你正站在未来的观测台，但当下的引力让你感到沉重。你的大脑带宽已被 2026 年的预演占满。", vision: "在数字尘埃中预见秩序，于步履不停处见证奇迹。", frequency: "4.0Hz / 深度稳定态", logic: "减法即是加法。锁定唯一频率，屏蔽远期干扰。", stop: "过度风险推演", start: "周单位最小闭环", focus: "认知能量回收" },
  PEAK_PERFORMER: { name: "巅峰性能者", eng: "Peak Performance", theme: "#F87171", audit: "系统运行已达物理极限。高频产出让你像一颗燃烧的恒星，但需要警惕过热导致的内核塌缩。", vision: "打破线性增长的锁链，在极致的爆发中触碰星辰。", frequency: "8.5Hz / 高能喷涌态", logic: "弹性胜过刚性。周期性的‘冷启动’是为了下一次更猛烈的跨越。", leverage: "48小时绝对断电期", stop: "无边界生产", start: "自动化策略代理", focus: "核心产出效率" },
  SYSTEM_REBOOT: { name: "能量重启者", eng: "System Reboot", theme: "#34D399", audit: "系统发出橙色预警。与其在低电量下挣扎，不如开启深度初始化。这不是退缩，是最高级的进化。", vision: "先让自己发光，世界自然会被你点亮。", frequency: "1.2Hz / 修复唤醒态", logic: "修复是第一优先级。拿回生理节律的主权，就是拿回人生的主权。", leverage: "23:00 强制休眠协议", stop: "自我消耗与责难", start: "基础代谢修复", focus: "系统基底稳固" },
  PRECISION_ALIGNER: { name: "精准对齐者", eng: "Precision Aligner", theme: "#60A5FA", audit: "你的系统被太多的‘好机会’信标干扰。多线作战正在稀释你的动能，你需要一次精准的对齐。", vision: "删繁就简，只为那一击必中的纯粹。", frequency: "6.0Hz / 靶向聚合态", logic: "聚焦是最高级的智慧。砍掉80%的伪目标，你将迎来指数级的突破。", leverage: "每日唯一核心OKR", stop: "多线并行损耗", start: "目标减法审计", focus: "资源饱和攻击" }
};

export default function App() {
  const [view, setView] = useState('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const QUESTIONS = [
    { text: "当你望向 2026 的地平线，第一感觉是？", options: [{ t: "一切尽在掌控，准备跃迁", v: "PEAK" }, { t: "迷雾重重，需要重新校准", v: "ALIGN" }, { t: "感到疲惫，急需补给", v: "REBOOT" }, { t: "在制定万无一失的计划", v: "VISION" }] },
    { text: "你目前的‘大脑带宽’主要消耗在？", options: [{ t: "高频执行与解决问题", v: "PEAK" }, { t: "对多个机会的权衡纠结", v: "ALIGN" }, { t: "对抗内耗与自我修复", v: "REBOOT" }, { t: "对远期蓝图的推演", v: "VISION" }] },
    { text: "如果你现在拥有一台‘效能调节器’，你会？", options: [{ t: "调高输出功率，直接冲刺", v: "PEAK" }, { t: "按下停止键，彻底静默", v: "REBOOT" }, { t: "关闭所有干扰信号，只留一个", v: "ALIGN" }, { t: "优化底层算法，稳扎稳打", v: "VISION" }] }
  ];

  const handleSelect = (v) => {
    const next = [...answers, v];
    setAnswers(next);
    if (currentQ < QUESTIONS.length - 1) { setCurrentQ(currentQ + 1); } 
    else {
      const counts = next.reduce((a, c) => { a[c] = (a[c] || 0) + 1; return a; }, {});
      if (counts.REBOOT >= 1) setResult(ARCHETYPES.SYSTEM_REBOOT);
      else if (counts.PEAK >= 2) setResult(ARCHETYPES.PEAK_PERFORMER);
      else if (counts.ALIGN >= 1) setResult(ARCHETYPES.PRECISION_ALIGNER);
      else setResult(ARCHETYPES.STRATEGIC_VISIONARY);
      setView('report');
      window.scrollTo(0, 0);
    }
  };

  const copyReport = () => {
    const text = `【2026 Efficiency OS 审计报告】\n画像：${result.name}\n年度主旋律：${result.strategy}\n主频率：${result.frequency}\n行动建议：停止${result.stop}，开启${result.start}。\n愿景：${result.vision}`;
    navigator.clipboard.writeText(text);
    alert('报告已复制到剪贴板！');
  };

  const UIContainer = ({ children }) => (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#F8FAFC', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {/* 动态背景背景 */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, #1E1B4B 0%, #020617 100%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', width: '200%', height: '200%', backgroundImage: 'radial-gradient(#ffffff05 1px, transparent 1px)', backgroundSize: '40px 40px', top: '-50%', left: '-50%', transform: 'rotate(15deg)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', margin: '0 auto' }}>{children}</div>
    </div>
  );

  return (
    <UIContainer>
      {view === 'landing' && (
        <div style={{ textAlign: 'center', paddingTop: '100px', animation: 'fadeIn 1.5s ease' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#4F46E5', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 40px', boxShadow: '0 0 40px rgba(79, 70, 229, 0.6)', transform: 'rotate(-10deg)' }}>
            <TechIcon name="cpu" color="white" />
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: '900', letterSpacing: '-0.05em', marginBottom: '24px', background: 'linear-gradient(to bottom, #FFF 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            2026<br/>EFFICIENCY OS
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '18px', lineHeight: '1.6', marginBottom: '60px' }}>
            基于数字化生存法则<br/>
            重塑你的<span style={{ color: '#818CF8', fontWeight: 'bold' }}>年度增长算法</span>
          </p>
          <button onClick={() => setView('quiz')} style={{ width: '100%', padding: '24px', background: 'white', color: 'black', border: 'none', borderRadius: '100px', fontWeight: '900', fontSize: '20px', cursor: 'pointer', transition: '0.3s', boxShadow: '0 10px 30px rgba(255,255,255,0.2)' }}>
            初始化系统审计
          </button>
        </div>
      )}

      {view === 'quiz' && (
        <div style={{ paddingTop: '60px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6366F1', marginBottom: '16px', letterSpacing: '4px' }}>SCANNING... {currentQ + 1}/3</div>
          <h2 style={{ fontSize: '32px', fontWeight: '900', lineHeight: '1.2', marginBottom: '48px' }}>{QUESTIONS[currentQ].text}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {QUESTIONS[currentQ].options.map((opt, i) => (
              <button key={i} onClick={() => handleSelect(opt.v)} style={{ width: '100%', padding: '24px', textAlign: 'left', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', color: 'white', fontSize: '16px', cursor: 'pointer', transition: '0.2s' }}>
                {opt.t}
              </button>
            ))}
          </div>
        </div>
      )}

      {view === 'report' && result && (
        <div style={{ paddingTop: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* 画像头部 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: result.theme, fontWeight: 'bold', letterSpacing: '6px', marginBottom: '12px' }}>AUDIT COMPLETE</div>
            <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px' }}>{result.name}</h1>
            <p style={{ color: '#64748B', fontFamily: 'monospace', textTransform: 'uppercase' }}>{result.eng}</p>
          </div>

          {/* 审计说明 */}
          <div style={{ padding: '32px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '32px', backdropFilter: 'blur(20px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: result.theme, fontSize: '12px', fontWeight: 'bold', marginBottom: '16px' }}><TechIcon name="compass" /> 核心诊断</div>
            <p style={{ color: '#CBD5E1', lineHeight: '1.8', fontStyle: 'italic' }}>“{result.audit}”</p>
          </div>

          {/* 2026 增长护照 (视觉核心) */}
          <div style={{ position: 'relative', width: '100%', borderRadius: '40px', padding: '40px', background: 'linear-gradient(135deg, #111827 0%, #000 100%)', border: `1px solid ${result.theme}44`, overflow: 'hidden', boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 20px ${result.theme}22` }}>
            {/* 镭射光效 */}
            <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: `radial-gradient(circle at 30% 30%, ${result.theme}11 0%, transparent 50%)`, pointerEvents: 'none' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
              <div><p style={{ fontSize: '10px', color: '#475569', fontWeight: 'bold' }}>OS PROTOCOL</p><h4 style={{ fontSize: '20px', fontWeight: '900', color: result.theme }}>PASSPORT 2026</h4></div>
              <div style={{ padding: '4px 12px', border: `1px solid ${result.theme}44`, borderRadius: '999px', fontSize: '10px', color: result.theme }}>ID: 0x992{result.id}</div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '10px', color: '#475569', letterSpacing: '4px', marginBottom: '8px' }}>STATUS / 年度主旋律</p>
              <h2 style={{ fontSize: '40px', fontWeight: '900' }}>{result.strategy}</h2>
              <p style={{ fontSize: '14px', color: result.theme, fontWeight: 'bold', marginTop: '4px' }}>{result.frequency}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#EF4444', borderRadius: '50%' }} /><p style={{ fontSize: '11px', color: '#94A3B8' }}>STOP: {result.stop}</p></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }} /><p style={{ fontSize: '11px', color: '#94A3B8' }}>START: {result.start}</p></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#60A5FA', borderRadius: '50%' }} /><p style={{ fontSize: '11px', color: '#94A3B8' }}>FOCUS: {result.focus}</p></div>
            </div>

            <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#475569', fontStyle: 'italic' }}>“{result.vision}”</p>
            </div>
          </div>

          {/* 操作按钮组 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={copyReport} style={{ flex: 1, padding: '20px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <TechIcon name="copy" /> 复制报告
            </button>
            <button onClick={() => setView('landing')} style={{ flex: 1, padding: '20px', background: 'white', color: 'black', border: 'none', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <TechIcon name="refresh" /> 重新审计
            </button>
          </div>

          <p style={{ textAlign: 'center', color: '#475569', fontSize: '11px' }}>
            💡 提示：长按上方护照卡片可截图保存至相册
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        button:active { transform: scale(0.98); opacity: 0.8; }
      `}</style>
    </UIContainer>
  );
}
