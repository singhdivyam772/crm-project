# CRM - Enquiry & Lead Claiming

```
crm-project/
  backend/    Node.js + Express + MySQL + Prisma 7 + JWT  (REST API, port 5000)
  frontend/   React + Vite                                  (UI, port 5173)
```

## Run it

**1. Backend** (terminal 1)

```
cd backend
cp .env.example .env        # set DATABASE_URL (MySQL) and JWT_SECRET
npm install
npx prisma migrate dev --name init
npm start
```

**2. Frontend** (terminal 2)

```
cd frontend
npm install
npm run dev                 # http://localhost:5173  (proxies /api to :5000)
```

## Requirements checklist

| Requirement                     | Where                                                 |
| ------------------------------- | ----------------------------------------------------- |
| Employee login / register (JWT) | `POST /api/auth/login`, `/register` - UI at `/login`  |
| Public form, no auth            | `POST /api/enquiries/public` - UI at `/`              |
| Fetch unclaimed leads           | `GET /api/enquiries/unclaimed` - "Open enquiries" tab |
| Claim a lead                    | `POST /api/enquiries/:id/claim` - "Claim" button      |
| Fetch my claimed leads          | `GET /api/enquiries/my` - "My leads" tab              |
| Express, JWT, MySQL             | backend (Prisma 7 ORM)                                |
