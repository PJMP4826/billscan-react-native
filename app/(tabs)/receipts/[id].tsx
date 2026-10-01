import { ReceiptDetailScreen } from "@/src/features/receipts/components/detail";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Ruta de detalle del ticket.
 *
 * `app/(tabs)/receipts/_layout.tsx` ya define el header nativo
 * (`title: "Detalle del Ticket"`), por lo que NO se usa `ScreenContainer`:
 * eso duplicaría el header. El botón "atrás" lo aporta el propio Stack.
 */
export default function ReceiptDetailRoute() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const receiptUuid = Array.isArray(id) ? id[0] : id;

  return (
    // `className` se ignora en el SafeAreaView de react-native-safe-area-context
    // en native, por eso flex/background van por `style` inline.
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f1f5f9" }}
      edges={["left", "right", "bottom"]}>
      <View className="w-full flex-1 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        <ReceiptDetailScreen receiptUuid={receiptUuid} />
      </View>
    </SafeAreaView>
  );
}
