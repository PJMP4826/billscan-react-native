export const toSentenceCase = (text: string) => {
  if (!text) return '';
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};