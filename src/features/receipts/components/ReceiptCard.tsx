import { Ionicons } from "@expo/vector-icons";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { View } from "react-native";
import type { ReceiptListItemViewModel } from "@/src/features/receipts/application/useReceiptList";
import { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";

interface ReceiptStatusStyle {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  badgeBg: string;
  badgeText: string;
}

const RECEIPT_STATUS_STYLES: Record<ReceiptStatus, ReceiptStatusStyle> = {
  [ReceiptStatus.COMPLETED]: {
    icon: "checkmark-circle-outline",
    iconColor: "#047857",
    iconBg: "#E6FFFA",
    badgeBg: "#E6FFFA",
    badgeText: "#047857",
  },
  [ReceiptStatus.PENDING]: {
    icon: "time-outline",
    iconColor: "#B45309",
    iconBg: "#FFFBEB",
    badgeBg: "#FFFBEB",
    badgeText: "#B45309",
  },
  [ReceiptStatus.NOT_ELIGIBLE]: {
    icon: "close-circle-outline",
    iconColor: "#475569",
    iconBg: "#F1F5F9",
    badgeBg: "#F1F5F9",
    badgeText: "#475569",
  },
  [ReceiptStatus.PROCESSING]: {
    icon: "sync-outline",
    iconColor: "#2563EB",
    iconBg: "#EFF6FF",
    badgeBg: "#EFF6FF",
    badgeText: "#2563EB",
  },
  [ReceiptStatus.FAILED]: {
    icon: "alert-circle-outline",
    iconColor: "#E11D48",
    iconBg: "#FFF1F2",
    badgeBg: "#FFF1F2",
    badgeText: "#E11D48",
  },
};

interface ReceiptCardProps {
  receipt: ReceiptListItemViewModel;
}

export function ReceiptCard({ receipt }: ReceiptCardProps) {
  const statusStyle = RECEIPT_STATUS_STYLES[receipt.status];

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-300/40">
      <VStack className="gap-6">
        <HStack className="flex-row items-start justify-between w-full">
          <View
            className="h-14 w-14 items-center justify-center rounded-xl"
            style={{ backgroundColor: statusStyle.iconBg }}>
            <Ionicons
              name={statusStyle.icon}
              size={28}
              color={statusStyle.iconColor}
            />
          </View>

          <View
            className="rounded-full px-3 py-1.5"
            style={{ backgroundColor: statusStyle.badgeBg }}>
            <Text
              className="text-xs font-normal tracking-wide"
              style={{ color: statusStyle.badgeText }}>
              {receipt.statusLabel} {" "}
            </Text>
          </View>
        </HStack>

        <View className="gap-1.5">
          <Heading className="text-[22px] font-semibold tracking-tight text-slate-800">
            {receipt.merchantName}
          </Heading>

          <HStack className="flex-row items-end gap-1">
            <Text className="text-[32px] font-bold leading-none text-slate-950">
              {receipt.totalLabel}
            </Text>
            <Text className="pb-0.5 text-lg font-medium text-slate-400">
              MXN
            </Text>
          </HStack>
        </View>

        <View
          className="flex-row items-center gap-2 rounded-xl p-3"
          style={{ backgroundColor: statusStyle.iconBg }}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color={statusStyle.iconColor}
          />
          <Text
            className="text-sm font-semibold"
            style={{ color: statusStyle.iconColor }}>
            Registrado el {receipt.registeredAtLabel}
          </Text>
        </View>
      </VStack>
    </Card>
  );
}
