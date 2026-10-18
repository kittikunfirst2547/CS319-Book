import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const sourceUrl = new URL("../server/db.json", import.meta.url);
const targetUrl = new URL("../public/api/db.json", import.meta.url);
const database = JSON.parse(await readFile(sourceUrl, "utf8"));
const { bookings: _bookings, ...catalogue } = database;

await mkdir(dirname(fileURLToPath(targetUrl)), { recursive: true });
await writeFile(targetUrl, `${JSON.stringify(catalogue, null, 2)}\n`, "utf8");
