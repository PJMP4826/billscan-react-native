import { ENV } from "../../constants/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiError {
  status: number;
  message: string;
}

const request = async <T>(
  endpoint: string,
  method: HttpMethod = "GET",
  body?: unknown,
  headers: Record<string, string> = {},
): Promise<T> => {
  const isFormData = body instanceof FormData;

  const response = await fetch(`${ENV.API_URL}${endpoint}`, {
    method,
    headers: isFormData
      ? headers // browser set Content-Type
      : { "Content-Type": "application/json", ...headers },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error: ApiError = {
      status: response.status,
      message: await response.text(),
    };
    throw error;
  }

  return response.json() as Promise<T>;
};

export const client = {
  get: <T>(endpoint: string) => request<T>(endpoint, "GET"),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, "POST", body),

  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, "PUT", body),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, "PATCH", body),

  delete: <T>(endpoint: string) => request<T>(endpoint, "DELETE"),
};
