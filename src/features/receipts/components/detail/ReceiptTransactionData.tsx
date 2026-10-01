import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { MerchantData } from "@/src/features/receipts/application/dtos/receipt/merchant-data.dto";
import type { PaymentInfo } from "@/src/features/receipts/application/dtos/receipt/payment-info.dto";
import type { TransactionMetadata } from "@/src/features/receipts/application/dtos/receipt/transaction-metadata.dto";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface ReceiptTransactionDataProps {
  payment: PaymentInfo;
  transaction: TransactionMetadata;
  merchant: MerchantData;
  /** Etiqueta completa ya construida: "Efectivo (01 - SAT Efectivo)". */
  paymentLabel: string | null;
}

interface InfoFieldProps {
  label: string;
  value: string;
  breakAll?: boolean;
}

function InfoField({ label, value, breakAll }: InfoFieldProps) {
  return (
    <VStack className="w-full gap-1">
      <Text className="text-xs font-normal text-slate-400">{label}</Text>

      <HStack className="w-full flex-row items-start">
        <Text
          className={`min-w-0 flex-1 text-sm font-medium text-slate-700 ${
            breakAll ? "break-all" : ""
          }`}>
          {value}
        </Text>
      </HStack>
    </VStack>
  );
}

/** Une los datos de caja/operador disponibles; `null` si no hay ninguno. */
const buildOperatorLabel = (posId: string | null, cashier: string | null) => {
  const parts = [posId, cashier].filter(Boolean);
  return parts.length > 0 ? parts.join(" • ") : null;
};

/**
 * Tarjeta "Datos de la transacción": método de pago, folio,
 * caja/operador y sucursal emisora.
 */
export function ReceiptTransactionData({
  payment,
  transaction,
  merchant,
  paymentLabel,
}: ReceiptTransactionDataProps) {
  const operatorLabel = buildOperatorLabel(
    transaction.posId,
    transaction.cashier,
  );

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300/40 sm:p-5">
      <VStack className="w-full gap-4">
        {/* Encabezado */}
        <HStack className="w-full flex-row items-center gap-3">
          <View className="h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF]">
            <Ionicons name="receipt-outline" size={18} color="#1D4ED8" />
          </View>
          <Heading className="min-w-0 flex-1 text-base font-semibold text-slate-800 sm:text-lg">
            Datos de la transacción
          </Heading>
        </HStack>

        {/* Método de pago */}
        <VStack className="w-full gap-1">
          <Text className="text-xs font-normal text-slate-400">
            Método de Pago Detectado
          </Text>
          <HStack className="flex-row items-center gap-2">
            <View className="h-5 w-7 items-center justify-center rounded-[3px] bg-[#16A34A]">
              <Ionicons name="cash-outline" size={12} color="white" />
            </View>
            <Text className="min-w-0 flex-1 text-sm font-medium text-slate-700">
              {paymentLabel ?? payment.methodDescription}
            </Text>
          </HStack>

          {/* Datos opcionales de tarjeta / autorización */}
          {payment.cardLastFour ? (
            <Text className="text-xs font-normal text-slate-400">
              {`Terminación: •••• ${payment.cardLastFour}`}
            </Text>
          ) : null}
          {payment.authorizationCode ? (
            <Text className="text-xs font-normal text-slate-400">
              {`Autorización: ${payment.authorizationCode}`}
            </Text>
          ) : null}
        </VStack>

        {transaction.ticketNumber ? (
          <>
            <Divider className="bg-slate-200" />
            <InfoField
              label="Folio Ticket / Transacción"
              value={`TC# ${transaction.ticketNumber}`}
              breakAll
            />
          </>
        ) : null}

        {operatorLabel ? (
          <>
            <Divider className="bg-slate-200" />
            <VStack className="w-full gap-1">
              <Text className="text-xs font-normal text-slate-400">
                Caja y Operador
              </Text>
              <HStack className="w-full flex-row items-start gap-2">
                <Ionicons name="calculator-outline" size={16} color="#64748B" />
                <Text className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                  {operatorLabel}
                </Text>
              </HStack>
            </VStack>
          </>
        ) : null}

        {/* Sucursal: si no hay dirección, la fila completa se oculta */}
        {merchant.address ? (
          <>
            <Divider className="bg-slate-200" />
            <VStack className="w-full gap-1">
              <Text className="text-xs font-normal text-slate-400">
                Sucursal Emisora
              </Text>
              <HStack className="w-full flex-row items-start gap-2">
                <Ionicons name="location-outline" size={16} color="#64748B" />
                <VStack className="min-w-0 flex-1 gap-1">
                  <Text className="text-sm font-medium text-slate-700">
                    {merchant.name}
                  </Text>
                  <Text className="text-xs font-normal text-slate-400">
                    {merchant.address}
                  </Text>
                  {merchant.taxId ? (
                    <Text className="text-xs font-normal text-slate-400">
                      {`RFC: ${merchant.taxId}`}
                    </Text>
                  ) : null}
                </VStack>
              </HStack>
            </VStack>
          </>
        ) : null}
      </VStack>
    </Card>
  );
}
