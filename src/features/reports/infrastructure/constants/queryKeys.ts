export const queryKeys = {
  receiptsCount: {
    detail: () => ["reports", "receipts-count"] as const,
  },
  recentActivity: {
    list: () => ["reports", "recent-activity"] as const,
  },
} as const;
