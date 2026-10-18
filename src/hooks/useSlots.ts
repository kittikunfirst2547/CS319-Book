import { useQuery } from "@tanstack/react-query";
import { getSlots } from "../api/slots";
import { queryKeys } from "./queryKeys";

export function useSlots(serviceId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.slots.byService(serviceId ?? ""),
    queryFn: () => {
      if (!serviceId) throw new Error("Service ID is required");
      return getSlots(serviceId);
    },
    enabled: Boolean(serviceId),
  });
}
