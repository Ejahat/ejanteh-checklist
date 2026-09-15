import {Check,CircleHelp,X} from "lucide-react";
import type {Answer,ChecklistQuestion} from "@/types/checklist";
const options:[Answer,string,typeof Check][]=[["yes","بله",Check],["no","خیر",X],["unknown","نمی‌دانم",CircleHelp]];
export function QuestionCard({question,answer,onAnswerChange}:{question:ChecklistQuestion;answer?:Answer;onAnswerChange:(id:number,a:Answer)=>void}){
 return <article className={`question-card ${answer?"answered":""}`}><div className="question-top"><span className="question-number">{String(question.id).padStart(2,"۰")}</span><div className="question-copy"><span className="question-category">{question.category}</span><h3>{question.title}</h3></div><div className={`question-status ${answer?"done":""}`}>{answer&&<Check size={15}/>}</div></div>
 <div className="answer-selector">{options.map(([value,label,Icon])=><button key={value} type="button" className={`answer-button ${answer===value?`selected ${value}`:""}`} onClick={()=>onAnswerChange(question.id,value)} aria-pressed={answer===value}><Icon size={17}/>{label}</button>)}</div></article>;
}