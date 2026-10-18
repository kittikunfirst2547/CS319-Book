import type { Service } from "../types/service";
import { ApiError, getDatabase } from "./client";

export async function getServices(): Promise<Service[]> {
  return (await getDatabase()).services;
}

export async function getService(id: string): Promise<Service> {
  const service = (await getDatabase()).services.find((item) => item.id === id);
  if (!service) throw new ApiError("Service not found", 404);
  return service;
}
