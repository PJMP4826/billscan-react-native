import type { ImpuestosDto } from "@/src/features/invoices/application/dtos/invoice/impuestos.dto";

export interface ConceptosDto {
  clave_prod_serv: string;
  cantidad: number;
  clave_unidad: string;
  descripcion: string;
  valor_unitario: number;
  importe: number;
  objeto_imp: string;
  impuestos: ImpuestosDto | null;
  no_identificacion: string | null;
  unidad: string | null;
  descuento: number | null;
}
