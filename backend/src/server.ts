import express from "express";
import cors from "cors";
import { checklistRouter } from "./routes/checklist.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://آدرس-فرانت-ورکل-خودت.vercel.app",
    ],
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "checklist-backend" });
});

app.use("/api/checklist", checklistRouter);

export default app;