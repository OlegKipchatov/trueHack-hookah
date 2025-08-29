'use client';

import { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Slider,
} from '@heroui/react';

import type { Bowl, BowlTobacco } from '@/entities/bowl';

export type CreateBowlProps = {
  onCreate: (bowl: Bowl) => void;
};

export const CreateBowl = ({ onCreate }: CreateBowlProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tobaccos, setTobaccos] = useState<BowlTobacco[]>([
    { name: '', percentage: 0 },
  ]);

  const addField = ({ percentage }: { percentage: number }) => {
    setTobaccos([...tobaccos, { name: '', percentage }]);
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

  const total = tobaccos.reduce((sum, t) => sum + t.percentage, 0);
  const restTotal = 100 - total;
  const hasErrorTotal = total !== 100;

  const submit = () => {
    const bowl: Bowl = {
      id: crypto.randomUUID(),
      tobaccos,
    };
    onCreate(bowl);
    setTobaccos([{ name: '', percentage: 0 }]);
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
                <Input
                  isRequired
                  size="sm"
                  label="Tobacco"
                  value={t.name}
                  onChange={(e) => updateField(idx, 'name', e.target.value)}
                />
                <Slider
                  size="sm"
                  label="Percentage"
                  maxValue={100}
                  value={t.percentage}
                  onChange={(value: number) =>
                    updateField(idx, 'percentage', value)
                  }
                />
              </div>
            ))}
            <div>
              <Button size="sm" variant="light" color='primary' onPress={() => addField({ percentage: restTotal })}>
                Add Tobacco
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={submit} isDisabled={hasErrorTotal}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
