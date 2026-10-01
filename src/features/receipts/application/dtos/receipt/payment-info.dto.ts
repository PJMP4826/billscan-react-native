import type {
  SatPaymentMethodCode,
  SatPaymentMethodDescription,
} from "@/src/features/receipts/domain/enums/sat-payment-method-code.enum";

export interface PaymentInfo {
  methodCode: SatPaymentMethodCode;
  methodDescription: SatPaymentMethodDescription;
  cardLastFour: string | null;
  authorizationCode: string | null;
}
