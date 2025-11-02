"use client";

import type { ThemeProviderProps } from "next-themes";
import type { ReactNode } from "react";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { I18nProvider } from "@/shared/lib/i18n/provider";

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export const Providers = ({ children, themeProps }: ProvidersProps) => {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <I18nProvider>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </I18nProvider>
    </HeroUIProvider>
  );
};
