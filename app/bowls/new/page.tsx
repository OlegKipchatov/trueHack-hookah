"use client";

import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader } from "@heroui/react";

import { BowlForm } from "@/features/upsert-bowl/ui/bowl-form";
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
    <Modal defaultOpen hideCloseButton isDismissable={false} motionProps={{}}>
      <ModalContent>
        <ModalHeader>Create Bowl</ModalHeader>
        <BowlForm onSubmit={handleSubmit} />
      </ModalContent>
    </Modal>
  );
};

export default NewBowlPage;
