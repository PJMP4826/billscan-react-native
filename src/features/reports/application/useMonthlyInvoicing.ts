import { mapMonthlyInvoicingApiItemToDto } from "@/src/features/reports/infrastructure/schemas/monthly-invoicing.schema";
import { useMonthlyInvoicingQuery } from "@/src/features/reports/infrastructure/repositories/monthly-invoicing.repository";

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

export const useMonthlyInvoicing = (period: string = "month") => {
  const query = useMonthlyInvoicingQuery(period);

  return {
    monthlyInvoicing: query.data
      ? (() => {
          const dto = mapMonthlyInvoicingApiItemToDto(query.data);

          return {
            ...dto,
            totalAmount: formatCurrency(dto.totalAmount),
          };
        })()
      : null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
