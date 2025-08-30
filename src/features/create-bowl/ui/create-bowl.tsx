"use client";

import type { Bowl, BowlTobacco } from "@/entities/bowl";

import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Slider,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export type CreateBowlProps = {
  onCreate: (bowl: Bowl) => void;
};

export const CreateBowl = ({ onCreate }: CreateBowlProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tobaccos, setTobaccos] = useState<BowlTobacco[]>([
    { name: "", percentage: 0 },
  ]);

  const addField = ({ percentage }: { percentage: number }) => {
    setTobaccos([...tobaccos, { name: "", percentage }]);
  };

  const updateField = <K extends keyof BowlTobacco>(
    index: number,
    field: K,
    value: BowlTobacco[K],
  ) => {
    const next = [...tobaccos];

    next[index][field] = value;
    setTobaccos(next);
  };

  const removeField = (index: number) => {
    setTobaccos(tobaccos.filter((_, idx) => idx !== index));
  };

  const total = tobaccos.reduce((sum, t) => sum + t.percentage, 0);
  const restTotal = 100 - total;
  const hasErrorTotal = total !== 100;

  const submit = () => {
    const bowl: Bowl = {
      id: crypto.randomUUID(),
      tobaccos,
    };

    onCreate(bowl);
    setTobaccos([{ name: "", percentage: 0 }]);
    setIsOpen(false);
  };

  return (
    <>
      <Button color="primary" onPress={() => setIsOpen(true)}>
        Create Bowl
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>Create Bowl</ModalHeader>
          <ModalBody>
            {tobaccos.map((t, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex items-end gap-2">
                  <Input
                    isRequired
                    className="flex-1"
                    label="Tobacco"
                    labelPlacement="outside"
                    placeholder="pineapple"
                    size="sm"
                    value={t.name}
                    onChange={(e) => updateField(idx, "name", e.target.value)}
                  />
                  <Button
                    isIconOnly
                    aria-label="Delete tobacco"
                    color="danger"
                    size="sm"
                    variant="light"
                    onPress={() => removeField(idx)}
                  >
                    <Icon icon="mdi:trash" />
                  </Button>
                </div>
                <Slider
                  label="Percentage"
                  maxValue={100}
                  size="sm"
                  value={t.percentage}
                  onChange={(value) =>
                    updateField(idx, "percentage", value as number)
                  }
                />
              </div>
            ))}
            <div>
              <Button
                color="primary"
                size="sm"
                variant="light"
                onPress={() => addField({ percentage: restTotal })}
              >
                Add Tobacco
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" isDisabled={hasErrorTotal} onPress={submit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
