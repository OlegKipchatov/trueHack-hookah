"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader } from "@heroui/react";

import { BowlForm } from "@/features/upsert-bowl/ui/bowl-form";
import { useBowls, type Bowl } from "@/entities/bowl";

export type EditBowlPageProps = {};

const EditBowlPage = ({}: EditBowlPageProps) => {
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
    return null;
  }

  return (
    <Modal defaultOpen hideCloseButton isDismissable={false} motionProps={{}}>
      <ModalContent>
        <ModalHeader>Edit Bowl</ModalHeader>
        <BowlForm bowl={bowl} onSubmit={handleSubmit} />
      </ModalContent>
    </Modal>
  );
};

export default EditBowlPage;

