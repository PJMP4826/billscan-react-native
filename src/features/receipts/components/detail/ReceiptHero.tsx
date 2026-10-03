import { Badge, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface ReceiptHeroProps {
  merchantName: string;
  /** Total ya formateado a moneda (ej. "$139.90"). */
  totalLabel: string;
  /** Código ISO de la moneda mostrado como sufijo (ej. "MXN"). */
  currencyCode?: string;
  /** Fecha ya construida: "24 de Octubre, 2024 • 14:32 hrs". */
  dateLabel: string | null;
  isBillable: boolean;
  /** `false` cuando la API no devolvió el bloque `billing` (se oculta el badge). */
  hasBillingData?: boolean;
}

/**
 * Encabezado del ticket: icono del comercio, nombre, total, fecha/hora y
 * el badge condicional de facturabilidad.
 */
export function ReceiptHero({
  merchantName,
  totalLabel,
  currencyCode,
  dateLabel,
  isBillable,
  hasBillingData = true,
}: ReceiptHeroProps) {
  return (
    <VStack className="w-full items-center gap-2 pt-1">
      {/* Icono del comercio */}
      <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF]">
        <Ionicons name="storefront-outline" size={26} color="#1D4ED8" />
      </View>

      {/* Nombre del comercio (con check de verificado, si viene) */}
      <HStack className="flex-row items-center justify-center gap-1.5 px-4">
        <Heading className="text-xl font-bold text-slate-900" isTruncated>
          {merchantName} {"  "}
        </Heading>
      </HStack>

      {/* Total */}
      <HStack className="flex-row items-end justify-center gap-1">
        <Text className="shrink text-[40px] font-bold leading-none text-slate-950">
          {totalLabel}
        </Text>
        {currencyCode ? (
          <Text className="pb-1 text-base font-medium text-slate-400">
            {currencyCode}
          </Text>
        ) : null}
      </HStack>

      {/* Fecha y hora */}
      {dateLabel ? (
        <HStack className="flex-row items-center justify-center gap-1.5">
          <Ionicons name="time-outline" size={15} color="#64748B" />
          <Text className="text-sm font-normal text-slate-500">
            {dateLabel}
          </Text>
        </HStack>
      ) : null}

      {/* Badge condicional de facturabilidad (oculto si no hay billing) */}
      {hasBillingData ? (
        <Badge
          action={isBillable ? "success" : "muted"}
          variant="outline"
          size="md"
          className="mt-1 self-center">
          <Ionicons
            name={isBillable ? "checkmark-circle" : "close-circle-outline"}
            size={14}
            color={isBillable ? "#16A34A" : "#64748B"}
          />
          <BadgeText action={isBillable ? "success" : "muted"}>
            {isBillable ? "FACTURABLE (SAT CFDI 4.0)" : "NO FACTURABLE"} {"   "}
          </BadgeText>
          {isBillable ? (
            <Ionicons name="chevron-forward" size={14} color="#15803D" />
          ) : null}
        </Badge>
      ) : null}
    </VStack>
  );
}
