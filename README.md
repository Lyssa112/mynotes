# MyNotes

A simple notes application built with **Node.js**, **React**, and **PostgreSQL 18**, using **Docker** for easy setup.  

This project demonstrates a full-stack setup with Dockerized services for learning purposes.  

---

## Prerequisites

- [Docker](https://www.docker.com/) (and `docker-compose`) installed  
- Node.js (optional if you want to run backend or frontend outside Docker)
- Git  

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Lyssa112/mynotes.git
cd mynotes
```

Install - [dbmate](https://github.com/amacneil/dbmate) as npm

### Environment Variables

Create a `.env` file inside the project root folder with example values
```bash
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
DATABASE_URL=postgres://your_db_user:your_db_password@db:5432/your_db_name?sslmode=disable
```
Replace `your_db_user`, `your_db_password`, and `your_db_name` with your own secure values.
Make sure the same values are used in docker-compose.yml if you reference them with `${...}`.
This keeps credentials private and avoids committing sensitive info to Git.


### Backend

Runs on `http://localhost:3000`
Start locally - TODO docker-compose
```bash
cd backend
npm install
npm run dev
```


### Frontend
At `http://localhost:5173`
Start locally - TODO docker-compose
```bash
cd frontend
npm install
npm run dev
```

### Starting
1. Start Docker Services
```bash
docker compose up -d
```
2. Run migrations
```bash
npm run migrate
```
3. Rollback (if needed)
```bash
npm run rollback
```
If needed, create new migration
```bash
npm run new-migration -- create_another_table
```

dbmate without npm/package.json script
Run migrations
```bash
cd backend
npx dbmate up
```

Rollback (if needed)
```bash
npx dbmate down
```
