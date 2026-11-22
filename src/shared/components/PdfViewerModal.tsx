import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import Pdf from "react-native-pdf";
import type { PdfViewerModalProps } from "@/src/shared/components/PdfViewerModal.types";

export function PdfViewerModal({ uri, onClose }: PdfViewerModalProps) {
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [uri]);

  // El contenedor ocupa el 92% del ancho; `Pdf` necesita un ancho numérico.
  const pdfWidth = width * 0.92;

  return (
    <Modal isOpen={!!uri} onClose={onClose} className="flex-1">
      <ModalBackdrop className="bg-black/75" />

      <ModalContent className="relative h-full w-full items-center justify-center bg-transparent p-0 shadow-none">
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Cerrar visor de PDF"
          className="absolute right-6 top-17 z-50 h-10 w-10 items-center justify-center rounded-full bg-black/60">
          <Ionicons name="close" size={24} color="white" />
        </Pressable>

        {uri ? (
          <View className="h-[85%] w-[92%] overflow-hidden rounded-3xl bg-white">
            <Pdf
              source={{ uri, cache: true }}
              style={{ flex: 1, width: pdfWidth }}
              onLoadComplete={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />

            {isLoading && !hasError ? (
              <View className="absolute inset-0 items-center justify-center gap-3 bg-white">
                <ActivityIndicator size="large" color="#1E40AF" />
                <Text className="text-sm font-normal text-slate-500">
                  Cargando PDF...
                </Text>
              </View>
            ) : null}

            {hasError ? (
              <View className="absolute inset-0 items-center justify-center gap-3 bg-white px-6">
                <Ionicons
                  name="alert-circle-outline"
                  size={30}
                  color="#E11D48"
                />
                <Text className="text-center text-sm font-normal text-rose-600">
                  No fue posible cargar el PDF.
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </ModalContent>
    </Modal>
  );
}
