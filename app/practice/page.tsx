"use client";
import { useState, useEffect, useCallback } from "react";

const PASSAGE = {
  title: "The Cognitive Revolution and the Rise of Modern Humans",
  subtitle: "Academic Reading Passage 1",
  text: [
    { heading: "Section A", body: `Approximately 70,000 years ago, Homo sapiens underwent a dramatic transformation that historians call the Cognitive Revolution. Prior to this period, human beings possessed the same anatomical features as their modern descendants, yet their behavioural patterns showed remarkably little innovation. Stone tools remained unchanged for hundreds of thousands of years, and there is scant evidence of art, ritual, or long-distance trade networks. Then, in what amounts to the blink of an eye in geological time, everything changed.` },
    { heading: "Section B", body: `The Cognitive Revolution was characterised principally by new ways of thinking and communicating. Most critically, Homo sapiens developed the capacity for what scholars term "fictional language"—the ability to discuss entities that exist only in the imagination. Earlier human species could communicate through complex vocalisations, alerting one another to predators or food sources. What they apparently could not do was construct elaborate shared narratives about gods, nations, or human rights—concepts with no physical counterpart in observable reality.` },
    { heading: "Section C", body: `This development proved extraordinarily consequential. The ability to create and transmit shared myths allowed Homo sapiens to cooperate in far larger numbers than any other primate. Chimpanzees can maintain stable social relationships with a maximum of approximately 50 individuals; beyond this threshold, the group's social fabric disintegrates. Neanderthals appear to have faced similar constraints. Homo sapiens, by contrast, began organising in bands of hundreds and eventually thousands. The glue holding these groups together was not genetic kinship, but shared belief in common stories and symbols.` },
    { heading: "Section D", body: `Archaeological evidence for this shift appears across multiple continents with striking simultaneity. Cave paintings in the Chauvet Cave in France, dated to approximately 36,000 years ago, display a sophisticated mastery of perspective and composition that rivals later historical artists. Shell ornaments found across sub-Saharan Africa suggest long-distance trade networks connecting communities separated by hundreds of kilometres. Burial practices became elaborate, indicating a rich conceptual framework for understanding death and the afterlife.` },
    { heading: "Section E", body: `Despite broad scholarly consensus on the timing of the Cognitive Revolution, its underlying cause remains contested. One prominent hypothesis attributes the transformation to a random genetic mutation that rewired neural circuits governing language and abstract thought. This view holds that the change was essentially accidental—a fortuitous rearrangement of synaptic architecture. Critics note that it relies on an untestable premise and that the archaeological record shows gradual rather than instantaneous behavioural change, suggesting a more incremental process.` },
    { heading: "Section F", body: `An alternative perspective proposes that the Cognitive Revolution was less a biological event than a cultural one. Small communities of anatomically modern humans gradually developed more sophisticated communication strategies, which were then transmitted and refined across generations. The evolutionary pressure was not genetic selection operating on brain structure, but social selection operating on the ideas themselves. Stories and symbols that proved effective in binding communities together spread; those that did not were forgotten. Over thousands of years, this produced a cumulative repository of shared fictions powerful enough to sustain civilisation.` },
  ],
};

