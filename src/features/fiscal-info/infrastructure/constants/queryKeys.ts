export const queryKeys = {
  fiscalInfo: {
    all: ['fiscalInfo'] as const,
    detail: () => [...queryKeys.fiscalInfo.all, 'detail'] as const,
  },
}