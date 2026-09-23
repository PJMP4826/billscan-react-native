export const queryKeys = {
  receiptsCount: {
    detail: () => ["reports", "receipts-count"] as const,
  },
  monthlyInvoicing: {
    detail: (period: string) =>
      ["reports", "monthly-invoicing", period] as const,
  },
  recentActivity: {
    list: () => ["reports", "recent-activity"] as const,
  },
} as const;
