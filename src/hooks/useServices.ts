import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/services";
import { queryKeys } from "./queryKeys";

export function useServices() {
  return useQuery({
    queryKey: queryKeys.services.all,
    queryFn: getServices,
  });
}
