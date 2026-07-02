import { useDeductibleExpensesQuery } from "@/src/features/reports/infrastructure/repositories/deductible-expenses.repository";

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

const formatReceiptLabel = (value: string) => {
  const count = Number.parseInt(value, 10);

  if (Number.isNaN(count)) {
    return `${value} tickets por procesar`;
  }

  return `${count} ticket${count === 1 ? "" : "s"} por procesar`;
};

export const useDeductibleExpenses = () => {
  const query = useDeductibleExpensesQuery();

  return {
    deductibleExpenses: query.data
      ? {
          totalAmount: formatCurrency(
            query.data.total_posibles_gastos_deducibles,
          ),
          receiptsLabel: formatReceiptLabel(query.data.receipts_por_procesar),
          receiptsCount: query.data.receipts_por_procesar,
        }
      : null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
