import { useEffect, useState } from "react";

export const useLocalStorage = <T,>(key: string, initial: T) => {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw));
    } catch {
      /* noop */
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* noop */
    }
  }, [key, value]);

  const remove = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  };

  return [value, setValue, remove] as const;
};
