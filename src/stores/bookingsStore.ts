import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Booking, NewBooking } from "../types/booking";
import {
  addBooking,
  markBookingCancelled,
  sanitizeBookings,
} from "./bookingState";

type BookingsState = {
  bookings: Booking[];
  add: (input: NewBooking) => Booking;
  cancel: (id: string) => Booking | null;
};

function createBookingId(): string {
  return globalThis.crypto?.randomUUID?.() ??
    `booking-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set, get) => ({
      bookings: [],
      add: (input) => {
        const bookings = addBooking(get().bookings, input, createBookingId);
        const created = bookings.at(-1)!;
        set({ bookings });
        return created;
      },
      cancel: (id) => {
        const existing = get().bookings.find((booking) => booking.id === id);
        if (!existing) return null;

        const bookings = markBookingCancelled(get().bookings, id);
        set({ bookings });
        return bookings.find((booking) => booking.id === id) ?? null;
      },
    }),
    {
      name: "wellbook-bookings",
      version: 1,
      partialize: (state) => ({ bookings: state.bookings }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<BookingsState> | undefined;
        return {
          ...currentState,
          bookings: sanitizeBookings(persisted?.bookings),
        };
      },
    },
  ),
);
