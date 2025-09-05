import type { ComponentProps } from "react";

import { Button as HeroButton, Tooltip } from "@heroui/react";

export type ButtonProps = ComponentProps<typeof HeroButton> & {
  hint?: string;
};

export const Button = ({ hint, children, ...props }: ButtonProps) => {
  const button = (
    <HeroButton {...props} title={hint}>
      {children}
    </HeroButton>
  );

  return hint ? <Tooltip content={hint}>{button}</Tooltip> : button;
};
