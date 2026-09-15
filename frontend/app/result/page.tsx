"use client";
import { useEffect,useState } from "react";
import { ArrowRight,CheckCircle2,CircleHelp,RotateCcw,XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { EvaluationResult } from "@/types/checklist";

const meta={
 critical:{label:"ریسک بحرانی",className:"critical"},
 important:{label:"ریسک مهم",className:"important"},
 manageable:{label:"ریسک قابل مدیریت",className:"manageable"},
 safe:{label:"امن",className:"safe"}
} as const;

export default function ResultPage(){
 const router=useRouter(); const [result,setResult]=useState<EvaluationResult|null>(null);
 useEffect(()=>{const raw=sessionStorage.getItem("checklistResult");if(raw)setResult(JSON.parse(raw));},[]);
 if(!result)return <main className="result-page"><div className="container empty-result"><h1>نتیجه‌ای برای نمایش وجود ندارد.</h1><button className="primary-button" onClick={()=>router.push("/")}><ArrowRight size={18}/> شروع چک‌لیست</button></div></main>;
 const m=meta[result.risk];
 return <main className="result-page"><div className="container result-container">
  <div className="result-header"><div className={`success-icon ${m.className}`}><CheckCircle2 size={42}/></div><p className="eyebrow">نتیجه بررسی</p><h1>خلاصه بررسی ملک</h1><p>نتیجه بر اساس پاسخ‌های ثبت‌شده در چک‌لیست محاسبه شده است.</p></div>
  <section className={`result-score-card ${m.className}`}><div><span className="muted-label">سطح ریسک</span><h2>{m.label}</h2><p>{result.description}</p></div><div className="score-ring" style={{"--score":`${result.score*3.6}deg`} as React.CSSProperties}><strong>{result.score}٪</strong><span>امنیت ملک</span></div></section>
  <section className="stats-grid">
   <div className="result-stat positive"><CheckCircle2/><strong>{result.stats.yes}</strong><span>پاسخ بله</span></div>
   <div className="result-stat negative"><XCircle/><strong>{result.stats.no}</strong><span>پاسخ خیر</span></div>
   <div className="result-stat unknown"><CircleHelp/><strong>{result.stats.unknown}</strong><span>نمی‌دانم</span></div>
  </section>
  <section className="findings-card"><div className="findings-title"><div><span className="eyebrow">جزئیات</span><h2>نتیجه ۱۷ بررسی</h2></div><span className="result-score-badge">{result.score}٪</span></div>
   {result.details.map(item=><div className="finding" key={item.id}>{item.answer==="yes"&&<CheckCircle2/>}{item.answer==="no"&&<XCircle/>}{item.answer==="unknown"&&<CircleHelp/>}<div className="finding-main"><strong>{item.id}. {item.title}</strong><span>{item.answerLabel} · وزن {item.weight}٪ · امتیاز {item.earned}٪</span></div></div>)}
  </section>
  <div className="result-actions"><button className="secondary-button" onClick={()=>router.push("/")}><RotateCcw size={18}/> بررسی مجدد</button><button className="secondary-button" onClick={()=>router.back()}><ArrowRight size={18}/> بازگشت</button></div>
 </div></main>;
}