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

  const addField = () => {
    setTobaccos([...tobaccos, { name: '', percentage: 0 }]);
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
                  label="Tobacco"
                  value={t.name}
                  onChange={(e) => updateField(idx, 'name', e.target.value)}
                />
                <Slider
                  label="Percentage"
                  step={5}
                  maxValue={100}
                  value={t.percentage}
                  onChange={(value: number) =>
                    updateField(idx, 'percentage', value)
                  }
                />
              </div>
            ))}
            {total !== 100 && <p className="text-danger text-sm">error</p>}
            <Button size="sm" variant="light" onPress={addField}>
              Add Tobacco
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={submit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
