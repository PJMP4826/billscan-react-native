import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { LineItem } from "@/src/features/receipts/application/dtos/receipt/line-item.dto";
import { formatCurrency } from "@/src/utils/currency-formatter";
import { View } from "react-native";

interface ReceiptItemRowProps {
  item: LineItem;
}

const buildUnitLabel = (sku: string | null, unitPrice: string | null) => {
  const parts: string[] = [];

  if (sku) {
    parts.push(`SKU: ${sku}`);
  }

  if (unitPrice !== null && unitPrice !== "") {
    parts.push(`Unit: ${formatCurrency(unitPrice)}`);
  }

  // `null` cuando no hay ningún dato que mostrar (evita filas vacías).
  return parts.length > 0 ? parts.join(" • ") : null;
};

/**
 * Fila de producto: cantidad en un chip gris, descripción, SKU/precio unitario
 * y el importe total alineado a la derecha.
 */
export function ReceiptItemRow({ item }: ReceiptItemRowProps) {
  const unitLabel = buildUnitLabel(item.sku, item.unitPrice);

  return (
    <HStack className="w-full flex-row items-start justify-between gap-3">
      <HStack className="min-w-0 flex-1 flex-row items-start gap-3">
        {/* Chip de cantidad */}
        <View className="mt-0.5 h-6 min-w-6 items-center justify-center rounded-md bg-slate-100 px-1.5">
          <Text className="text-xs font-semibold text-slate-600">
            {item.quantity}x
          </Text>
        </View>

        <VStack className="min-w-0 flex-1 gap-0.5">
          <Text className="text-sm font-medium text-slate-800">
            {item.description}
          </Text>

          {unitLabel ? (
            <Text className="text-xs font-normal text-slate-400">
              {unitLabel}
            </Text>
          ) : null}
        </VStack>
      </HStack>

      <Text className="shrink-0 text-sm font-semibold text-slate-900">
        {formatCurrency(item.totalPrice)}
      </Text>
    </HStack>
  );
}
