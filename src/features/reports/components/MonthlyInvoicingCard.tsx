import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { View } from "react-native";
// Asumiendo que crearás este hook o usarás uno similar
import { useMonthlyInvoicing } from "@/src/features/reports/application/useMonthlyInvoicing";

export function MonthlyInvoicingCard() {
  // Datos simulados o provenientes del hook: totalAmount y generatedCount
  const { monthlyInvoicing, isLoading, isError, refetch } = useMonthlyInvoicing();

  // Formateo del monto (ej: $12,850.00)
  const formattedAmount = isLoading
    ? "..."
    : (monthlyInvoicing?.totalAmount ?? "$0.00");

  // Cantidad de facturas (ej: 8)
  const invoiceCount = isLoading
    ? "..."
    : (monthlyInvoicing?.generatedCount ?? "0");

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-300/40">
      <VStack className="gap-6">
        <HStack className="flex-row items-start justify-between w-full">
          {/* Icon Container - AHORA CON ICONO DE DOCUMENTOS/CAPAS */}
          <View className="h-14 w-14 items-center justify-center rounded-xl bg-[#E6FFFA]">
            <Ionicons name="layers-outline" size={28} color="#047857" />
          </View>

          {/* Status Badge */}
          <View className="rounded-full bg-[#E6FFFA] px-3 py-1.5">
            <Text className="text-xs font-semibold tracking-wide text-[#047857]">
              {isLoading ? "Cargando..." : "Resumen de Facturación"}
            </Text>
          </View>
        </HStack>

        <View className="gap-1.5">
          <Heading className="text-[22px] font-semibold tracking-tight text-slate-800">
            Facturación Mensual
          </Heading>

          <HStack className="flex-row items-end gap-1.5">
            <Text className="text-[32px] font-bold leading-none text-slate-950">
              {isError ? "--" : formattedAmount}
            </Text>
            <Text className="pb-0.5 text-lg font-medium text-slate-400">
              MXN
            </Text>
          </HStack>
        </View>

        {/* Footer info box with count */}
        <View className="flex-row items-center gap-2 rounded-xl bg-[#E6FFFA] p-3">
          <Ionicons name="checkmark-circle-outline" size={18} color="#047857" />
          <Text className="text-sm font-semibold text-[#047857]">
            {isError
              ? "No fue posible cargar los datos"
              : `${invoiceCount} facturas generadas`}
          </Text>
        </View>
      </VStack>

      {/* Retry Button */}
      {isError ? (
        <Button
          onPress={() => {
            void refetch();
          }}
          className="mt-4 self-start rounded-full bg-[#1E40AF] px-3.5 py-1.5 h-auto">
          <ButtonText className="text-xs font-semibold text-white">
            Reintentar
          </ButtonText>
        </Button>
      ) : null}
    </Card>
  );
}