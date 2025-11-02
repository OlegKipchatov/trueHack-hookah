"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";
import { BowlForm } from "@/features/upsert-bowl";
import { useBowls, type Bowl } from "@/entities/bowl";
import { EmptyMessage } from "@/shared/ui/empty-message";
import { useTranslation } from "@/shared/lib/i18n/provider";

export type EditBowlPageProps = {};

const EditBowlContent = ({}: EditBowlPageProps) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { bowls, updateBowl, isLoading } = useBowls();
  const router = useRouter();
  const { t: translate } = useTranslation();

  const bowl = bowls.find((b) => b.id === id);

  const handleSubmit = (b: Bowl) => {
    updateBowl(b);
    router.push(`/bowls/view?id=${b.id}`);
  };

  const status = !isLoading && !bowl && (
    <EmptyMessage color="danger" variant="solid">
      {translate("bowl.edit.notFound")}
    </EmptyMessage>
  );

  return (
    <Page isLoading={isLoading} status={status}>
      <PageTitle withBackButton>{translate("bowl.actions.edit")}</PageTitle>
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
