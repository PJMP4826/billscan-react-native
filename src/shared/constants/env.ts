export const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL!,
  USE_MOCKS: process.env.EXPO_PUBLIC_USE_MOCKS === "true",
} as const