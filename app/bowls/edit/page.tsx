"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Alert, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Suspense } from "react";

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
      <div className="p-6">
        <Alert color="danger" variant="solid">
          Чаша для редактирования не найдена
        </Alert>
      </div>
    );
  }

  return (
    <section className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Button
          isIconOnly
          aria-label="Back"
          variant="light"
          onPress={() => router.push("/user")}
        >
          <Icon icon="akar-icons:arrow-left" width={16} />
        </Button>
        <h1>Edit Bowl</h1>
      </div>
      <BowlForm bowl={bowl} onSubmit={handleSubmit} />
    </section>
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
