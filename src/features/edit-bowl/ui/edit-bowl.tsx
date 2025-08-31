"use client";

import type { Bowl, BowlTobacco } from "@/entities/bowl";

import {
  type ReactElement,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Slider,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export type EditBowlProps = {
  bowl: Bowl;
  onSave: (bowl: Bowl) => void;
  children: ReactElement;
};

export const EditBowl = ({ bowl, onSave, children }: EditBowlProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [tobaccos, setTobaccos] = useState<BowlTobacco[]>(bowl.tobaccos);

  useEffect(() => {
    setTobaccos(bowl.tobaccos);
  }, [bowl]);

  const addField = ({ percentage }: { percentage: number }) => {
    setTobaccos([...tobaccos, { name: "", percentage }]);
  };

  const updateField = <K extends keyof BowlTobacco>(
    index: number,
    field: K,
    value: BowlTobacco[K],
  ) => {
    const next = [...tobaccos];

    if (field === "percentage") {
      const max = next[index].percentage + restTotal;
      const clamped = Math.max(0, Math.min(value as number, max));

      next[index].percentage = clamped;
    } else {
      next[index][field] = value;
    }
    setTobaccos(next);
  };

  const removeField = (index: number) => {
    const next = tobaccos.filter((_, idx) => idx !== index);

    if (next.length === 0) {
      setTobaccos([{ name: "", percentage: 100 }]);
    } else {
      if (next.length === 1) {
        next[0].percentage = 100;
      }
      setTobaccos(next);
    }
  };

  const total = tobaccos.reduce((sum, t) => sum + t.percentage, 0);
  const restTotal = 100 - total;
  const hasErrorTotal = total !== 100;

  const submit = () => {
    const updated: Bowl = { ...bowl, tobaccos };

    onSave(updated);
    onClose();
  };

  const trigger = isValidElement(children)
    ? cloneElement(children, { onEdit: onOpen })
    : null;

  return (
    <>
      {trigger}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Bowl</ModalHeader>
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
                        onChange={(e) =>
                          updateField(idx, "name", e.target.value)
                        }
                      />
                      <Button
                        isIconOnly
                        aria-label="Delete tobacco"
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() => removeField(idx)}
                      >
                        <Icon icon="akar-icons:cross" width={16} />
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
                    startContent={<Icon icon="akar-icons:plus" width={16} />}
                    variant="light"
                    onPress={() => addField({ percentage: restTotal })}
                  >
                    Add Tobacco
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isDisabled={hasErrorTotal}
                  onPress={submit}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
