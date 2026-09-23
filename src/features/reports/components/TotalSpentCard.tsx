import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { View } from "react-native";
import { useTotalSpent } from "@/src/features/reports/application/useTotalSpent";

export function TotalSpentCard() {
  const { totalSpent, isLoading, isError, refetch } = useTotalSpent();

  const formattedAmount = isLoading
    ? "..."
    : (totalSpent?.formattedAmount ?? "$0.00");

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-300/40">
      <VStack className="gap-6">
        <HStack className="flex-row items-start justify-between w-full">
          {/* Icon Container */}
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF4FF]">
            <Ionicons name="wallet-outline" size={28} color="#2563EB" />
          </View>

          {/* Status Badge */}
          <View className="rounded-md bg-[#EFF6FF] px-3 py-1.5">
            <Text className="text-sm font-semibold tracking-wide text-[#2563EB]">
              {isLoading ? "Cargando" : "Gasto Total"}
            </Text>
          </View>
        </HStack>

        <View className="gap-1.5">
          <Heading className="text-[22px] font-semibold tracking-tight text-slate-800">
            Total Gastado
          </Heading>

          <HStack className="flex-row items-end gap-2">
            <Text className="text-[32px] font-bold leading-none text-slate-950">
              {isError ? "--" : formattedAmount}
            </Text>
            <Text className="pb-0.5 text-lg font-medium text-slate-400">
              MXN
            </Text>
          </HStack>

          <Text className="text-sm font-medium text-slate-500">
            {isError ? "No fue posible cargar los datos" : "Suma de todos los tickets"}
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