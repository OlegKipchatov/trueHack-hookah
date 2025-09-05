"use client";

import type { Bowl, BowlTobacco } from "@/entities/bowl";

import { useEffect, useState } from "react";
import { Button, Form, Input, Slider } from "@heroui/react";
import { Icon } from "@iconify/react";

export type BowlFormProps = {
  bowl?: Bowl;
  onSubmit: (bowl: Bowl) => void;
};

export const BowlForm = ({ bowl, onSubmit }: BowlFormProps) => {
  const [name, setName] = useState(bowl ? bowl.name : "");
  const [tobaccos, setTobaccos] = useState<BowlTobacco[]>(
    bowl ? bowl.tobaccos : [{ name: "", percentage: 100 }],
  );

  useEffect(() => {
    if (bowl) {
      setTobaccos(bowl.tobaccos);
      setName(bowl.name);
    }
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
  const hasErrorName = name.trim() === "";

  const submit = () => {
    const result: Bowl = bowl
      ? { ...bowl, name, tobaccos }
      : { id: crypto.randomUUID(), name, tobaccos };

    onSubmit(result);
    if (!bowl) {
      setTobaccos([{ name: "", percentage: 100 }]);
      setName("");
    }
  };

  return (
    <Form className="items-stretch gap-4" onSubmit={submit}>
      <div className="flex flex-col items-stretch gap-4">
        <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          placeholder="My mix"
          size="sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
      </div>
      <div className="flex justify-end">
        <Button
          color="primary"
          isDisabled={hasErrorTotal || hasErrorName}
          type="submit"
          onPress={submit}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};
