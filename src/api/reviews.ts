import type { Review } from "../types/review";
import { apiRequest, whereEquals } from "./client";

export function getReviews(serviceId: string): Promise<Review[]> {
  return apiRequest<Review[]>(`/reviews?${whereEquals("serviceId", serviceId)}`);
}
