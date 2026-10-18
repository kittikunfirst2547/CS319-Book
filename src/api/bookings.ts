import type { Booking, NewBooking } from "../types/booking";
import { ApiError } from "./client";
import { apiRequest } from "./client";

export type { NewBooking } from "../types/booking";

export async function getBookings(): Promise<Booking[]> {
  return apiRequest<Booking[]>("/bookings");
}

export async function createBooking(input: NewBooking): Promise<Booking> {
  return apiRequest<Booking>("/bookings", { method: "POST", data: input });
}

export async function cancelBooking(id: string): Promise<Booking> {
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
