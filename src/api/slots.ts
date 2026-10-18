import type { Slot } from "../types/slot";
import { apiRequest, whereEquals } from "./client";

export function getSlots(serviceId: string): Promise<Slot[]> {
  return apiRequest<Slot[]>(`/slots?${whereEquals("serviceId", serviceId)}`);
}
