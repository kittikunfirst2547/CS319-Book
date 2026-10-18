import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelBooking,
  createBooking,
  getBookings,
} from "../api/bookings";
import { queryKeys } from "./queryKeys";

export function useBookings() {
  return useQuery({
    queryKey: queryKeys.bookings.all,
    queryFn: getBookings,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all }),
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all }),
  });
}
