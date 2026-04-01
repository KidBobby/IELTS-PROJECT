"use client";
import { useState, useEffect } from "react";

const STUDENT = {
  name: "Amara Okafor",
  target: 7.5,
  testDate: "April 12, 2026",
  avatar: "AO",
  streak: 14,
  testsCompleted: 8,
  hoursStudied: 47,
};

const SKILLS = [
  { key: "listening", label: "Listening", score: 7.5, prev: 6.5, color: "#C9A84C", pct: 83 },
  { key: "reading",   label: "Reading",   score: 7.0, prev: 6.0, color: "#4C9AC9", pct: 77 },
  { key: "writing",   label: "Writing",   score: 6.5, prev: 5.5, color: "#7C4CC9", pct: 70 },
  { key: "speaking",  label: "Speaking",  score: 7.0, prev: 6.5, color: "#4CAF7C", pct: 77 },
];

const OVERALL = 7.0;

const HISTORY = [
  { date: "Jan 15", band: 6.0 },
  { date: "Jan 29", band: 6.0 },
  { date: "Feb 10", band: 6.5 },
  { date: "Feb 24", band: 6.5 },
  { date: "Mar 04", band: 7.0 },
  { date: "Mar 08", band: 7.0 },
];

const AI_FEEDBACK = [
  { skill: "Writing", band: 6.5, tag: "Task 2", icon: "✍️", summary: "Good argument structure but lacks cohesive devices. Lexical resource is Band 7 level — work on hedging language and academic register.", tips: ["Use discourse markers: 'Furthermore', 'In contrast'", "Avoid informal phrases like 'a lot of'", "Aim for 3 body paragraphs with topic sentences"] },
  { skill: "Speaking", band: 7.0, tag: "Part 3", icon: "🎙️", summary: "Fluent delivery with good range of vocabulary. Minor grammatical inaccuracies and occasional hesitation reduce the score. Pronunciation is clear.", tips: ["Reduce filler words ('um', 'like')", "Extend answers with examples", "Practice complex sentence structures"] },
  { skill: "Listening", band: 7.5, tag: "Section 4", icon: "🎧", summary: "Excellent performance on academic monologue. Missed two questions due to spelling errors on proper nouns. Focus on note-form answers.", tips: ["Practice spelling academic vocabulary", "Use abbreviations during note-taking", "Re-read answers before submission"] },
];

const UPCOMING = [
  { title: "Writing Task 2 – Opinion Essay", type: "Lesson", time: "30 min", due: "Today" },
  { title: "Reading Mock Test – Full Section", type: "CBT", time: "60 min", due: "Tomorrow" },
  { title: "Speaking Mock – All 3 Parts", type: "Mock", time: "15 min", due: "Mar 10" },
];

