import { Badge, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { InvoiceHeroViewModel } from "@/src/features/invoices/application/useInvoiceDetail";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface InvoiceHeroProps {
  hero: InvoiceHeroViewModel;
}

/**
 * Encabezado del CFDI: icono de documento fiscal, emisor, total, fecha/hora,
 * serie/folio y el badge del tipo de comprobante.
 */
export function InvoiceHero({ hero }: InvoiceHeroProps) {
  return (
    <VStack className="w-full items-center gap-2 pt-1">
      {/* Icono del emisor */}
      <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF]">
        <Ionicons name="document-text-outline" size={26} color="#1D4ED8" />
      </View>

      {/* Nombre / razón social del emisor */}
      <HStack className="flex-row items-center justify-center gap-1.5 px-4">
        <Heading className="text-xl font-bold text-slate-900" isTruncated>
          {hero.issuerName}
        </Heading>
      </HStack>

      {/* Total */}
      <HStack className="flex-row items-end justify-center gap-1">
        <Text className="shrink text-[40px] font-bold leading-none text-slate-950">
          {hero.totalLabel}
        </Text>
        <Text className="pb-1 text-base font-medium text-slate-400">
          {hero.currencyCode}
        </Text>
      </HStack>

      {/* Fecha y hora de emisión */}
      {hero.dateLabel ? (
        <HStack className="flex-row items-center justify-center gap-1.5">
          <Ionicons name="time-outline" size={15} color="#64748B" />
          <Text className="text-sm font-normal text-slate-500">
            {hero.dateLabel}
          </Text>
        </HStack>
      ) : null}

      {/* Serie / folio */}
      <HStack className="flex-row items-center justify-center gap-1.5">
        <Ionicons name="pricetag-outline" size={15} color="#64748B" />
        <Text className="text-sm font-normal text-slate-500">
          {hero.serieFolioLabel}
        </Text>
      </HStack>

      {/* Badge del tipo de comprobante (solo si la API lo reporta) */}
      {hero.tipoComprobanteLabel ? (
        <Badge
          action="info"
          variant="outline"
          size="md"
          className="mt-1 self-center">
          <Ionicons name="shield-checkmark-outline" size={14} color="#1D4ED8" />
          <BadgeText action="info">
            {`TIPO: ${hero.tipoComprobanteLabel}`}{" "}
          </BadgeText>
        </Badge>
      ) : null}
    </VStack>
  );
}
