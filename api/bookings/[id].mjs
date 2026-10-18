import { getDatabase } from "../_lib/data.mjs";
import { json, readBody } from "../_lib/http.mjs";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return json(res, 405, { message: "Method not allowed" });
  const database = await getDatabase();
  const index = (database.bookings ?? []).findIndex((item) => item.id === req.query.id);
  if (index < 0) return json(res, 404, { message: "Booking not found" });
  const update = await readBody(req);
  const booking = { ...database.bookings[index], ...update };
  database.bookings[index] = booking;
  return json(res, 200, booking);
}
