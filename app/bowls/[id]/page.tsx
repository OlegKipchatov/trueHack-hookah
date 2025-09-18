"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
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
import { Button } from "@/shared/ui/button";
import { EmptyMessage } from "@/shared/ui/empty-message";
import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";

export type BowlDetailPageProps = {};

const BowlDetailPage = ({}: BowlDetailPageProps) => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const { bowls, removeBowl, isLoading } = useBowls();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const bowl = bowls.find((item) => item.id === id);

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
                    isIconOnly
                    aria-label="Edit bowl"
                    hint="Edit bowl"
                    size="sm"
                  >
                    <Icon icon="akar-icons:edit" width={16} />
                  </Button>
                </Link>
                <Button
                  isIconOnly
                  aria-label="Delete bowl"
                  color="danger"
                  hint="Delete bowl"
                  size="sm"
                  onPress={onOpen}
                >
                  <Icon icon="akar-icons:cross" width={16} />
                </Button>
              </div>
            </div>
            {bowl.tobaccos.length > 0 ? (
              <ul className="w-full max-w-md divide-y divide-default-200 overflow-hidden rounded-large border border-default-200 bg-content1">
                {bowl.tobaccos.map((tobacco) => (
                  <li
                    key={tobacco.name}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-base font-medium text-default-700">
                      {tobacco.name}
                    </span>
                    <span className="text-sm text-default-500">
                      {tobacco.percentage}%
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyMessage className="mt-2 w-full max-w-md text-left">
                В этой чаше нет табаков
              </EmptyMessage>
            )}
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
