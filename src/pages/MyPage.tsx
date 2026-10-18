import { useSearchParams } from "react-router";
import { Chip } from "../components/ui/Chip";
import { FavoritesTab } from "../components/my/FavoritesTab";
import { BookingsTab } from "../components/my/BookingsTab";
import { QueryError } from "../components/ui/QueryError";
import { ServiceGridSkeleton } from "../components/ui/ServiceGridSkeleton";
import { useBookings, useCancelBooking } from "../hooks/useBookings";
import { useServices } from "../hooks/useServices";

type Tab = "bookings" | "favorites";

const TABS: { value: Tab; label: string }[] = [
  { value: "bookings", label: "การจอง" },
  { value: "favorites", label: "รายการโปรด" },
];

export function MyPage() {
  // URL state: /my?tab=favorites — anything else (or missing) → bookings
  const [searchParams, setSearchParams] = useSearchParams();
  const tab: Tab = searchParams.get("tab") === "favorites" ? "favorites" : "bookings";

  const bookingsQuery = useBookings();
  const servicesQuery = useServices();
  const cancelBooking = useCancelBooking();

  const bookingsContent = (() => {
    if (bookingsQuery.isPending || servicesQuery.isPending) {
      return <ServiceGridSkeleton />;
    }

    if (bookingsQuery.isError || servicesQuery.isError) {
      return (
        <QueryError
          message="ไม่สามารถโหลดข้อมูลการจองได้"
          onRetry={() => {
            void Promise.all([bookingsQuery.refetch(), servicesQuery.refetch()]);
          }}
        />
      );
    }

    return (
      <>
        {cancelBooking.isError && (
          <p role="alert" className="mb-4 text-sm text-error">
            ยกเลิกการจองไม่สำเร็จ กรุณาลองอีกครั้ง
          </p>
        )}
        <BookingsTab
          bookings={bookingsQuery.data}
          services={servicesQuery.data}
          onCancel={(id) => cancelBooking.mutate(id)}
          cancellingId={cancelBooking.isPending ? cancelBooking.variables : null}
        />
      </>
    );
  })();

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
        bookingsContent
      )}
    </div>
  );
}
