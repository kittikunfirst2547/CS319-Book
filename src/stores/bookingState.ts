import type { Booking, NewBooking } from "../types/booking.ts";

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
