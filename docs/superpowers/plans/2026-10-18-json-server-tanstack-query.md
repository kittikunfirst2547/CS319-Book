# JSON Server and TanStack Query Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Wellbook's static server records with a separate JSON Server API and connect every server-backed React flow through TanStack Query.

**Architecture:** Vite and JSON Server run as separate processes in one repository. A typed request client and resource modules isolate HTTP details; focused TanStack Query hooks expose server state and mutations to pages while Zustand keeps only favorites and Longevity answers.

**Tech Stack:** React 19, TypeScript 6, Vite 8, React Router 8, TanStack Query 5, Zustand 5, JSON Server, Tailwind CSS 4, DaisyUI 5

**Spec:** `docs/superpowers/specs/2026-10-18-json-server-tanstack-query-design.md`

## Global Constraints

- Do not add a backend favorites resource.
- Keep favorites in Zustand/localStorage and keep Longevity answers in Zustand.
- Frontend runs separately from JSON Server and reads `VITE_API_URL`.
- Components must not call `fetch` directly or import server records from `src/data/` after migration.
- JSON Server runs at `http://localhost:3001`; normal Vite development remains on its own port.
- Preserve unrelated working-tree changes and do not commit without explicit user permission.
- Do not add a test framework; use compile/build checks, direct API probes, and the browser flow specified below.

## Review Focus

- JSON Server stopped or unreachable: each server-backed screen renders a retryable error instead of crashing or showing a blank page (Task 3 and Task 7).
- Unknown service ID: the detail page distinguishes a completed 404 response from a pending or failed request and shows the existing not-found state (Task 4).
- Duplicate confirmed booking: the matching service/date/time option is disabled and cannot be submitted again from the UI (Task 4).
- Cancelled booking at the same time: it does not block that time from being booked again (Task 4).
- Persisted Longevity step outside the fetched question range: the page clamps or resets safely and still renders a valid state (Task 6).

---

### Task 1: Server Setup and Seed Data

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `.env.example`
- Create: `server/db.json`
- Modify: `src/types/booking.ts`
- Modify: `src/types/longevity.ts`

**Interfaces:**
- Consumes: existing resource records from `src/data/*.ts`.
- Produces: REST resources at `/services`, `/reviews`, `/slots`, `/bookings`, and `/questions`; `Question.recommendationServiceId: string`.

- [ ] **Step 1: Capture the current failure**

Run: `npm run server`

Expected: FAIL with `Missing script: "server"`.

- [ ] **Step 2: Install the approved dependencies**

Run: `npm install @tanstack/react-query @tanstack/react-query-devtools && npm install --save-dev json-server`

Expected: dependency installation succeeds and updates `package.json` plus `package-lock.json`.

- [ ] **Step 3: Add the server script and environment example**

Add `"server": "json-server server/db.json --port 3001"` under `scripts`. Add `.env.example` containing exactly `VITE_API_URL=http://localhost:3001`.

- [ ] **Step 4: Define the API-facing resource types**

Keep `Booking` scoped to appointment data. Add required `recommendationServiceId: string` to `Question`.

- [ ] **Step 5: Seed `server/db.json`**

Copy the existing services, reviews, slots, and bookings into valid JSON. Seed five questions in the existing order and attach service recommendations `sleep -> 5`, `exercise -> 3`, `diet -> 4`, `stress -> 2`, `social -> 6`.

- [ ] **Step 6: Verify the standalone server contract**

Run `npm run server`, then probe:

```powershell
Invoke-RestMethod http://localhost:3001/services
Invoke-RestMethod 'http://localhost:3001/reviews?serviceId=1'
Invoke-RestMethod 'http://localhost:3001/slots?serviceId=1'
Invoke-RestMethod http://localhost:3001/bookings
Invoke-RestMethod http://localhost:3001/questions
```

Expected: each command returns the seeded collection and filtered calls only contain service `1`.

- [ ] **Step 7: Commit checkpoint if the user authorizes it**

```powershell
git add package.json package-lock.json .env.example server/db.json src/types/booking.ts src/types/longevity.ts
git commit -m "feat(api): add JSON Server data source"
```

### Task 2: Typed API Client and Query Provider

