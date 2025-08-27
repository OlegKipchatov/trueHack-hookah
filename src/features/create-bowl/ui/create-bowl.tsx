'use client';

import { useState } from 'react';
import { Button, Input } from '@heroui/react';

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

  const updateField = (
    index: number,
    field: keyof BowlTobacco,
    value: string,
  ) => {
    const next = [...tobaccos];
    next[index][field] = field === 'percentage' ? Number(value) : value;
    setTobaccos(next);
  };

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
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-4 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Bowl</h2>
            <div className="flex flex-col gap-2">
              {tobaccos.map((t, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    label="Tobacco"
                    value={t.name}
                    onChange={(e) => updateField(idx, 'name', e.target.value)}
                  />
                  <Input
                    label="%"
                    type="number"
                    value={t.percentage.toString()}
                    onChange={(e) => updateField(idx, 'percentage', e.target.value)}
                  />
                </div>
              ))}
              <Button size="sm" variant="light" onPress={addField}>
                Add Tobacco
              </Button>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="light" onPress={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button color="primary" onPress={submit}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
