type ClerkErrorLike = {
  message?: string;
  longMessage?: string;
  errors?: { message?: string; longMessage?: string }[];
};

export function getClerkErrorMessage(error: unknown, fallback: string) {
  const clerkError = error as ClerkErrorLike | undefined;
  const first = clerkError?.errors?.[0];
  return (
    first?.longMessage ??
    first?.message ??
    clerkError?.longMessage ??
    clerkError?.message ??
    fallback
  );
}