**Files:**
- Create: `src/api/client.ts`
- Create: `src/api/services.ts`
- Create: `src/api/reviews.ts`
- Create: `src/api/slots.ts`
- Create: `src/api/bookings.ts`
- Create: `src/api/questions.ts`
- Create: `src/hooks/queryKeys.ts`
- Create: `src/hooks/useServices.ts`
- Create: `src/hooks/useService.ts`
- Create: `src/hooks/useReviews.ts`
- Create: `src/hooks/useSlots.ts`
- Create: `src/hooks/useBookings.ts`
- Create: `src/hooks/useQuestions.ts`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: Task 1 REST resources and resource types.
- Produces: `ApiError` with numeric `status`; `apiRequest<T>(path: string, init?: RequestInit): Promise<T>`; resource functions; query key factory; `useServices()`, `useService(id)`, `useReviews(serviceId)`, `useSlots(serviceId)`, `useBookings()`, `useCreateBooking()`, `useCancelBooking()`, and `useQuestions()`.

- [ ] **Step 1: Establish the pre-change compile baseline**

Run: `npx tsc -b`

Expected: PASS before introducing the new modules.

- [ ] **Step 2: Implement the typed request boundary**

Create `ApiError extends Error` with `status: number`. Create `apiRequest<T>` using `import.meta.env.VITE_API_URL ?? "http://localhost:3001"`; parse successful JSON responses and throw `ApiError` for non-2xx responses so consumers can distinguish 404 from network failure.

- [ ] **Step 3: Implement resource functions**

Provide these signatures:

- `getServices(): Promise<Service[]>`
- `getService(id: string): Promise<Service>`
- `getReviews(serviceId: string): Promise<Review[]>`
- `getSlots(serviceId: string): Promise<Slot[]>`
- `getBookings(): Promise<Booking[]>`
- `createBooking(input: NewBooking): Promise<Booking>`
- `cancelBooking(id: string): Promise<Booking>`
- `getQuestions(): Promise<Question[]>`

`NewBooking` omits server-generated `id` and accepts service ID, date, time, confirmed status, and creation timestamp.

- [ ] **Step 4: Implement query keys and hooks**

Use hierarchical array keys under `services`, `reviews`, `slots`, `bookings`, and `questions`. Detail queries use the relevant ID and have `enabled: Boolean(id)`. Booking mutation success invalidates the bookings key.

- [ ] **Step 5: Mount QueryClientProvider and Devtools**

Create one `QueryClient` outside React rendering. Wrap `RouterProvider` and render `ReactQueryDevtools` with `initialIsOpen={false}`.

- [ ] **Step 6: Verify types and a stopped-server boundary**

Run: `npx tsc -b`

Expected: PASS. With JSON Server stopped, opening the app must not throw during provider initialization; queries should enter an error state for consumers to render in later tasks.

- [ ] **Step 7: Commit checkpoint if authorized**

```powershell
git add src/api src/hooks src/main.tsx
git commit -m "feat(query): add typed API and TanStack Query provider"
```

### Task 3: Home and Favorites Service Queries

**Files:**
- Create: `src/components/ui/QueryError.tsx`
- Create: `src/components/ui/ServiceGridSkeleton.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/components/my/FavoritesTab.tsx`

**Interfaces:**
- Consumes: `useServices()` from Task 2 and existing favorite ID store.
- Produces: server-backed Home and Favorites views with pending, retryable error, empty, and success states.

- [ ] **Step 1: Record the static-data coupling**

Run: `rg -n 'data/services' src/pages/HomePage.tsx src/components/my/FavoritesTab.tsx`

Expected: both files contain a static service import.

- [ ] **Step 2: Add shared query feedback components**

`QueryError` accepts `message: string` and `onRetry: () => void` and renders a real retry button. `ServiceGridSkeleton` renders six accessible visual placeholders matching the service grid.

- [ ] **Step 3: Migrate Home to `useServices()`**

Keep the existing controlled filters and derived filtering/sorting. Render skeleton while pending, `QueryError` with `refetch` on failure, and existing content on success.

- [ ] **Step 4: Migrate Favorites to `useServices()`**

Join Zustand favorite IDs to fetched services. Apply the same pending and retryable error handling before computing the favorite list.

- [ ] **Step 5: Verify success and server-off behavior**

Run: `npx tsc -b && npm run build`

Expected: PASS. Browser with server running shows six services and favorites; with server stopped both views show retry UI and no blank screen.

