import {Router} from "express";
import {evaluateChecklist} from "../services/evaluateChecklist.js";
import type {Answer} from "../types/checklist.js";
export const checklistRouter=Router();
checklistRouter.post("/evaluate",(req,res)=>{try{const answers=req.body?.answers;if(!answers||typeof answers!=="object"||Array.isArray(answers))return res.status(400).json({message:"answers must be an object."});return res.json(evaluateChecklist(answers as Record<string,Answer>));}catch(e){return res.status(400).json({message:e instanceof Error?e.message:"Evaluation failed."});}});