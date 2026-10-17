import { useState } from "react";
import { useSearchParams } from "react-router";
import type { Booking } from "../types/booking";
import { initialBookings } from "../data/bookings";
import { Chip } from "../components/ui/Chip";
import { FavoritesTab } from "../components/my/FavoritesTab";
import { BookingsTab } from "../components/my/BookingsTab";

type Tab = "bookings" | "favorites";

const TABS: { value: Tab; label: string }[] = [
  { value: "bookings", label: "การจอง" },
  { value: "favorites", label: "รายการโปรด" },
];

export function MyPage() {
  // URL state: /my?tab=favorites — anything else (or missing) → bookings
  const [searchParams, setSearchParams] = useSearchParams();
  const tab: Tab = searchParams.get("tab") === "favorites" ? "favorites" : "bookings";

  // THROWAWAY local list — lives here (not in BookingsTab) so switching tabs keeps cancellations.
  // Phase 3: replaced by useBookings() + a cancel mutation.
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  function handleCancel(id: string) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">การจองของฉัน</h1>

      <div className="flex gap-2">
        {TABS.map((t) => (
          <Chip
            key={t.value}
            selected={tab === t.value}
            onClick={() => setSearchParams({ tab: t.value })}
          >
            {t.label}
          </Chip>
        ))}
      </div>

      {tab === "favorites" ? (
        <FavoritesTab />
      ) : (
        <BookingsTab bookings={bookings} onCancel={handleCancel} />
      )}
    </div>
  );
}
