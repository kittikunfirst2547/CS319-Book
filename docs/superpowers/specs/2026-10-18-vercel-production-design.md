# Vercel Production Design

## Goal

Deploy the current Wellbook UI to Vercel with current service data, reliable remote images, working client-side routes, and bookings that work without a separately hosted JSON Server.

## Architecture

- Publish the read-only catalogue (`services`, `reviews`, `slots`, and `questions`) as `public/api/db.json`. TanStack Query continues to own asynchronous catalogue loading and caching through a same-origin `/api/db.json` request.
- Keep bookings browser-local in a persisted Zustand store. Booking creation and cancellation remain asynchronous through the existing API facade so current mutation UI behavior is preserved.
- Use stable `images.unsplash.com` URLs and retain `ServiceImage` fallback handling.
- Configure Vercel to serve `index.html` for client-side routes.

## Data flow

The UI loads catalogue data through TanStack Query → typed API modules → `/api/db.json`. Booking mutations call the booking API facade → persisted Zustand store → TanStack Query invalidation → refreshed UI.

## Error handling

Failed catalogue requests throw `ApiError`. Missing service IDs throw a 404 `ApiError`. Invalid or missing persisted booking data falls back to an empty booking list through Zustand persistence.

## Verification

- Contract tests prove production data exists, uses HTTPS Unsplash images, and no production client fallback references localhost.
- TypeScript build and ESLint pass.
- Local preview verifies `/`, nested routes, `/api/db.json`, image loading, booking creation, and cancellation.
- Production verification repeats the browser → data → UI flow on the deployed Vercel URL.
