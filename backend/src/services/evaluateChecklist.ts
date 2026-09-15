import {questions} from "../data/checklistQuestions.js";
import type {Answer,EvaluationResult} from "../types/checklist.js";
const labels:Record<Answer,string>={yes:"بله",no:"خیر",unknown:"نمی‌دانم"};
export function evaluateChecklist(answers:Record<string,Answer>):EvaluationResult{
 const details=questions.map(q=>{const a=answers[String(q.id)];if(!a||!["yes","no","unknown"].includes(a))throw new Error(`Missing or invalid answer for question ${q.id}`);const multiplier=a==="yes"?1:a==="unknown"?.5:0;return{id:q.id,title:q.title,answer:a,answerLabel:labels[a],weight:q.weight,earned:Number((q.weight*multiplier).toFixed(2))};});
 const score=Number(details.reduce((s,x)=>s+x.earned,0).toFixed(2));
 let risk:EvaluationResult["risk"];let description:string;
 if(score<50){risk="critical";description="امتیاز بررسی پایین است و ملک به بررسی جدی و فوری نیاز دارد."}
 else if(score<70){risk="important";description="چند مورد مهم در بررسی وجود دارد که بهتر است پیش از معامله بررسی شوند."}
 else if(score<90){risk="manageable";description="ریسک‌های موجود قابل مدیریت هستند، اما برخی موارد نیاز به توجه دارند."}
 else{risk="safe";description="بر اساس پاسخ‌های این چک‌لیست، وضعیت ملک در محدوده امن قرار دارد."}
 return{score,risk,description,stats:{yes:details.filter(x=>x.answer==="yes").length,no:details.filter(x=>x.answer==="no").length,unknown:details.filter(x=>x.answer==="unknown").length},details};
}