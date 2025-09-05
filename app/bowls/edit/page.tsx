"use client";

import { useRouter, useSearchParams } from "next/navigation";

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

  return (
    <Page isLoading={isLoading}>
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
