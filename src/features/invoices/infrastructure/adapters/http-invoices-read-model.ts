import type { InvoicesPageDto } from "@/src/features/invoices/application/dtos/invoices-list.dto";
import type {
  GetInvoicesParams,
  InvoicesReadModelPort,
} from "@/src/features/invoices/domain/ports/invoices-read-model.port";
import { mapInvoicesListResponseToDto } from "@/src/features/invoices/infrastructure/schemas/invoices-list.schema";
import { invoicesListApi } from "@/src/features/invoices/infrastructure/services/api/invoices-list-api";

export class HttpInvoicesReadModel implements InvoicesReadModelPort {
  async getInvoices(params: GetInvoicesParams = {}): Promise<InvoicesPageDto> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;

    const response = await invoicesListApi.get(page, pageSize);

    return mapInvoicesListResponseToDto(response);
  }
}
