"use client";

import { useMemo } from "react";

import { VkLoginButton } from "@/features/auth-vk";
import { useSession } from "@/entities/session";
import { useTranslation } from "@/shared/lib/i18n/provider";

const AuthPage = () => {
  const { t: translate } = useTranslation();
  const { profile, isAuthenticated } = useSession();

  const displayName = useMemo(() => {
    if (profile?.firstName || profile?.lastName) {
      return `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim();
    }

    if (profile?.id) {
      return profile.id;
    }

    return translate("navbar.profile");
  }, [profile, translate]);

  return (
    <section className="flex flex-col gap-6 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{translate("auth.title")}</h1>
        <p className="text-default-500">{translate("auth.description")}</p>
        {isAuthenticated && (
          <p className="text-sm text-default-400">
            {translate("navbar.greeting", { name: displayName })}
          </p>
        )}
      </div>
      <VkLoginButton />
    </section>
  );
};

export default AuthPage;
