"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import { Button } from "./button";

import { useTranslation } from "@/shared/lib/i18n/provider";

export type BackButtonProps = {
  className?: string;
  href?: string;
};

export const BackButton = ({ className, href }: BackButtonProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const goBack = () => {
    if (href) {
      router.push(href);

      return;
    }

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/bowls");
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
