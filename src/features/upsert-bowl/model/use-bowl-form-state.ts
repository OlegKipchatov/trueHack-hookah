import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { calculateTotalPercentage, clampPercentage } from "./bowl-form.utils";

import {
  DEFAULT_BOWL_RATING,
  DEFAULT_BOWL_STRENGTH,
  type Bowl,
  type BowlTobacco,
} from "@/entities/bowl";

const defaultGenerateId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2);
};

export type UseBowlFormStateParams = {
  bowl?: Bowl;
  onSubmit: (bowl: Bowl) => void;
  generateId?: () => string;
};

export const useBowlFormState = ({
  bowl,
  onSubmit,
  generateId = defaultGenerateId,
}: UseBowlFormStateParams) => {
  const initialUsePercentages = bowl?.usePercentages ?? true;
  const [usePercentages, setUsePercentages] = useState(initialUsePercentages);
  const [name, setName] = useState(bowl ? bowl.name : "");
  const [rating, setRating] = useState(bowl?.rating ?? DEFAULT_BOWL_RATING);
  const [strength, setStrength] = useState(
    bowl?.strength ?? DEFAULT_BOWL_STRENGTH,
  );
  const [tobaccos, setTobaccos] = useState<BowlTobacco[]>(() =>
    bowl
      ? bowl.tobaccos.map((tobacco) => ({ ...tobacco }))
      : [{ name: "", percentage: initialUsePercentages ? 100 : undefined }],
  );

  useEffect(() => {
    if (!bowl) {
      return;
    }

    setName(bowl.name);
    setUsePercentages(bowl.usePercentages ?? true);
    setRating(bowl.rating ?? DEFAULT_BOWL_RATING);
    setStrength(bowl.strength ?? DEFAULT_BOWL_STRENGTH);
    setTobaccos(bowl.tobaccos.map((tobacco) => ({ ...tobacco })));
  }, [bowl]);

  const addTobacco = useCallback(() => {
    setTobaccos((previous) => {
      if (!usePercentages) {
        return [...previous, { name: "", percentage: undefined }];
      }

      const total = calculateTotalPercentage(previous);
      const remainder = clampPercentage(100 - total, 100);

      return [...previous, { name: "", percentage: remainder }];
    });
  }, [usePercentages]);

  const updateTobacco = useCallback(
    <K extends keyof BowlTobacco>(
      index: number,
      field: K,
      value: BowlTobacco[K],
    ) => {
      setTobaccos((previous) => {
        if (!previous[index]) {
          return previous;
        }

        const next = previous.map((tobacco, idx) =>
          idx === index ? { ...tobacco } : tobacco,
        );

        if (field === "percentage") {
          const numericValue = typeof value === "number" ? value : 0;

          if (!usePercentages) {
            next[index].percentage = numericValue;

            return next;
          }

          const othersTotal = previous.reduce((sum, tobacco, idx) => {
            if (idx === index) {
              return sum;
            }

            return sum + (tobacco.percentage ?? 0);
          }, 0);
          const max = clampPercentage(100 - othersTotal, 100);
          const clamped = clampPercentage(numericValue, max);

          next[index].percentage = clamped;
        } else {
          next[index][field] = value;
        }

        return next;
      });
    },
    [usePercentages],
  );

  const removeTobacco = useCallback(
    (index: number) => {
      setTobaccos((previous) => {
        const filtered = previous.filter((_, idx) => idx !== index);

        if (filtered.length === 0) {
          return [{ name: "", percentage: usePercentages ? 100 : undefined }];
        }

        if (usePercentages && filtered.length === 1) {
          const [first] = filtered;

          return [{ ...first, percentage: 100 }];
        }

        return filtered;
      });
    },
    [usePercentages],
  );

  const toggleUsePercentages = useCallback(() => {
    setUsePercentages((previous) => !previous);
  }, []);

  const totalPercentage = useMemo(
    () => calculateTotalPercentage(tobaccos),
    [tobaccos],
  );

  const hasErrorTotal = useMemo(
    () => (usePercentages ? totalPercentage !== 100 : false),
    [totalPercentage, usePercentages],
  );

  const hasErrorName = useMemo(() => name.trim() === "", [name]);

  const handleSubmit = useCallback(() => {
    const result: Bowl = bowl
      ? { ...bowl, name, tobaccos, usePercentages, rating, strength }
      : {
          id: generateId(),
          name,
          tobaccos,
          usePercentages,
          rating,
          strength,
        };

    onSubmit(result);

    if (!bowl) {
      setName("");
      setUsePercentages(true);
      setRating(DEFAULT_BOWL_RATING);
      setStrength(DEFAULT_BOWL_STRENGTH);
      setTobaccos([{ name: "", percentage: 100 }]);
    }
  }, [
    bowl,
    generateId,
    name,
    onSubmit,
    rating,
    strength,
    tobaccos,
    usePercentages,
  ]);

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSubmit();
    },
    [handleSubmit],
  );

  return {
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
    totalPercentage,
    updateTobacco,
    usePercentages,
  } as const;
};
