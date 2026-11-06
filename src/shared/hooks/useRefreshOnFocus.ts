import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

export function useRefreshOnFocus(refetch: () => void) {
  const isFirstFocus = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }

      refetch();
    }, [refetch]),
  );
}
