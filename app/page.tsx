"use client";

import { Link } from "@heroui/react";

import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";

export type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  return (
    <Page className="flex flex-col items-center justify-center text-center">
      <PageTitle>BowlBuilder</PageTitle>
      <h2 className="text-lg max-w-xl">
        Сервис для создания и сохранения собственных миксов для кальянных чаш
      </h2>
      <p className="mt-8 text-sm font-medium tracking-wide text-gray-500">
        Создайте свою идеальную чашу.
      </p>
      <p className="mt-6 text-sm">
        Подписывайтесь на{" "}
        <Link
          className="underline"
          href="https://t.me/+BjywrBIpCoQ1YTA6"
          rel="noopener noreferrer"
          target="_blank"
        >
          канал разработки
        </Link>{" "}
        и следите за обновлениями.
      </p>
    </Page>
  );
};

export default HomePage;
