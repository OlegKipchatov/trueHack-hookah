"use client";

import { useMemo } from "react";

import { useTranslation } from "@/shared/lib/i18n/provider";
import { Button } from "@/shared/ui/button";

export type LanguageSwitchProps = {
  className?: string;
};

export const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
  const { language, setLanguage, t: translate } = useTranslation();
  const nextLanguage = language === "en" ? "ru" : "en";

  const hintKey = useMemo(
    () => `languageSwitch.switchTo.${nextLanguage}`,
    [nextLanguage],
  );
  const labelKey = useMemo(
    () =>
      language === "en"
        ? "languageSwitch.englishShort"
        : "languageSwitch.russianShort",
    [language],
  );

  return (
    <Button
      aria-label={translate(hintKey)}
      className={className}
      hint={translate(hintKey)}
      size="sm"
      variant="light"
      onPress={() => setLanguage(nextLanguage)}
    >
      {translate(labelKey)}
    </Button>
  );
};
