"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ClipboardCheck, Lightbulb, ListChecks } from "lucide-react";
import { questions } from "@/data/questions";
import type { Answer } from "@/types/checklist";
import { QuestionCard } from "@/components/checklist/QuestionCard";
import { ProgressBar } from "@/components/checklist/ProgressBar";
import { QuestionStatusPanel } from "@/components/checklist/QuestionStatusPanel";
import Image from "next/image";

export default function ChecklistPage() {
  const router = useRouter();
  const [answers,setAnswers] = useState<Record<number,Answer>>({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const answered=Object.keys(answers).length, total=questions.length;

  const submit=async()=>{
    if(answered!==total||loading)return;
    setLoading(true); setError("");
    try {
      const api=process.env.NEXT_PUBLIC_API_URL??"http://localhost:4000";
      const res=await fetch(`${api}/api/checklist/evaluate`,{
        method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answers})
      });
      if(!res.ok) throw new Error();
      const result=await res.json();
      sessionStorage.setItem("checklistResult",JSON.stringify(result));
      router.push("/result");
    } catch { setError("ارتباط با سرور برقرار نشد. مطمئن شوید Backend در حال اجراست."); }
    finally { setLoading(false); }
  };

  return <main>
    <header className="topbar"><div className="container topbar-inner">
      <div className="brand"><div className="brand-mark"><Image
  src="/logo.png"
  alt="ای جهت"
  width={40}
  height={40}
/></div><div><strong>ای جهت</strong><span>راهکارهای هوشمند ملکی</span></div></div>
      {/* <button className="back-link" type="button">بازگشت به صفحه قبل <ArrowLeft size={17}/></button> */}
    </div></header>
    <div className="container page">
      <section className="hero">
        <div className="hero-icon"><ClipboardCheck size={38}/></div>
        <div className="hero-copy"><p className="eyebrow">ارزیابی ملک</p><h1>چک‌لیست بررسی ملک</h1><p>به هر سؤال با دقت پاسخ دهید تا وضعیت ملک را بهتر بررسی کنیم.</p></div>
        <ProgressBar completed={answered} total={total}/>
      </section>
      <div className="content-grid">
        <section className="questions-column">
          <div className="section-heading"><div><h2>سؤالات بررسی</h2><span>{answered} از {total} سؤال پاسخ داده شده</span></div><div className="mini-progress">{answered}/{total}</div></div>
          <div className="question-list">{questions.map(q=><QuestionCard key={q.id} question={q} answer={answers[q.id]} onAnswerChange={(id,a)=>{setAnswers(x=>({...x,[id]:a}));setError("");}}/>)}</div>
          {error&&<div className="error-box">{error}</div>}
          <div className="footer-actions">
            {/* <button className="secondary-button" type="button"><ArrowRight size={18}/> مرحله قبل</button> */}
            <button className="primary-button" type="button" disabled={answered!==total||loading} onClick={submit}>{loading?"در حال محاسبه...":"مشاهده نتیجه"}{!loading&&<ArrowLeft size={18}/>}</button>
          </div>
        </section>
        <aside className="sidebar">
          <QuestionStatusPanel answered={answered} total={total}/>
          <div className="tip-card"><Lightbulb size={21}/><div><strong>نکته</strong><p>هرچه دقیق‌تر پاسخ دهید، نتیجه بررسی معتبرتر خواهد بود.</p></div></div>
          <div className="sidebar-illustration"><ListChecks size={78} strokeWidth={1.2}/><span>با خیال راحت<br/>ملک را بررسی کنیم.</span></div>
        </aside>
      </div>
    </div>
  </main>;
}