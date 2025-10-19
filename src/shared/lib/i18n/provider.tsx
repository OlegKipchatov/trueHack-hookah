"use client";

import type { ReactNode } from "react";
import type { AbstractIntlMessages } from "next-intl";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  NextIntlClientProvider,
  useTranslations as useIntlTranslations,
} from "next-intl";

import { useLocalStorage } from "../useLocalStorage";

import en from "@/shared/config/i18n/en.json";

const SUPPORTED_LANGUAGES = ["en", "ru"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export type TranslationDictionary = AbstractIntlMessages;

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

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const defaultContextValue: LanguageContextValue = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => undefined,
};

const LanguageContext =
  createContext<LanguageContextValue>(defaultContextValue);

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

  const contextValue = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: changeLanguage,
    }),
    [changeLanguage, language],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      <NextIntlClientProvider locale={language} messages={dictionary}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const translate = useIntlTranslations();
  const { language, setLanguage } = useContext(LanguageContext);

  return { language, setLanguage, t: translate };
};
