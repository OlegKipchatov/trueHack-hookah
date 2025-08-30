/**
 * Получает значение из localStorage по ключу
 * @template T - Тип возвращаемого значения
 * @param {string} key - Ключ для получения значения
 * @param {T} fallback - Значение по умолчанию, если ключ не найден или произошла ошибка
 * @returns {T} Значение из localStorage или fallback
 */
export const getLocalStorageItem = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  const raw = localStorage.getItem(key);

  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

/**
 * Сохраняет значение в localStorage по ключу
 * @template T - Тип сохраняемого значения
 * @param {string} key - Ключ для сохранения значения
 * @param {T} value - Значение для сохранения
 */
export const setLocalStorageItem = <T>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Удаляет значение из localStorage по ключу
 * @param {string} key - Ключ для удаления значения
 */
export const removeLocalStorageItem = (key: string) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};
