export const queryKeys = {
  receipts: {
    list: (page: number, pageSize: number, status?: string) =>
      ["receipts", "list", page, pageSize, status ?? "ALL"] as const,
  },
} as const;
