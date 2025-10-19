"use client";

import type { ReactNode } from "react";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useLocalStorage } from "../useLocalStorage";

import en from "@/shared/config/i18n/en.json";

const SUPPORTED_LANGUAGES = ["en", "ru"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export type TranslationDictionary = Record<string, string>;

const LANGUAGE_STORAGE_KEY = "app-language";
const DEFAULT_LANGUAGE: Language = "en";

const fallbackDictionary = en as TranslationDictionary;

const dictionaryLoaders: Record<
  Language,
  () => Promise<TranslationDictionary>
> = {
  en: () =>
    import("@/shared/config/i18n/en.json").then(
      (module) => module.default as TranslationDictionary,
    ),
  ru: () =>
    import("@/shared/config/i18n/ru.json").then(
      (module) => module.default as TranslationDictionary,
    ),
};

export type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const defaultContextValue: I18nContextValue = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => undefined,
  t: (key: string) => fallbackDictionary[key] ?? key,
};

const I18nContext = createContext<I18nContextValue>(defaultContextValue);

export type I18nProviderProps = {
  children: ReactNode;
};

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setStoredLanguage] = useLocalStorage<Language>(
    LANGUAGE_STORAGE_KEY,
    DEFAULT_LANGUAGE,
  );
  const [dictionary, setDictionary] =
    useState<TranslationDictionary>(fallbackDictionary);

  useEffect(() => {
    let isMounted = true;

    const loadDictionary = async () => {
      const loader =
        dictionaryLoaders[language] ?? dictionaryLoaders[DEFAULT_LANGUAGE];

      try {
        const loadedDictionary = await loader();

        if (isMounted) {
          setDictionary(loadedDictionary);
        }
      } catch {
        if (isMounted) {
          setDictionary(fallbackDictionary);
        }
      }
    };

    loadDictionary();

    return () => {
      isMounted = false;
    };
  }, [language]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.lang = language;
  }, [language]);

  const translate = useCallback(
    (key: string) => dictionary[key] ?? key,
    [dictionary],
  );

  const changeLanguage = useCallback(
    (nextLanguage: Language) => {
      if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) {
        setStoredLanguage(DEFAULT_LANGUAGE);

        return;
      }

      setStoredLanguage(nextLanguage);
    },
    [setStoredLanguage],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage: changeLanguage,
      t: translate,
    }),
    [changeLanguage, language, translate],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => useContext(I18nContext);
