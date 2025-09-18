"use client";

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
import Link from "next/link";

import { BowlCardChip } from "./bowl-card-chip";

import { Button } from "@/shared/ui/button";

export type BowlCardProps = {
  bowl: Bowl;
  onRemove?: () => void;
  onTobaccoClick?: (name: string) => void;
};

export const BowlCard = ({ bowl, onRemove, onTobaccoClick }: BowlCardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const detailHref = `/bowls/${bowl.id}`;

  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between gap-3">
          <Link
            className="flex-1 truncate rounded-md text-left text-base font-semibold leading-tight transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            href={detailHref}
          >
            {bowl.name}
          </Link>
          <div className="flex shrink-0 gap-2">
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
            {onRemove && (
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
            )}
          </div>
        </CardHeader>
        <CardBody className="relative">
          <Link
            aria-label={`Open bowl ${bowl.name}`}
            className="absolute inset-0 z-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            href={detailHref}
          >
            <span className="sr-only">Open bowl {bowl.name}</span>
          </Link>
          <div className="pointer-events-none relative z-10 flex flex-wrap gap-4">
            {bowl.tobaccos.map((t) => (
              <div key={t.name} className="pointer-events-auto">
                <BowlCardChip
                  tobacco={t}
                  onSelect={() => onTobaccoClick?.(t.name)}
                />
              </div>
            ))}
          </div>
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
