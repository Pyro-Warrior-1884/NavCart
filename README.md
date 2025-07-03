#  Node.js + MongoDB Backend

This project uses **MongoDB (via Docker)** and **Express.js** to handle basic user authentication (Signup & Login).

---

##  Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)
- [Docker + Docker Compose](https://docs.docker.com/get-docker/)

---

##  Install Dependencies

```bash
pnpm install
# or
npm install
```

## ENVIRONMENTAL VARIABLES

create a *.env* file 
```bash
connectionString=mongodb://localhost:27017/db_name
PORT=3000
```
## START MONGODB WITH DOCKER
```bash
docker-compose up -d
```

### RUNNING THE BACKEND

```bash
pnpm run dev
#or
pnpm dev
```

