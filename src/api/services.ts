import type { Service } from "../types/service";
import { apiRequest, ApiError } from "./client";

export async function getServices(): Promise<Service[]> {
  return apiRequest<Service[]>("/services");
}

export async function getService(id: string): Promise<Service> {
  try {
    return await apiRequest<Service>(`/services/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) throw error;
    throw error;
  }
}
