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
 * Construye la etiqueta de fecha/hora del encabezado del ticket.
 *
 * Acepta tanto campos separados (`transactionDate` + `transactionTime`) como
 * un único ISO 8601 (`"2024-10-24T14:32:00"`).
 *
 *   ("2024-10-24", "14:32") → "24 de Octubre, 2024 • 14:32 hrs"
 *   ("2024-10-24", null)    → "24 de Octubre, 2024"
 *   (null, ...)             → null
 */
export const formatReceiptDateLabel = (
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
