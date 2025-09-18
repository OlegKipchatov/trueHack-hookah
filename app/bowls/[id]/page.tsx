"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { useBowls } from "@/entities/bowl";
import { BowlCardChip } from "@/entities/bowl/ui/bowl-card-chip";
import { Button } from "@/shared/ui/button";
import { EmptyMessage } from "@/shared/ui/empty-message";
import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";

export type BowlDetailPageProps = {};

const BowlDetailPage = ({}: BowlDetailPageProps) => {
  const params = useParams<{ id?: string | string[] }>();
  const router = useRouter();
  const { bowls, removeBowl, isLoading } = useBowls();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const param = params?.id;
  const bowlId = Array.isArray(param) ? param[0] : (param ?? "");

  const bowl = bowls.find((item) => item.id === bowlId);

  const status =
    !isLoading && !bowl ? (
      <EmptyMessage color="danger" variant="solid">
        Чаша не найдена
      </EmptyMessage>
    ) : undefined;

  const handleDelete = () => {
    if (!bowl) return;

    removeBowl(bowl.id);
    router.push("/user");
  };

  return (
    <>
      <Page isLoading={isLoading} status={status}>
        {bowl && (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <PageTitle withBackButton className="mb-0">
                {bowl.name}
              </PageTitle>
              <div className="flex gap-2">
                <Link href={`/bowls/edit?id=${bowl.id}`}>
                  <Button
                    color="primary"
                    startContent={<Icon icon="akar-icons:edit" width={16} />}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  color="danger"
                  startContent={<Icon icon="akar-icons:cross" width={16} />}
                  onPress={onOpen}
                >
                  Delete
                </Button>
              </div>
            </div>
            <section>
              <h2 className="mb-3 text-lg font-semibold">Tobaccos</h2>
              {bowl.tobaccos.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {bowl.tobaccos.map((tobacco) => (
                    <BowlCardChip key={tobacco.name} tobacco={tobacco} />
                  ))}
                </div>
              ) : (
                <EmptyMessage className="mt-2 w-full max-w-md text-left">
                  В этой чаше нет табаков
                </EmptyMessage>
              )}
            </section>
          </>
        )}
      </Page>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete bowl</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete {bowl?.name}?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleDelete();
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BowlDetailPage;
