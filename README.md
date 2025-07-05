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
*Go to the /auth-service*
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
## START DOCKER
```bash
docker-compose up -d
```

### RUNNING THE BACKEND

# In the /auth-service
```bash
pnpm run dev
#or
pnpm dev
```
# In the /python-service
```bash
python main.py
```


## TO RUN EVERYTHING

```bash
docker-compose up --build
```
