import type { Booking, NewBooking } from "../types/booking.ts";

function isBooking(value: unknown): value is Booking {
  if (!value || typeof value !== "object") return false;

  const booking = value as Record<string, unknown>;
  return (
    typeof booking.id === "string" &&
    typeof booking.serviceId === "string" &&
    typeof booking.date === "string" &&
    typeof booking.time === "string" &&
    (booking.status === "confirmed" || booking.status === "cancelled") &&
    typeof booking.createdAt === "string"
  );
}

export function sanitizeBookings(value: unknown): Booking[] {
  if (!Array.isArray(value) || !value.every(isBooking)) return [];
  return value;
}

export function addBooking(
  bookings: Booking[],
  input: NewBooking,
  createId: () => string,
): Booking[] {
  return [...bookings, { id: createId(), ...input }];
}

export function markBookingCancelled(
  bookings: Booking[],
  id: string,
): Booking[] {
  if (!bookings.some((booking) => booking.id === id)) return bookings;

  return bookings.map((booking) =>
    booking.id === id ? { ...booking, status: "cancelled" } : booking,
  );
}
