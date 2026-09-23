export const queryKeys = {
  receipts: {
    list: (page: number, pageSize: number) =>
      ["receipts", "list", page, pageSize] as const,
  },
} as const;
