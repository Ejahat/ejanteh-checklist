export type Answer="yes"|"no"|"unknown";
export type ChecklistQuestion={id:number;title:string;category:string;weight:number};
export type EvaluationResult={score:number;risk:"critical"|"important"|"manageable"|"safe";description:string;stats:{yes:number;no:number;unknown:number};details:{id:number;title:string;answer:Answer;answerLabel:string;weight:number;earned:number}[]};