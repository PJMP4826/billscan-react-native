const DEFAULT_LOCALE = "es-MX";
const DEFAULT_CURRENCY = "MXN";

/**
 * Formatea un monto (string numérico de la API o number) como moneda.
 *
 * - `null` / `undefined` / `""`  → `"N/A"` (evita imprimir `$NaN` en la UI).
 * - strings no numéricos         → se devuelven tal cual (mejor dato crudo que nada).
 */
export const formatCurrency = (
  value: string | number | null | undefined,
  currency: string = DEFAULT_CURRENCY,
): string => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const numericValue =
    typeof value === "number" ? value : Number.parseFloat(value);

  if (Number.isNaN(numericValue)) {
    return String(value);
  }

  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

/** Moneda por defecto de la app (se muestra como sufijo junto al total). */
export const DEFAULT_CURRENCY_CODE = DEFAULT_CURRENCY;
