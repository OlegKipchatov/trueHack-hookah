"use client";

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

import { BOWL_RATING_MAX, BOWL_STRENGTH_MAX, type Bowl } from "../model/bowl";

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
        <CardHeader className="flex items-center justify-between">
          <span>{bowl.name}</span>
          <div className="flex gap-2">
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
            <div className="flex flex-wrap items-center gap-4 text-sm text-default-600 dark:text-default-300">
              <span aria-live="polite" className="flex items-baseline gap-1">
                <span className="font-medium text-default-700 dark:text-default-100">
                  {translate("bowl.form.strength.label")}:
                </span>
                <span>
                  {bowl.strength}/{BOWL_STRENGTH_MAX}
                </span>
              </span>
              <span aria-live="polite" className="flex items-baseline gap-1">
                <span className="font-medium text-default-700 dark:text-default-100">
                  {translate("bowl.form.rating.label")}:
                </span>
                <span>
                  {bowl.rating}/{BOWL_RATING_MAX}
                </span>
              </span>
            </div>
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
