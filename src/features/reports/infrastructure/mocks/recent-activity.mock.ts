import { receiptsListMockItems } from "@/src/features/receipts/infrastructure/mocks/receipts-list.mock";
import type { RecentActivityApiItem } from "@/src/features/reports/infrastructure/schemas/recent-activity.schema";

/** Cantidad de filas que muestra la tarjeta de actividad reciente. */
const RECENT_ACTIVITY_LIMIT = 8;

/**
 * Adapta los tickets mock (contrato de receipts) al contrato de
 * recent-activity del módulo de reports.
 */
export const recentActivityMockItems: RecentActivityApiItem[] =
  receiptsListMockItems
    .filter((item) => Boolean(item.file_url))
    .slice(0, RECENT_ACTIVITY_LIMIT)
    .map((item) => ({
      comercio: item.nombre_comercio,
      file_url: item.file_url,
      fecha_alta: item.fecha_registro,
      total: item.total,
    }));
