import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
