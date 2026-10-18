type ApiEnvironment = {
  DEV?: boolean;
  VITE_API_URL?: string;
};

export function getApiBaseUrl(environment: ApiEnvironment): string {
  if (environment.VITE_API_URL) return environment.VITE_API_URL;
  return environment.DEV ? "http://localhost:3001" : "/api";
}
