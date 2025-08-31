import { describe, it, expect, vi } from 'vitest';
import type { BowlTobacco } from '../model/bowl';

const useHoverMock = vi.fn(() => [null, false]);
vi.mock('@uidotdev/usehooks', () => ({
  useHover: useHoverMock,
}));

import { BowlCardChip } from './bowl-card-chip';

describe('BowlCardChip', () => {
  const tobacco: BowlTobacco = { name: 'Alpha', percentage: 50 };

  it('calls onSelect on click', () => {
    const onSelect = vi.fn();
    const element = BowlCardChip({ tobacco, onSelect });

    const chip = element.props.children;
    chip.props.onClick();

    expect(onSelect).toHaveBeenCalledWith(tobacco.name);
  });

  it('uses solid variant on hover', () => {
    useHoverMock.mockReturnValueOnce([null, true]);
    const element = BowlCardChip({ tobacco });

    const chip = element.props.children;
    expect(chip.props.variant).toBe('solid');
  });

  it('uses flat variant when not hovered', () => {
    const element = BowlCardChip({ tobacco });

    const chip = element.props.children;
    expect(chip.props.variant).toBe('flat');
  });

  it('shows tobacco percentage in badge', () => {
    const element = BowlCardChip({ tobacco });

    expect(element.props.content).toBe(`${tobacco.percentage}%`);
  });
});
