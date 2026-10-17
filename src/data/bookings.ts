import type { Booking } from "../types/booking";

// THROWAWAY: bookings are server state → moves to JSON Server + TanStack Query in Phase 3
export const initialBookings: Booking[] = [
  {
    id: "1",
    userId: "1",
    serviceId: "1",
    date: "2026-10-15",
    time: "10:30",
    status: "confirmed",
    createdAt: "2026-10-10T09:00:00Z",
  },
  {
    id: "2",
    userId: "1",
    serviceId: "2",
    date: "2026-10-16",
    time: "09:00",
    status: "confirmed",
    createdAt: "2026-10-11T14:20:00Z",
  },
];
