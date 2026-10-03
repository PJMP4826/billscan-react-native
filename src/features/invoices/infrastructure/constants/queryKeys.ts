export const queryKeys = {
  invoices: {
    list: (page: number, pageSize: number) =>
      ["invoices", "list", page, pageSize] as const,
    detail: (receiptUuid: string) =>
      ["invoices", "detail", receiptUuid] as const,
  },
} as const;
