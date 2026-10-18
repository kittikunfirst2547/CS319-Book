import type { Booking } from "../types/booking";
import { apiRequest } from "./client";

export type NewBooking = Omit<Booking, "id">;

export function getBookings(): Promise<Booking[]> {
  return apiRequest<Booking[]>("/bookings");
}

export function createBooking(input: NewBooking): Promise<Booking> {
  return apiRequest<Booking>("/bookings", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function cancelBooking(id: string): Promise<Booking> {
  return apiRequest<Booking>(`/bookings/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "cancelled" }),
  });
}
