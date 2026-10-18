import type { Slot } from "../types/slot";
import { getDatabase } from "./client";

export async function getSlots(serviceId: string): Promise<Slot[]> {
  return (await getDatabase()).slots.filter(
    (slot) => slot.serviceId === serviceId,
  );
}
