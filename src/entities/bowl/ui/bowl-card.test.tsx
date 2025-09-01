import type { Bowl } from "../model/bowl";

import { describe, it, expect, vi } from "vitest";

import { BowlCard } from "./bowl-card";

describe("BowlCard", () => {
  const bowl: Bowl = {
    id: "1",
    name: "Test bowl",
    tobaccos: [
      { name: "Alpha", percentage: 50 },
      { name: "Beta", percentage: 50 },
    ],
  };

  it("hides action buttons when callbacks are missing", () => {
    const element = BowlCard({ bowl });

    const cardHeader = element.props.children[0];
    const actions = cardHeader.props.children[1];

    expect(actions).toBeFalsy();
  });

  it("calls onEdit when Edit button is pressed", () => {
    const onEdit = vi.fn();
    const element = BowlCard({ bowl, onEdit, onRemove: vi.fn() });

    const cardHeader = element.props.children[0];
    const actions = cardHeader.props.children[1];
    const buttons = actions.props.children;
    const editButton = Array.isArray(buttons) ? buttons[0] : buttons;

    editButton.props.onPress({ stopPropagation: () => {} });
    expect(onEdit).toHaveBeenCalled();
  });

  it("calls onRemove when Delete button is pressed", () => {
    const onRemove = vi.fn();
    const element = BowlCard({ bowl, onRemove, onEdit: vi.fn() });

    const cardHeader = element.props.children[0];
    const actions = cardHeader.props.children[1];
    const buttons = actions.props.children;
    const removeButton = Array.isArray(buttons) ? buttons[1] : buttons;

    removeButton.props.onPress({ stopPropagation: () => {} });
    expect(onRemove).toHaveBeenCalled();
  });

  it("calls onTobaccoClick when tobacco chip is selected", () => {
    const onTobaccoClick = vi.fn();
    const element = BowlCard({ bowl, onTobaccoClick });

    const cardBody = element.props.children[1];
    const wrapper = cardBody.props.children;
    const chips = wrapper.props.children;
    const firstChip = Array.isArray(chips) ? chips[0] : chips;

    firstChip.props.onSelect();
    expect(onTobaccoClick).toHaveBeenCalledWith(bowl.tobaccos[0].name);
  });

  it("renders proper amount of chips with correct content", () => {
    const element = BowlCard({ bowl });

    const cardBody = element.props.children[1];
    const wrapper = cardBody.props.children;
    const chips = wrapper.props.children;
    const chipsArray = Array.isArray(chips) ? chips : [chips];

    expect(chipsArray).toHaveLength(bowl.tobaccos.length);
    chipsArray.forEach((chipElement, index) => {
      expect(chipElement.props.tobacco.name).toBe(bowl.tobaccos[index].name);
      expect(chipElement.props.tobacco.percentage).toBe(
        bowl.tobaccos[index].percentage,
      );
    });
  });
});
