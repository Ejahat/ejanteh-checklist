# Checklist Full-Stack

- frontend: Next.js + TypeScript
- backend: Node.js + Express + TypeScript
- بدون دیتابیس

## اجرا
Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend، در ترمینال دوم:
```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:4000

API:
POST /api/checklist/evaluate

```json
{"answers":{"1":"yes","2":"no","3":"unknown"}}
```

وزن سؤال‌ها در `backend/src/data/checklistQuestions.ts` است و مجموع آن‌ها ۱۰۰ است.
