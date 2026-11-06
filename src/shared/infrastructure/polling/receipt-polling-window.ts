export const RECEIPT_POLLING_WINDOW_MS = 60_000;

let activeUntil = 0;

export const receiptPollingWindow = {
  start(durationMs: number = RECEIPT_POLLING_WINDOW_MS) {
    activeUntil = Date.now() + durationMs;
  },
  stop() {
    activeUntil = 0;
  },
  isActive() {
    return Date.now() < activeUntil;
  },
};
