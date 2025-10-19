"use client";

import { useEffect } from "react";

import { useTranslation } from "@/shared/lib/i18n/provider";
import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";

export type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  const { t: translate } = useTranslation();

  return (
    <Page>
      <PageTitle>{translate("error.title")}</PageTitle>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {translate("error.tryAgain")}
      </button>
    </Page>
  );
};

export default ErrorPage;
