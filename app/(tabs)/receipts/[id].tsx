import { ReceiptDetailScreen } from "@/src/features/receipts/components/detail";
import { ScreenContainer } from "@/src/shared/components/ScreenContainer";
import { useLocalSearchParams } from "expo-router";

/**
 * Ruta de detalle del ticket.
 *
 * Usa `ScreenContainer` con `showBackButton`: el header se renderiza en JS para
 * que sea idéntico en web y Android. Antes usábamos el header NATIVO del Stack
 * (`title: "Detalle del Ticket"`), pero en Android el toolbar de androidx crece
 * por el inset del status bar (edge-to-edge) + `?attr/actionBarSize` +
 * `contentInsetStartWithNavigation`, así que web y Android no coincidían.
 * Ver `app/(tabs)/receipts/_layout.tsx` (`headerShown: false`).
 */
export default function ReceiptDetailRoute() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const receiptUuid = Array.isArray(id) ? id[0] : id;

  return (
    <ScreenContainer title="Detalle del Ticket" showBackButton>
      <ReceiptDetailScreen receiptUuid={receiptUuid} />
    </ScreenContainer>
  );
}
