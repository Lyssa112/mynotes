# MyNotes

This project uses:

Node.js backend

PostgreSQL 18 (Dockerized)

[dbmate](https://github.com/amacneil/dbmate) for SQL migrations

postgres.js for database access

This project demonstrates a full-stack setup with Dockerized services for learning purposes.  

---

## Prerequisites

- [Docker](https://www.docker.com/) (and `docker-compose`) installed  
- Node.js 20+
- npm
  
---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Lyssa112/mynotes.git
cd mynotes
```

### Environment Variables

Create a `.env` file inside the project backend folder with example values
```bash
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
DATABASE_URL=postgres://your_db_user:your_db_password@db:5432/your_db_name?sslmode=disable
```
Replace `your_db_user`, `your_db_password`, and `your_db_name` with your own secure values.
Make sure the same values are used in docker-compose.yml if you reference them with `${...}`.
This keeps credentials private and avoids committing sensitive info to Git.


### Start Docker Services
```bash
docker compose up -d
```

### Running Migrations (dbmate)
```bash
cd backend
npm run migrate
```

Or using Docker:
```bash
docker compose run --rm backend npx dbmate up
```

### Creating New Migrations
Generate a new migration file
```bash
cd backend
npx dbmate anyname
```
This will create a new file inside `backend/db/migrations/`

Apply migrations
`npm run migrate`

### Start Backend Locally without Docker
```bash
cd backend
npm install
npm run dev
```

### Project Structure
```
mynotes/
├── docker-compose.yml
├── backend/
│ ├── Dockerfile
│ ├── package.json
│ ├── .env
│ ├── db/
│ │ ├── migrations/
│ │ └── schema.sql
│ └── src/
│ └── index.js
└── README.md
```
