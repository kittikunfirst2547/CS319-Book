import type { Review } from "../types/review";
import { apiRequest } from "./client";

export async function getReviews(serviceId: string): Promise<Review[]> {
  return apiRequest<Review[]>("/reviews", { params: { "serviceId:contains": serviceId } });
}
