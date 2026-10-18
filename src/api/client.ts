const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

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

export function whereEquals(field: string, value: string): string {
  const where = JSON.stringify({ [field]: { eq: value } });
  return `_where=${encodeURIComponent(where)}`;
}
