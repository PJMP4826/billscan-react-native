import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface ReceiptContextNotesProps {
  /** Notas del comprobante. `null` → el componente no renderiza nada. */
  notes: string | null;
}

/**
 * Recuadro de advertencia (amarillo muy claro) con las notas del comprobante.
 * Retorna `null` cuando no hay notas para no dejar espacio en blanco.
 */
export function ReceiptContextNotes({ notes }: ReceiptContextNotesProps) {
  if (!notes) {
    return null;
  }

  return (
    <View className="w-full flex-row items-start gap-3 rounded-2xl border border-[#FDE68A] bg-[#FEF9C3] p-4">
      <View className="h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDE68A]">
        <Ionicons name="information" size={14} color="#B45309" />
      </View>

      <HStack className="min-w-0 flex-1 flex-col">
        <Text className="text-xs font-semibold uppercase tracking-wide text-[#B45309]">
          Notas del comprobante
        </Text>
        <Text className="mt-1 text-xs font-normal leading-5 text-[#92400E]">
          {notes}
        </Text>
      </HStack>
    </View>
  );
}