const QUESTIONS = [
  { id: 1, section: "Questions 1–4", instruction: "Choose the correct letter, A, B, C or D.", stem: "According to Section A, before the Cognitive Revolution, human stone tools", options: ["A. showed continuous incremental improvement over time.", "B. were virtually identical across hundreds of thousands of years.", "C. were more sophisticated than those of Neanderthals.", "D. disappeared entirely from the archaeological record."], answer: "B" },
  { id: 2, stem: "The term 'fictional language' in Section B refers to the ability to", options: ["A. produce complex vocalisations warning of environmental dangers.", "B. deceive other members of the social group.", "C. discuss concepts and entities that have no physical existence.", "D. record historical events through symbolic representation."], answer: "C" },
  { id: 3, stem: "The author uses chimpanzees in Section C to illustrate", options: ["A. the genetic similarities between primates and Homo sapiens.", "B. the upper limit on group size for species lacking shared mythology.", "C. the aggressive territorial behaviour of non-human primates.", "D. an alternative path of cognitive evolution."], answer: "B" },
  { id: 4, stem: "What does the author suggest about the Chauvet Cave paintings?", options: ["A. They were produced by Neanderthals rather than Homo sapiens.", "B. Their artistic sophistication is comparable to later human artwork.", "C. They depict mythological narratives about gods and ancestors.", "D. Their discovery challenged the dating of the Cognitive Revolution."], answer: "B" },
  { id: 5, section: "Questions 5–8", instruction: "Do the following statements agree with the information in the passage? Write TRUE, FALSE, or NOT GIVEN.", stem: "All scholars agree on what caused the Cognitive Revolution.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: "FALSE" },
  { id: 6, stem: "The genetic mutation hypothesis proposes a deliberate evolutionary adaptation.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: "FALSE" },
  { id: 7, stem: "Shell ornaments found across sub-Saharan Africa indicate early long-distance commerce.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: "TRUE" },
  { id: 8, stem: "The cultural evolution hypothesis argues that social selection acted on ideas rather than on brain structure.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: "TRUE" },
  { id: 9, section: "Questions 9–12", instruction: "Match each paragraph (A–F) with the statement that best summarises its main idea.", stem: "Paragraph D", options: ["A. A biological explanation for a sudden leap in human cognition.", "B. The decisive advantage of shared fictional narratives for group cohesion.", "C. Material and artistic evidence confirming a behavioural transformation.", "D. A cultural, rather than genetic, account of cognitive development.", "E. The abrupt emergence of complex behaviour after a long period of stasis.", "F. Language features unique to Homo sapiens and their social implications."], answer: "C" },
  { id: 10, stem: "Paragraph B", options: ["A. A biological explanation for a sudden leap in human cognition.", "B. The decisive advantage of shared fictional narratives for group cohesion.", "C. Material and artistic evidence confirming a behavioural transformation.", "D. A cultural, rather than genetic, account of cognitive development.", "E. The abrupt emergence of complex behaviour after a long period of stasis.", "F. Language features unique to Homo sapiens and their social implications."], answer: "F" },
  { id: 11, stem: "Paragraph E", options: ["A. A biological explanation for a sudden leap in human cognition.", "B. The decisive advantage of shared fictional narratives for group cohesion.", "C. Material and artistic evidence confirming a behavioural transformation.", "D. A cultural, rather than genetic, account of cognitive development.", "E. The abrupt emergence of complex behaviour after a long period of stasis.", "F. Language features unique to Homo sapiens and their social implications."], answer: "A" },
  { id: 12, stem: "Paragraph F", options: ["A. A biological explanation for a sudden leap in human cognition.", "B. The decisive advantage of shared fictional narratives for group cohesion.", "C. Material and artistic evidence confirming a behavioural transformation.", "D. A cultural, rather than genetic, account of cognitive development.", "E. The abrupt emergence of complex behaviour after a long period of stasis.", "F. Language features unique to Homo sapiens and their social implications."], answer: "D" },
];

const TOTAL = 3600;

export default function PracticePage() {
  const [timeLeft, setTimeLeft] = useState(TOTAL);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  
  useEffect(() => {
    if (submitted) return;
    const id = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(id);
  }, [submitted]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const warn = timeLeft <= 300;
  const answeredCount = Object.keys(answers).length;

  const submit = useCallback(() => {
    if (submitted) return;
    let c = 0;
    QUESTIONS.forEach(q => { if (answers[q.id] === q.answer) c++; });
    setScore(c); setSubmitted(true); setShowResults(true);
  }, [answers, submitted]);

  const pick = (id: number, val: string) => { 
  if (!submitted) setAnswers(p => ({ ...p, [id]: val })); 
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--navy:#0B1527;--nm:#112040;--nl:#1A3060;--gold:#C9A84C;--gl:#E8C96B;--gp:rgba(201,168,76,0.1);--cream:#F5F0E8;--muted:rgba(245,240,232,0.5);--bdr:rgba(201,168,76,0.18);--red:#E85C5C;--grn:#4CAF7C}
        html,body{height:100%;overflow:hidden}
        body{font-family:'DM Sans',sans-serif;background:var(--navy);color:var(--cream)}
        .bar{position:fixed;top:0;left:0;right:0;z-index:50;height:58px;background:rgba(11,21,39,0.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--bdr);display:flex;align-items:center;justify-content:space-between;padding:0 1.5rem;gap:1rem}
        .brand{display:flex;align-items:center;gap:10px;flex-shrink:0}
        .lm{width:30px;height:30px;background:linear-gradient(135deg,var(--gold),var(--gl));border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;font-size:14px;color:var(--navy)}
        .bt{font-family:'Playfair Display',serif;font-size:.9rem;color:var(--cream)}
        .bs{font-size:.62rem;color:var(--muted);letter-spacing:.06em;text-transform:uppercase}
        .ptrack{flex:1;max-width:260px;display:flex;flex-direction:column;gap:4px}
        .pmeta{display:flex;justify-content:space-between;font-size:.62rem;color:var(--muted)}
        .pmeta span:last-child{color:var(--gold);font-weight:500}
        .bo{height:3px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden}
        .bi{height:100%;border-radius:3px;transition:width .5s,background .5s}
        .tpill{display:flex;align-items:center;gap:10px;padding:7px 16px;border-radius:6px;background:var(--nm);border:1px solid var(--bdr);transition:all .4s;flex-shrink:0}
        .tpill.w{background:rgba(232,92,92,0.1);border-color:rgba(232,92,92,.45);animation:wp 1.2s ease-in-out infinite}
        @keyframes wp{0%,100%{box-shadow:none}50%{box-shadow:0 0 0 5px rgba(232,92,92,.12)}}
        .td{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;min-width:68px;text-align:center;letter-spacing:.06em;color:var(--cream);transition:color .3s}
        .td.w{color:var(--red)}
        .tl{font-size:.6rem;color:var(--muted);letter-spacing:.1em;text-transform:uppercase}
        .sbtn{padding:8px 22px;background:linear-gradient(135deg,var(--gold),var(--gl));color:var(--navy);border:none;border-radius:4px;font-size:.78rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:all .25s;flex-shrink:0}
        .sbtn:hover{box-shadow:0 4px 18px rgba(201,168,76,.4);transform:translateY(-1px)}
        .sbtn:disabled{opacity:.4;cursor:default;transform:none;box-shadow:none}
        .split{display:grid;grid-template-columns:1fr 1fr;height:calc(100vh - 58px);margin-top:58px}
        .pp{overflow-y:auto;background:var(--nm);border-right:1px solid var(--bdr);padding:2.5rem 2rem}
        .pp::-webkit-scrollbar{width:4px}
        .pp::-webkit-scrollbar-thumb{background:rgba(201,168,76,.2);border-radius:4px}
        .qp{overflow-y:auto;background:var(--navy);padding:2rem 1.8rem 4rem}
        .qp::-webkit-scrollbar{width:4px}
        .qp::-webkit-scrollbar-thumb{background:rgba(201,168,76,.2);border-radius:4px}
        .pbadge{display:inline-block;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);background:var(--gp);border:1px solid var(--bdr);border-radius:2px;padding:3px 10px;margin-bottom:1rem}
        .ptitle{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--cream);line-height:1.3;margin-bottom:.4rem}
        .pdiv{width:36px;height:2px;background:linear-gradient(90deg,var(--gold),transparent);margin:1.2rem 0 2rem}
        .psec{margin-bottom:1.8rem}
        .ph{font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;font-weight:500}
        .pb{font-size:.875rem;line-height:1.9;color:rgba(245,240,232,.8);font-weight:300;text-align:justify}
        .qs{font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin:2rem 0 .4rem;font-weight:500}
        .qs:first-child{margin-top:0}
        .qi{font-size:.77rem;color:var(--muted);line-height:1.65;margin-bottom:1.2rem;padding:10px 14px;border-left:2px solid rgba(201,168,76,.3);background:rgba(201,168,76,.04);border-radius:0 4px 4px 0}
        .qc{background:var(--nm);border:1px solid var(--bdr);border-radius:8px;padding:1.2rem 1.4rem;margin-bottom:.85rem;transition:border-color .2s}
        .qc:hover{border-color:rgba(201,168,76,.32)}
        .qc.done{border-color:rgba(201,168,76,.38)}
        .qc.ok{border-color:var(--grn);background:rgba(76,175,124,.05)}
        .qc.bad{border-color:var(--red);background:rgba(232,92,92,.05)}
        .qnr{display:flex;align-items:center;gap:8px;margin-bottom:.75rem}
        .qn{width:22px;height:22px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:600;background:var(--gp);color:var(--gold);border:1px solid var(--bdr)}
        .qn.f{background:var(--gold);color:var(--navy);border-color:var(--gold)}
        .rt{font-size:.68rem;font-weight:500}
        .qst{font-size:.86rem;color:var(--cream);line-height:1.6;margin-bottom:.9rem}
        .qos{display:flex;flex-direction:column;gap:5px}
        .qo{display:flex;align-items:flex-start;gap:9px;padding:7px 11px;border-radius:5px;border:1px solid transparent;cursor:pointer;transition:all .2s;font-size:.81rem;color:var(--muted);line-height:1.5;background:rgba(255,255,255,.015)}
        .qo:hover:not(.lk){background:rgba(201,168,76,.07);border-color:rgba(201,168,76,.25);color:var(--cream)}
        .qo.sel{background:rgba(201,168,76,.1);border-color:var(--gold);color:var(--cream)}
        .qo.kok{background:rgba(76,175,124,.1);border-color:var(--grn);color:var(--cream)}
        .qo.kbd{background:rgba(232,92,92,.08);border-color:var(--red);color:var(--cream)}
        .qo.lk{cursor:default}
        .rd{width:13px;height:13px;border-radius:50%;border:1.5px solid currentColor;flex-shrink:0;margin-top:3px;display:flex;align-items:center;justify-content:center}
        .rdd{width:5px;height:5px;border-radius:50%}
        .ar{font-size:.7rem;margin-top:7px;padding:5px 10px;border-radius:4px;border-left:2px solid var(--grn);background:rgba(76,175,124,.07);color:var(--grn)}
        .ov{position:fixed;inset:0;z-index:200;background:rgba(7,15,30,.92);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center}
        .rc{background:var(--nm);border:1px solid var(--bdr);border-radius:16px;padding:3rem 2.5rem;text-align:center;max-width:460px;width:90%;position:relative}
        .rc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);border-radius:16px 16px 0 0}
        .re{font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:1.5rem}
        .rr{width:140px;height:140px;margin:0 auto 1.5rem;position:relative}
        .rn{font-family:'Playfair Display',serif;font-size:2.8rem;font-weight:700;color:var(--gold);line-height:1}
        .ro{font-size:.9rem;color:var(--muted)}
        .rb{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:var(--cream);margin-bottom:.5rem}
        .rm{font-size:.86rem;color:var(--muted);line-height:1.7;margin-bottom:2rem;font-weight:300}
        .ra{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
        .bg{padding:11px 24px;background:transparent;border:1px solid var(--gold);color:var(--gold);border-radius:4px;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:all .25s}
        .bg:hover{background:var(--gp)}
        .bgo{padding:11px 24px;background:linear-gradient(135deg,var(--gold),var(--gl));color:var(--navy);border:none;border-radius:4px;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;font-weight:600;text-decoration:none;display:inline-flex;align-items:center}
        @media(max-width:768px){html,body{overflow:auto;height:auto}.split{grid-template-columns:1fr;height:auto}.pp,.qp{overflow:visible}.ptrack{display:none}}
      `}</style>

      <header className="bar">
        <div className="brand">
          <div className="lm">I</div>
          <div><div className="bt">IELTSPro</div><div className="bs">Academic Reading · Mock Test</div></div>
        </div>

        <div className="ptrack">
          <div className="pmeta"><span>Answered</span><span>{answeredCount} / {QUESTIONS.length}</span></div>
          <div className="bo"><div className="bi" style={{ width:`${(answeredCount/QUESTIONS.length)*100}%`, background:"linear-gradient(90deg,var(--gold),var(--gl))" }} /></div>
          <div className="bo" style={{marginTop:2}}><div className="bi" style={{ width:`${(timeLeft/TOTAL)*100}%`, background: warn?"linear-gradient(90deg,#E85C5C,#FF8080)":"linear-gradient(90deg,rgba(201,168,76,.35),rgba(232,201,107,.35))" }} /></div>
        </div>

        <div className={`tpill${warn?" w":""}`}>
          <span style={{fontSize:"1rem"}}>{warn?"⚠️":"⏱"}</span>
          <div>
            <div className={`td${warn?" w":""}`}>{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</div>
            <div className="tl">{warn?"Warning!":"Remaining"}</div>
          </div>
        </div>

        <button className="sbtn" onClick={submit} disabled={submitted}>Submit Test</button>
      </header>

      <main className="split">
        <div className="pp">
          <div className="pbadge">{PASSAGE.subtitle}</div>
          <h1 className="ptitle">{PASSAGE.title}</h1>
          <div className="pdiv" />
          {PASSAGE.text.map(s => (
            <div className="psec" key={s.heading}>
              <div className="ph">{s.heading}</div>
              <p className="pb">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="qp">
          {QUESTIONS.map(q => {
            const ua = answers[q.id];
            const ans = !!ua;
            const cor = submitted && ua === q.answer;
            const wrg = submitted && !!ua && ua !== q.answer;
            const cc = ["qc", !submitted&&ans?"done":"", submitted&&cor?"ok":"", submitted&&wrg?"bad":""].filter(Boolean).join(" ");
            return (
              <div key={q.id}>
                {q.section && <div className="qs">{q.section}</div>}
                {q.instruction && <div className="qi">{q.instruction}</div>}
                <div className={cc}>
                  <div className="qnr">
                    <span className={`qn${ans?" f":""}`}>{q.id}</span>
                    {submitted && <span className="rt" style={{color:cor?"var(--grn)":"var(--red)"}}>{cor?"✓ Correct":"✗ Incorrect"}</span>}
                  </div>
                  <div className="qst">{q.stem}</div>
                  <div className="qos">
                    {q.options.map(opt => {
                      const k = ["TRUE","FALSE","NOT GIVEN"].includes(opt) ? opt : opt[0];
                      const sel = ua === k;
                      const ok = submitted && k === q.answer;
                      const bd = submitted && sel && k !== q.answer;
                      const oc = ["qo", sel&&!submitted?"sel":"", ok&&submitted?"kok":"", bd?"kbd":"", submitted?"lk":""].filter(Boolean).join(" ");
                      return (
                        <div key={opt} className={oc} onClick={() => pick(q.id, k)}>
                          <span className="rd">{(sel||ok)&&<span className="rdd" style={{background:ok?"var(--grn)":bd?"var(--red)":"var(--gold)"}} />}</span>
                          {opt}
                        </div>
                      );
                    })}
                  </div>
                  {submitted && wrg && <div className="ar">Correct answer: {q.answer}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {showResults && score !== null && (
        <div className="ov">
          <div className="rc">
            <div className="re">Test Complete — Reading Section</div>
            <div className="rr">
              <svg style={{transform:"rotate(-90deg)"}} width="140" height="140" viewBox="0 0 140 140">
                <defs><linearGradient id="rg"><stop offset="0%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#E8C96B"/></linearGradient></defs>
                <circle fill="none" stroke="rgba(201,168,76,.1)" strokeWidth="10" cx="70" cy="70" r="54"/>
                <circle fill="none" stroke="url(#rg)" strokeWidth="10" strokeLinecap="round" cx="70" cy="70" r="54"
                  strokeDasharray={339.3} strokeDashoffset={339.3*(1-score/QUESTIONS.length)}
                  style={{transition:"stroke-dashoffset 1.2s ease-out"}}/>
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <span className="rn">{score}</span><span className="ro">/ {QUESTIONS.length}</span>
              </div>
            </div>
            <div className="rb">{score>=11?"Band 8–9 · Excellent":score>=9?"Band 7–7.5 · Good":score>=7?"Band 6–6.5 · Competent":"Band 5–5.5 · Keep Practising"}</div>
            <p className="rm">{score>=11?"Exceptional comprehension. You are well prepared for a high band score.":score>=9?"Strong result. Focus on matching and inference questions to reach Band 8.":"Good foundation. Review the answer explanations below to close your gaps."}</p>
            <div className="ra">
              <button className="bg" onClick={()=>setShowResults(false)}>Review Answers</button>
              <a href="/" className="bgo">Back to Dashboard</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
