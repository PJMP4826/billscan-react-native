import type { TaxDetail } from "@/src/features/receipts/application/dtos/receipt/tax-detail.dto";

export interface TotalsAndTaxes {
  subtotal: string | null;
  totalDiscount: string | null;
  taxes: TaxDetail[];
  total: string;
  amountPaid: string;
  change: string | null;
}
