import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { ReceiptListItemViewModel } from "@/src/features/receipts/application/useReceiptList";
import { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";
import { ImageViewerModal } from "@/src/shared/components/ImageViewerModal";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, View, type ImageSourcePropType } from "react-native";

const DEFAULT_RECEIPT_IMAGE: ImageSourcePropType = require("../../../../assets/images/Image-not-found.png");

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

  // Estado para guardar la imagen que se va a mostrar en el modal
  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType | null>(null);

  // Imagen del ticket: usa el file_url de la API o, si no existe, la por defecto
  const receiptImageSource: ImageSourcePropType = receipt.fileUrl
    ? { uri: receipt.fileUrl }
    : DEFAULT_RECEIPT_IMAGE;

  return (
    <>
      <Card className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300/40 sm:p-5">
        <VStack className="gap-3 sm:gap-4">
          <HStack className="w-full flex-row items-start justify-between gap-3">
            <View
              className="h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14"
              style={{ backgroundColor: statusStyle.iconBg }}>
              <Ionicons
                name={statusStyle.icon}
                size={26}
                color={statusStyle.iconColor}
              />
            </View>

            {/* max-w + shrink + isTruncated evitan que un estado largo empuje el layout */}
            <View
              className="shrink max-w-[70%] rounded-full px-3 py-1.5"
              style={{ backgroundColor: statusStyle.badgeBg }}>
              <Text
                className="text-xs font-normal tracking-wide"
                style={{ color: statusStyle.badgeText }}
                isTruncated>
                {receipt.statusLabel}{" "}
              </Text>
            </View>
          </HStack>

          <HStack className="w-full flex-row items-center justify-between gap-3 sm:gap-4">
            {/* min-w-0 + flex-1 permiten que el texto se ajuste y no desborde en web */}
            <View className="min-w-0 flex-1 gap-1.5">
              <Heading
                className="text-lg font-semibold tracking-tight text-slate-800 sm:text-[22px]"
                isTruncated>
                {receipt.merchantName}
              </Heading>

              <HStack className="flex-row items-end gap-1">
                <Text className="shrink text-[26px] font-bold leading-none text-slate-950 sm:text-[32px]">
                  {receipt.totalLabel}
                </Text>
                <Text className="pb-0.5 text-base font-medium text-slate-400 sm:text-lg">
                  MXN
                </Text>
              </HStack>
            </View>

            {/* Mini visor de la imagen del ticket (abre el modal a pantalla completa) */}
            <Pressable
              onPress={() => setSelectedImage(receiptImageSource)}
              className="h-[72px] w-[54px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 p-0 sm:h-[96px] sm:w-[72px]">
              <Image
                source={receiptImageSource}
                resizeMode="cover"
                className="h-full w-full"
              />
            </Pressable>
          </HStack>

          <HStack className="w-full flex-row items-center justify-between gap-2 sm:gap-3">
            <View
              className="min-w-0 flex-1 flex-row items-center gap-2 rounded-xl px-3 py-2.5 sm:p-3"
              style={{ backgroundColor: statusStyle.iconBg }}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={statusStyle.iconColor}
              />
              <Text
                className="flex-1 text-xs font-normal sm:text-sm"
                style={{ color: statusStyle.iconColor }}
                isTruncated>
                Guardado el {receipt.registeredAtLabel}
              </Text>
            </View>

            <Pressable className="shrink-0 flex-row items-center gap-1 rounded-lg bg-[#1E40AF] px-3 py-2.5">
              <Text className="text-xs font-semibold text-white">
                Ver Detalle
              </Text>
              <Ionicons name="chevron-forward" size={14} color="white" />
            </Pressable>
          </HStack>
        </VStack>
      </Card>

      <ImageViewerModal
        source={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
