import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import type { InvoiceTotalsViewModel } from "@/src/features/invoices/application/useInvoiceDetail";
import { View } from "react-native";

interface InvoiceTotalsProps {
  totals: InvoiceTotalsViewModel;
}

interface TotalRowProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

function TotalRow({ label, value, emphasis = false }: TotalRowProps) {
  return (
    <HStack className="w-full flex-row items-center justify-between gap-4">
      <Text
        className={`text-sm ${
          emphasis
            ? "font-semibold text-slate-800"
            : "font-normal text-slate-500"
        }`}>
        {label}
      </Text>
      <Text
        className={`text-sm ${
          emphasis
            ? "font-semibold text-slate-900"
            : "font-medium text-slate-800"
        }`}>
        {value}
      </Text>
    </HStack>
  );
}

/**
 * Bloque de totales del CFDI: subtotal, impuestos trasladados (opcional) y el
 * total facturado destacado con el sufijo de moneda.
 */
export function InvoiceTotals({ totals }: InvoiceTotalsProps) {
  return (
    <View className="w-full gap-2">
      <TotalRow label="Subtotal" value={totals.subtotalLabel} />

      {totals.impuestosTrasladadosLabel ? (
        <TotalRow
          label="Impuestos trasladados"
          value={totals.impuestosTrasladadosLabel}
        />
      ) : null}

      {/* Total destacado */}
      <HStack className="mt-1 w-full flex-row items-end justify-between gap-3">
        <Text className="text-base font-semibold text-slate-800">
          Total Facturado
        </Text>
        <HStack className="flex-row items-end gap-1">
          <Text className="text-[26px] font-bold leading-none text-[#1E40AF]">
            {totals.totalLabel}
          </Text>
          <Text className="pb-0.5 text-xs font-medium text-slate-400">MXN</Text>
        </HStack>
      </HStack>
    </View>
  );
}