- [ ] **Step 6: Commit checkpoint if authorized**

```powershell
git add src/components/ui/QueryError.tsx src/components/ui/ServiceGridSkeleton.tsx src/pages/HomePage.tsx src/components/my/FavoritesTab.tsx
git commit -m "feat(home): load services with TanStack Query"
```

### Task 4: Service Detail and Booking Creation

**Files:**
- Modify: `src/pages/ServiceDetailPage.tsx`
- Modify: `src/components/service/BookingCard.tsx`

**Interfaces:**
- Consumes: `useService`, `useReviews`, `useSlots`, `useBookings`, and `useCreateBooking` from Task 2.
- Produces: service detail backed by parallel queries and a booking card that persists confirmed bookings and disables conflicts.

- [ ] **Step 1: Record the remaining detail coupling**

Run: `rg -n 'data/(services|reviews|slots)' src/pages/ServiceDetailPage.tsx`

Expected: three static imports are reported.

- [ ] **Step 2: Migrate detail resources to query hooks**

Use the route ID for service, review, and slot hooks. Render a combined pending state, retry all failed queries from one error state, preserve the not-found view for an HTTP 404, and pass fetched records into the existing layout.

- [ ] **Step 3: Extend BookingCard's interface**

Accept `bookings: Booking[]`, `onConfirm(input: NewBooking): void`, `isConfirming: boolean`, and `confirmError: string | null` in addition to `service` and `slots`.

- [ ] **Step 4: Prevent duplicate confirmed times**

Derive occupied times from records matching service ID, selected date, and `status === "confirmed"`. Disabled time controls cannot change selection; if the selected time becomes occupied after refresh, clear it or disable confirmation.

- [ ] **Step 5: Persist booking confirmation**

Submit service ID, date, time, `status: "confirmed"`, and a new ISO `createdAt`. Disable confirmation while pending. Show the success dialog only after the mutation resolves, and keep the current selection when it rejects.

- [ ] **Step 6: Verify booking lifecycle at the API boundary**

Create one booking through the browser, then run:

```powershell
Invoke-RestMethod http://localhost:3001/bookings
```

Expected: the new confirmed record exists; its time is disabled in the browser. A cancelled record at the same date/time does not disable the time. `/services/999` renders not-found after the request completes.

- [ ] **Step 7: Verify project checks**

Run: `npx tsc -b && npm run build`

Expected: PASS.

- [ ] **Step 8: Commit checkpoint if authorized**

```powershell
git add src/pages/ServiceDetailPage.tsx src/components/service/BookingCard.tsx
git commit -m "feat(bookings): persist service bookings"
```

### Task 5: My Page Booking Queries and Cancellation

**Files:**
- Modify: `src/pages/MyPage.tsx`
- Modify: `src/components/my/BookingsTab.tsx`

**Interfaces:**
- Consumes: `useBookings`, `useCancelBooking`, and `useServices` from Task 2.
- Produces: server-backed booking history joined with service records and persistent cancellation.

- [ ] **Step 1: Record local booking state and static join coupling**

Run: `rg -n 'useState|initialBookings|data/services' src/pages/MyPage.tsx src/components/my/BookingsTab.tsx`

Expected: local booking state plus static data imports are reported.

- [ ] **Step 2: Move server state into MyPage query hooks**

Remove local booking state. Load bookings and services only for the bookings tab where practical, render pending and retryable error states, and invoke cancellation mutation by ID.

- [ ] **Step 3: Make BookingsTab a pure joined view**

Accept `bookings: Booking[]`, `services: Service[]`, `onCancel(id: string): void`, and cancellation-pending information. Disable the relevant cancel button while its mutation is pending.

- [ ] **Step 4: Verify cancellation persists**

Cancel a confirmed record through the browser, refresh, then run:

```powershell
Invoke-RestMethod http://localhost:3001/bookings/<id>
```

Expected: `status` is `cancelled` in the API and UI after refresh.

- [ ] **Step 5: Verify project checks**

Run: `npx tsc -b && npm run build`

Expected: PASS.

- [ ] **Step 6: Commit checkpoint if authorized**

```powershell
git add src/pages/MyPage.tsx src/components/my/BookingsTab.tsx
git commit -m "feat(my): load and cancel API bookings"
```

### Task 6: Longevity Questions and Recommendations

