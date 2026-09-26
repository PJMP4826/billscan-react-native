import { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View, ScrollView } from "react-native";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsTriggerText,
  TabsIndicator,
} from "@/components/ui/tabs";
import { ReceiptCard } from "@/src/features/receipts/components/ReceiptCard";
import { useReceiptList } from "@/src/features/receipts/application/useReceiptList";
import { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";

// Opciones de filtrado
type ReceiptFilter = ReceiptStatus | "TODOS";

const FILTER_TABS: { value: ReceiptFilter; label: string }[] = [
  { value: "TODOS", label: "Todos" },
  { value: ReceiptStatus.PENDING, label: "Pendientes" },
  { value: ReceiptStatus.COMPLETED, label: "Facturados" },
  { value: ReceiptStatus.NOT_ELIGIBLE, label: "No Elegibles" },
  { value: ReceiptStatus.PROCESSING, label: "En Proceso" },
  { value: ReceiptStatus.FAILED, label: "Fallidos" },
];

export function ReceiptsListCard() {
  const [selectedStatus, setSelectedStatus] = useState<ReceiptFilter>("TODOS");
  const status = selectedStatus === "TODOS" ? undefined : selectedStatus;

  const { receipts, isLoading, isError, refetch } = useReceiptList({ status });

  // Filtro de seguridad en cliente: si la API ignora el parámetro `status`,
  // al menos no se muestran estados que no coinciden con la chip seleccionada.
  const filteredReceipts = useMemo(() => {
    if (!status) {
      return receipts;
    }
    return receipts.filter((receipt) => receipt.status === status);
  }, [receipts, status]);

  const selectedLabel =
    FILTER_TABS.find((tab) => tab.value === selectedStatus)?.label ?? "Todos";

  return (
    <View className="flex-1 w-full">
      <Tabs
        value={selectedStatus}
        onValueChange={(value: any) => setSelectedStatus(value as ReceiptFilter)}
        orientation="horizontal"
        disabled={isError}
        className="w-full mb-4 h-10">
        <TabsList>
          <TabsIndicator className="bg-[#2563EB] rounded-full" />

          {FILTER_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <TabsTriggerText className="text-sm font-normal text-slate-600 data-[selected=true]:text-white">
                {tab.label}{" "}
              </TabsTriggerText>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow pb-10">
        {isLoading && (
          <View className="py-10 items-center justify-center">
            <Text className="text-sm font-normal text-slate-500">
              Consultando tickets... {" "}
            </Text>
          </View>
        )}

        {!isLoading && isError && (
          <View className="py-10 items-center justify-center gap-3">
            <Ionicons name="alert-circle-outline" size={28} color="#e11d48" />
            <Text className="text-sm font-normal text-rose-600">
              No fue posible cargar los tickets. {" "}
            </Text>
            <Button
              onPress={() => void refetch()}
              className="rounded-full bg-[#1E40AF] px-4 py-2 h-auto">
              <ButtonText className="text-xs font-semibold text-white">
                Reintentar
              </ButtonText>
            </Button>
          </View>
        )}

        {!isLoading && !isError && filteredReceipts.length === 0 && (
          <View className="py-10 items-center justify-center">
            <Text className="text-sm font-medium text-slate-500">
              {selectedStatus === "TODOS"
                ? "No se encontraron tickets registrados."
                : `No se encontraron tickets con el filtro "${selectedLabel}".`}
            </Text>
          </View>
        )}

        {!isLoading && !isError && (
          <View className="gap-4">
            {filteredReceipts.map((receipt) => (
              <ReceiptCard key={receipt.receiptUuid} receipt={receipt} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
