import type { ReceiptsCountDto } from "@/src/features/reports/application/dtos/receipts-count.dto";

export interface ReceiptsCountReadModelPort {
  getReceiptsCount(): Promise<ReceiptsCountDto>;
}
