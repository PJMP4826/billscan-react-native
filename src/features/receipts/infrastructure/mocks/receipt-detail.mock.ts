import type { ReceiptDetailApiItem } from "@/src/features/receipts/infrastructure/schemas/receipt-detail.schema";

/**
 * Detalle mock que replica el ticket de referencia (Tiendas Chedraui) para
 * poder maquetar/validar la pantalla sin backend.
 */
export const receiptDetailMockItems: Record<string, ReceiptDetailApiItem> = {
  "864cce3acf854f6fbcce3f030de15b35": {
    receipt_uuid: "864cce3acf854f6fbcce3f030de15b35",
    merchant: {
      name: "Tiendas Chedraui",
      tax_id: "TCH9506164P4",
      address: "Av. Central 402, Col. Valle, Ecatepec CDMX (Unidad 142)",
      branch_id: "142",
      phone: null,
    },
    transaction: {
      transaction_date: "2024-10-24",
      transaction_time: "14:32",
      ticket_number: "21023980297547",
      pos_id: "Caja 03",
      cashier: "Adriana Morales (ID #00000171)",
    },
    items: [
      {
        quantity: 2,
        description: "Frij Chedr Ngo 900g",
        sku: "7503029232849",
        unit_price: "19.00",
        total_price: "38.00",
        discount: null,
        item_metadata: null,
      },
      {
        quantity: 1,
        description: "Leche Entera Chedraui 1L",
        sku: "7501020556112",
        unit_price: "28.50",
        total_price: "28.50",
        discount: null,
        item_metadata: null,
      },
      {
        quantity: 1,
        description: "Detergente Liquido Multiusos 1....",
        sku: "7501234981120",
        unit_price: "66.50",
        total_price: "66.50",
        discount: null,
        item_metadata: null,
      },
    ],
    totals: {
      subtotal: "133.00",
      total_discount: null,
      taxes: [
        { name: "IVA Trasladado", rate: "16", amount: "0.90" },
        { name: "IEPS Alimentos", rate: "8", amount: "6.00" },
      ],
      total: "139.90",
      amount_paid: "150.00",
      change: "10.10",
    },
    payment: {
      method_code: "01",
      method_description: "Efectivo",
      card_last_four: null,
      authorization_code: null,
    },
    billing: {
      is_billable: true,
      has_qr_code: true,
      billing_url:
        "https://billscan.mx/factura/864cce3acf854f6fbcce3f030de15b35",
      billing_code: "864CCE3A",
      barcode: null,
      expiration_date: "2024-10-31",
      billing_metadata: null,
    },
    context_notes:
      "Tienes 7 días naturales a partir de la emisión para solicitar tu factura electrónica. Tu opinión nos ayuda a mejorar.",
    extra_metadata: null,
    file_url: "",
  },
};

/** Fallback determinista: cualquier UUID desconocido recibe un detalle válido. */
export const getReceiptDetailMockItem = (
  receiptUuid: string,
): ReceiptDetailApiItem => {
  const existing = receiptDetailMockItems[receiptUuid];

  if (existing) {
    return existing;
  }

  return {
    ...receiptDetailMockItems["864cce3acf854f6fbcce3f030de15b35"],
    receipt_uuid: receiptUuid,
  };
};
