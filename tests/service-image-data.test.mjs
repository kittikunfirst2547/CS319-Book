import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const databaseUrl = new URL("../server/db.json", import.meta.url);

test("every service has a stable Unsplash image URL", async () => {
  const database = JSON.parse(await readFile(databaseUrl, "utf8"));

  assert.equal(database.services.length, 6);

  for (const service of database.services) {
    const imageUrl = new URL(service.imageUrl);
    assert.equal(imageUrl.protocol, "https:");
    assert.equal(imageUrl.hostname, "images.unsplash.com");
  }
});
