import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type {
  InvoiceConceptoViewModel,
  InvoiceTotalsViewModel,
} from "@/src/features/invoices/application/useInvoiceDetail";
import { InvoiceConceptoRow } from "@/src/features/invoices/components/detail/InvoiceConceptoRow";
import { InvoiceTotals } from "@/src/features/invoices/components/detail/InvoiceTotals";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";

interface InvoiceConceptsListProps {
  conceptos: InvoiceConceptoViewModel[];
  totals: InvoiceTotalsViewModel;
  onSelectConcepto: (concepto: InvoiceConceptoViewModel) => void;
}

const buildConceptosCountLabel = (count: number) =>
  `${count} ${count === 1 ? "concepto" : "conceptos"}`;

/**
 * Tarjeta "Desglose de compra": encabezado con el número de conceptos, el
 * listado pulsable de partidas y, separado por un `Divider`, el bloque de
 * totales con los impuestos trasladados desplegables.
 */
export function InvoiceConceptsList({
  conceptos,
  totals,
  onSelectConcepto,
}: InvoiceConceptsListProps) {
  const [showImpuestos, setShowImpuestos] = useState(false);

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300/40 sm:p-5">
      <VStack className="w-full gap-4">
        {/* Encabezado */}
        <HStack className="w-full flex-row items-center justify-between gap-3">
          <HStack className="min-w-0 flex-1 flex-row items-center gap-3">
            <View className="h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF]">
              <Ionicons name="cart-outline" size={18} color="#1D4ED8" />
            </View>

            <Heading
              className="min-w-0 shrink text-base font-semibold text-slate-800 sm:text-lg"
              isTruncated>
              Desglose de compra
            </Heading>
          </HStack>

          <View className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5">
            <Text className="text-xs font-medium text-slate-600">
              {buildConceptosCountLabel(conceptos.length)}
            </Text>
          </View>
        </HStack>

        {/* Listado de conceptos (vacío: mensaje explícito, no espacio en blanco) */}
        {conceptos.length > 0 ? (
          <VStack className="w-full">
            {conceptos.map((concepto, index) => (
              <InvoiceConceptoRow
                key={concepto.id}
                concepto={concepto}
                onPress={onSelectConcepto}
                showDivider={index > 0}
              />
            ))}
          </VStack>
        ) : (
          <VStack className="w-full gap-2 rounded-2xl bg-slate-50 p-3">
            <Text className="text-sm font-normal text-slate-400">
              Este CFDI no reporta conceptos.
            </Text>
          </VStack>
        )}

        {/* Impuestos trasladados desplegables (solo si el CFDI los reporta) */}
        {totals.tieneImpuestos ? (
          <VStack className="w-full gap-2">
            <Pressable
              onPress={() => setShowImpuestos((previous) => !previous)}
              accessibilityRole="button"
              accessibilityLabel={
                showImpuestos
                  ? "Ocultar impuestos trasladados"
                  : "Ver impuestos trasladados"
              }
              className="w-full flex-row items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2.5 active:opacity-60">
              <HStack className="min-w-0 flex-1 flex-row items-center gap-2">
                <Ionicons name="calculator" size={15} color="#1D4ED8" />
                <Text className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                  Impuestos trasladados
                </Text>
              </HStack>

              <HStack className="shrink-0 flex-row items-center gap-2">
                {totals.impuestosTrasladadosLabel ? (
                  <Text className="text-sm font-semibold text-slate-800">
                    {totals.impuestosTrasladadosLabel}
                  </Text>
                ) : null}
                <Ionicons
                  name={showImpuestos ? "chevron-up" : "chevron-down"}
                  size={15}
                  color="#64748B"
                />
              </HStack>
            </Pressable>

            {showImpuestos ? (
              <VStack className="w-full gap-2 rounded-2xl border border-slate-200 p-3">
                {totals.impuestos.map((impuesto) => (
                  <VStack key={impuesto.id} className="w-full gap-1">
                    <HStack className="w-full flex-row items-center justify-between gap-3">
                      <Text className="text-sm font-medium text-slate-700">
                        {impuesto.impuestoLabel}
                      </Text>
                      <Text className="text-sm font-semibold text-slate-800">
                        {impuesto.importeLabel}
                      </Text>
                    </HStack>
                    <Text className="text-xs font-normal text-slate-400">
                      {`Base: ${impuesto.baseLabel} • ${impuesto.tasaLabel}`}
                    </Text>
                  </VStack>
                ))}
              </VStack>
            ) : null}
          </VStack>
        ) : null}

        <Divider className="bg-slate-200" />

        <InvoiceTotals totals={totals} />
      </VStack>
    </Card>
  );
}
