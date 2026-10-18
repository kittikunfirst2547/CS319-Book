import assert from "node:assert/strict";
import test from "node:test";
import { getApiBaseUrl } from "../src/api/baseUrl.ts";

test("development uses the JSON Server when no API URL is configured", () => {
  assert.equal(getApiBaseUrl({ DEV: true }), "http://localhost:3001");
});

test("an explicitly configured API URL takes precedence", () => {
  assert.equal(
    getApiBaseUrl({ DEV: true, VITE_API_URL: "https://example.test/api" }),
    "https://example.test/api",
  );
});

test("production defaults to the deployed API route", () => {
  assert.equal(getApiBaseUrl({ DEV: false }), "/api");
});
