"use client";

import { useRouter } from "next/navigation";

import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";
import { BowlForm } from "@/features/upsert-bowl";
import { useBowls, type Bowl } from "@/entities/bowl";

export type NewBowlPageProps = {};

const NewBowlPage = ({}: NewBowlPageProps) => {
  const { addBowl, isLoading } = useBowls();
  const router = useRouter();

  const handleSubmit = (bowl: Bowl) => {
    addBowl(bowl);
    router.push("/user");
  };

  return (
    <Page isLoading={isLoading}>
      <PageTitle withBackButton>Create Bowl</PageTitle>
      <BowlForm onSubmit={handleSubmit} />
    </Page>
  );
};

export default NewBowlPage;
