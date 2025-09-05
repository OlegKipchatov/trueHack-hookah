"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export type BackButtonProps = {
  className?: string;
};

export const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/user");
    }
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
