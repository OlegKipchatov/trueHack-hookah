import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/widgets/Header";

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
        <Header />
        {children}
      </body>
    </html>
  );
}
