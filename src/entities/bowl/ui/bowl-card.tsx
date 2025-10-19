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
import { useRouter } from "next/navigation";

import { BowlCardChip } from "./bowl-card-chip";

import { Button } from "@/shared/ui/button";

export type BowlCardProps = {
  bowl: Bowl;
  onRemove?: () => void;
  onTobaccoClick?: (name: string) => void;
};

export const BowlCard = ({ bowl, onRemove, onTobaccoClick }: BowlCardProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card
        isHoverable
        isPressable
        as="div"
        className="transition-colors data-[hover=true]:bg-default-100"
        onPress={() => router.push(`/bowls/view?id=${bowl.id}`)}
      >
        <CardHeader className="flex items-center justify-between">
          <span>{bowl.name}</span>
          <div className="flex gap-2">
            <Button
              isIconOnly
              aria-label="Edit bowl"
              hint="Edit bowl"
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
              }}
              onPress={() => {
                router.push(`/bowls/edit?id=${bowl.id}`);
              }}
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
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                onPress={onOpen}
              >
                <Icon icon="akar-icons:cross" width={16} />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4">
            {bowl.tobaccos.map((t) => (
              <BowlCardChip
                key={t.name}
                showPercentages={bowl.usePercentages !== false}
                tobacco={t}
                onSelect={() => onTobaccoClick?.(t.name)}
              />
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
