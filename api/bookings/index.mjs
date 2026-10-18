import { createId, getDatabase } from "../_lib/data.mjs";
import { json, readBody } from "../_lib/http.mjs";

export default async function handler(req, res) {
  const database = await getDatabase();
  if (req.method === "GET") return json(res, 200, database.bookings ?? []);
  if (req.method !== "POST") return json(res, 405, { message: "Method not allowed" });
  const input = await readBody(req);
  const booking = { ...input, id: createId(), status: "confirmed", createdAt: new Date().toISOString() };
  database.bookings = [...(database.bookings ?? []), booking];
  return json(res, 201, booking);
}
