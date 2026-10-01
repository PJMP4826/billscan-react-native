import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { LineItem } from "@/src/features/receipts/application/dtos/receipt/line-item.dto";
import type { TaxDetail } from "@/src/features/receipts/application/dtos/receipt/tax-detail.dto";
import { ReceiptItemRow } from "@/src/features/receipts/components/detail/ReceiptItemRow";
import { ReceiptTotals } from "@/src/features/receipts/components/detail/ReceiptTotals";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface ReceiptItemsListProps {
  items: LineItem[];
  totals: {
    subtotal: string | null;
    taxes: TaxDetail[];
    total: string;
    amountPaid: string;
    change: string | null;
  };
  paymentMethodLabel?: string | null;
}

const buildItemsCountLabel = (count: number) =>
  `${count} ${count === 1 ? "partida" : "partidas"}`;

/**
 * Tarjeta blanca con el listado de productos escaneados y, separado por un
 * `Divider`, el bloque de totales.
 */
export function ReceiptItemsList({
  items,
  totals,
  paymentMethodLabel,
}: ReceiptItemsListProps) {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300/40 sm:p-5">
      <VStack className="w-full gap-4">
        {/* Encabezado */}
        <HStack className="w-full flex-row items-center justify-between gap-3">
          <HStack className="min-w-0 flex-1 flex-row items-center gap-3">
            <View className="h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF]">
              <Ionicons name="bag-handle-outline" size={18} color="#1D4ED8" />
            </View>

            <Heading
              className="min-w-0 shrink text-base font-semibold text-slate-800 sm:text-lg"
              isTruncated>
              Productos escaneados
            </Heading>
          </HStack>

          <View className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5">
            <Text className="text-xs font-medium text-slate-600">
              {buildItemsCountLabel(items.length)}
            </Text>
          </View>
        </HStack>

        {/* Listado de partidas (vacío: mensaje explícito, no espacio en blanco) */}
        {items.length > 0 ? (
          <VStack className="w-full gap-4">
            {items.map((item, index) => (
              <ReceiptItemRow
                key={`${item.description}-${item.sku ?? index}`}
                item={item}
              />
            ))}
          </VStack>
        ) : (
          <Text className="text-sm font-normal text-slate-400">
            No se detectaron productos en este ticket.
          </Text>
        )}

        <Divider className="bg-slate-200" />

        <ReceiptTotals
          subtotal={totals.subtotal}
          taxes={totals.taxes}
          total={totals.total}
          amountPaid={totals.amountPaid}
          change={totals.change}
          paymentMethodLabel={paymentMethodLabel}
        />
      </VStack>
    </Card>
  );
}
