export const getLS = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const setLS = <T,>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLS = (key: string) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};
