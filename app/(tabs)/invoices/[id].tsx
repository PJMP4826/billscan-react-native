import { InvoiceDetailScreen } from "@/src/features/invoices/components/detail";
import { ScreenContainer } from "@/src/shared/components/ScreenContainer";
import { useLocalSearchParams } from "expo-router";

/**
 * Ruta de detalle del CFDI.
 *
 * Usa `ScreenContainer` con `showBackButton`: el header se renderiza en JS para
 * que sea idéntico en web y Android. NO usamos el header nativo del Stack
 * (toolbar de androidx con inset del status bar + `?attr/actionBarSize` +
 * `contentInsetStartWithNavigation`), que hacía divergir web y Android.
 * Ver `app/(tabs)/invoices/_layout.tsx` (`headerShown: false`).
 *
 * El parámetro `id` es el `receipt_uuid` del CFDI (NO el uuid del timbre
 * fiscal digital) y lo consume el endpoint `GET /cfdis/{receipt_uuid}`.
 */
export default function InvoiceDetailRoute() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const receiptUuid = Array.isArray(id) ? id[0] : id;

  return (
    <ScreenContainer
      title="Detalle de CFDI"
      showBackButton
      backFallbackHref="/(tabs)/invoices">
      <InvoiceDetailScreen receiptUuid={receiptUuid} />
    </ScreenContainer>
  );
}
