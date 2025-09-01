import { describe, it, expect, vi } from "vitest";

import { BowlFilters } from "./bowl-filters";

describe("BowlFilters", () => {
  it("calls onSearchChange when text changes", () => {
    const onSearchChange = vi.fn();
    const element = BowlFilters({
      search: "",
      onSearchChange,
      flavors: [],
      onRemoveFlavor: vi.fn(),
    });

    const input = element.props.children[0];
    input.props.onChange({ target: { value: "mint" } });

    expect(onSearchChange).toHaveBeenCalledWith("mint");
  });

  it("calls onRemoveFlavor when chip is closed", () => {
    const onRemoveFlavor = vi.fn();
    const flavors = ["Mint"];
    const element = BowlFilters({
      search: "",
      onSearchChange: vi.fn(),
      flavors,
      onRemoveFlavor,
    });

    const wrapper = element.props.children[1];
    const chip = Array.isArray(wrapper.props.children)
      ? wrapper.props.children[0]
      : wrapper.props.children;
    chip.props.onClose();

    expect(onRemoveFlavor).toHaveBeenCalledWith("Mint");
  });

  it("renders chips for each flavor", () => {
    const flavors = ["Mint", "Berry"];
    const element = BowlFilters({
      search: "",
      onSearchChange: vi.fn(),
      flavors,
      onRemoveFlavor: vi.fn(),
    });

    const wrapper = element.props.children[1];
    expect(wrapper).toBeTruthy();

    const chips = wrapper.props.children;
    const chipsArray = Array.isArray(chips) ? chips : [chips];
    expect(chipsArray).toHaveLength(flavors.length);
    chipsArray.forEach((chip, index) => {
      expect(chip.props.children).toBe(flavors[index]);
    });
  });
});

