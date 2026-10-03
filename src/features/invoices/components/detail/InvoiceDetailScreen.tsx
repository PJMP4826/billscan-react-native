import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { InvoiceConceptoViewModel } from "@/src/features/invoices/application/useInvoiceDetail";
import { useInvoiceDetail } from "@/src/features/invoices/application/useInvoiceDetail";
import { InvoiceActions } from "@/src/features/invoices/components/detail/InvoiceActions";
import { InvoiceConceptDetailSheet } from "@/src/features/invoices/components/detail/InvoiceConceptDetailSheet";
import { InvoiceConceptsList } from "@/src/features/invoices/components/detail/InvoiceConceptsList";
import { InvoiceFiscalData } from "@/src/features/invoices/components/detail/InvoiceFiscalData";
import { InvoiceHero } from "@/src/features/invoices/components/detail/InvoiceHero";
import { InvoiceSatCertification } from "@/src/features/invoices/components/detail/InvoiceSatCertification";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

interface InvoiceDetailScreenProps {
  /** Si se omite, se toma el parámetro de ruta de expo-router. */
  receiptUuid?: string;
}

/**
 * Contenedor de la pantalla "Detalle de CFDI".
 * Orquesta la carga del DTO y compone los sub-componentes de presentación;
 * los componentes atómicos no conocen la fuente de datos.
 */
export function InvoiceDetailScreen({ receiptUuid }: InvoiceDetailScreenProps) {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const routeUuid = Array.isArray(params.id) ? params.id[0] : params.id;

  const uuid = receiptUuid ?? routeUuid ?? "";

  const { detail, viewModel, isLoading, isError, refetch } =
    useInvoiceDetail(uuid);

  const [selectedConcepto, setSelectedConcepto] =
    useState<InvoiceConceptoViewModel | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  /* ── Estados de carga / error ─────────────────────────────────────────── */

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center gap-3">
        <ActivityIndicator size="large" color="#1E40AF" />
        <Text className="text-sm font-normal text-slate-500">
          Cargando detalle del CFDI...
        </Text>
      </View>
    );
  }

  if (isError || !detail || !viewModel) {
    return (
      <View className="flex-1 items-center justify-center gap-3 px-6">
        <Ionicons name="alert-circle-outline" size={30} color="#E11D48" />
        <Text className="text-center text-sm font-normal text-rose-600">
          No fue posible cargar el detalle del CFDI.
        </Text>
        <Button
          onPress={() => void refetch()}
          className="h-auto rounded-full bg-[#1E40AF] px-4 py-2">
          <ButtonText className="text-xs font-semibold text-white">
            Reintentar
          </ButtonText>
        </Button>
      </View>
    );
  }

  /* ── Contenido ────────────────────────────────────────────────────────── */

  const handleSelectConcepto = (concepto: InvoiceConceptoViewModel) => {
    setSelectedConcepto(concepto);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <ScrollView
        className="w-full flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-4 pb-10">
        <VStack className="w-full gap-4">
          <InvoiceHero hero={viewModel.hero} />

          <InvoiceActions pdfUrl={detail.pdfUrl} xmlUrl={detail.xmlUrl} />

          <InvoiceFiscalData fiscal={viewModel.fiscal} />

          <InvoiceConceptsList
            conceptos={viewModel.conceptos}
            totals={viewModel.totals}
            onSelectConcepto={handleSelectConcepto}
          />

          <InvoiceSatCertification certificacion={viewModel.certificacion} />
        </VStack>
      </ScrollView>

      <InvoiceConceptDetailSheet
        concepto={selectedConcepto}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
      />
    </>
  );
}
