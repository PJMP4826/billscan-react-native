export interface BillingData {
  isBillable: boolean;
  hasQrCode: boolean;
  billingUrl: string | null;
  billingCode: string | null;
  barcode: string | null;
  expirationDate: string | null;
  billingMetadata: Record<string, string> | null;
}
