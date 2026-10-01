export const queryKeys = {
  receipts: {
    list: (page: number, pageSize: number, status?: string) =>
      ["receipts", "list", page, pageSize, status ?? "ALL"] as const,
    detail: (receiptUuid: string) =>
      ["receipts", "detail", receiptUuid] as const,
  },
} as const;