**Files:**
- Create: `src/lib/longevityContent.ts`
- Modify: `src/pages/LongevityPage.tsx`
- Modify: `src/components/longevity/QuestionStep.tsx`
- Modify: `src/components/longevity/ProgressSteps.tsx`
- Modify: `src/components/longevity/ResultPanel.tsx`
- Modify: `src/components/longevity/DoneSummary.tsx`

**Interfaces:**
- Consumes: `useQuestions`, `useServices`, `Question.recommendationServiceId`, and persisted Longevity answers.
- Produces: API-backed question sequence with safe persisted-step handling and server-directed service recommendations.

- [ ] **Step 1: Record Longevity static-data coupling**

Run: `rg -n 'data/longevity|data/services' src/pages/LongevityPage.tsx src/components/longevity`

Expected: all current static imports are reported.

- [ ] **Step 2: Separate client-only display constants**

Move `ANSWER_OPTIONS` and `DOMAIN_LABELS` into `src/lib/longevityContent.ts`. Do not retain question records or recommendation IDs in client-only content.

- [ ] **Step 3: Load questions and services in LongevityPage**

Render pending and retryable error states. Build domain order from fetched questions and compute the weakest domain with the existing pure helper.

- [ ] **Step 4: Make child components data-driven**

Pass fetched questions into `DoneSummary`; use client-only labels/options from `longevityContent.ts`; pass the resolved recommended service into `ResultPanel` instead of importing services or recommendation maps there.

- [ ] **Step 5: Guard stale persisted progress**

When `step < 0` or `step > questions.length`, reset or clamp to a valid index before selecting a question. `step === questions.length` remains the valid completed state.

- [ ] **Step 6: Verify recommendation and stale-state cases**

Complete the quiz and confirm the weakest domain links to its seeded recommendation. Temporarily set the persisted step beyond the question count in browser storage, reload, and confirm the page recovers without crashing.

- [ ] **Step 7: Verify project checks**

Run: `npx tsc -b && npm run build`

Expected: PASS.

- [ ] **Step 8: Commit checkpoint if authorized**

```powershell
git add src/lib/longevityContent.ts src/pages/LongevityPage.tsx src/components/longevity
git commit -m "feat(longevity): load questions from API"
```

### Task 7: Remove Static Server Records and Verify the Full Story

**Files:**
- Delete: `src/data/services.ts`
- Delete: `src/data/reviews.ts`
- Delete: `src/data/slots.ts`
- Delete: `src/data/bookings.ts`
- Delete: `src/data/longevity.ts`
- Modify: `PROGRESS.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: all migrated query flows from Tasks 1-6.
- Produces: a repository with no direct static server-data imports, documented two-process startup, and verified end-to-end behavior.

- [ ] **Step 1: Prove static resource files are unused**

Run: `rg -n 'src/data|/data/|\.\./data|\.\./\.\./data' src`

Expected: no server-record imports remain. If any remain, migrate them before deletion.

- [ ] **Step 2: Delete the unused static resource files**

Remove only the five listed `src/data/*.ts` files after Step 1 passes.

- [ ] **Step 3: Document startup and architecture**

README must show dependency installation, `npm run server`, `npm run dev`, default URLs, resource endpoints, and the reason the processes are separate. Update PROGRESS Phase 2 and Phase 3 entries to reflect the verified work.

- [ ] **Step 4: Run all repository checks**

Run:

```powershell
npm run lint
npx tsc -b
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 5: Run direct API mutation checks with disposable records**

Create a booking using `Invoke-RestMethod -Method Post`, confirm it appears in GET, patch it to cancelled, and confirm the status. Remove only the disposable test record afterward through JSON Server's item DELETE endpoint.

Expected: POST returns the created record, PATCH returns `status: cancelled`, and final GET for the deleted disposable ID returns 404.

- [ ] **Step 6: Run the complete browser flow**

Verify Home load, detail load, booking creation, My Page persistence, cancellation, Favorites, Longevity recommendation, unknown-service handling, and error/retry behavior with JSON Server stopped and restarted.

- [ ] **Step 7: Inspect the final diff**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors, no generated `dist` files tracked, and unrelated pre-existing changes remain untouched.

- [ ] **Step 8: Commit checkpoint if authorized**

```powershell
git add README.md PROGRESS.md src/data
git commit -m "docs: finish backend integration guide"
```
