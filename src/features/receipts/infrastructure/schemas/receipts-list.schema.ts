import type {
  ReceiptDto,
  ReceiptsPageDto,
} from "@/src/features/receipts/application/dtos/receipts-list.dto";
import type { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";

export interface ReceiptApiItem {
  receipt_uuid: string;
  nombre_comercio: string;
  fecha_registro: string;
  total: string;
  estado: string;
  file_url: string;
}

export interface ReceiptsListData {
  receipts: ReceiptApiItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface ReceiptsListResponse {
  status: number;
  data: ReceiptsListData;
}

export const mapReceiptApiItemToDto = (item: ReceiptApiItem): ReceiptDto => ({
  receiptUuid: item.receipt_uuid,
  merchantName: item.nombre_comercio,
  registeredAt: item.fecha_registro,
  total: item.total,
  status: item.estado as ReceiptStatus,
  fileUrl: item.file_url,
});

export const mapReceiptsListResponseToDto = (
  response: ReceiptsListResponse,
): ReceiptsPageDto => ({
  receipts: response.data.receipts.map(mapReceiptApiItemToDto),
  total: response.data.total,
  page: response.data.page,
  pageSize: response.data.page_size,
  totalPages: response.data.total_pages,
});
