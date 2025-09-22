"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

export type ViewBowlPageProps = {};

const ViewBowlContent = ({}: ViewBowlPageProps) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { bowls, removeBowl, isLoading } = useBowls();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const bowl = bowls.find((item) => item.id === id);

  const status = !isLoading && !bowl && (
    <EmptyMessage color="danger" variant="solid">
      Чаша не найдена
    </EmptyMessage>
  );

  const handleDelete = () => {
    if (!bowl) return;

    removeBowl(bowl.id);
    router.push("/user");
  };

  return (
    <Page isLoading={isLoading} status={status}>
      {bowl && (
        <>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
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
            <ul className="mx-auto w-full max-w-xl">
              {bowl.tobaccos.map((tobacco) => (
                <li
                  key={tobacco.name}
                  className="flex items-center justify-between border-b border-gray-200 py-3 text-lg dark:border-gray-700"
                >
                  <span>{tobacco.name}</span>
                  <span>{tobacco.percentage}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyMessage>Табаки отсутствуют</EmptyMessage>
          )}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Delete bowl</ModalHeader>
                  <ModalBody>
                    <p>Are you sure?</p>
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
      )}
    </Page>
  );
};

const ViewBowlPage = (props: ViewBowlPageProps) => {
  return (
    <Suspense>
      <ViewBowlContent {...props} />
    </Suspense>
  );
};

export default ViewBowlPage;
