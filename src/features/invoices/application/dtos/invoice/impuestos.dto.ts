import type { TrasladoDto } from "@/src/features/invoices/application/dtos/invoice/traslado.dto";

export interface ImpuestosDto {
  /** La llave tiene formato opaco `"002|Tasa|0.160000"`; usar los campos del valor. */
  traslados: Record<string, TrasladoDto>;
  total_impuestos_trasladados: number | null;
}
