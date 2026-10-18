import assert from "node:assert/strict";
import test from "node:test";
import {
  addBooking,
  markBookingCancelled,
  sanitizeBookings,
} from "../src/stores/bookingState.ts";

const input = {
  serviceId: "2",
  date: "2026-10-20",
  time: "09:00",
  status: "confirmed",
  createdAt: "2026-10-18T12:00:00.000Z",
};

test("adding a booking assigns an id without changing previous state", () => {
  const previous = [];
  const next = addBooking(previous, input, () => "booking-1");

  assert.deepEqual(previous, []);
  assert.deepEqual(next, [{ id: "booking-1", ...input }]);
});

test("cancelling one booking preserves other bookings", () => {
  const bookings = [
    { id: "booking-1", ...input },
    { id: "booking-2", ...input, time: "13:00" },
  ];

  assert.deepEqual(markBookingCancelled(bookings, "booking-1"), [
    { id: "booking-1", ...input, status: "cancelled" },
    { id: "booking-2", ...input, time: "13:00" },
  ]);
});

test("cancelling a missing booking leaves state unchanged", () => {
  const bookings = [{ id: "booking-1", ...input }];

  assert.strictEqual(markBookingCancelled(bookings, "missing"), bookings);
});

test("invalid persisted booking containers fall back to an empty list", () => {
  assert.deepEqual(sanitizeBookings(undefined), []);
  assert.deepEqual(sanitizeBookings(null), []);
  assert.deepEqual(sanitizeBookings({}), []);
  assert.deepEqual(sanitizeBookings("not-an-array"), []);
});

test("a malformed persisted booking record rejects the whole list", () => {
  assert.deepEqual(sanitizeBookings([{ id: "booking-1" }]), []);
  assert.deepEqual(
    sanitizeBookings([{ id: "booking-1", ...input, status: "unknown" }]),
    [],
  );
});

test("valid persisted bookings survive hydration unchanged", () => {
  const bookings = [{ id: "booking-1", ...input }];

  assert.strictEqual(sanitizeBookings(bookings), bookings);
});
