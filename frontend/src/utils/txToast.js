import toast from "react-hot-toast";

export function updateTxToast(
  toastIdRef,
  { isPending, isConfirming, isConfirmed, error, hash, messages = {} }
) {
  const {
    pending = "Transaction submitted...",
    confirming = "Confirming transaction...",
    success = "Transaction successful!",
    cancelled = "Transaction cancelled",
  } = messages;

  if (toastIdRef.current) {
    toast.dismiss(toastIdRef.current);
  }

  if (isPending) {
    toastIdRef.current = toast.loading(pending);
    return;
  }
  if (isConfirming) {
    toastIdRef.current = toast.loading(confirming);
    return;
  }
  if (isConfirmed) {
    const successMessage = success;
    toastIdRef.current = toast.success(successMessage);
    return;
  }
  if (error) {
    const isUserRejected =
      error?.code === 4001 ||
      /rejected|denied|cancelled/i.test(error?.message || "");
    const shortError = error?.shortMessage || error?.message || "Unknown error";
    const displayed = isUserRejected
      ? cancelled
      : `Error: ${shortError.slice(0, 200)}`;
    toastIdRef.current = toast.error(displayed);
  }
}
