"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";
import { BowlForm } from "@/features/upsert-bowl";
import { useBowls, type Bowl } from "@/entities/bowl";
import { EmptyMessage } from "@/shared/ui/empty-message";

export type EditBowlPageProps = {};

const EditBowlContent = ({}: EditBowlPageProps) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { bowls, updateBowl, isLoading } = useBowls();
  const router = useRouter();

  const bowl = bowls.find((b) => b.id === id);

  const handleSubmit = (b: Bowl) => {
    updateBowl(b);
    router.push("/user");
  };

  const status = !isLoading && !bowl && (
    <EmptyMessage color="danger" variant="solid">
      Чаша для редактирования не найдена
    </EmptyMessage>
  );

  return (
    <Page isLoading={isLoading} status={status}>
      <PageTitle withBackButton>Edit Bowl</PageTitle>
      {bowl && <BowlForm bowl={bowl} onSubmit={handleSubmit} />}
    </Page>
  );
};

const EditBowlPage = (props: EditBowlPageProps) => {
  return (
    <Suspense>
      <EditBowlContent {...props} />
    </Suspense>
  );
};

export default EditBowlPage;
