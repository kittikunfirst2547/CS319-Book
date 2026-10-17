# Phase 1 Roadmap (1.3 – 1.10)

Big picture: build every page with **static mock data** (`src/data/`). No server yet.
In Phase 3, only the data source changes; components stay almost the same.

---

## 1.3 Home: ServiceCard + grid
- **Builds:** page header, `ServiceCard`, `ImagePlaceholder`, `Rating`, `formatPrice`, responsive grid (1 / 2 / 3 cols)
- **Files:** `components/ui/ServiceCard.tsx`, `components/ui/ImagePlaceholder.tsx`, `components/ui/Rating.tsx`, `lib/format.ts`
- **Ideas:**
  - props: `ServiceCard` receives one `service: Service`
  - `services.map(s => <ServiceCard key={s.id} service={s} />)`
  - `Intl.NumberFormat` → `฿1,200`
  - `CATEGORY_LABELS[service.category]` for the Thai label
  - `<Link to={`/services/${id}`}>` for "ดูรายละเอียด"
- **Trap:** `key={index}`; copy-pasting the same Tailwind classes instead of making a component
- **Sub-tasks:** 1) header → 2) card with name only + `.map()` → 3) styling + category + price → 4) ImagePlaceholder + Rating → 5) grid + link + heart

## 1.4 Home: search, chips, price filter, sort
- **Builds:** search input, category chips (ทั้งหมด + 5), price dropdown (ทุกช่วง / < ฿500 / ฿500–1,000 / > ฿1,000), sort dropdown (คะแนนสูงสุด / ราคาน้อย→มาก / ราคามาก→น้อย)
- **State:** 4 `useState`s in HomePage: `query`, `category`, `priceRange`, `sort`
- **Idea:** **derived state**: compute `filtered = services.filter(...).filter(...).toSorted(...)` during render. Don't store the filtered list in state.
- **Also:** `EmptyState` component ("ไม่พบบริการ") when the result is empty
- **Bonus:** sync filters to the URL with `useSearchParams`
- **Trap:** `useEffect` + `setFiltered` (unneeded); `.sort()` mutates the original array

## 1.5 Service detail page
- **Builds:** breadcrumb, big image, category/title/rating/description, reviews grid, sticky booking card (price, provider, day pills, time pills, confirm, favorite)
- **Ideas:**
  - `useParams()` returns a **string** → `services.find(s => s.id === id)`
  - `undefined` → friendly not-found (test `/services/999`)
  - `reviews.filter(r => r.serviceId === id)`, `slots.filter(...)`
  - `selectedDate` + `selectedTime` state; choosing a new date resets the time
  - "ยืนยันการจอง" `disabled` until both are chosen → for now show a toast/modal "จองสำเร็จ (จำลอง)"
  - `Intl.DateTimeFormat('th-TH', { weekday: 'short' })` → "พ."
  - 2-column layout on desktop, 1 column on mobile; right card `sticky`
- **Trap:** `"1" === 1` is false; reading `service.name` when `service` is `undefined`
- **Decide:** what to show when a service has no reviews / no slots

## 1.6 Favorites (Zustand + persist)
- **Builds:** `stores/favoritesStore.ts` (`ids: string[]`, `toggle(id)`), `HeartButton`, detail-page favorite button, MyPage favorites tab
- **Ideas:**
  - favorites = **client state** → store **only ids**
  - derive cards: `services.filter(s => ids.includes(s.id))`
  - `persist` middleware → localStorage (survives refresh)
  - selectors: `useFavorites(s => s.ids)` to avoid extra re-renders
  - `aria-pressed` on the heart toggle
- **Trap:** storing whole `Service` objects in Zustand (copying server data)

## 1.7 MyPage: tabs + bookings tab
- **Builds:** title "การจองของฉัน", pill tabs การจอง / รายการโปรด, bookings list with "ยกเลิกการจอง"
- **Ideas:** tab in the URL via `useSearchParams` (`?tab=favorites`) so the navbar "รายการโปรด" link opens the tab directly
- **Note:** bookings list is local for now; this is **intentional throwaway** (moves to the server in Phase 3)
- **Trap:** tab in `useState` → the navbar link can't open a specific tab

## 1.8 Longevity Check
- **Builds:** 5-step questionnaire (นอน / ออกกำลังกาย / อาหาร / ความเครียด / สังคม), 4 options each, progress bar, ย้อนกลับ / ข้อถัดไป, live result panel, "จองต่อ", "ทำใหม่"
- **Files:** `data/questions.ts`, `lib/longevity.ts` (pure scoring function), `stores/longevityStore.ts` (persist)
- **Ideas:**
  - **data-driven UI**: one component renders `questions[step]`, not 5 hard-coded blocks
  - lowest-scoring domain → recommended service
    (ความเครียด → โยคะ, ออกกำลังกาย → ฟิตเนส, อาหาร → โภชนาการ, การนอน → สปา, สังคม → คลาสฟิตเนสกลุ่ม)
  - decide a tie-break rule
  - next disabled until answered; back keeps answers
- **Trap:** next allowed without an answer; scoring logic written inside JSX

## 1.9 About page
- **Builds:** description, 3 members (number avatar, name, role), tech chips, info banner "ระบบนี้เป็นระบบจำลองเพื่อการศึกษา ไม่มีการจองจริง"
- **Ideas:** render from arrays; reuse chip styles. Quick win; do it mostly alone.
- Members: นายกิตติคุณ อาแว, นายธนโชติ ธนาวิวัฒน์สกุล, นายชนุดม ศรีสุข

## 1.10 Login (mock) + protected routes
- **Builds:** `stores/authStore.ts` (`user | null`, `login`, `logout`, persist), `LoginPage`, `components/layout/ProtectedRoute.tsx`, navbar user name + logout
- **Ideas:**
  - not logged in → `<Navigate to="/login" state={{ from: location }} />`
  - after login → go back to `from`
  - booking + MyPage require login; browsing doesn't
- **Why mock only:** real apps hash passwords on the server and use tokens / httpOnly cookies. Never store passwords in the browser.
- **Checkpoint:** logged out → click "ยืนยันการจอง" → login → back on the same service page

---

**End of Phase 1:** full code walkthrough, `quiz`, list refactors before Phase 2.
