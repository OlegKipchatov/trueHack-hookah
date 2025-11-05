import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useBowlFormState } from "./use-bowl-form-state";

import {
  BOWL_RATING_MAX,
  DEFAULT_BOWL_RATING,
  type Bowl,
} from "@/entities/bowl";

describe("useBowlFormState", () => {
  it("initializes with defaults when bowl is not provided", () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useBowlFormState({ onSubmit, generateId: () => "generated" }),
    );

    expect(result.current.name).toBe("");
    expect(result.current.tobaccos).toHaveLength(1);
    expect(result.current.tobaccos[0]?.percentage).toBe(100);
    expect(result.current.rating).toBe(DEFAULT_BOWL_RATING);
    expect(result.current.usePercentages).toBe(true);
    expect(result.current.hasErrorTotal).toBe(false);
  });

  it("clamps tobacco percentages when exceeding total", () => {
    const bowl: Bowl = {
      id: "1",
      name: "Mix",
      tobaccos: [
        { name: "Mint", percentage: 60 },
        { name: "Berry", percentage: 40 },
      ],
      usePercentages: true,
      rating: 3,
    };
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useBowlFormState({ bowl, onSubmit, generateId: () => "generated" }),
    );

    act(() => {
      result.current.updateTobacco(0, "percentage", 90);
    });

    expect(result.current.tobaccos[0]?.percentage).toBe(60);
    expect(result.current.totalPercentage).toBe(100);
  });

  it("submits new bowl with generated id and resets state", () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useBowlFormState({ onSubmit, generateId: () => "generated-id" }),
    );

    act(() => {
      result.current.setName("Fresh Bowl");
      result.current.setRating(BOWL_RATING_MAX);
    });

    act(() => {
      result.current.handleSubmit();
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const submitted = onSubmit.mock.calls[0][0] as Bowl;

    expect(submitted).toMatchObject({
      id: "generated-id",
      name: "Fresh Bowl",
      rating: BOWL_RATING_MAX,
      usePercentages: true,
    });
    expect(submitted.tobaccos).toHaveLength(1);
    expect(submitted.tobaccos[0]?.percentage).toBe(100);
    expect(result.current.name).toBe("");
    expect(result.current.rating).toBe(DEFAULT_BOWL_RATING);
    expect(result.current.tobaccos).toHaveLength(1);
    expect(result.current.tobaccos[0]?.percentage).toBe(100);
  });

  it("submits existing bowl without resetting state", () => {
    const bowl: Bowl = {
      id: "existing",
      name: "Existing Bowl",
      tobaccos: [
        { name: "Mint", percentage: 70 },
        { name: "Lime", percentage: 30 },
      ],
      usePercentages: true,
      rating: 4,
    };
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useBowlFormState({ bowl, onSubmit, generateId: () => "ignored" }),
    );

    act(() => {
      result.current.setName("Updated Bowl");
      result.current.setRating(2);
    });

    act(() => {
      result.current.handleSubmit();
    });

    const submitted = onSubmit.mock.calls[0][0] as Bowl;

    expect(submitted).toMatchObject({
      ...bowl,
      name: "Updated Bowl",
      rating: 2,
    });
    expect(submitted.tobaccos).not.toBe(bowl.tobaccos);
    expect(submitted.tobaccos).toEqual(bowl.tobaccos);
    expect(result.current.name).toBe("Updated Bowl");
    expect(result.current.rating).toBe(2);
  });
});
