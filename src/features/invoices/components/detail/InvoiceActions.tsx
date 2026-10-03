import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Ionicons } from "@expo/vector-icons";

interface InvoiceActionsProps {
  /** URL del PDF del CFDI (aún no consumida: la descarga queda fuera de alcance). */
  pdfUrl?: string;
  /** URL del XML del CFDI (aún no consumida: la compartición queda fuera de alcance). */
  xmlUrl?: string;
}

/**
 * Botonera de acciones del detalle.
 *
 * NOTA: ambos botones son SOLO presentación. La descarga del PDF y la
 * compartición del XML están explícitamente fuera del alcance de esta tarea,
 * por eso los `onPress` quedan como no-ops marcados con `TODO`.
 */
export function InvoiceActions({ pdfUrl, xmlUrl }: InvoiceActionsProps) {
  return (
    <HStack className="w-full flex-row items-center gap-3">
      <Button
        onPress={() => {
          // TODO: descargar/abrir el PDF del CFDI.
          void pdfUrl;
        }}
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
