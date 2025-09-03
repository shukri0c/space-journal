## Stargazer's Journal

_A personal stargazing journal used to log observations aswell as display real astronomical data_

---

## Project Description

A full-stack astronomy journaling app built with Next.js, PostgreSQL and Tailwind CSS whilst using real astronomical data from IP Geolocation Astrology API and Visible Planets API.
Each entry includes:

- Title
- Automatically fetched astronomical data:
  - Sunset time
  - Moon phase
  - Visible planets
  - Events
- City location
- Personal observation notes

---

## Current Features

- Hardcoded pages built with Next.js
- Styled with Tailwind CSS
- Runs locally with Next.js dev server

## Expected Features

- User authentication (signup/login)
- CRUD | Create, view, edit, and delete journal entries
- Auto-fetched astronomy data per entry
- Dashboard with entry statistics
- Deployed on Vercel (planned)

---

## Tech Stack

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Node.js (API routes in Next.js)
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js
- **Deployment:** Vercel

---

## Setup Instructions

1. Clone the repository

```
git clone https://github.com/shukri0c/space-journal.git
cd astrojournal
```

2. Install dependencies

```
npm install
```

3. Run the development server

```
npm run dev
```

4. Open the app -> Visit http://localhost:3000 in your browser.
