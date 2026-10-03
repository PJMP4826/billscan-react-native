import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetScrollView,
} from "@/components/ui/actionsheet";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { InvoiceConceptoViewModel } from "@/src/features/invoices/application/useInvoiceDetail";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface InvoiceConceptDetailSheetProps {
  /** Concepto seleccionado; `null` mantiene el sheet cerrado sin contenido. */
  concepto: InvoiceConceptoViewModel | null;
  isOpen: boolean;
  onClose: () => void;
}

interface DetailRowProps {
  label: string;
  value: string | null;
  emphasis?: boolean;
}

function DetailRow({ label, value, emphasis = false }: DetailRowProps) {
  if (value === null || value === "") {
    return null;
  }

  return (
    <HStack className="w-full flex-row items-start justify-between gap-4">
      <Text className="min-w-0 flex-1 text-sm font-normal text-slate-500">
        {label}
      </Text>
      <Text
        className={`min-w-0 flex-1 text-right text-sm ${
          emphasis
            ? "font-semibold text-slate-900"
            : "font-medium text-slate-800"
        }`}>
        {value}
      </Text>
    </HStack>
  );
}

/** Etiqueta del badge de traslado: "Traslado" */
function SectionTitle({
  icon,
  title,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
}) {
  return (
    <HStack className="w-full flex-row items-center gap-2">
      <Ionicons name={icon} size={15} color="#1D4ED8" />
      <Text className="text-xs font-semibold uppercase tracking-wide text-[#1D4ED8]">
        {title}
      </Text>
    </HStack>
  );
}

/**
 * Bottom sheet con el desglose completo de una partida del CFDI.
 *
 * Soporta conceptos sin impuestos (`impuestos: null` o `traslados` vacío):
 * en ese caso la sección "Impuestos de esta partida" se sustituye por un
 * mensaje explícito en vez de dejar el bloque vacío.
 */
export function InvoiceConceptDetailSheet({
  concepto,
  isOpen,
  onClose,
}: InvoiceConceptDetailSheetProps) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="max-h-[85%]">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        {concepto ? (
          <ActionsheetScrollView
            className="w-full"
            contentContainerStyle={{ paddingBottom: 24 }}>
            <VStack className="w-full gap-4 pt-2">
              {/* Encabezado: descripción + importe */}
              <VStack className="w-full gap-2">
                <Text className="text-base font-semibold text-slate-900">
                  {concepto.descripcion}
                </Text>
                <HStack className="flex-row items-end gap-1">
                  <Text className="text-[26px] font-bold leading-none text-[#1E40AF]">
                    {concepto.importeLabel}
                  </Text>
                  <Text className="pb-0.5 text-xs font-medium text-slate-400">
                    MXN
                  </Text>
                </HStack>
              </VStack>

              <Divider className="bg-slate-200" />

              {/* Desglose de la partida */}
              <VStack className="w-full gap-3">
                <DetailRow
                  label="Valor Unitario"
                  value={concepto.valorUnitarioLabel}
                />
                <DetailRow label="Cantidad" value={concepto.cantidadLabel} />
                {concepto.descuentoLabel !== null ? (
                  <DetailRow
                    label="Descuento"
                    value={concepto.descuentoLabel}
                  />
                ) : null}
                <DetailRow
                  label="Subtotal partida"
                  value={concepto.importeLabel}
                  emphasis
                />
              </VStack>

              <Divider className="bg-slate-200" />

              {/* Información fiscal del SAT */}
              <VStack className="w-full gap-3">
                <SectionTitle
                  icon="document-text-outline"
                  title="Información fiscal del SAT"
                />

                <DetailRow
                  label="Clave de Producto/Servicio"
                  value={
                    concepto.claveProdServDescription
                      ? `${concepto.claveProdServCode} - ${concepto.claveProdServDescription}`
                      : concepto.claveProdServCode || null
                  }
                />
                <DetailRow
                  label="Unidad de Medida"
                  value={
                    concepto.unidadDescription
                      ? `${concepto.unidadCode} - ${concepto.unidadDescription}`
                      : concepto.unidadCode || null
                  }
                />
                <DetailRow
                  label="No. Identificación"
                  value={concepto.noIdentificacion}
                />
                <DetailRow
                  label="Objeto de Impuesto"
                  value={concepto.objetoImpuestoLabel}
                />
              </VStack>

              <Divider className="bg-slate-200" />

              {/* Impuestos de la partida */}
              <VStack className="w-full gap-3">
                <SectionTitle
                  icon="calculator"
                  title="Impuestos de esta partida"
                />

                {concepto.tieneImpuestos ? (
                  concepto.impuestos.map((impuesto) => (
                    <VStack key={impuesto.id} className="w-full gap-2">
                      <HStack className="w-full flex-row items-center gap-2">
                        <Badge action="info" variant="solid" size="sm">
                          <BadgeText action="info" size="sm">
                            Traslado {" "}
                          </BadgeText>
                        </Badge>
                      </HStack>

                      <VStack className="w-full gap-2 rounded-2xl bg-slate-50 p-3">
                        <DetailRow
                          label="Tipo de Impuesto"
                          value={impuesto.impuestoLabel}
                        />
                        <DetailRow
                          label="Base Gravable"
                          value={impuesto.baseLabel}
                        />
                        <DetailRow
                          label="Tasa / Factor"
                          value={impuesto.tasaLabel}
                        />
                        <Divider className="bg-slate-200" />
                        <DetailRow
                          label="Importe"
                          value={impuesto.importeLabel}
                          emphasis
                        />
                      </VStack>
                    </VStack>
                  ))
                ) : (
                  <View className="w-full rounded-2xl bg-slate-50 p-3">
                    <Text className="text-sm font-normal text-slate-500">
                      Esta partida no reporta impuestos trasladados.
                    </Text>
                  </View>
                )}
              </VStack>

              <Button
                onPress={onClose}
                className="mt-1 h-auto w-full rounded-2xl bg-[#1E40AF] px-4 py-3">
                <ButtonText className="text-sm font-semibold text-white">
                  Cerrar detalle
                </ButtonText>
              </Button>
            </VStack>
          </ActionsheetScrollView>
        ) : (
          <VStack className="w-full items-center gap-2 py-8">
            <Heading className="text-base font-semibold text-slate-700">
              Sin concepto seleccionado
            </Heading>
            <Text className="text-sm font-normal text-slate-400">
              Selecciona una partida del desglose.
            </Text>
          </VStack>
        )}
      </ActionsheetContent>
    </Actionsheet>
  );
}
