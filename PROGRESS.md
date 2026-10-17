# Wellbook Progress
Current: Phase 0 → Step 4 Git init + first commit

## Phase 0 — Setup
- [x] Vite + TS (Vite 8, React 19.2, TS 6)
- [x] Tailwind + DaisyUI theme + font
  - [x] 2a Tailwind v4.3 + DaisyUI v5.7 installed
  - [x] 2b `wellbook` theme (themes: false, custom tokens)
  - [x] 2c Prompt font (400–700, no italics), lang="th"
- [x] React Router + placeholder pages (react-router 8.4, createBrowserRouter, named exports)
- [ ] Git init + .gitignore + first commit

## Phase 1 — Frontend with static mock data
- [ ] 1.1 Layout + Navbar
- [ ] 1.2 Types + mock data
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

## Decisions
- I own the frontend (all 5 pages + login). Teammates: backend/other.
- Font: Prompt (Google Fonts).
- Env: Node 24, npm 11, Git 2.54 (Windows / PowerShell).
