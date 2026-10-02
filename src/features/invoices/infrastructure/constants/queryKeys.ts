export const queryKeys = {
  invoices: {
    list: (page: number, pageSize: number) =>
      ["invoices", "list", page, pageSize] as const,
  },
} as const;
