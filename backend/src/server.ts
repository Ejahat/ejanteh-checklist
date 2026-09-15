import express from "express";
import cors from "cors";
import {checklistRouter} from "./routes/checklist.js";
const app=express();const PORT=Number(process.env.PORT)||4000;
app.use(cors({origin:"http://localhost:3000"}));app.use(express.json());
app.get("/api/health",(_req,res)=>res.json({ok:true,service:"checklist-backend"}));
app.use("/api/checklist",checklistRouter);
app.listen(PORT,()=>console.log(`Checklist API running on http://localhost:${PORT}`));