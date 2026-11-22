import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

interface InvoiceActionsProps {
  /** URL del PDF del CFDI. Habilita el botón "Ver PDF". */
  pdfUrl?: string | null;
  /** URL del XML del CFDI. Habilita el botón "Compartir XML". */
  xmlUrl?: string | null;
  /** Abre el visor de PDF. */
  onPressPdf?: () => void;
  /** Descarga el XML y abre el menú de compartición. */
  onPressShareXml?: () => void;
  /** Indica que el XML se está descargando/compartiendo. */
  isSharing?: boolean;
}

/**
 * Botonera de acciones del detalle.
 *
 * El botón "Ver PDF" delega la apertura al contenedor y el botón
 * "Compartir XML" delega la descarga y compartición al contenedor.
 */
export function InvoiceActions({
  pdfUrl,
  xmlUrl,
  onPressPdf,
  onPressShareXml,
  isSharing = false,
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
        onPress={onPressShareXml}
        disabled={!xmlUrl || isSharing}
        className="h-auto flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3">
        {isSharing ? (
          <ActivityIndicator size="small" color="#1E40AF" />
        ) : (
          <Ionicons name="share-outline" size={17} color="#1E40AF" />
        )}
        <ButtonText className="text-sm font-semibold text-[#1E40AF]">
          {isSharing ? "Preparando..." : "Compartir XML"}
        </ButtonText>
      </Button>
    </HStack>
  );
}
