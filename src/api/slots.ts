import type { Slot } from "../types/slot";
import { apiRequest } from "./client";

export async function getSlots(serviceId: string): Promise<Slot[]> {
  return apiRequest<Slot[]>("/slots", { params: { "serviceId:contains": serviceId } });
}
