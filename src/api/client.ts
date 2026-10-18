import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
  headers: { Accept: "application/json" },
});

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
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await api.request<T>({ url: path, ...config });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 0;
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message;
      throw new ApiError(message || "API request failed", status);
    }
    throw error;
  }
}
