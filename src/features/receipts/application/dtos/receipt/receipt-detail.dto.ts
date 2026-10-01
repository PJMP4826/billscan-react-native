import type { BillingData } from "@/src/features/receipts/application/dtos/receipt/billing-data.dto";
import type { LineItem } from "@/src/features/receipts/application/dtos/receipt/line-item.dto";
import type { MerchantData } from "@/src/features/receipts/application/dtos/receipt/merchant-data.dto";
import type { PaymentInfo } from "@/src/features/receipts/application/dtos/receipt/payment-info.dto";
import type { TotalsAndTaxes } from "@/src/features/receipts/application/dtos/receipt/totals-and-taxes.dto";
import type { TransactionMetadata } from "@/src/features/receipts/application/dtos/receipt/transaction-metadata.dto";

export interface ReceiptDetail {
  receiptUuid: string;
  merchant: MerchantData;
  transaction: TransactionMetadata;
  items: LineItem[];
  totals: TotalsAndTaxes;
  payment: PaymentInfo;
  billing: BillingData | null;
  contextNotes: string | null;
  extraMetadata: Record<string, string> | null;
  fileUrl: string;
}
