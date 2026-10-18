import { getDatabase } from "../_lib/data.mjs";
import { json } from "../_lib/http.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { message: "Method not allowed" });
  const database = await getDatabase();
  return json(res, 200, database.services);
}
