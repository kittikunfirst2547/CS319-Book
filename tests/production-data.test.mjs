import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const productionDatabaseUrl = new URL("../public/api/db.json", import.meta.url);

test("the production catalogue exposes every read-only collection", async () => {
  const database = JSON.parse(await readFile(productionDatabaseUrl, "utf8"));

  assert.equal(database.services.length, 6);
  assert.equal(database.reviews.length, 4);
  assert.equal(database.slots.length, 8);
  assert.equal(database.questions.length, 5);
  assert.equal("bookings" in database, false);
});

test("production catalogue images use stable HTTPS Unsplash URLs", async () => {
  const database = JSON.parse(await readFile(productionDatabaseUrl, "utf8"));

  for (const service of database.services) {
    const imageUrl = new URL(service.imageUrl);
    assert.equal(imageUrl.protocol, "https:");
    assert.equal(imageUrl.hostname, "images.unsplash.com");
  }
});
