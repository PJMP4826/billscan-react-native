import { getClerkInstance } from "@clerk/expo";

export const getAuthToken = async (): Promise<string | null> => {
  const token = await getClerkInstance().session?.getToken();
  return token ?? null;
};

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const token = await getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
