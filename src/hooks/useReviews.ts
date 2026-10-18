import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../api/reviews";
import { queryKeys } from "./queryKeys";

export function useReviews(serviceId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.reviews.byService(serviceId ?? ""),
    queryFn: () => {
      if (!serviceId) throw new Error("Service ID is required");
      return getReviews(serviceId);
    },
    enabled: Boolean(serviceId),
  });
}
