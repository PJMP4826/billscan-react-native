import { useReceiptDetailQuery } from "@/src/features/receipts/infrastructure/repositories/receipt-detail.repository";
import {
  DEFAULT_CURRENCY_CODE,
  formatCurrency,
} from "@/src/utils/currency-formatter";
import { formatReceiptDateLabel } from "@/src/utils/receipt-date-formatter";

export const useReceiptDetail = (receiptUuid: string) => {
  const query = useReceiptDetailQuery(receiptUuid);
  const detail = query.data;

  return {
    detail,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,

    /** Campos ya formateados que consumen los sub-componentes. */
    hero: detail
      ? {
          merchantName: detail.merchant.name,
          totalLabel: formatCurrency(detail.totals.total),
          currencyCode: DEFAULT_CURRENCY_CODE,
          dateLabel: formatReceiptDateLabel(
            detail.transaction.transactionDate,
            detail.transaction.transactionTime,
          ),
          isBillable: detail.billing?.isBillable ?? false,
          hasBillingData: detail.billing !== null,
        }
      : null,

    /** Etiqueta completa del método de pago: "Efectivo (01 - SAT Efectivo)". */
    paymentLabel: detail
      ? `${detail.payment.methodDescription} (${detail.payment.methodCode} - SAT ${detail.payment.methodDescription})`
      : null,
  };
};
