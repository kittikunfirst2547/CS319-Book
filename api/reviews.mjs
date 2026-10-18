import { getDatabase } from "./_lib/data.mjs";
import { json } from "./_lib/http.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { message: "Method not allowed" });
  const serviceId = req.query.serviceId ?? req.query["serviceId:contains"] ?? req.query["serviceId:eq"];
  const reviews = (await getDatabase()).reviews.filter((item) => !serviceId || item.serviceId === serviceId);
  return json(res, 200, reviews);
}
