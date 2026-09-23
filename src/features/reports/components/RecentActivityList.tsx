import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useRecentActivity } from "@/src/features/reports/application/useRecentActivity";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { ImageViewerModal } from "@/src/shared/components/ImageViewerModal";

export function RecentActivityList() {
  const { recentActivity, isLoading, isError } = useRecentActivity();

  // Estado para guardar la URL de la imagen que se va a mostrar en el modal
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  return (
    <>
      <Card className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-300/30">
        {/* Cabecera del componente */}
        <View className="mb-2 flex-row items-center justify-between">
          <Heading className="text-[22px] font-semibold tracking-tight text-slate-900">
            Actividad Reciente
          </Heading>
          <Pressable hitSlop={10}>
            <Text className="text-sm font-semibold text-[#1E40AF]">
              Ver todo
            </Text>
          </Pressable>
        </View>

        {/* Scroll interno para la lista vertical */}
        <ScrollView
          className="max-h-70"
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}>
          {isLoading && (
            <View className="py-8 items-center justify-center">
              <Text className="text-sm font-medium text-slate-500">
                Consultando actividad reciente...
              </Text>
            </View>
          )}

          {!isLoading && isError && (
            <View className="py-8 items-center justify-center">
              <Text className="text-sm font-medium text-rose-600">
                No fue posible cargar la actividad reciente.
              </Text>
            </View>
          )}

          {!isLoading && !isError && recentActivity.length === 0 && (
            <View className="py-8 items-center justify-center">
              <Text className="text-sm font-medium text-slate-500">
                No hay actividad reciente para mostrar.
              </Text>
            </View>
          )}

          {!isLoading &&
            !isError &&
            recentActivity.map((item, index) => {
              const isLast = index === recentActivity.length - 1;

              return (
                <View
                  key={`${item.merchant}-${item.createdAtLabel}-${item.totalLabel}-${index}`}
                  className={`flex-row items-center justify-between gap-4 py-4 ${
                    !isLast ? "border-b border-slate-100" : ""
                  }`}>
                  {/* Grupo Izquierdo: Imagen y Textos */}
                  <View className="flex-1 flex-row items-center gap-3 overflow-hidden">
                    {/* ENVOLVEMOS LA IMAGEN EN UN PRESSABLE PARA ABRIR EL MODAL */}
                    <Pressable
                      onPress={() => setSelectedImageUrl(item.fileUrl)}
                      className="h-16 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                      <Image
                        source={{ uri: item.fileUrl }}
                        resizeMode="cover"
                        className="h-full w-full"
                      />
                    </Pressable>

                    {/* Contenedor de los textos */}
                    <View className="flex-1 justify-center gap-1">
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="grow-0">
                        <Text className="text-[16px] font-medium text-slate-800 pr-2">
                          {item.merchant}
                        </Text>
                      </ScrollView>
                      <Text className="text-[13px] font-medium text-slate-400">
                        {item.createdAtLabel}
                      </Text>
                    </View>
                  </View>

                  {/* Grupo Derecho: Total y Etiqueta */}
                  <View className="items-end justify-center gap-1.5 shrink-0">
                    <Text className="text-[16px] font-bold tracking-tight text-slate-900">
                      {item.totalLabel}
                    </Text>

                    <View className="rounded bg-[#EFF6FF] px-2 py-0.5">
                      <Text className="text-[11px] font-semibold text-[#2563EB]">
                        Listo para Facturar
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </ScrollView>

        {isError && (
          <View className="mt-4 flex-row items-center gap-2 rounded-2xl bg-rose-50 px-3 py-2">
            <Ionicons name="alert-circle-outline" size={18} color="#e11d48" />
            <Text className="text-sm font-medium text-rose-700 flex-1">
              Revisa la conexión e intenta refrescar la pantalla.
            </Text>
          </View>
        )}
      </Card>

      <ImageViewerModal
        imageUrl={selectedImageUrl}
        onClose={() => setSelectedImageUrl(null)}
      />
    </>
  );
}
