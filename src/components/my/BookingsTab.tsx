import { Link } from "react-router";
import type { Booking } from "../../types/booking";
import { services } from "../../data/services";
import { formatThaiDate } from "../../lib/format";
import { EmptyState } from "../ui/EmptyState";

type BookingsTabProps = {
  bookings: Booking[];
  onCancel: (id: string) => void;
};

export function BookingsTab({ bookings, onCancel }: BookingsTabProps) {
  if (bookings.length === 0) {
    return (
      <EmptyState
        title="ยังไม่มีการจอง"
        description="เลือกบริการจากหน้าหลักแล้วจองเวลาที่สะดวก"
      />
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((booking) => {
        // Join: booking.serviceId → service (like a foreign key)
        const service = services.find((s) => s.id === booking.serviceId);
        const isCancelled = booking.status === "cancelled";

        return (
          <li
            key={booking.id}
            className="flex flex-col gap-3 rounded-2xl bg-base-100 p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="flex-1">
              {service ? (
                <Link
                  to={`/services/${service.id}`}
                  className="font-semibold hover:text-primary"
                >
                  {service.name}
                </Link>
              ) : (
                <p className="font-semibold">บริการไม่พบในระบบ</p>
              )}
              <p className="text-sm text-base-content/60">
                {formatThaiDate(booking.date)} · {booking.time} น.
              </p>
            </div>

            <span className={`badge ${isCancelled ? "badge-ghost" : "badge-success"}`}>
              {isCancelled ? "ยกเลิกแล้ว" : "ยืนยันแล้ว"}
            </span>

            {!isCancelled && (
              <button
                type="button"
                onClick={() => onCancel(booking.id)}
                className="btn btn-outline btn-error btn-sm rounded-xl"
              >
                ยกเลิกการจอง
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
