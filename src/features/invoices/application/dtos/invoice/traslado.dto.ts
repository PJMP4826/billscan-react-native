export interface TrasladoDto {
  base: number;
  impuesto: string;
  tipo_factor: string;
  // null cuando TipoFactor === "Exento" (CFDI 4.0 omite ambos atributos)
  tasa_o_cuota: number | null;
  importe: number | null;
}
