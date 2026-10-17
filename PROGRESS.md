# Wellbook Progress
Current: Phase 1 → 1.3 Home — ServiceCard + grid

## Phase 0 — Setup
- [x] Vite + TS (Vite 8, React 19.2, TS 6)
- [x] Tailwind + DaisyUI theme + font
  - [x] 2a Tailwind v4.3 + DaisyUI v5.7 installed
  - [x] 2b `wellbook` theme (themes: false, custom tokens)
  - [x] 2c Prompt font (400–700, no italics), lang="th"
- [x] React Router + placeholder pages (react-router 8.4, createBrowserRouter, named exports)
- [x] Git init + .gitignore + first commit (cdcf5bb, branch main)
- ✅ Phase 0 checkpoint passed 2026-10-17

## Phase 1 — Frontend with static mock data
- [x] 1.1 Layout + Navbar (NavLink + end, layout route + Outlet, 404 inside layout)
- [x] 1.2 Types + mock data (Service/Review/Slot types, CATEGORY_LABELS, services/reviews/slots mock) ✅ 2026-10-17
- [ ] 1.3 Home — ServiceCard + grid
- [ ] 1.4 Home — search, chips, price filter, sort
- [ ] 1.5 Service detail page
- [ ] 1.6 Favorites (Zustand + persist)
- [ ] 1.7 MyPage — tabs + bookings tab
- [ ] 1.8 Longevity Check
- [ ] 1.9 About page
- [ ] 1.10 Login (mock) + protected routes

## Phase 2 — Backend (JSON Server)
- [ ] JSON Server installed + script
- [ ] db.json resources designed
- [ ] Endpoints explored by hand
- [ ] VITE_API_URL in .env

## Phase 3 — Connect frontend ↔ backend
- [ ] (steps 1–10, see CLAUDE.md)

## Phase 4 — Polish & ship
- [ ] Responsive / a11y / lint / build / README

## Notes / things I struggled with
- 2026-10-17: first session — repo has only CLAUDE.md + docs/mockups/, no git yet.
- 2026-10-17: forgot to save index.css; set `--color-error-content` = same as `--color-error` (invisible text) → `-content` = text ON that color.
- 2026-10-17: `@plugin "daisyui";` alone also loads built-in dark theme → use `{ themes: false; }`.
- 2026-10-17: stuck starting a component from an empty file (needed all 4 hint levels) → function + return JSX + export.
- 2026-10-17: unsaved files again → turn on VS Code Auto Save.
- 2026-10-17: wrote `router.RouterProvider` (thought it lived on my router object) → library components are imported from the package. Also mixed quotes `'..."` and unclosed JSX tag `<X >` → `<X />`.

- 2026-10-17: used `!show Navbar` (1.1) — had used `<a href>` (full reload) → `NavLink` + `className={({ isActive }) => ...}` + `end` on "/". Revisit: why `end`? why `Link` vs `NavLink`?
- 2026-10-17: Q1 quiz wrong (thought removing `end` redirects → actually "/" link is active on every page). Q2 half (Link = real `<a href>`: new tab, a11y).
- 2026-10-17: used `!show` for Layout + layout route (1.1) → `<Outlet />`, pathless parent route, `children`, `index: true`. Revisit: what renders where `<Outlet />` is?

- 2026-10-17: used `!show` for `src/data/services.ts` (1.2) — asked before writing types. Revisit: why `: Service[]` annotation matters, why price is a number not "฿1,200".
- 2026-10-17: used `!show` for `types/service.ts` + `lib/categories.ts` (1.2) — 3rd show in a row. Revisit: literal union vs string, `Record<K,V>` forces all keys, why labels in lib/ not types/. Next step: attempt first before !show.
- 2026-10-17: used `!show` for `Review` + `Slot` types (1.2) — 4th show this step; had the right ideas ("reference", "date") but didn't write code. Revisit: foreign key `serviceId`, ISO date string, nested vs normalized. Rule for 1.3: write a first draft before any !show.
- 2026-10-17: used `!show` for `data/reviews.ts` + `data/slots.ts` (1.2) — 5th show this step, no draft attempted. Pattern: idea → !show → type. Asked which support helps (smaller tasks / draft-first / other). Still owes 2 check questions (string vs number filter, DD/MM/YYYY sorting).
- 2026-10-17: `npx tsc --noEmit` checks nothing here (root tsconfig `files: []` + references) → use `npx tsc -b`.
- 2026-10-17: chose category key + label map (B) after seeing encoded Thai URL + "change label in one place" argument.

## Decisions
- I own the frontend (all 5 pages + login). Teammates: backend/other.
- Font: Prompt (Google Fonts).
- Categories: English keys (`checkup|fitness|yoga|nutrition|spa`) + `CATEGORY_LABELS` in `src/lib/categories.ts`.
- Ids are strings everywhere. Dates stored as ISO `YYYY-MM-DD`.
- Mock slots use the mockup's past dates (2026-10-14..16) to match the UI; handle past dates when bookings go real (Phase 3).
- One type file per resource in `src/types/` (service, review, slot).
- Env: Node 24, npm 11, Git 2.54 (Windows / PowerShell).
