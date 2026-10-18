import { useQuery } from "@tanstack/react-query";
import { getService } from "../api/services";
import { queryKeys } from "./queryKeys";

export function useService(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.services.detail(id ?? ""),
    queryFn: () => {
      if (!id) throw new Error("Service ID is required");
      return getService(id);
    },
    enabled: Boolean(id),
  });
}
