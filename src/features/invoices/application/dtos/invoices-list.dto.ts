export interface InvoiceDto {
  /** UUID del CFDI (identificador único que expone la API). */
  invoiceUuid: string;
  /** Nombre o razón social del emisor del CFDI. */
  issuerName: string;
  /** Total del CFDI como string numérico (tal cual lo entrega la API). */
  total: string;
  /** Serie del CFDI (por ejemplo "FCP"). Puede venir vacía. */
  serie: string;
  /** Folio del CFDI (por ejemplo "23586096"). Puede venir vacío. */
  folio: string;
  /** Clave y descripción del uso del CFDI (por ejemplo "G03 - Gastos en general"). */
  usage: string;
}

export interface InvoicesPageDto {
  invoices: InvoiceDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
