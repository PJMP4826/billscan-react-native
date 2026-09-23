export enum ReceiptStatus {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  NOT_ELIGIBLE = "NOT_ELIGIBLE",
  PROCESSING = "PROCESSING",
  FAILED = "FAILED",
}

const ReceiptStatusDescriptions: Record<ReceiptStatus, string> = {
  [ReceiptStatus.COMPLETED]: "Autofacturado",
  [ReceiptStatus.PENDING]: "Pendiente de Facturar",
  [ReceiptStatus.NOT_ELIGIBLE]: "No elegible",
  [ReceiptStatus.PROCESSING]: "En proceso",
  [ReceiptStatus.FAILED]: "Fallido",
};

export const getReceiptStatusDescription = (status: ReceiptStatus): string =>
  ReceiptStatusDescriptions[status] ?? status;
