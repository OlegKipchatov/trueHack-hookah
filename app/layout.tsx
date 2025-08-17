import type { Metadata } from "next";
import "@heroui/react/styles.css";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";

export const metadata: Metadata = {
  title: "BowlBuilder",
  description:
    "Сервис для создания и сохранения собственных миксов для кальянных чаш",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}
