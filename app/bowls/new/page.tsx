"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

import { BowlForm } from "@/features/upsert-bowl";
import { useBowls, type Bowl } from "@/entities/bowl";

export type NewBowlPageProps = {};

const NewBowlPage = ({}: NewBowlPageProps) => {
  const { addBowl } = useBowls();
  const router = useRouter();

  const handleSubmit = (bowl: Bowl) => {
    addBowl(bowl);
    router.push("/user");
  };

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Button
          isIconOnly
          aria-label="Back"
          variant="light"
          onPress={() => router.push("/user")}
        >
          <Icon icon="akar-icons:arrow-left" width={16} />
        </Button>
        <h1>Create Bowl</h1>
      </div>
      <BowlForm onSubmit={handleSubmit} />
    </section>
  );
};

export default NewBowlPage;
