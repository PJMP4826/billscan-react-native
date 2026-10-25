import type { MonthlyInvoicingDto } from "@/src/features/reports/application/dtos/monthly-invoicing.dto";
import type {
  GetMonthlyInvoicingParams,
  MonthlyInvoicingReadModelPort,
} from "@/src/features/reports/domain/ports/monthly-invoicing-read-model.port";
import { mapMonthlyInvoicingApiItemToDto } from "@/src/features/reports/infrastructure/schemas/monthly-invoicing.schema";
import { monthlyInvoicing } from "@/src/features/reports/infrastructure/services/api/reports-api";

export class HttpMonthlyInvoicingReadModel implements MonthlyInvoicingReadModelPort {
  async getMonthlyInvoicing(
    params: GetMonthlyInvoicingParams = {},
  ): Promise<MonthlyInvoicingDto> {
    const period = params.period ?? "month";

    const response = await monthlyInvoicing.get(period);

    return mapMonthlyInvoicingApiItemToDto(response.data);
  }
}
