import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { InvoiceConceptoViewModel } from "@/src/features/invoices/application/useInvoiceDetail";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

interface InvoiceConceptoRowProps {
  concepto: InvoiceConceptoViewModel;
  onPress: (concepto: InvoiceConceptoViewModel) => void;
  /** `true` dibuja el separador superior (todas menos la primera fila). */
  showDivider?: boolean;
}

/**
 * Fila de un concepto del CFDI: chip de cantidad, descripción, clave de
 * producto/servicio y el importe alineado a la derecha. Toda la fila es
 * pulsable para abrir el bottom sheet con el desglose de la partida.
 */
export function InvoiceConceptoRow({
  concepto,
  onPress,
  showDivider = false,
}: InvoiceConceptoRowProps) {
  return (
    <Pressable
      onPress={() => onPress(concepto)}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${concepto.descripcion}`}
      className={`w-full flex-row items-start justify-between gap-3 py-3 active:opacity-60 ${
        showDivider ? "border-t border-slate-100" : ""
      }`}>
      <HStack className="min-w-0 flex-1 flex-row items-start gap-3">
        {/* Chip de cantidad */}
        <View className="mt-0.5 h-6 min-w-6 items-center justify-center rounded-md bg-slate-100 px-1.5">
          <Text className="text-xs font-semibold text-slate-600">
            {concepto.cantidadBadgeLabel}
          </Text>
        </View>

        <VStack className="min-w-0 flex-1 gap-0.5">
          <Text className="text-sm font-medium text-slate-800">
            {concepto.descripcion}
          </Text>

          <Text className="text-xs font-normal text-slate-400">
            {concepto.claveProdServLabel}
          </Text>
        </VStack>
      </HStack>

      <HStack className="shrink-0 flex-row items-center gap-2">
        <Text className="text-sm font-semibold text-slate-900">
          {concepto.importeLabel}
        </Text>
        <Ionicons name="chevron-forward" size={15} color="#94A3B8" />
      </HStack>
    </Pressable>
  );
}
