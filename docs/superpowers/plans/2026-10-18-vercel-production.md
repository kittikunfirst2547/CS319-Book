# Vercel Production Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Wellbook fully usable on Vercel without a separately hosted JSON Server.

**Architecture:** Serve catalogue data as a same-origin static JSON API and persist booking mutations in a Zustand browser store. Keep TanStack Query for catalogue fetching and mutation lifecycle, then deploy the verified build to the existing Vercel production project.

**Tech Stack:** React 19, Vite, TypeScript, TanStack Query, Zustand, Vercel

**Spec:** `docs/superpowers/specs/2026-10-18-vercel-production-design.md`

## Global Constraints

- Production must never request `localhost`.
- Catalogue images must use verified HTTPS `images.unsplash.com` URLs.
- Bookings persist per browser and do not claim cross-device persistence.
- Existing public UI routes and Thai copy remain intact.

## Review Focus

- A direct request to `/services/:id` must render the SPA.
- A missing service ID must still produce the existing not-found UI.
- Corrupt or absent local booking storage must not crash the app.
- Cancelling a booking must persist after reload.
- Static API and image URLs must work from the production origin.

---

### Task 1: Production catalogue

**Files:**
- Create: `public/api/db.json`
- Modify: `src/api/client.ts`, `src/api/services.ts`, `src/api/reviews.ts`, `src/api/slots.ts`, `src/api/questions.ts`, `server/db.json`, `.env.example`
- Test: `tests/production-data.test.mjs`, `tests/api.contract.ts`

**Interfaces:**
- Produces: `getDatabase(): Promise<Database>` and existing typed catalogue functions.

- [ ] Write and run failing production data tests.
- [ ] Implement same-origin catalogue loading and filtering.
- [ ] Run production data tests and TypeScript build.

### Task 2: Browser-local bookings and routing

**Files:**
- Create: `src/stores/bookingsStore.ts`, `vercel.json`
- Modify: `src/api/bookings.ts`
- Test: `tests/booking-store.contract.ts`

**Interfaces:**
- Produces: persisted `useBookingsStore` plus the existing async booking API.

- [ ] Write the failing booking store contract.
- [ ] Implement create/cancel persistence and SPA routing.
- [ ] Run build, tests, and lint.

### Task 3: Deploy and verify

**Files:**
- Modify only if production evidence exposes a defect.

**Interfaces:**
- Consumes: the production-ready Vite output from Tasks 1–2.

- [ ] Build and locally verify browser → API → data → rendered UI.
- [ ] Deploy to the existing `cs-319-book` production project.
- [ ] Verify production root, nested route, static API, images, booking and cancellation flow.
