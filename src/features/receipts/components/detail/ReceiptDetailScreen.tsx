import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useReceiptDetail } from "@/src/features/receipts/application/useReceiptDetail";
import { ReceiptContextNotes } from "@/src/features/receipts/components/detail/ReceiptContextNotes";
import { ReceiptHero } from "@/src/features/receipts/components/detail/ReceiptHero";
import { ReceiptImageBanner } from "@/src/features/receipts/components/detail/ReceiptImageBanner";
import { ReceiptItemsList } from "@/src/features/receipts/components/detail/ReceiptItemsList";
import { ReceiptTransactionData } from "@/src/features/receipts/components/detail/ReceiptTransactionData";
import { ImageViewerModal } from "@/src/shared/components/ImageViewerModal";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  type ImageSourcePropType,
} from "react-native";

const DEFAULT_RECEIPT_IMAGE: ImageSourcePropType = require("../../../../../assets/images/Image-not-found.png");

interface ReceiptDetailScreenProps {
  /** Si se omite, se toma el parámetro de ruta de expo-router. */
  receiptUuid?: string;
}

/**
 * Contenedor de la pantalla "Detalle de Compra".
 * Orquesta la carga del DTO y compone los sub-componentes de presentación.
 */
export function ReceiptDetailScreen({ receiptUuid }: ReceiptDetailScreenProps) {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const routeUuid = Array.isArray(params.id) ? params.id[0] : params.id;

  const uuid = receiptUuid ?? routeUuid ?? "";

  const { detail, hero, paymentLabel, isLoading, isError, refetch, error } =
    useReceiptDetail(uuid);

  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType | null>(null);

  const imageSource: ImageSourcePropType = useMemo(
    () => (detail?.fileUrl ? { uri: detail.fileUrl } : DEFAULT_RECEIPT_IMAGE),
    [detail?.fileUrl],
  );

  /* ── Estados de carga / error ─────────────────────────────────────────── */

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center gap-3">
        <ActivityIndicator size="large" color="#1E40AF" />
        <Text className="text-sm font-normal text-slate-500">
          Cargando detalle del ticket...
        </Text>
      </View>
    );
  }

  if (isError || !detail || !hero) {
    {
      console.log("error: ", error);
    }
    return (
      <View className="flex-1 items-center justify-center gap-3 px-6">
        <Ionicons name="alert-circle-outline" size={30} color="#E11D48" />
        <Text className="text-center text-sm font-normal text-rose-600">
          No fue posible cargar el detalle del ticket.
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

  return (
    <>
      <ScrollView
        className="w-full flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-4 pb-10">
        <VStack className="w-full gap-4">
          <ReceiptHero
            merchantName={hero.merchantName}
            totalLabel={hero.totalLabel}
            currencyCode={hero.currencyCode}
            dateLabel={hero.dateLabel}
            isBillable={hero.isBillable}
            hasBillingData={hero.hasBillingData}
          />

          <ReceiptImageBanner
            fileUrl={detail.fileUrl}
            onPress={() => setSelectedImage(imageSource)}
          />

          <ReceiptItemsList
            items={detail.items}
            totals={detail.totals}
            paymentMethodLabel={detail.payment.methodDescription}
          />

          <ReceiptTransactionData
            payment={detail.payment}
            transaction={detail.transaction}
            merchant={detail.merchant}
            paymentLabel={paymentLabel}
          />

          <ReceiptContextNotes notes={detail.contextNotes} />
        </VStack>
      </ScrollView>

      <ImageViewerModal
        source={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
