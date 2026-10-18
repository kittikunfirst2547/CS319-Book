import type { Booking, NewBooking } from "../types/booking";
import { ApiError } from "./client";
import { apiRequest } from "./client";
import { shouldUseLocalBookingStore } from "./bookingStorageMode";
import { useBookingsStore } from "../stores/bookingsStore";

export type { NewBooking } from "../types/booking";

const usesLocalBookingStore = shouldUseLocalBookingStore(import.meta.env);

export async function getBookings(): Promise<Booking[]> {
  if (usesLocalBookingStore) return useBookingsStore.getState().bookings;
  return apiRequest<Booking[]>("/bookings");
}

export async function createBooking(input: NewBooking): Promise<Booking> {
  if (usesLocalBookingStore) return useBookingsStore.getState().add(input);
  return apiRequest<Booking>("/bookings", { method: "POST", data: input });
}

export async function cancelBooking(id: string): Promise<Booking> {
  if (usesLocalBookingStore) {
    const booking = useBookingsStore.getState().cancel(id);
    if (booking) return booking;
    throw new ApiError("Booking not found", 404);
  }

  try {
    return await apiRequest<Booking>(`/bookings/${id}`, {
      method: "PATCH",
      data: { status: "cancelled" },
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) throw error;
    throw error;
  }
}
