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

  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <span>{bowl.name}</span>
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
        <CardBody>
          <div className="flex gap-4">
            {bowl.tobaccos.map((t) => (
              <BowlCardChip
                key={t.name}
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
