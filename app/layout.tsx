import "@/styles/globals.css";
import type { ReactNode } from "react";

import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import en from "@/shared/config/i18n/en.json";
import { fontSans } from "@/shared/config/fonts";
import { Navbar } from "@/widgets/navbar";

const APP_NAME = "BowlBuilder";
const DEFAULT_APP_DESCRIPTION = en.app.metadata.description;

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s - ${APP_NAME}`,
  },
  description: DEFAULT_APP_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl flex-grow grid">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
