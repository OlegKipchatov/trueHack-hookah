"use client";

import { Form } from "@heroui/react";

import { useBowlFormState } from "../model";

import { BowlPercentageToggle } from "./bowl-percentage-toggle";
import { BowlRatingControl } from "./bowl-rating-control";
import { BowlTobaccoList } from "./bowl-tobacco-list";

import { useTranslation } from "@/shared/lib/i18n/provider";
import { Button } from "@/shared/ui/button";
import { EditableTitle } from "@/shared/ui/editable-title";
import {
  BOWL_RATING_MAX,
  BOWL_RATING_MIN,
  BOWL_STRENGTH_MAX,
  BOWL_STRENGTH_MIN,
  type Bowl,
} from "@/entities/bowl";

export type BowlFormProps = {
  bowl?: Bowl;
  onSubmit: (bowl: Bowl) => void;
};

export const BowlForm = ({ bowl, onSubmit }: BowlFormProps) => {
  const { t: translate } = useTranslation();
  const {
    addTobacco,
    handleFormSubmit,
    handleSubmit,
    hasErrorName,
    hasErrorTotal,
    name,
    rating,
    strength,
    removeTobacco,
    setName,
    setRating,
    setStrength,
    tobaccos,
    toggleUsePercentages,
    updateTobacco,
    usePercentages,
  } = useBowlFormState({ bowl, onSubmit });

  return (
    <Form className="items-stretch gap-4" onSubmit={handleFormSubmit}>
      <div className="flex flex-col items-stretch gap-4">
        <div className="flex items-center gap-4">
          <EditableTitle
            className="flex-1"
            placeholder={translate("bowl.form.titlePlaceholder")}
            value={name}
            onChange={(value) => setName(value)}
          />
          <BowlPercentageToggle
            activeHint={translate("bowl.form.disablePercentages")}
            inactiveHint={translate("bowl.form.enablePercentages")}
            isActive={usePercentages}
            label={translate("bowl.form.togglePercentages")}
            onToggle={toggleUsePercentages}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <BowlRatingControl
            hint={translate("bowl.form.strength.hint")}
            label={translate("bowl.form.strength.label")}
            max={BOWL_STRENGTH_MAX}
            min={BOWL_STRENGTH_MIN}
            value={strength}
            onChange={(value) => setStrength(value)}
          />
          <BowlRatingControl
            hint={translate("bowl.form.rating.hint")}
            label={translate("bowl.form.rating.label")}
            max={BOWL_RATING_MAX}
            min={BOWL_RATING_MIN}
            value={rating}
            onChange={(value) => setRating(value)}
          />
        </div>
        <BowlTobaccoList
          labels={{
            addLabel: translate("bowl.form.tobacco.add"),
            deleteLabel: translate("bowl.form.tobacco.delete"),
            nameLabel: translate("bowl.form.tobacco.label"),
            namePlaceholder: translate("bowl.form.tobacco.placeholder"),
            percentageLabel: translate("bowl.form.percentage.label"),
          }}
          tobaccos={tobaccos}
          usePercentages={usePercentages}
          onAdd={() => addTobacco()}
          onRemove={(index) => removeTobacco(index)}
          onUpdate={(index, field, value) => updateTobacco(index, field, value)}
        />
      </div>
      <div className="flex justify-end">
        <Button
          color="primary"
          hint={
            hasErrorName
              ? translate("form.errors.name")
              : hasErrorTotal
                ? translate("form.errors.total")
                : undefined
          }
          isDisabled={hasErrorTotal || hasErrorName}
          type="submit"
          onPress={handleSubmit}
        >
          {translate("common.save")}
        </Button>
      </div>
    </Form>
  );
};
