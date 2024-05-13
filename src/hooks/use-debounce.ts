import { useRef, useCallback } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef<T | null>(null);
  callbackRef.current = callback;

  const debounce = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        if (callbackRef.current) {
          callbackRef.current(...args);
        }
        timeoutRef.current = null;
      }, delay);
    },
    [delay]
  );

  return debounce;
};
