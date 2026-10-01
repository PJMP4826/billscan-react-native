import type { BillingData } from "@/src/features/receipts/application/dtos/receipt/billing-data.dto";
import type { LineItem } from "@/src/features/receipts/application/dtos/receipt/line-item.dto";
import type { MerchantData } from "@/src/features/receipts/application/dtos/receipt/merchant-data.dto";
import type { PaymentInfo } from "@/src/features/receipts/application/dtos/receipt/payment-info.dto";
import type { ReceiptDetail } from "@/src/features/receipts/application/dtos/receipt/receipt-detail.dto";
import type { TaxDetail } from "@/src/features/receipts/application/dtos/receipt/tax-detail.dto";
import type { TotalsAndTaxes } from "@/src/features/receipts/application/dtos/receipt/totals-and-taxes.dto";
import type { TransactionMetadata } from "@/src/features/receipts/application/dtos/receipt/transaction-metadata.dto";
import type {
  SatPaymentMethodCode,
  SatPaymentMethodDescription,
} from "@/src/features/receipts/domain/enums/sat-payment-method-code.enum";

/* ══════════════════════════════════════════════════════════════════════════
 * Contrato crudo de la API (snake_case) para GET /receipts/:receiptUuid
 * ══════════════════════════════════════════════════════════════════════════ */

export interface ReceiptDetailMerchantApi {
  name?: string | null;
  tax_id?: string | null;
  address?: string | null;
  branch_id?: string | null;
  phone?: string | null;
}

export interface ReceiptDetailTransactionApi {
  transaction_date?: string | null;
  transaction_time?: string | null;
  ticket_number?: string | null;
  pos_id?: string | null;
  cashier?: string | null;
}

export interface ReceiptDetailLineItemApi {
  quantity?: number | null;
  description?: string | null;
  sku?: string | null;
  unit_price?: string | null;
  total_price?: string | null;
  discount?: string | null;
  item_metadata?: Record<string, string> | null;
}

export interface ReceiptDetailTaxApi {
  name?: string | null;
  rate?: string | null;
  amount?: string | null;
}

export interface ReceiptDetailTotalsApi {
  subtotal?: string | null;
  total_discount?: string | null;
  taxes?: ReceiptDetailTaxApi[] | null;
  total?: string | null;
  amount_paid?: string | null;
  change?: string | null;
}

export interface ReceiptDetailPaymentApi {
  method_code?: string | null;
  method_description?: string | null;
  card_last_four?: string | null;
  authorization_code?: string | null;
}

export interface ReceiptDetailBillingApi {
  is_billable?: boolean | null;
  has_qr_code?: boolean | null;
  billing_url?: string | null;
  billing_code?: string | null;
  barcode?: string | null;
  expiration_date?: string | null;
  billing_metadata?: Record<string, string> | null;
}

export interface ReceiptDetailApiItem {
  receipt_uuid: string;
  merchant?: ReceiptDetailMerchantApi | null;
  transaction?: ReceiptDetailTransactionApi | null;
  items?: ReceiptDetailLineItemApi[] | null;
  totals?: ReceiptDetailTotalsApi | null;
  payment?: ReceiptDetailPaymentApi | null;
  billing?: ReceiptDetailBillingApi | null;
  context_notes?: string | null;
  extra_metadata?: Record<string, string> | null;
  file_url?: string | null;
}

export interface ReceiptDetailResponse {
  status: number;
  /** La API devuelve el ticket directamente en `data` (sin envoltorio `receipt`). */
  data: ReceiptDetailApiItem;
}

/* ══════════════════════════════════════════════════════════════════════════
 * Mapeo API (snake_case, todo nullable) → DTO de dominio (camelCase)
 * ══════════════════════════════════════════════════════════════════════════ */

const mapMerchant = (
  merchant: ReceiptDetailMerchantApi | null | undefined,
): MerchantData => ({
  name: merchant?.name?.trim() || "Comercio no identificado",
  taxId: merchant?.tax_id ?? null,
  address: merchant?.address ?? null,
  branchId: merchant?.branch_id ?? null,
  phone: merchant?.phone ?? null,
});

const mapTransaction = (
  transaction: ReceiptDetailTransactionApi | null | undefined,
): TransactionMetadata => ({
  transactionDate: transaction?.transaction_date ?? null,
  transactionTime: transaction?.transaction_time ?? null,
  ticketNumber: transaction?.ticket_number ?? null,
  posId: transaction?.pos_id ?? null,
  cashier: transaction?.cashier ?? null,
});

const mapLineItem = (item: ReceiptDetailLineItemApi): LineItem => ({
  quantity: item.quantity ?? 0,
  description: item.description?.trim() || "Producto sin descripción",
  sku: item.sku ?? null,
  unitPrice: item.unit_price ?? null,
  totalPrice: item.total_price ?? "0.00",
  discount: item.discount ?? null,
  itemMetadata: item.item_metadata ?? null,
});

const mapTax = (tax: ReceiptDetailTaxApi): TaxDetail => ({
  name: tax.name?.trim() || "Impuesto",
  rate: tax.rate ?? null,
  amount: tax.amount ?? "0.00",
});

const mapTotals = (
  totals: ReceiptDetailTotalsApi | null | undefined,
): TotalsAndTaxes => ({
  subtotal: totals?.subtotal ?? null,
  totalDiscount: totals?.total_discount ?? null,
  taxes: (totals?.taxes ?? []).map(mapTax),
  total: totals?.total ?? "0.00",
  amountPaid: totals?.amount_paid ?? "0.00",
  change: totals?.change ?? null,
});

const mapPayment = (
  payment: ReceiptDetailPaymentApi | null | undefined,
): PaymentInfo => ({
  methodCode: (payment?.method_code ?? "99") as SatPaymentMethodCode,
  methodDescription: (payment?.method_description ??
    "Por definir") as SatPaymentMethodDescription,
  cardLastFour: payment?.card_last_four ?? null,
  authorizationCode: payment?.authorization_code ?? null,
});

const mapBilling = (
  billing: ReceiptDetailBillingApi | null | undefined,
): BillingData | null => {
  if (!billing) {
    return null;
  }

  return {
    isBillable: billing.is_billable ?? false,
    hasQrCode: billing.has_qr_code ?? false,
    billingUrl: billing.billing_url ?? null,
    billingCode: billing.billing_code ?? null,
    barcode: billing.barcode ?? null,
    expirationDate: billing.expiration_date ?? null,
    billingMetadata: billing.billing_metadata ?? null,
  };
};

export const mapReceiptDetailApiItemToDto = (
  item: ReceiptDetailApiItem,
): ReceiptDetail => ({
  receiptUuid: item.receipt_uuid,
  merchant: mapMerchant(item.merchant),
  transaction: mapTransaction(item.transaction),
  items: (item.items ?? []).map(mapLineItem),
  totals: mapTotals(item.totals),
  payment: mapPayment(item.payment),
  billing: mapBilling(item.billing),
  contextNotes: item.context_notes ?? null,
  extraMetadata: item.extra_metadata ?? null,
  fileUrl: item.file_url ?? "",
});

export const mapReceiptDetailResponseToDto = (
  response: ReceiptDetailResponse,
): ReceiptDetail => mapReceiptDetailApiItemToDto(response.data);
