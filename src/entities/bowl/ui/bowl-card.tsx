"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import type { Bowl } from "../model/bowl";

import {
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/shared/ui/button";

export type BowlCardProps = {
  bowl: Bowl;
  onRemove?: () => void;
  onTobaccoClick?: (name: string) => void;
};

export const BowlCard = ({ bowl, onRemove, onTobaccoClick }: BowlCardProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const detailHref = `/bowl?id=${bowl.id}`;

  const handleActionClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleEditPress = () => {
    router.push(`/bowls/edit?id=${bowl.id}`);
  };

  const activateTobacco = (
    event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>,
    name: string,
  ) => {
    if (!onTobaccoClick) return;

    event.preventDefault();
    event.stopPropagation();
    onTobaccoClick(name);
  };

  const handleTobaccoKeyDown = (
    event: KeyboardEvent<HTMLLIElement>,
    name: string,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    activateTobacco(event, name);
  };

  return (
    <>
      <Card as={Link} className="flex h-full flex-col" href={detailHref}>
        <CardHeader className="flex items-center justify-between gap-2">
          <span className="truncate text-base font-semibold text-default-700">
            {bowl.name}
          </span>
          <div className="flex gap-2">
            <Button
              isIconOnly
              aria-label="Edit bowl"
              hint="Edit bowl"
              size="sm"
              onClick={handleActionClick}
              onPress={handleEditPress}
            >
              <Icon icon="akar-icons:edit" width={16} />
            </Button>
            {onRemove && (
              <Button
                isIconOnly
                aria-label="Delete bowl"
                color="danger"
                hint="Delete bowl"
                size="sm"
                onClick={handleActionClick}
                onPress={onOpen}
              >
                <Icon icon="akar-icons:cross" width={16} />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardBody className="px-4 pb-4 pt-0">
          <ul className="flex flex-col">
            {bowl.tobaccos.map((tobacco) => {
              const isInteractive = Boolean(onTobaccoClick);

              return (
                <li key={tobacco.name} className="border-b border-default-200">
                  <span
                    className={clsx(
                      "block py-2 text-center text-sm text-default-600",
                      isInteractive &&
                        "cursor-pointer transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    )}
                    role={isInteractive ? "button" : undefined}
                    tabIndex={isInteractive ? 0 : undefined}
                    onClick={
                      isInteractive
                        ? (event) => activateTobacco(event, tobacco.name)
                        : undefined
                    }
                    onKeyDown={
                      isInteractive
                        ? (event) => handleTobaccoKeyDown(event, tobacco.name)
                        : undefined
                    }
                  >
                    {`${tobacco.name} — ${tobacco.percentage}%`}
                  </span>
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>
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
                    onRemove?.();
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
