import type { Review } from "../types/review";
import { getDatabase } from "./client";

export async function getReviews(serviceId: string): Promise<Review[]> {
  return (await getDatabase()).reviews.filter(
    (review) => review.serviceId === serviceId,
  );
}
