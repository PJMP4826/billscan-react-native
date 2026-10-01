import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, View, type ImageSourcePropType } from "react-native";

const DEFAULT_RECEIPT_IMAGE: ImageSourcePropType = require("../../../../../assets/images/Image-not-found.png");

interface ReceiptImageBannerProps {
  /** URL del ticket original. Si viene vacío se usa la imagen por defecto. */
  fileUrl?: string | null;
  onPress: () => void;
}

/**
 * Banner panorámico del ticket original con overlay oscuro.
 * Pensado para conectarse a un visor a pantalla completa (`ImageViewerModal`).
 */
export function ReceiptImageBanner({
  fileUrl,
  onPress,
}: ReceiptImageBannerProps) {
  const source: ImageSourcePropType = fileUrl
    ? { uri: fileUrl }
    : DEFAULT_RECEIPT_IMAGE;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="imagebutton"
      accessibilityLabel="Toca para expandir el ticket original"
      className="h-28 w-full overflow-hidden rounded-2xl bg-slate-200">
      <Image source={source} resizeMode="cover" className="h-full w-full" />

      {/* Overlay oscuro absoluto */}
      <View className="absolute inset-0 items-center justify-center gap-2 bg-black/50">
        <View className="h-9 w-9 items-center justify-center rounded-full bg-white/25">
          <Ionicons name="search" size={18} color="white" />
        </View>

        <HStack className="flex-row items-center gap-1.5 px-6">
          <Text className="text-center text-xs font-semibold text-white">
            Toca para expandir el ticket original
          </Text>
        </HStack>
      </View>
    </Pressable>
  );
}
