"use client";

import type { Bowl, BowlTobacco } from "@/entities/bowl";

import { FormEvent, useEffect, useState } from "react";
import { Form, Input, Slider } from "@heroui/react";
import { Icon } from "@iconify/react";

import { Button } from "@/shared/ui/button";
import { EditableTitle } from "@/shared/ui/editable-title";

export type BowlFormProps = {
  bowl?: Bowl;
  onSubmit: (bowl: Bowl) => void;
};

export const BowlForm = ({ bowl, onSubmit }: BowlFormProps) => {
  const initialUsePercentages = bowl?.usePercentages ?? true;
  const [usePercentages, setUsePercentages] = useState(initialUsePercentages);
  const [name, setName] = useState(bowl ? bowl.name : "");
  const [tobaccos, setTobaccos] = useState<BowlTobacco[]>(() =>
    bowl
      ? bowl.tobaccos
      : [{ name: "", percentage: initialUsePercentages ? 100 : undefined }],
  );

  useEffect(() => {
    if (bowl) {
      setTobaccos(bowl.tobaccos);
      setName(bowl.name);
      setUsePercentages(bowl.usePercentages ?? true);
    }
  }, [bowl]);

  const addField = () => {
    setTobaccos((prev) => {
      if (!usePercentages) {
        return [...prev, { name: "", percentage: undefined }];
      }

      const total = prev.reduce((sum, t) => sum + (t.percentage ?? 0), 0);
      const percentage = Math.max(0, 100 - total);

      return [...prev, { name: "", percentage }];
    });
  };

  const updateField = <K extends keyof BowlTobacco>(
    index: number,
    field: K,
    value: BowlTobacco[K],
  ) => {
    setTobaccos((prev) => {
      const next = [...prev];

      if (field === "percentage") {
        if (!usePercentages) {
          next[index].percentage = value as number;

          return next;
        }

        const othersTotal = prev.reduce((sum, tobacco, idx) => {
          if (idx === index) {
            return sum;
          }

          return sum + (tobacco.percentage ?? 0);
        }, 0);
        const max = Math.max(0, 100 - othersTotal);
        const clamped = Math.max(0, Math.min(value as number, max));

        next[index].percentage = clamped;
      } else {
        next[index][field] = value;
      }

      return next;
    });
  };

  const removeField = (index: number) => {
    setTobaccos((prev) => {
      const next = prev.filter((_, idx) => idx !== index);

      if (next.length === 0) {
        return [{ name: "", percentage: usePercentages ? 100 : undefined }];
      }

      if (usePercentages && next.length === 1) {
        const [first] = next;

        return [{ ...first, percentage: 100 }];
      }

      return next;
    });
  };

  const total = tobaccos.reduce((sum, t) => sum + (t.percentage ?? 0), 0);
  const hasErrorTotal = usePercentages ? total !== 100 : false;
  const hasErrorName = name.trim() === "";

  const submit = () => {
    const result: Bowl = bowl
      ? { ...bowl, name, tobaccos, usePercentages }
      : { id: crypto.randomUUID(), name, tobaccos, usePercentages };

    onSubmit(result);
    if (!bowl) {
      setTobaccos([{ name: "", percentage: 100 }]);
      setName("");
      setUsePercentages(true);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  return (
    <Form className="items-stretch gap-4" onSubmit={handleFormSubmit}>
      <div className="flex flex-col items-stretch gap-4">
        <div className="flex items-center gap-4">
          <EditableTitle
            className="flex-1"
            placeholder="My mix"
            value={name}
            onChange={setName}
          />
          <Button
            isIconOnly
            aria-label="Toggle percentages"
            aria-pressed={usePercentages}
            className="ml-auto"
            color={usePercentages ? "primary" : "default"}
            hint={usePercentages ? "Disable percentages" : "Enable percentages"}
            size="sm"
            variant={usePercentages ? "solid" : "bordered"}
            onPress={() => setUsePercentages((prev) => !prev)}
          >
            <Icon icon="akar-icons:percentage" width={16} />
          </Button>
        </div>
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
                hint="Delete tobacco"
                size="sm"
                variant="light"
                onPress={() => removeField(idx)}
              >
                <Icon icon="akar-icons:cross" width={16} />
              </Button>
            </div>
            {usePercentages && (
              <Slider
                label="Percentage"
                maxValue={100}
                size="sm"
                value={t.percentage ?? 0}
                onChange={(value) =>
                  updateField(idx, "percentage", value as number)
                }
              />
            )}
          </div>
        ))}
        <div>
          <Button
            color="primary"
            size="sm"
            startContent={<Icon icon="akar-icons:plus" width={16} />}
            variant="light"
            onPress={addField}
          >
            Add Tobacco
          </Button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          color="primary"
          hint={
            hasErrorName
              ? "Name is required"
              : hasErrorTotal
                ? "Total must be 100%"
                : undefined
          }
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
