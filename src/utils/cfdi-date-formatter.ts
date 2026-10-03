const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const pad2 = (value: string) => value.padStart(2, "0");

/**
 * Construye la etiqueta de fecha/hora de un CFDI.
 *
 *   ("2026-03-25T13:01:49") → "25 de Marzo, 2026 • 13:01 hrs"
 *   ("2026-03-25", null)    → "25 de Marzo, 2026"
 *   (null)                  → null
 */
export const formatCfdiDateLabel = (
  date: string | null | undefined,
  time?: string | null,
): string | null => {
  if (!date) {
    return null;
  }

  const [datePart = "", embeddedTime] = date.split(/[T ]/);
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) {
    // Formato inesperado: devolvemos el valor crudo antes que mentir con la fecha.
    return date;
  }

  const monthName = MONTHS_ES[Number.parseInt(month, 10) - 1] ?? month;
  const dateLabel = `${Number.parseInt(day, 10)} de ${monthName}, ${year}`;

  const rawTime = time ?? embeddedTime;
  const [hours, minutes] = (rawTime ?? "").split(":");

  if (!hours || minutes === undefined) {
    return dateLabel;
  }

  return `${dateLabel} • ${pad2(hours)}:${pad2(minutes)} hrs`;
};
