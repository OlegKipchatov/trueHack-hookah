import type { ReactNode } from "react";

import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import clsx from "clsx";

export type PageProps = {
  children: ReactNode;
  className?: string;
  status?: ReactNode;
  isLoading?: boolean;
};

const Loading = () => (
  <div className="flex min-h-[50vh] w-full items-center justify-center py-10">
    <Spinner size="lg" />
  </div>
);

export const Page = ({ children, className, status, isLoading }: PageProps) => {
  return (
    <section className={clsx("p-6", className)}>
      {status}
      <Suspense fallback={<Loading />}>
        {isLoading ? <Loading /> : children}
      </Suspense>
    </section>
  );
};
