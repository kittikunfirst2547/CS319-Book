import assert from "node:assert/strict";
import test from "node:test";
import { shouldUseLocalBookingStore } from "../src/api/bookingStorageMode.ts";

test("production stores demo bookings in the browser", () => {
  assert.equal(shouldUseLocalBookingStore({ PROD: true }), true);
});

test("development keeps using the JSON Server booking API", () => {
  assert.equal(shouldUseLocalBookingStore({ PROD: false }), false);
});
