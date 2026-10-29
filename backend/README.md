# CRM Backend (Node.js + Express + MySQL + Prisma 7 + JWT)

## Setup

1. Node 20.19+ and MySQL 8 running.
2. `CREATE DATABASE crm;`
3. `cp .env.example .env` and set `DATABASE_URL` and `JWT_SECRET`.
4. `npm install` (runs `prisma generate`)
5. `npx prisma migrate dev --name init` (or `npx prisma db push`)
6. `npm start` -> http://localhost:5000

## API

| Method | Endpoint                              | Auth   | Description                                   |
| ------ | ------------------------------------- | ------ | --------------------------------------------- |
| POST   | /api/auth/register                    | No     | `{name,email,password}`                       |
| POST   | /api/auth/login                       | No     | `{email,password}` -> JWT                     |
| POST   | /api/enquiries/public                 | No     | `{name,email,phone?,courseInterest,message?}` |
| GET    | /api/enquiries/unclaimed?page=&limit= | Bearer | Unclaimed (public) leads                      |
| POST   | /api/enquiries/:id/claim              | Bearer | Claim a lead (becomes private)                |
| GET    | /api/enquiries/my?page=&limit=        | Bearer | Leads claimed by logged-in user               |
