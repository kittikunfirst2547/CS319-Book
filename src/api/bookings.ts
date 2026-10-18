import type { Booking, NewBooking } from "../types/booking";
import { useBookingsStore } from "../stores/bookingsStore";
import { ApiError } from "./client";

export type { NewBooking } from "../types/booking";

export async function getBookings(): Promise<Booking[]> {
  return useBookingsStore.getState().bookings;
}

export async function createBooking(input: NewBooking): Promise<Booking> {
  return useBookingsStore.getState().add(input);
}

export async function cancelBooking(id: string): Promise<Booking> {
  const booking = useBookingsStore.getState().cancel(id);
  if (!booking) throw new ApiError("Booking not found", 404);
  return booking;
}
