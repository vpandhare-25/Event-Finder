# Project3 EventFinder

Simple full-stack event app:
- Backend: Express + MongoDB (Mongoose)
- Frontend: React

## Quick Start

### 1) Install
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2) Run app (2 terminals)

Terminal 1:
```bash
cd backend
npm start
```

Terminal 2:
```bash
cd frontend
npm start
```

Open `http://localhost:3000` (or `3001` if prompted).

## Features

- Event list from backend API
- Filters: location, category, date range
- Sorting: date/title
- List view + map view
- Event details panel
- Save favorites (localStorage)
- Share event
- Get directions
- Light/dark mode

## API

- `GET /` health check
- `GET /events` returns events (currently mock events)
- `POST /events` saves an event to MongoDB

Example `POST /events` body:
```json
{
  "title": "New Event",
  "date": "2026-10-10",
  "location": "Austin, TX",
  "category": "Technology",
  "description": "Demo event",
  "url": "https://example.com/event"
}
```

## Notes

- If frontend says fetch failed, confirm backend is running before starting frontend.
