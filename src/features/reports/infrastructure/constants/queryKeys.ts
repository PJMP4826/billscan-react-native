export const queryKeys = {
  deductibleExpenses: {
    detail: () => ["reports", "deductible-expenses"] as const,
  },
  recentActivity: {
    list: () => ["reports", "recent-activity"] as const,
  },
} as const;
