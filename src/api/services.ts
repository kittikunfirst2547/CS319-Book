import type { Service } from "../types/service";
import { apiRequest } from "./client";

export function getServices(): Promise<Service[]> {
  return apiRequest<Service[]>("/services");
}

export function getService(id: string): Promise<Service> {
  return apiRequest<Service>(`/services/${encodeURIComponent(id)}`);
}
