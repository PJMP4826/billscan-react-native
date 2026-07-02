export const queryKeys = {
  deductibleExpenses: {
    detail: () => ["reports", "deductible-expenses"] as const,
  },
} as const;
