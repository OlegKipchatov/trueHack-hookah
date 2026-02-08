import { describe, it, expect, vi } from "vitest";

vi.mock("@/shared/lib/i18n/provider", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    setLanguage: vi.fn(),
    language: "en",
  }),
}));

import { BowlFilters } from "./bowl-filters";

describe("BowlFilters", () => {
  it("calls onSearchChange when text changes", () => {
    const onSearchChange = vi.fn();
    const element = BowlFilters({
      search: "",
      onSearchChange,
      flavors: [],
      onRemoveFlavor: vi.fn(),
      ratingSortOrder: "default",
      strengthSortOrder: "default",
      onRatingSortChange: vi.fn(),
      onStrengthSortChange: vi.fn(),
    });

    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];
    const input = children[0];

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
      ratingSortOrder: "default",
      strengthSortOrder: "default",
      onRatingSortChange: vi.fn(),
      onStrengthSortChange: vi.fn(),
    });

    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];
    const wrapper = children[2];
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
      ratingSortOrder: "default",
      strengthSortOrder: "default",
      onRatingSortChange: vi.fn(),
      onStrengthSortChange: vi.fn(),
    });

    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];
    const wrapper = children[2];

    expect(wrapper).toBeTruthy();

    const chips = wrapper.props.children;
    const chipsArray = Array.isArray(chips) ? chips : [chips];

    expect(chipsArray).toHaveLength(flavors.length);
    chipsArray.forEach((chip, index) => {
      expect(chip.props.children).toBe(flavors[index]);
    });
  });

  it("passes selected sort order to both dropdown menus", () => {
    const element = BowlFilters({
      search: "",
      onSearchChange: vi.fn(),
      flavors: [],
      onRemoveFlavor: vi.fn(),
      ratingSortOrder: "rating-desc",
      strengthSortOrder: "strength-desc",
      onRatingSortChange: vi.fn(),
      onStrengthSortChange: vi.fn(),
    });

    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];
    const dropdownWrapper = children[1];
    const dropdowns = Array.isArray(dropdownWrapper.props.children)
      ? dropdownWrapper.props.children
      : [dropdownWrapper.props.children];
    const ratingDropdown = dropdowns[0];
    const strengthDropdown = dropdowns[1];
    const ratingMenu = Array.isArray(ratingDropdown.props.children)
      ? ratingDropdown.props.children[1]
      : ratingDropdown.props.children;
    const strengthMenu = Array.isArray(strengthDropdown.props.children)
      ? strengthDropdown.props.children[1]
      : strengthDropdown.props.children;

    expect(ratingMenu.props.selectedKeys).toEqual(["rating-desc"]);
    expect(strengthMenu.props.selectedKeys).toEqual(["strength-desc"]);
  });

  it("calls sort change callbacks when dropdown actions are triggered", () => {
    const onRatingSortChange = vi.fn();
    const onStrengthSortChange = vi.fn();
    const element = BowlFilters({
      search: "",
      onSearchChange: vi.fn(),
      flavors: [],
      onRemoveFlavor: vi.fn(),
      ratingSortOrder: "default",
      strengthSortOrder: "default",
      onRatingSortChange,
      onStrengthSortChange,
    });

    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];
    const dropdownWrapper = children[1];
    const dropdowns = Array.isArray(dropdownWrapper.props.children)
      ? dropdownWrapper.props.children
      : [dropdownWrapper.props.children];
    const ratingDropdown = dropdowns[0];
    const strengthDropdown = dropdowns[1];
    const ratingMenu = Array.isArray(ratingDropdown.props.children)
      ? ratingDropdown.props.children[1]
      : ratingDropdown.props.children;
    const strengthMenu = Array.isArray(strengthDropdown.props.children)
      ? strengthDropdown.props.children[1]
      : strengthDropdown.props.children;

    ratingMenu.props.onAction("rating-asc");
    strengthMenu.props.onAction("strength-asc");

    expect(onRatingSortChange).toHaveBeenCalledWith("rating-asc");
    expect(onStrengthSortChange).toHaveBeenCalledWith("strength-asc");
  });
});
