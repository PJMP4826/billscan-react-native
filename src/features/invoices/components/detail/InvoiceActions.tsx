import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Ionicons } from "@expo/vector-icons";

interface InvoiceActionsProps {
  /** URL del PDF del CFDI. Habilita el botón "Ver PDF". */
  pdfUrl?: string;
  /** URL del XML del CFDI (aún no consumida: la compartición queda fuera de alcance). */
  xmlUrl?: string;
  /** Abre el visor de PDF. */
  onPressPdf?: () => void;
}

/**
 * Botonera de acciones del detalle.
 *
 * El botón "Ver PDF" delega la apertura al contenedor; la compartición del XML
 * sigue fuera de alcance y su `onPress` queda como no-op marcado con `TODO`.
 */
export function InvoiceActions({
  pdfUrl,
  xmlUrl,
  onPressPdf,
}: InvoiceActionsProps) {
  return (
    <HStack className="w-full flex-row items-center gap-3">
      <Button
        onPress={onPressPdf}
        disabled={!pdfUrl}
        className="h-auto flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-[#1E40AF] px-4 py-3">
        <Ionicons name="document-outline" size={17} color="#FFFFFF" />
        <ButtonText className="text-sm font-semibold text-white">
          Ver PDF
        </ButtonText>
      </Button>

      <Button
        variant="outline"
        onPress={() => {
          // TODO: compartir el XML del CFDI.
          void xmlUrl;
        }}
        className="h-auto flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3">
        <Ionicons name="share-outline" size={17} color="#1E40AF" />
        <ButtonText className="text-sm font-semibold text-[#1E40AF]">
          Compartir XML
        </ButtonText>
      </Button>
    </HStack>
  );
}
