export function getVisibleBookings<T extends { status: string }>(bookings: T[]): T[] {
  return bookings.filter((booking) => booking.status === "confirmed");
}
