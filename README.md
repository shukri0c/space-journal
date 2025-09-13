## Stargazer's Journal

_A personal stargazing journal used to log observations aswell as display real astronomical data_

---

## ✨ Features

- **User Authentication** - Secure sign up and login using NextAuth.js
- **Journal Entries** - Create, read, update, and delete stargazing observations
- **Real-time Astronomy Data** - Automatically fetches daily NASA Astronomy Picture of the Day (APOD)
- **Sun & Moon Data** - Displays sunrise, sunset, moonrise, moonset, and moon phase based on user location
- **Responsive Design** - Mobile-friendly interface built with Tailwind CSS
- **Modern Stack** - Built with Next.js 15, TypeScript, and Prisma ORM

---

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with email/password
- **APIs**: NASA APOD API, WeatherAPI Astronomy Data
- **Deployment**: Vercel, Supabase (Database)
- **Styling**: Tailwind CSS with custom animations

---
## Live Demo

The application is deployed on Vercel:  
**[https://space-journal.vercel.app](https://space-journal.vercel.app)**
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

3. Set up environment variables

```
cp .env.example .env.local
```
Fill in your:

Database URL

NextAuth secret

NASA API key

WeatherAPI key

4. Set up database
```
npx prisma generate
npx prisma db push
```

5. Run the development server
```
npm run dev
```

6.Open your browser
Visit http://localhost:3000 to view the application












