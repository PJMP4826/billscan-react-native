import type { MonthlyInvoicingDto } from "@/src/features/reports/application/dtos/monthly-invoicing.dto";
import type {
  GetMonthlyInvoicingParams,
  MonthlyInvoicingReadModelPort,
} from "@/src/features/reports/domain/ports/monthly-invoicing-read-model.port";
import { monthlyInvoicingMockItem } from "@/src/features/reports/infrastructure/mocks/monthly-invoicing.mock";
import {
  mapMonthlyInvoicingApiItemToDto,
  type MonthlyInvoicingResponse,
} from "@/src/features/reports/infrastructure/schemas/monthly-invoicing.schema";

const MOCK_LATENCY_MS = 300;

export class MockMonthlyInvoicingReadModel implements MonthlyInvoicingReadModelPort {
  async getMonthlyInvoicing(
    params: GetMonthlyInvoicingParams = {},
  ): Promise<MonthlyInvoicingDto> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

    const period = params.period ?? "month";

    const response: MonthlyInvoicingResponse = {
      status: 200,
      data: { ...monthlyInvoicingMockItem, periodo: period },
    };

    return mapMonthlyInvoicingApiItemToDto(response.data);
  }
}
