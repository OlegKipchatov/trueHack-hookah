"use client";

import { Link } from "@heroui/react";

import { useTranslation } from "@/shared/lib/i18n/provider";
import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";

export type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const { t: translate } = useTranslation();

  return (
    <Page className="flex flex-col items-center justify-center text-center">
      <PageTitle>{translate("app.name")}</PageTitle>
      <h2 className="text-lg max-w-xl">{translate("app.tagline")}</h2>
      <p className="mt-8 text-sm font-medium tracking-wide text-gray-500">
        {translate("app.cta")}
      </p>
      <p className="mt-6 text-sm">
        {translate("app.followPrefix")}{" "}
        <Link
          className="underline"
          href="https://t.me/+BjywrBIpCoQ1YTA6"
          rel="noopener noreferrer"
          target="_blank"
        >
          {translate("app.followLink")}
        </Link>{" "}
        {translate("app.followSuffix")}
      </p>
    </Page>
  );
};

export default HomePage;
