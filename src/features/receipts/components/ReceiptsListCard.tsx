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
const FILTER_TABS = [
  { value: "TODOS", label: "Todos" },
  { value: ReceiptStatus.PENDING, label: "Pendientes" },
  { value: ReceiptStatus.COMPLETED, label: "Facturados" },
  { value: ReceiptStatus.NOT_ELIGIBLE, label: "Rechazados" },
  { value: ReceiptStatus.PROCESSING, label: "En Proceso" },
  { value: ReceiptStatus.FAILED, label: "Fallidos" },
];

export function ReceiptsListCard() {
  const { receipts, total, isLoading, isError, refetch } = useReceiptList();
  const [selectedStatus, setSelectedStatus] = useState<string>("TODOS");

  const filteredReceipts = useMemo(() => {
    if (selectedStatus === "TODOS") {
      return receipts;
    }
    return receipts.filter((receipt) => receipt.status === selectedStatus);
  }, [receipts, selectedStatus]);

  return (
    <View className="flex-1 w-full">
      <Tabs
        value={selectedStatus}
        onValueChange={(value) => setSelectedStatus(value)}
        orientation="horizontal"
        className="w-full mb-4 h-10"
      >
        <TabsList className="bg-transparent border-0 gap-2 p-0 h-full w-full">
          <TabsIndicator className="bg-[#2563EB] rounded-full h-full" />

          {FILTER_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-full border border-slate-200 bg-transparent px-4 h-full justify-center data-[selected=true]:border-transparent"
            >
              <TabsTriggerText className="text-sm font-normal text-slate-600 data-[selected=true]:text-white">
                {tab.label} {" "}
              </TabsTriggerText>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow pb-10"
      >
        {isLoading && (
          <View className="py-10 items-center justify-center">
            <Text className="text-sm font-medium text-slate-500">
              Consultando tickets...
            </Text>
          </View>
        )}

        {!isLoading && isError && (
          <View className="py-10 items-center justify-center gap-3">
            <Ionicons name="alert-circle-outline" size={28} color="#e11d48" />
            <Text className="text-sm font-medium text-rose-600">
              No fue posible cargar los tickets.
            </Text>
            <Button
              onPress={() => void refetch()}
              className="rounded-full bg-[#1E40AF] px-4 py-2 h-auto"
            >
              <ButtonText className="text-xs font-semibold text-white">
                Reintentar
              </ButtonText>
            </Button>
          </View>
        )}

        {!isLoading && !isError && filteredReceipts.length === 0 && (
          <View className="py-10 items-center justify-center">
            <Text className="text-sm font-medium text-slate-500">
              No se encontraron tickets {selectedStatus !== "TODOS" ? "con este estado" : "registrados"}.
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