# Wellbook

Wellbook is an educational health-service booking SPA. The React frontend and mock REST API run as separate processes and communicate over HTTP.

## Stack

- React 19 + TypeScript + Vite
- React Router
- TanStack Query
- Zustand with persisted client preferences
- Tailwind CSS + DaisyUI
- JSON Server

## Install

```powershell
npm install
```

Copy the example environment file when a different API URL is needed:

```powershell
Copy-Item .env.example .env.local
```

The default API URL is `http://localhost:3001`.

## Run

Open two terminals in the project directory.

Terminal 1 - mock REST API:

```powershell
npm run server
```

Terminal 2 - React frontend:

```powershell
npm run dev
```

Vite normally prints `http://localhost:5173`. JSON Server runs at `http://localhost:3001`.

They are separate so the frontend communicates with server state through REST requests instead of importing data files. Stopping JSON Server should leave the frontend running and show retryable error states.

## API Resources

- `GET /services` and `GET /services/:id`
- `GET /reviews`
- `GET /slots`
- `GET`, `POST`, and `PATCH /bookings`
- `GET /questions`

Favorites remain in localStorage through Zustand rather than using a server resource.

## Checks

```powershell
npm run lint
npx tsc -b
npm run build
```

## Project Structure

- `server/db.json` - JSON Server seed data and persisted mock changes
- `src/api/` - typed HTTP and resource functions
- `src/hooks/` - TanStack Query hooks and query keys
- `src/stores/` - persisted client-only state
- `src/pages/` - routed screens
- `src/components/` - reusable UI and feature components

Wellbook is a simulated system for education; it does not create real healthcare appointments.
