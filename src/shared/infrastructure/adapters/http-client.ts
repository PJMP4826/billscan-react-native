import { Platform } from "react-native";
import { ENV } from "../../constants/env";
import { getAuthHeaders } from "@/src/shared/infrastructure/adapters/auth/token";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiError {
  status: number;
  title?: string;
  message: string;
}

const parseErrorText = (text: string, status: number): ApiError => {
  try {
    const parsed = JSON.parse(text) as Record<string, unknown>;

    if (parsed && typeof parsed === "object") {
      return {
        status: typeof parsed.status === "number" ? parsed.status : status,
        title: typeof parsed.title === "string" ? parsed.title : undefined,
        message: typeof parsed.message === "string" ? parsed.message : text,
      };
    }
  } catch {
    // El body no era JSON; se conserva el texto original.
  }

  return { status, message: text };
};

const parseErrorResponse = async (response: Response): Promise<ApiError> => {
  const text = await response.text();
  return parseErrorText(text, response.status);
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Ocurrió un error inesperado.",
): string => {
  if (typeof error === "string" && error.trim()) return error;

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }

  return fallback;
};

/**
 * Envía multipart/form-data.
 *
 * En nativo no se puede usar `fetch`: Expo SDK 57 reemplaza el fetch global por
 * `expo/fetch`, que no soporta las partes de archivo del FormData de React
 * Native (`{ uri, type, name }`). `XMLHttpRequest` sí las procesa de forma
 * nativa. En web se conserva `fetch` porque el FormData usa `Blob`.
 */
const postMultipart = async <T>(
  endpoint: string,
  formData: FormData,
): Promise<T> => {
  const url = `${ENV.API_URL}${endpoint}/api`;
  const authHeaders = await getAuthHeaders();

  if (Platform.OS === "web") {
    const response = await fetch(url, {
      method: "POST",
      headers: authHeaders, // sin Content-Type: el navegador pone el boundary
      body: formData,
    });
    if (!response.ok) throw await parseErrorResponse(response);
    return response.json() as Promise<T>;
  }

  return new Promise<T>((resolve, reject) => {
    console.log("Haciendo POST multipart a: ", url);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    for (const [key, value] of Object.entries(authHeaders)) {
      xhr.setRequestHeader(key, value); // después de open(), antes de send()
    }

    xhr.onload = () => {
      console.log("Response multipart: ", xhr.status, xhr.responseText);

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText) as T);
        } catch {
          resolve(xhr.responseText as unknown as T);
        }
        return;
      }

      reject(parseErrorText(xhr.responseText, xhr.status));
    };

    xhr.onerror = () => {
      console.log("Error de red en POST multipart a: ", url);
      reject({
        status: 0,
        message: "No fue posible conectar con el servidor.",
      } satisfies ApiError);
    };

    xhr.send(formData);
  });
};

const request = async <T>(
  endpoint: string,
  method: HttpMethod = "GET",
  body?: unknown,
  headers: Record<string, string> = {},
): Promise<T> => {
  if (body instanceof FormData) {
    return postMultipart<T>(endpoint, body);
  }

  const authHeaders = await getAuthHeaders();

  console.log("Haciendo fetching to: ", `${ENV.API_URL}${endpoint}`);
  console.log("con method: ", method);
  console.log("mandado el body: ", body);
  console.log("y los headers: ", headers);

  const response = await fetch(`${ENV.API_URL}${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers, ...authHeaders },
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log("Response de API: ", JSON.stringify(response));

  if (!response.ok) throw await parseErrorResponse(response);
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
