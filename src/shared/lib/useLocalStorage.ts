import { useEffect, useState } from "react";

import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "./storage";

/**
 * Хук для работы с localStorage в React компонентах
 * @template T - Тип значения
 * @param {string} key - Ключ для хранения значения в localStorage
 * @param {T} initial - Начальное значение, если в localStorage ничего нет
 * @returns {[T, (value: T) => void, () => void]} Массив с тремя элементами:
 *   1. Текущее значение
 *   2. Функция для установки нового значения
 *   3. Функция для удаления значения из localStorage
 */
export const useLocalStorage = <T>(key: string, initial: T) => {
  const [value, setValue] = useState<T>(getLocalStorageItem<T>(key, initial));

  // При изменении ключа перезагружаем значение из localStorage
  useEffect(() => {
    setValue((prevValue) => {
      const storedValue = getLocalStorageItem<T>(key, prevValue);

      return storedValue;
    });
  }, [key]);

  // При изменении значения сохраняем его в localStorage
  useEffect(() => {
    setLocalStorageItem<T>(key, value);
  }, [key, value]);

  // Функция для удаления значения из localStorage
  const remove = () => {
    removeLocalStorageItem(key);
  };

  return [value, setValue, remove] as const;
};
