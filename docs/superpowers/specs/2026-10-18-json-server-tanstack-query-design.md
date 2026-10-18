# JSON Server and TanStack Query Integration Design

Date: 2026-10-18
Status: Ready for review

## Goal

Replace Wellbook's static server data with a separate mock REST API and connect the React frontend to it through TanStack Query. The frontend and server remain in the same repository but run as separate processes.

The result must demonstrate a Modern Decoupled SPA: React runs independently, communicates with the API over HTTP, handles unavailable-server states, and never imports server records directly from `src/data/`.

## Scope

Included:

- JSON Server backed by `server/db.json`.
- REST resources for services, reviews, slots, bookings, and Longevity questions.
- TanStack Query provider, API functions, query hooks, and mutation hooks.
- Home, service detail, My Page bookings, and Longevity Check connected to the API.
- Loading, error, retry, and empty states.
- Booking creation, duplicate-time prevention in the UI, and booking cancellation.
- Environment-based API base URL.

Excluded:

- A server-side favorites resource. Favorites remain anonymous client state in Zustand/localStorage.
- A custom Express server, database, or production deployment.
- Atomic booking conflict enforcement. JSON Server is an educational mock API.

## Runtime Architecture

Two independent development processes run from the same repository:

1. Vite serves the React frontend, normally at `http://localhost:5173`.
2. JSON Server serves REST resources at `http://localhost:3001`.

The frontend reads `VITE_API_URL`, with `http://localhost:3001` used in local development. React components do not call `fetch` directly. Requests pass through a small API client, resource functions, and TanStack Query hooks.

## Data Model

### services

Uses the existing `Service` shape: string ID, name, category key, price, rating, review count, provider, description, image URL, and duration.

### reviews

Uses the existing `Review` shape and relates each review to a service through `serviceId`.

### slots

Uses the existing `Slot` shape: one service and date with an array of available time strings.

### bookings

Contains string ID, service ID, date, time, status, and creation timestamp. My Page represents the current local visitor.

Cancellation changes `status` from `confirmed` to `cancelled` with `PATCH /bookings/:id`. Records remain available for demonstrating booking history.

### questions

Extends the existing Longevity question with `recommendationServiceId`. The selected weakest domain maps directly to the relevant recommended service without a separate recommendation endpoint.

Answer labels and current in-progress answers remain client-side UI/client state. The question definitions and recommendation targets are server state.

## API Layer

`src/api/client.ts` provides a typed request wrapper. It joins paths to `VITE_API_URL`, sends JSON headers when needed, parses JSON responses, and throws an error for non-2xx responses.

Resource modules provide endpoint functions:

- `services.ts`: list and fetch one service.
- `reviews.ts`: list reviews by service ID.
- `slots.ts`: list slots by service ID.
- `bookings.ts`: list, create, and cancel bookings.
- `questions.ts`: list Longevity questions.

Components consume hooks from `src/hooks/`, not API functions directly. Query keys are centralized and hierarchical so mutations can invalidate the correct cached data.

## Frontend Data Flow

### Home

`useServices` loads all services. Search, category, price, and sort remain derived UI operations over the fetched array. The page shows skeletons while pending, a retryable error state on failure, and the existing empty state when filters produce no results.

### Service Detail

The page loads the selected service, its reviews, its slots, and confirmed bookings. The first three resource groups can run in parallel once the route service ID is known.

A time is disabled when a confirmed booking already exists for the same service, date, and time. Confirmation posts a new booking. Success invalidates booking queries, shows confirmation, and preserves the existing navigation flow. Failed mutations keep the selection and display an error.

### My Page

The bookings tab loads bookings and services, then joins them by `serviceId` for display. Cancellation patches the booking status and invalidates booking queries. Favorites continue to derive service cards from the TanStack Query services cache plus IDs stored in Zustand.

### Longevity Check

Questions load through TanStack Query. The existing persisted step and answers remain in Zustand. If saved progress no longer matches the fetched question list, the UI handles it safely instead of crashing. The weakest answered domain supplies a recommended service ID, which is resolved from the services query.

## Error and Empty-State Behavior

- The shared API client treats non-2xx responses as errors.
- Each server-backed screen has an explicit pending state.
- Query failures display a human-readable message and retry button.
- Empty collections display the existing EmptyState component or a page-specific equivalent.
- Mutation buttons disable while pending to prevent duplicate submissions.
- Booking errors do not clear the selected date or time.
- Stopping JSON Server must produce error UI, not a blank screen.

## Configuration and Scripts

Dependencies:

- Runtime: `@tanstack/react-query`, `@tanstack/react-query-devtools`.
- Development: `json-server`.

Scripts:

- `npm run dev`: frontend only.
- `npm run server`: JSON Server only, using port 3001 and `server/db.json`.

`.env.example` documents `VITE_API_URL=http://localhost:3001`. Local environment files remain untracked where appropriate.

## Static Data Migration

Existing records in `src/data/` seed `server/db.json`. Pages are migrated incrementally so each checkpoint remains buildable. Static resource files are removed only after repository-wide search confirms that nothing imports them.

The existing favorites store remains because it contains client preference IDs, not copies of server records. Longevity answer options, labels, and scoring helpers may remain local because they are application behavior rather than fetched records.

## Verification

Automated project checks:

- `npm run lint`
- `npx tsc -b`
- `npm run build`

API checks:

- List and fetch services.
- Filter reviews and slots by `serviceId`.
- Create a booking.
- Patch the booking to cancelled.
- Confirm the persisted JSON Server state.

Browser flow:

1. Load services on Home.
2. Open a service detail page.
3. Select an available date and time and create a booking.
4. Confirm the booking appears on My Page.
5. Cancel it and confirm the state remains after refresh.
6. Complete Longevity Check and open the recommended service.
7. Stop JSON Server and confirm retryable error states appear.

## Constraints and Risks

- JSON Server does not enforce atomic uniqueness. Duplicate booking prevention is a frontend demonstration, not a production guarantee.
- Seed slot dates are demo data and may become historical. They can be refreshed without changing the API contract.
- The working tree already contains unrelated user changes. Implementation must preserve them and avoid broad formatting or destructive Git operations.
