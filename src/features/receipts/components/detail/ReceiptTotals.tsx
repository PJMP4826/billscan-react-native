import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { formatCurrency } from "@/src/utils/currency-formatter";
import { View } from "react-native";

interface ReceiptTotalsProps {
  subtotal: string | null;
  taxes: { name: string; rate: string | null; amount: string }[];
  total: string;
  amountPaid: string;
  change: string | null;
  /** Etiqueta del método de pago para la línea de pago (ej. "Efectivo"). */
  paymentMethodLabel?: string | null;
}

interface TotalRowProps {
  label: string;
  value: string;
}

function TotalRow({ label, value }: TotalRowProps) {
  return (
    <HStack className="w-full flex-row items-center justify-between gap-4">
      <Text className="text-sm font-normal text-slate-500">{label}</Text>
      <Text className="text-sm font-medium text-slate-800">{value}</Text>
    </HStack>
  );
}

/** Etiqueta del impuesto: "IVA Trasladado (16%)" (la tasa es opcional). */
const buildTaxLabel = (name: string, rate: string | null) =>
  rate !== null && rate !== "" ? `${name} (${rate}%)` : name;

/**
 * Bloque de totales: subtotal, impuestos iterados, total destacado y
 * el desglose de pago (pagado / cambio).
 */
export function ReceiptTotals({
  subtotal,
  taxes,
  total,
  amountPaid,
  change,
  paymentMethodLabel,
}: ReceiptTotalsProps) {
  return (
    <View className="w-full gap-2">
      {subtotal !== null && subtotal !== "" ? (
        <TotalRow label="Subtotal" value={formatCurrency(subtotal)} />
      ) : null}

      {taxes.map((tax, index) => (
        <TotalRow
          key={`${tax.name}-${index}`}
          label={buildTaxLabel(tax.name, tax.rate)}
          value={formatCurrency(tax.amount)}
        />
      ))}

      {/* Total destacado */}
      <HStack className="mt-1 w-full flex-row items-end justify-between gap-3">
        <Text className="text-base font-semibold text-slate-800">
          Total Compra
        </Text>
        <HStack className="flex-row items-end gap-1">
          <Text className="text-[26px] font-bold leading-none text-[#1E40AF]">
            {formatCurrency(total)}
          </Text>
          <Text className="pb-0.5 text-xs font-medium text-slate-400">MXN</Text>
        </HStack>
      </HStack>

      {/* Desglose de pago (pagado en <método> + cambio) */}
      <HStack className="w-full flex-row flex-wrap items-center justify-end gap-1.5">
        <Text className="text-xs font-normal text-slate-400">
          {`Pagado en ${paymentMethodLabel ?? "Efectivo"}: ${formatCurrency(amountPaid)}`}
        </Text>
        {change !== null && change !== "" ? (
          <Text className="text-xs font-normal text-slate-400">
            {`• Cambio: ${formatCurrency(change)}`}
          </Text>
        ) : null}
      </HStack>
    </View>
  );
}
