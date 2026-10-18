import assert from "node:assert/strict";
import test from "node:test";
import { getVisibleBookings } from "../src/lib/bookingVisibility.ts";

test("cancelled bookings are excluded from the booking list", () => {
  const bookings = [
    { id: "confirmed", status: "confirmed" },
    { id: "cancelled", status: "cancelled" },
  ];

  assert.deepEqual(getVisibleBookings(bookings), [bookings[0]]);
});

test("an all-cancelled list has no visible bookings", () => {
  const bookings = [{ id: "cancelled", status: "cancelled" }];

  assert.deepEqual(getVisibleBookings(bookings), []);
});
