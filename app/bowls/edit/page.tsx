"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "@heroui/react";

import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";
import { BowlForm } from "@/features/upsert-bowl";
import { useBowls, type Bowl } from "@/entities/bowl";

export type EditBowlPageProps = {};

const EditBowlPage = ({}: EditBowlPageProps) => {
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
    <Alert color="danger" variant="solid">
      Чаша для редактирования не найдена
    </Alert>
  );

  return (
    <Page isLoading={isLoading} status={status}>
      {bowl && (
        <>
          <PageTitle withBackButton>Edit Bowl</PageTitle>
          <BowlForm bowl={bowl} onSubmit={handleSubmit} />
        </>
      )}
    </Page>
  );
};

export default EditBowlPage;
