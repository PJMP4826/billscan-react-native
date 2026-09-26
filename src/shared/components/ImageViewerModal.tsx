import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, View, type ImageSourcePropType } from "react-native";

interface ImageViewerModalProps {
  source: ImageSourcePropType | null;
  onClose: () => void;
}

export function ImageViewerModal({ source, onClose }: ImageViewerModalProps) {
  return (
    <Modal isOpen={!!source} onClose={onClose} className="flex-1">
      {/* Fondo semitransparente con clase tailwind */}
      <ModalBackdrop className="bg-black/75" />

      <ModalContent className="relative h-full w-full items-center justify-center bg-transparent p-0 shadow-none">
        {/* Botón de cerrar */}
        <Pressable
          onPress={onClose}
          className="absolute right-6 top-17 z-50 h-10 w-10 items-center justify-center rounded-full bg-black/60">
          <Ionicons name="close" size={24} color="white" />
        </Pressable>

        {/* Contenedor de la Imagen */}
        {source ? (
          <View className="h-[85%] w-[92%] overflow-hidden rounded-3xl">
            <Image
              source={source}
              resizeMode="contain"
              className="h-full w-full"
            />
          </View>
        ) : null}
      </ModalContent>
    </Modal>
  );
}
