import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "server");
const dataPath = join(root, "db.json");

let database;

export async function getDatabase() {
  if (!database) {
    database = JSON.parse(await readFile(dataPath, "utf8"));
  }
  return database;
}

export function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
