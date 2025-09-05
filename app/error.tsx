"use client";

import { useEffect } from "react";

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

  return (
    <Page>
      <PageTitle>Something went wrong!</PageTitle>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </Page>
  );
};

export default ErrorPage;
