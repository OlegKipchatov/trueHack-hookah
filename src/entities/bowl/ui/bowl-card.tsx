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

import { BowlRatingBadge } from "./bowl-rating-badge";
import { BowlCardChip } from "./bowl-card-chip";

import { useTranslation } from "@/shared/lib/i18n/provider";
import { Button } from "@/shared/ui/button";

export type BowlCardProps = {
  bowl: Bowl;
  onRemove?: () => void;
  onTobaccoClick?: (name: string) => void;
};

export const BowlCard = ({ bowl, onRemove, onTobaccoClick }: BowlCardProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t: translate } = useTranslation();

  return (
    <>
      <Card
        isHoverable
        isPressable
        as="div"
        className="transition-colors data-[hover=true]:bg-default-100"
        onPress={() => router.push(`/bowls/view?id=${bowl.id}`)}
      >
        <CardHeader className="flex flex-wrap items-center justify-between gap-3 gap-y-2">
          <div className="flex min-w-0 flex-wrap items-center gap-3 gap-y-1 sm:flex-nowrap">
            <span className="truncate text-base font-semibold text-default-700">
              {bowl.name}
            </span>
            <BowlRatingBadge rating={bowl.rating} />
          </div>
          <div className="mt-2 flex w-full flex-wrap gap-2 sm:mt-0 sm:w-auto sm:flex-nowrap sm:justify-end">
            <Button
              isIconOnly
              aria-label={translate("bowl.actions.edit")}
              hint={translate("bowl.actions.edit")}
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
                aria-label={translate("bowl.delete.title")}
                color="danger"
                hint={translate("bowl.delete.title")}
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {bowl.tobaccos.map((t) => (
                <BowlCardChip
                  key={t.name}
                  showPercentages={bowl.usePercentages !== false}
                  tobacco={t}
                  onSelect={() => onTobaccoClick?.(t.name)}
                />
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{translate("bowl.delete.title")}</ModalHeader>
              <ModalBody>
                <p>{translate("bowl.delete.question")}</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  {translate("common.cancel")}
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    onRemove?.();
                    onClose();
                  }}
                >
                  {translate("bowl.delete.confirm")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
