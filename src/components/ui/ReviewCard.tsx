import type { Review } from "../../types/review";
import { Rating } from "./Rating";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="rounded-2xl border border-base-300 bg-base-100 p-4">
      <div className="flex gap-1 text-sm text-amber-700">
        <Rating value={review.rating} />
        <span>· {review.userName}</span>
      </div>
      <p className="mt-2 text-sm text-base-content/70">{review.comment}</p>
    </article>
  );
}
