import type { ReactNode } from "react";

export type AbstractIntlMessages = {
  [key: string]: string | number | AbstractIntlMessages;
};

export type TranslateValues = Record<
  string,
  string | number | undefined | null
>;

export type TranslateFn = (key: string, values?: TranslateValues) => string;

export type NextIntlClientProviderProps = {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

export declare const NextIntlClientProvider: (
  props: NextIntlClientProviderProps,
) => JSX.Element;

export declare const useTranslations: (namespace?: string) => TranslateFn;

export declare const useLocale: () => string;
