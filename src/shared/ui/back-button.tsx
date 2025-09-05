"use client";

import type { MouseEvent } from "react";

import Router from "next/router";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export type BackButtonProps = {
  className?: string;
};

export const BackButton = ({ className }: BackButtonProps) => {
  const goBack = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    Router.back();
  };

  return (
    <Button
      isIconOnly
      aria-label="Back"
      className={className}
      variant="light"
      onPress={goBack}
    >
      <Icon icon="akar-icons:arrow-left" width={16} />
    </Button>
  );
};
