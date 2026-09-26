import type { ReceiptDto } from "@/src/features/receipts/application/dtos/receipts-list.dto";
import {
  getReceiptStatusDescription,
  type ReceiptStatus,
} from "@/src/features/receipts/domain/enums/receipt-status.enum";
import { useReceiptsQuery } from "@/src/features/receipts/infrastructure/repositories/receipts-list.repository";

export interface ReceiptListItemViewModel {
  receiptUuid: string;
  merchantName: string;
  status: ReceiptStatus;
  statusLabel: string;
  totalLabel: string;
  registeredAtLabel: string;
}

const formatCurrency = (value: string) => {
  const numericValue = Number.parseFloat(value);

  if (Number.isNaN(numericValue)) {
    return value;
  }

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

const formatDateLabel = (value: string) => {
  const [datePart, timePart] = value.split(" ");
  const [year, month, day] = (datePart ?? "").split("-");

  if (!year || !month || !day) {
    return value;
  }

  const hours = timePart?.split(":")[0];
  const minutes = timePart?.split(":")[1];
  const timeLabel =
    hours && minutes
      ? ` ${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
      : "";

  return `${day}/${month}/${year}${timeLabel}`;
};

const mapReceiptToViewModel = (
  receipt: ReceiptDto,
): ReceiptListItemViewModel => ({
  receiptUuid: receipt.receiptUuid,
  merchantName: receipt.merchantName,
  status: receipt.status,
  statusLabel: getReceiptStatusDescription(receipt.status),
  totalLabel: formatCurrency(receipt.total),
  registeredAtLabel: formatDateLabel(receipt.registeredAt),
});

interface UseReceiptListOptions {
  page?: number;
  pageSize?: number;
  status?: ReceiptStatus;
}

export const useReceiptList = ({
  page = 1,
  pageSize = 20,
  status,
}: UseReceiptListOptions = {}) => {
  const query = useReceiptsQuery(page, pageSize, status);

  return {
    receipts: query.data
      ? query.data.receipts.map(mapReceiptToViewModel)
      : [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? page,
    pageSize: query.data?.pageSize ?? pageSize,
    totalPages: query.data?.totalPages ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
