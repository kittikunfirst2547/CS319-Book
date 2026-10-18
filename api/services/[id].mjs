import { getDatabase } from "../_lib/data.mjs";
import { json } from "../_lib/http.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { message: "Method not allowed" });
  const service = (await getDatabase()).services.find((item) => item.id === req.query.id);
  return service ? json(res, 200, service) : json(res, 404, { message: "Service not found" });
}
