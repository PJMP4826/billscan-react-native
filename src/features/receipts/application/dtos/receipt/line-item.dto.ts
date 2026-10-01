export interface LineItem {
  quantity: number;
  description: string;
  sku: string | null;
  unitPrice: string | null;
  totalPrice: string;
  discount: string | null;
  itemMetadata: Record<string, string> | null;
}
