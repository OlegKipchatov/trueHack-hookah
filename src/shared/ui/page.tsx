import type { ReactNode } from "react";

import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import clsx from "clsx";

import { EmptyMessage } from "./empty-message";

export type PageProps = {
  children: ReactNode;
  className?: string;
  status?: ReactNode;
};

export const Page = ({ children, className, status }: PageProps) => {
  return (
    <section className={clsx("p-6", className)}>
      {status && (
        <EmptyMessage className="mb-4 mt-0" color="danger">
          {status}
        </EmptyMessage>
      )}
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] w-full items-center justify-center py-10">
            <Spinner size="lg" />
          </div>
        }
      >
        {children}
      </Suspense>
    </section>
  );
};
