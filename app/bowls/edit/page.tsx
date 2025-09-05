"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Alert } from "@heroui/react";
import { Suspense } from "react";

import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";
import { BowlForm } from "@/features/upsert-bowl";
import { useBowls, type Bowl } from "@/entities/bowl";

export type EditBowlPageProps = {};

const Edit = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { bowls, updateBowl } = useBowls();
  const router = useRouter();

  const bowl = bowls.find((b) => b.id === id);

  const handleSubmit = (b: Bowl) => {
    updateBowl(b);
    router.push("/user");
  };

  if (!bowl) {
    return (
      <Page>
        <Alert color="danger" variant="solid">
          Чаша для редактирования не найдена
        </Alert>
      </Page>
    );
  }

  return (
    <Page>
      <PageTitle withBackButton>Edit Bowl</PageTitle>
      <BowlForm bowl={bowl} onSubmit={handleSubmit} />
    </Page>
  );
};

const EditBowlPage = ({}: EditBowlPageProps) => {
  return (
    <Suspense>
      <Edit />
    </Suspense>
  );
};

export default EditBowlPage;
