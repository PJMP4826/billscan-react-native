import type { InvoiceApiItem } from "@/src/features/invoices/infrastructure/schemas/invoices-list.schema";

export const invoicesListMockItems: InvoiceApiItem[] = [
  {
    receipt_uuid: "37348a21bab649429916946b26a4d789",
    emisor_nombre: "GOOGLE CLOUD MEXICO",
    total: "138.36",
    serie: "FCP",
    folio: "23586096",
    uso_cfdi: "S01 - Sin efectos fiscales",
  },
  {
    receipt_uuid: "7de9215692654d98a94ee5264a479b50",
    emisor_nombre: "LIVERPOOL",
    total: "1500.00",
    serie: "FAC",
    folio: "10294821",
    uso_cfdi: "G01 - Adquisición de mercancías",
  },
  {
    receipt_uuid: "6de198e40c4f47a5ab83acbecaf0f917",
    emisor_nombre: "OFFICE DEPOT",
    total: "420.00",
    serie: "WMT",
    folio: "88491023",
    uso_cfdi: "G03 - Gastos en general",
  },
  {
    receipt_uuid: "864cce3acf854f6fbcce3f030de15b35",
    emisor_nombre: "WALMART",
    total: "750.00",
    serie: "CSC",
    folio: "49102839",
    uso_cfdi: "G01 - Adquisición de mercancías",
  },
  {
    receipt_uuid: "ef79ea4cb0894e96a5a93e7a73546791",
    emisor_nombre: "COSTCO",
    total: "1120.00",
    serie: "CSC",
    folio: "49102839",
    uso_cfdi: "G03 - Gastos en general",
  },
];
