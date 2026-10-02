import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { InvoiceListItemViewModel } from "@/src/features/invoices/application/useInvoiceList";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

interface InvoiceCardProps {
  invoice: InvoiceListItemViewModel;
  onPressDetail?: () => void;
}

/**
 * Card de CFDI basada en el diseño de referencia:
 *   - Encabezado: emisor + total (izq) y kebab (der)
 *   - Fila media: folio del CFDI (serie-folio)
 *   - Pie: uso del CFDI + acción "Ver Detalle"
 */
export function InvoiceCard({ invoice, onPressDetail }: InvoiceCardProps) {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300/40 sm:p-5">
      <VStack className="gap-3 sm:gap-4">
        {/* Encabezado: emisor + total, con menú de acciones */}
        <View className="w-full flex-row items-start justify-between gap-3">
          <View className="min-w-0 flex-1 gap-1">
            <Heading
              className="text-lg font-semibold tracking-tight text-slate-800 sm:text-[22px]"
              isTruncated>
              {invoice.issuerName}
            </Heading>

            <View className="flex-row items-end gap-1">
              <Text className="shrink text-[26px] font-bold leading-none text-slate-950 sm:text-[32px]">
                {invoice.totalLabel}
              </Text>
              <Text className="pb-0.5 text-base font-medium text-slate-400 sm:text-lg">
                MXN
              </Text>
            </View>
          </View>

          {/* Kebab: reservado para acciones futuras (descargar, compartir, etc.) */}
          <View className="h-8 w-8 shrink-0 items-center justify-center">
            <Ionicons name="ellipsis-vertical" size={18} color="#64748b" />
          </View>
        </View>

        {/* Fila media: folio del CFDI */}
        <View className="w-full flex-row items-center gap-2">
          <Ionicons name="document-text-outline" size={16} color="#64748b" />
          <Text
            className="min-w-0 flex-1 text-sm font-medium text-slate-600"
            isTruncated>
            {invoice.cfdiLabel}
          </Text>
        </View>

        {/* Pie: uso del CFDI + acción principal */}
        <View className="w-full flex-row items-center justify-between gap-3">
          <View className="min-w-0 flex-1 flex-row items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 sm:p-3">
            <Text
              className="flex-1 text-xs font-normal text-slate-500 sm:text-sm"
              isTruncated>
              Uso CFDI: {invoice.usageLabel}
            </Text>
          </View>

          <Pressable
            onPress={onPressDetail}
            className="shrink-0 flex-row items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2.5 active:bg-emerald-700">
            <Text className="text-xs font-semibold text-white">
              Ver Detalle
            </Text>
            <Ionicons name="chevron-forward" size={14} color="white" />
          </Pressable>
        </View>
      </VStack>
    </Card>
  );
}
