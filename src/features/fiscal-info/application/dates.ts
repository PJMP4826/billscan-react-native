const pad = (value: number) => String(value).padStart(2, "0");

/** Construye una fecha en formato `YYYY-MM-DD` (el que usa la API). */
export const toIsoDate = (year: number, month: number, day: number): string =>
  `${year}-${pad(month)}-${pad(day)}`;

/** Fecha de hoy en formato `YYYY-MM-DD`. */
export const todayIsoDate = (): string => {
  const now = new Date();
  return toIsoDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
};

/** Normaliza `fecha_alta` de la API (puede venir con hora) a `YYYY-MM-DD`. */
export const normalizeIsoDate = (value?: string | null): string => {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? "");
  return match ? `${match[1]}-${match[2]}-${match[3]}` : "";
};

/** `YYYY-MM-DD` → `DD/MM/YYYY` para mostrar en la UI. */
export const formatIsoDate = (value?: string | null): string => {
  const iso = normalizeIsoDate(value);
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
};

/**
 * El backend tipa `fecha_alta_sat` como `datetime`; se envía a medianoche
 * local para que no se desplace el día por la zona horaria.
 */
export const toSatDateTime = (value: string): string =>
  `${normalizeIsoDate(value) || value}T00:00:00`;
