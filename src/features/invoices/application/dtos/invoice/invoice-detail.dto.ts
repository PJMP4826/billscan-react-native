import type { CfdiDto } from "@/src/features/invoices/application/dtos/invoice/cfdi.dto";

/**
 * Envoltorio de `GET /cfdis/{receipt_uuid}`.
 *
 * `cfdi` conserva los nombres `snake_case` del contrato porque reproducen los
 * atributos del XML del SAT; el envoltorio sigue la convención camelCase del
 * feature, igual que `ReceiptDetail` / `InvoiceDto`.
 */
export interface InvoiceDetailDto {
  receiptUuid: string;
  cfdi: CfdiDto;
  /** URL prefirmada con expiración. No se consume en esta pantalla. */
  xmlUrl: string;
  /** URL prefirmada con expiración. No se consume en esta pantalla. */
  pdfUrl: string;
}
