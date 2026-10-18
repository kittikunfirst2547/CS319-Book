import type { Question } from "../types/longevity";
import type { Review } from "../types/review";
import type { Service } from "../types/service";
import type { Slot } from "../types/slot";

const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export type Database = {
  services: Service[];
  reviews: Review[];
  slots: Slot[];
  questions: Question[];
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(`API request failed (${response.status})`, response.status);
  }

  return response.json() as Promise<T>;
}

let databaseRequest: Promise<Database> | null = null;

export function getDatabase(): Promise<Database> {
  if (!databaseRequest) {
    databaseRequest = apiRequest<Database>("/db.json").catch((error: unknown) => {
      databaseRequest = null;
      throw error;
    });
  }

  return databaseRequest;
}
