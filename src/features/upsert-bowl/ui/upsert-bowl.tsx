"use client";

import type { Bowl } from "@/entities/bowl";
import type { ReactElement } from "react";

import { cloneElement } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";

import { BowlForm } from "./bowl-form";

export type UpsertBowlProps = {
  bowl?: Bowl;
  onSubmit: (bowl: Bowl) => void;
  trigger?: ReactElement<any>;
};

export const UpsertBowl = ({ bowl, onSubmit, trigger }: UpsertBowlProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const triggerNode = trigger ? (
    cloneElement(trigger as ReactElement<any>, {
      onClick: onOpen,
      onEdit: onOpen,
      onPress: onOpen,
    })
  ) : (
    <Button color="primary" onPress={onOpen}>
      {bowl ? "Edit Bowl" : "Create Bowl"}
    </Button>
  );

  return (
    <>
      {triggerNode}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{bowl ? "Edit Bowl" : "Create Bowl"}</ModalHeader>
              <BowlForm
                bowl={bowl}
                onSubmit={(result) => {
                  onSubmit(result);
                  onClose();
                }}
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