export default function DashboardPage() {
  const [animated, setAnimated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [ringPct, setRingPct] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => { setAnimated(true); setRingPct((OVERALL / 9) * 100); }, 200);
    return () => clearTimeout(t);
  }, []);

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference * (1 - ringPct / 100);

  const daysToTest = Math.ceil((new Date("2026-04-12").getTime() - new Date().getTime()) / 86400000);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--navy:#0B1527;--nm:#112040;--nl:#1A3060;--gold:#C9A84C;--gl:#E8C96B;--gp:rgba(201,168,76,0.1);--cream:#F5F0E8;--muted:rgba(245,240,232,0.5);--bdr:rgba(201,168,76,0.18);--red:#E85C5C;--grn:#4CAF7C;--blue:#4C9AC9;--purple:#7C4CC9}
        html,body{min-height:100%;background:var(--navy)}
        body{font-family:'DM Sans',sans-serif;color:var(--cream)}
        .layout{display:grid;grid-template-columns:240px 1fr;min-height:100vh}

        /* SIDEBAR */
        .sidebar{background:var(--nm);border-right:1px solid var(--bdr);display:flex;flex-direction:column;padding:1.5rem 0;position:sticky;top:0;height:100vh;overflow-y:auto}
        .sb-logo{display:flex;align-items:center;gap:10px;padding:0 1.4rem 1.8rem}
        .lm{width:34px;height:34px;background:linear-gradient(135deg,var(--gold),var(--gl));border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;font-size:16px;color:var(--navy);flex-shrink:0}
        .lt{font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--cream)}
        .lt span{color:var(--gold)}
        .sb-divider{height:1px;background:var(--bdr);margin:0 1.4rem .8rem}
        .sb-label{font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);padding:.6rem 1.4rem .3rem;font-weight:500}
        .sb-link{display:flex;align-items:center;gap:10px;padding:.7rem 1.4rem;font-size:.82rem;color:var(--muted);cursor:pointer;transition:all .2s;border-left:2px solid transparent;text-decoration:none}
        .sb-link:hover{color:var(--cream);background:rgba(201,168,76,.06)}
        .sb-link.active{color:var(--gold);background:rgba(201,168,76,.08);border-left-color:var(--gold)}
        .sb-icon{font-size:1rem;flex-shrink:0}
        .sb-bottom{margin-top:auto;padding:1rem 1.4rem;border-top:1px solid var(--bdr)}
        .ava{width:36px;height:36px;border-radius:50%;background:var(--nl);display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:600;color:var(--gold);border:2px solid var(--bdr);flex-shrink:0}
        .ava-name{font-size:.82rem;color:var(--cream);font-weight:500}
        .ava-sub{font-size:.68rem;color:var(--muted)}

        /* MAIN */
        .main{background:var(--navy);min-height:100vh;overflow:hidden}
        .topbar{background:rgba(11,21,39,0.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--bdr);padding:0 2rem;height:58px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:20}
        .tb-title{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:600;color:var(--cream)}
        .tb-sub{font-size:.68rem;color:var(--muted)}
        .tb-right{display:flex;align-items:center;gap:12px}
        .streak-pill{display:flex;align-items:center;gap:6px;padding:5px 12px;background:rgba(201,168,76,.08);border:1px solid var(--bdr);border-radius:20px;font-size:.75rem;color:var(--gold);font-weight:500}
        .notif{width:34px;height:34px;border-radius:50%;border:1px solid var(--bdr);background:var(--nm);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.9rem}
        .content{padding:2rem}

        /* TABS */
        .tabs{display:flex;gap:4px;margin-bottom:2rem;background:var(--nm);padding:4px;border-radius:8px;border:1px solid var(--bdr);width:fit-content}
        .tab{padding:7px 18px;border-radius:5px;font-size:.78rem;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;transition:all .2s;color:var(--muted);font-weight:500;white-space:nowrap}
        .tab.on{background:var(--gold);color:var(--navy);font-weight:600}
        .tab:hover:not(.on){color:var(--cream)}

        /* GRID */
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem}
        .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:1.5rem}
        .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem}

        /* CARDS */
        .card{background:var(--nm);border:1px solid var(--bdr);border-radius:12px;padding:1.6rem;position:relative;overflow:hidden;transition:border-color .2s}
        .card:hover{border-color:rgba(201,168,76,.32)}
        .card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)}

        /* STAT CARDS */
        .stat-num{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;line-height:1;margin-bottom:.3rem}
        .stat-lbl{font-size:.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
        .stat-delta{font-size:.72rem;margin-top:.5rem;display:flex;align-items:center;gap:4px}

        /* SCORE RING CARD */
        .ring-card{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 1.5rem;text-align:center}
        .ring-wrap{position:relative;width:160px;height:160px;margin:0 auto 1.5rem}
        .ring-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
        .ring-num{font-family:'Playfair Display',serif;font-size:3rem;font-weight:700;color:var(--gold);line-height:1}
        .ring-sub{font-size:.65rem;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-top:3px}
        .ring-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:600;color:var(--cream);margin-bottom:.3rem}
        .ring-caption{font-size:.78rem;color:var(--muted);line-height:1.6;max-width:200px}

        /* SKILL BARS */
        .skill-row{display:flex;align-items:center;gap:12px;padding:.6rem 0;border-bottom:1px solid rgba(255,255,255,.04)}
        .skill-row:last-child{border-bottom:none}
        .skill-name{font-size:.8rem;width:72px;flex-shrink:0;color:var(--cream);font-weight:400}
        .skill-track{flex:1;height:6px;background:rgba(255,255,255,.06);border-radius:6px;overflow:hidden}
        .skill-fill{height:100%;border-radius:6px;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
        .skill-score{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;width:32px;text-align:right;flex-shrink:0}
        .skill-delta{font-size:.65rem;width:36px;text-align:right;flex-shrink:0}

        /* CHART */
        .chart-card{padding:1.6rem}
        .chart-title{font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:1.2rem}
        .chart-area{height:140px;position:relative;display:flex;align-items:flex-end;gap:6px}
        .chart-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px}
        .chart-bar-outer{width:100%;flex:1;display:flex;align-items:flex-end;min-height:0}
        .chart-bar{width:100%;border-radius:4px 4px 0 0;transition:height 1s ease-out;position:relative}
        .chart-val{position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:.65rem;color:var(--gold);font-weight:600;white-space:nowrap}
        .chart-label{font-size:.6rem;color:var(--muted);text-align:center;white-space:nowrap}
        .chart-baseline{position:absolute;bottom:0;left:0;right:0;height:1px;background:rgba(255,255,255,.06)}
        .target-line{position:absolute;left:0;right:0;height:1px;background:rgba(201,168,76,.35);border-top:1px dashed rgba(201,168,76,.4)}
        .target-tag{position:absolute;right:0;font-size:.55rem;color:var(--gold);background:var(--nm);padding:1px 4px;border-radius:2px}

        /* AI FEEDBACK */
        .fb-card{background:var(--nm);border:1px solid var(--bdr);border-radius:10px;padding:1.4rem;margin-bottom:1rem;transition:border-color .2s}
        .fb-card:hover{border-color:rgba(201,168,76,.3)}
        .fb-top{display:flex;align-items:flex-start;gap:12px;margin-bottom:1rem}
        .fb-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;background:rgba(201,168,76,.08);border:1px solid var(--bdr)}
        .fb-tag{display:inline-block;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;padding:2px 8px;border-radius:2px;border:1px solid;margin-bottom:5px}
        .fb-skill{font-family:'Playfair Display',serif;font-size:1rem;font-weight:600;color:var(--cream)}
        .fb-band{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;margin-left:auto;padding-left:12px;flex-shrink:0}
        .fb-summary{font-size:.82rem;color:var(--muted);line-height:1.7;margin-bottom:1rem;font-weight:300}
        .fb-tips{display:flex;flex-direction:column;gap:5px}
        .fb-tip{display:flex;align-items:flex-start;gap:8px;font-size:.78rem;color:rgba(245,240,232,.7);line-height:1.5}
        .tip-dot{width:4px;height:4px;border-radius:50%;background:var(--gold);flex-shrink:0;margin-top:6px}

        /* UPCOMING */
        .upcoming-item{display:flex;align-items:center;gap:14px;padding:.9rem 0;border-bottom:1px solid rgba(255,255,255,.04)}
        .upcoming-item:last-child{border-bottom:none}
        .up-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0}
        .up-title{font-size:.85rem;color:var(--cream);font-weight:400;margin-bottom:2px}
        .up-meta{font-size:.7rem;color:var(--muted)}
        .up-due{margin-left:auto;flex-shrink:0;font-size:.7rem;font-weight:500;padding:3px 10px;border-radius:3px}

        /* TEST DATE */
        .countdown-card{background:linear-gradient(135deg,rgba(26,48,96,.6),rgba(11,21,39,.8));border:1px solid rgba(201,168,76,.3);border-radius:12px;padding:1.6rem;text-align:center;position:relative;overflow:hidden}
        .countdown-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
        .cd-days{font-family:'Playfair Display',serif;font-size:3.5rem;font-weight:700;color:var(--gold);line-height:1}
        .cd-label{font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:.4rem}
        .cd-date{font-size:.8rem;color:var(--cream);margin-top:.3rem}

        @media(max-width:900px){.layout{grid-template-columns:1fr}.sidebar{display:none}.g4{grid-template-columns:1fr 1fr}.g3{grid-template-columns:1fr}}
        @media(max-width:600px){.g2{grid-template-columns:1fr}.g4{grid-template-columns:1fr 1fr}.g3{grid-template-columns:1fr}}
      `}</style>

      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-logo">
            <div className="lm">I</div>
            <span className="lt">IELTS<span>Pro</span></span>
          </div>
          <div className="sb-divider" />
          <div className="sb-label">Main</div>
          {[
            { icon: "📊", label: "Dashboard", id: "overview" },
            { icon: "📖", label: "My Courses", id: "courses" },
            { icon: "💻", label: "CBT Practice", id: "cbt" },
            { icon: "✍️", label: "Writing Lab", id: "writing" },
          ].map(l => (
            <div key={l.id} className={`sb-link${activeTab===l.id?" active":""}`} onClick={()=>setActiveTab(l.id)}>
              <span className="sb-icon">{l.icon}</span>{l.label}
            </div>
          ))}
          <div className="sb-label" style={{marginTop:".8rem"}}>Progress</div>
          {[
            { icon: "🎯", label: "AI Feedback", id: "feedback" },
            { icon: "📈", label: "Analytics", id: "analytics" },
            { icon: "📅", label: "Study Plan", id: "plan" },
          ].map(l => (
            <div key={l.id} className={`sb-link${activeTab===l.id?" active":""}`} onClick={()=>setActiveTab(l.id)}>
              <span className="sb-icon">{l.icon}</span>{l.label}
            </div>
          ))}
          <div className="sb-bottom">
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="ava">{STUDENT.avatar}</div>
              <div><div className="ava-name">{STUDENT.name}</div><div className="ava-sub">Target: Band {STUDENT.target}</div></div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div>
              <div className="tb-title">Student Dashboard</div>
              <div className="tb-sub">Welcome back, {STUDENT.name.split(" ")[0]} — keep going!</div>
            </div>
            <div className="tb-right">
              <div className="streak-pill">🔥 {STUDENT.streak}-day streak</div>
              <div className="notif">🔔</div>
              <div className="ava">{STUDENT.avatar}</div>
            </div>
          </div>

          <div className="content">
            <div className="tabs">
              {[{id:"overview",label:"Overview"},{id:"feedback",label:"AI Feedback"},{id:"analytics",label:"Analytics"}].map(t=>(
                <div key={t.id} className={`tab${activeTab===t.id?" on":""}`} onClick={()=>setActiveTab(t.id)}>{t.label}</div>
              ))}
            </div>

            {/* OVERVIEW */}
            {activeTab==="overview" && <>
              {/* STAT ROW */}
              <div className="g4">
                {[
                  { num: `Band ${OVERALL}`, lbl: "Overall Score", delta: "+1.0 from last test", up: true, col: "var(--gold)" },
                  { num: STUDENT.testsCompleted, lbl: "Tests Completed", delta: "+3 this month", up: true, col: "var(--blue)" },
                  { num: `${STUDENT.hoursStudied}h`, lbl: "Hours Studied", delta: "+12h this week", up: true, col: "var(--purple)" },
                  { num: `${daysToTest}d`, lbl: "To Test Date", delta: STUDENT.testDate, up: null, col: "var(--red)" },
                ].map((s,i)=>(
                  <div className="card" key={i}>
                    <div className="stat-num" style={{color:s.col}}>{s.num}</div>
                    <div className="stat-lbl">{s.lbl}</div>
                    <div className="stat-delta" style={{color:s.up===null?"var(--muted)":s.up?"var(--grn)":"var(--red)"}}>
                      {s.up!==null && <span>{s.up?"↑":"↓"}</span>}{s.delta}
                    </div>
                  </div>
                ))}
              </div>

              <div className="g2">
                {/* RING + SKILLS */}
                <div className="card" style={{display:"flex",gap:"1.8rem",alignItems:"center",padding:"1.8rem"}}>
                  <div>
                    <div className="ring-wrap">
                      <svg style={{transform:"rotate(-90deg)"}} width="160" height="160" viewBox="0 0 160 160">
                        <defs>
                          <linearGradient id="grd" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#E8C96B"/>
                          </linearGradient>
                        </defs>
                        <circle fill="none" stroke="rgba(201,168,76,.08)" strokeWidth="12" cx="80" cy="80" r="54"/>
                        <circle fill="none" stroke="url(#grd)" strokeWidth="12" strokeLinecap="round"
                          cx="80" cy="80" r="54"
                          strokeDasharray={circumference}
                          strokeDashoffset={animated ? dashOffset : circumference}
                          style={{transition:"stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)"}}
                        />
                      </svg>
                      <div className="ring-center">
                        <span className="ring-num">{OVERALL}</span>
                        <span className="ring-sub">Overall Band</span>
                      </div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:".7rem",color:"var(--muted)"}}>Target: <span style={{color:"var(--gold)",fontWeight:600}}>Band {STUDENT.target}</span></div>
                      <div style={{fontSize:".65rem",color:"var(--muted)",marginTop:2}}>Gap: <span style={{color:"var(--gl)"}}>+0.5 needed</span></div>
                    </div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:".65rem",letterSpacing:".1em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"1rem",fontWeight:500}}>Skill Breakdown</div>
                    {SKILLS.map(s=>(
                      <div className="skill-row" key={s.key}>
                        <span className="skill-name">{s.label}</span>
                        <div className="skill-track">
                          <div className="skill-fill" style={{width:animated?`${s.pct}%`:"0%",background:`linear-gradient(90deg,${s.color},${s.color}cc)`}} />
                        </div>
                        <span className="skill-score" style={{color:s.color}}>{s.score}</span>
                        <span className="skill-delta" style={{color:"var(--grn)"}}>↑{(s.score-s.prev).toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* HISTORY CHART */}
                <div className="card chart-card">
                  <div className="chart-title">Band Score History</div>
                  <div className="chart-area" style={{position:"relative",paddingTop:"24px"}}>
                    <div className="chart-baseline" />
                    <div className="target-line" style={{bottom:`${(STUDENT.target/9)*100}%`}}>
                      <span className="target-tag">Target {STUDENT.target}</span>
                    </div>
                    {HISTORY.map((h,i)=>{
                      const hpct = (h.band/9)*100;
                      return (
                        <div className="chart-bar-wrap" key={i}>
                          <div className="chart-bar-outer">
                            <div className="chart-bar" style={{height:animated?`${hpct}%`:"0%",background:h.band>=STUDENT.target?"linear-gradient(to top,var(--gold),var(--gl))":"linear-gradient(to top,rgba(201,168,76,.3),rgba(201,168,76,.5))"}}>
                              <span className="chart-val">{h.band}</span>
                            </div>
                          </div>
                          <div className="chart-label">{h.date}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{marginTop:"1.5rem",padding:"1rem",background:"rgba(201,168,76,.04)",borderRadius:"6px",border:"1px solid rgba(201,168,76,.12)"}}>
                    <div style={{fontSize:".68rem",color:"var(--gold)",fontWeight:500,marginBottom:".3rem"}}>AI Analysis</div>
                    <div style={{fontSize:".78rem",color:"var(--muted)",lineHeight:1.6,fontWeight:300}}>Your band score improved by <span style={{color:"var(--cream)"}}>+1.0</span> over 6 tests — an above-average trajectory. At this rate, you are on track to reach Band 7.5 before your test date.</div>
                  </div>
                </div>
              </div>

              {/* UPCOMING + COUNTDOWN */}
              <div className="g2">
                <div className="card">
                  <div style={{fontSize:".65rem",letterSpacing:".1em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"1.2rem",fontWeight:500}}>Upcoming Tasks</div>
                  {UPCOMING.map((u,i)=>(
                    <div className="upcoming-item" key={i}>
                      <div className="up-icon" style={{background:u.type==="CBT"?"rgba(76,154,201,.1)":u.type==="Mock"?"rgba(76,175,124,.1)":"rgba(201,168,76,.1)",border:`1px solid ${u.type==="CBT"?"rgba(76,154,201,.3)":u.type==="Mock"?"rgba(76,175,124,.3)":"rgba(201,168,76,.3)"}`}}>
                        {u.type==="CBT"?"💻":u.type==="Mock"?"🎙️":"📖"}
                      </div>
                      <div style={{flex:1}}>
                        <div className="up-title">{u.title}</div>
                        <div className="up-meta">{u.type} · {u.time}</div>
                      </div>
                      <div className="up-due" style={{background:u.due==="Today"?"rgba(232,92,92,.1)":"rgba(201,168,76,.08)",color:u.due==="Today"?"var(--red)":"var(--gold)",border:`1px solid ${u.due==="Today"?"rgba(232,92,92,.3)":"var(--bdr)"}`}}>
                        {u.due}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="countdown-card">
                  <div className="cd-label">Days Until Your Test</div>
                  <div className="cd-days">{daysToTest}</div>
                  <div className="cd-date">{STUDENT.testDate}</div>
                  <div style={{marginTop:"1.5rem",display:"flex",justifyContent:"center",gap:"1rem"}}>
                    {[{l:"Tests Left",v:"4"},{l:"Lessons Left",v:"12"},{l:"Vocab Targets",v:"200"}].map(s=>(
                      <div key={s.l} style={{textAlign:"center"}}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",fontWeight:700,color:"var(--gold)"}}>{s.v}</div>
                        <div style={{fontSize:".62rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:".06em"}}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <a href="/practice" style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:"1.5rem",padding:"11px 28px",background:"linear-gradient(135deg,var(--gold),var(--gl))",color:"var(--navy)",borderRadius:"4px",fontSize:".78rem",fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",textDecoration:"none"}}>
                    Start Practice →
                  </a>
                </div>
              </div>
            </>}

            {/* AI FEEDBACK TAB */}
            {activeTab==="feedback" && <>
              <div style={{marginBottom:"1.5rem"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",fontWeight:600,color:"var(--cream)",marginBottom:".4rem"}}>AI-Powered Feedback</div>
                <div style={{fontSize:".85rem",color:"var(--muted)",fontWeight:300}}>Personalised analysis from your most recent submissions across all four skills.</div>
              </div>
              {AI_FEEDBACK.map((f,i)=>{
                const skill = SKILLS.find(s=>s.label===f.skill);
                return (
                  <div className="fb-card" key={i}>
                    <div className="fb-top">
                      <div className="fb-icon">{f.icon}</div>
                      <div style={{flex:1}}>
                        <div className="fb-tag" style={{color:skill?.color||"var(--gold)",borderColor:`${skill?.color||"var(--gold)"}40`,background:`${skill?.color||"var(--gold)"}10`}}>{f.tag}</div>
                        <div className="fb-skill">{f.skill}</div>
                      </div>
                      <div className="fb-band" style={{color:skill?.color||"var(--gold)"}}>Band {f.band}</div>
                    </div>
                    <p className="fb-summary">{f.summary}</p>
                    <div style={{fontSize:".68rem",letterSpacing:".08em",textTransform:"uppercase",color:"var(--gold)",marginBottom:".6rem",fontWeight:500}}>Recommended Actions</div>
                    <div className="fb-tips">
                      {f.tips.map((tip,j)=>(
                        <div className="fb-tip" key={j}><span className="tip-dot"/>{tip}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>}

            {/* ANALYTICS TAB */}
            {activeTab==="analytics" && <>
              <div style={{marginBottom:"1.5rem"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",fontWeight:600,color:"var(--cream)",marginBottom:".4rem"}}>Performance Analytics</div>
                <div style={{fontSize:".85rem",color:"var(--muted)",fontWeight:300}}>Detailed breakdown of your performance across all IELTS components.</div>
              </div>
              <div className="g4" style={{marginBottom:"1.5rem"}}>
                {SKILLS.map(s=>(
                  <div className="card" key={s.key} style={{textAlign:"center"}}>
                    <div style={{marginBottom:"1rem",position:"relative",width:90,height:90,margin:"0 auto 1rem"}}>
                      <svg style={{transform:"rotate(-90deg)"}} width="90" height="90" viewBox="0 0 90 90">
                        <circle fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="8" cx="45" cy="45" r="32"/>
                        <circle fill="none" stroke={s.color} strokeWidth="8" strokeLinecap="round"
                          cx="45" cy="45" r="32"
                          strokeDasharray={201}
                          strokeDashoffset={animated?201*(1-s.pct/100):201}
                          style={{transition:"stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)"}}/>
                      </svg>
                      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                        <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:700,color:s.color,lineHeight:1}}>{s.score}</span>
                        <span style={{fontSize:".55rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:".08em"}}>Band</span>
                      </div>
                    </div>
                    <div style={{fontSize:".82rem",color:"var(--cream)",fontWeight:500,marginBottom:".25rem"}}>{s.label}</div>
                    <div style={{fontSize:".7rem",color:"var(--grn)"}}>↑ +{(s.score-s.prev).toFixed(1)} from last test</div>
                  </div>
                ))}
              </div>
              <div className="card" style={{padding:"1.8rem"}}>
                <div style={{fontSize:".65rem",letterSpacing:".1em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"1.4rem",fontWeight:500}}>Detailed Skill Breakdown</div>
                {SKILLS.map(s=>(
                  <div className="skill-row" key={s.key}>
                    <span className="skill-name" style={{fontSize:".85rem"}}>{s.label}</span>
                    <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
                      <div className="skill-track" style={{height:8}}>
                        <div className="skill-fill" style={{width:animated?`${s.pct}%`:"0%",background:`linear-gradient(90deg,${s.color},${s.color}bb)`}} />
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:".62rem",color:"var(--muted)"}}>
                        <span>Band 1</span><span style={{color:s.color,fontWeight:500}}>Current: {s.score}</span><span>Band 9</span>
                      </div>
                    </div>
                    <span className="skill-score" style={{color:s.color,width:40}}>{s.score}</span>
                    <span style={{fontSize:".72rem",color:"var(--grn)",width:50,textAlign:"right"}}>↑+{(s.score-s.prev).toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </>}
          </div>
        </div>
      </div>
    </>
  );
}
