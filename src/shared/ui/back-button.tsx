"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import { Button } from "./button";

import { useTranslation } from "@/shared/lib/i18n/provider";

export type BackButtonProps = {
  className?: string;
};

export const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

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
      aria-label={translate("backButton.back")}
      className={className}
      hint={translate("backButton.back")}
      variant="light"
      onPress={goBack}
    >
      <Icon icon="akar-icons:arrow-left" width={16} />
    </Button>
  );
};
