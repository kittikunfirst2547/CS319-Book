# SDD ledger — plan: docs/superpowers/plans/2026-10-18-json-server-tanstack-query.md

Setup ruling: work in the existing `feat/home-filters` checkout because the approved app state includes uncommitted user changes that a new worktree would omit. Cost if wrong: feature changes are not isolated from the user's current working tree, so every edit must be narrowly scoped and reviewed.

Setup ruling: bundled SDD shell scripts require `/bin/bash`, which is unavailable on this Windows host. Maintain the same plan-scoped workspace and ledger manually. Cost if wrong: automated brief/completion bookkeeping is unavailable, so command evidence must be recorded explicitly.

Pre-flight Task 1 -> Task 2: REST resources and updated `Booking`/`Question` types match the API functions and hooks consumed by Task 2.
Pre-flight Task 2 -> Tasks 3-6: hook names and resource return types match every listed page/component consumer.
Pre-flight Tasks 3-6 -> Task 7: every static-data import is explicitly migrated before the deletion gate.

Task 1 ruling: dependencies were already installed by the user before execution; verify installed versions and do not install them again. Cost if wrong: package metadata could be incomplete, caught by `npm ls` and build verification.

Task 1 ruling: update the temporary typed records in `src/data/bookings.ts` and `src/data/longevity.ts` alongside their types so every checkpoint remains compilable until Task 7 deletes them. Cost if wrong: two temporary files receive transitional fields that will be removed after migration.

Task 1 ruling: JSON Server 1.0.0-beta.15 parses a plain `?serviceId=1` as a number and does not match the project's string foreign keys; use URL-encoded `_where={"serviceId":{"eq":"1"}}` in API resource functions. Cost if wrong: query URLs are more verbose and tied to JSON Server v1 filtering syntax.

Task 1: complete (no commit by user instruction; tests: five API resource probes -> 6/2/3/2/5 records, `npm ls` -> three dependencies installed, `npx tsc -b` -> exit 0).

Task 2 ruling: because the approved scope forbids a new test framework, use a persistent TypeScript API contract test plus live REST probes instead of a unit-test runner. Cost if wrong: network error branches rely on browser integration verification rather than isolated runtime unit tests.

Task 2: complete (no commit by user instruction; tests: API contract RED missing modules -> GREEN exit 0, `npx tsc -b`, `npm run lint`, and `npm run build` -> exit 0).

Task 3: complete (no commit by user instruction; tests: static import scan -> no matches, `npx tsc -b` and `npm run build` -> exit 0).

Task 4 ruling: `BookingCard.onConfirm` returns `Promise<void>` instead of `void` so the success dialog opens only after the POST resolves and rejected mutations preserve the selection. Cost if wrong: callers must provide an async callback rather than a fire-and-forget function.

Task 4: implementation complete pending browser lifecycle verification; compile and build exit 0.

Task 5: implementation complete pending browser cancellation verification; static-state scan has no matches, compile and build exit 0.

Task 6: implementation complete pending browser recommendation/stale-step verification; static-data scan has no matches, compile and build exit 0.

Task 4 bug RED: browser POST persisted bookings but Vite reloaded after JSON Server rewrote `server/db.json`, resetting selection before the success dialog could remain visible.

Task 4 fix: ignore `server/db.json` in Vite's dev-server watcher. Cost if wrong: manual edits to the seed database do not auto-refresh the frontend; query refetch or page refresh is required.

Final review fix: only clamp persisted Longevity progress after a successful questions response, so a temporary server failure cannot erase the saved step. Successful empty question/service collections now show explicit empty states, and a missing recommendation mapping has its own message.

User-requested cleanup: removed the remaining sign-in control from the Navbar and removed obsolete sign-in references from project documentation. Repository scan, browser DOM checks, lint, TypeScript, API contract compilation, and production build all pass.
