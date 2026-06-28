export const getCurrentPeriod = (): string => {
  return new Date().toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });
};