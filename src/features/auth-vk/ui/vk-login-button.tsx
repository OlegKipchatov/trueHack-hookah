"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@heroui/react";

import { useSession } from "@/entities/session";
import { useTranslation } from "@/shared/lib/i18n/provider";

const VK_OPEN_API_URL = "https://vk.com/js/api/openapi.js";

const getNumericAppId = (value: string | undefined) => {
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
};

type VkLoginButtonProps = {
  className?: string;
};

type VkAuthLoginParams = {
  app_id: number;
  redirect_uri: string;
  response_type: "code";
};

type VkAuthError = {
  error: string;
  error_description?: string;
};

type VkAuthSuccessSession = {
  code?: string;
  auth_code?: string;
  user?: {
    id?: number | string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
  };
};

type VkAuthResult =
  | {
      status: "ok";
      code?: string;
      session?: VkAuthSuccessSession;
    }
  | {
      status: "error";
      error: VkAuthError;
    };

declare global {
  interface Window {
    VKID?: {
      Config: {
        init: (config: VkAuthLoginParams) => void;
      };
      Auth: {
        login: (
          params: VkAuthLoginParams,
        ) => Promise<VkAuthResult> | VkAuthResult;
      };
    };
  }
}

const resolveAuthCode = (result: VkAuthResult | null | undefined) => {
  if (!result || result.status !== "ok") {
    return null;
  }

  if (result.code) {
    return result.code;
  }

  if (result.session?.code) {
    return result.session.code;
  }

  if (result.session?.auth_code) {
    return result.session.auth_code;
  }

  return null;
};

const isVkAuthError = (
  value: VkAuthResult | VkAuthError,
): value is VkAuthError => "error" in value && typeof value.error === "string";

export const VkLoginButton = ({ className }: VkLoginButtonProps) => {
  const { t: translate } = useTranslation();
  const { login, logout, isAuthenticated } = useSession();
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clientId = useMemo(
    () => getNumericAppId(process.env.NEXT_PUBLIC_VK_APP_ID),
    [],
  );
  const redirectUri = process.env.NEXT_PUBLIC_VK_REDIRECT_URI;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleLoad = (event: Event) => {
      const target = event.currentTarget as HTMLScriptElement | null;

      if (target) {
        target.dataset.ready = "true";
      }

      setIsScriptReady(true);
    };

    const handleError = () => {
      setErrorMessage(translate("auth.vk.scriptError"));
    };

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${VK_OPEN_API_URL}"]`,
    );

    if (!script) {
      script = document.createElement("script");
      script.src = VK_OPEN_API_URL;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    if (script.dataset.ready === "true") {
      setIsScriptReady(true);
    }

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    return () => {
      script?.removeEventListener("load", handleLoad);
      script?.removeEventListener("error", handleError);
    };
  }, [translate]);

  useEffect(() => {
    if (!isScriptReady) {
      return;
    }

    if (!window.VKID || clientId === null || !redirectUri) {
      return;
    }

    try {
      window.VKID.Config.init({
        app_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error ?? "unknown");

      setErrorMessage(message);
    }
  }, [clientId, isScriptReady, redirectUri]);

  const handleLogin = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setErrorMessage(null);

    if (clientId === null || !redirectUri) {
      setErrorMessage(translate("auth.vk.misconfigured"));

      return;
    }

    if (!window.VKID?.Auth) {
      setErrorMessage(translate("auth.vk.notReady"));

      return;
    }

    setIsLoading(true);

    try {
      const result = await window.VKID.Auth.login({
        app_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
      });

      const code = resolveAuthCode(result);

      if (!code) {
        if (result && result.status === "error" && isVkAuthError(result)) {
          setErrorMessage(result.error_description ?? result.error);
        } else {
          setErrorMessage(translate("auth.vk.noCode"));
        }

        return;
      }

      const response = await fetch("/api/auth/vk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message =
          (payload && typeof payload.error === "string"
            ? payload.error
            : null) ?? translate("auth.vk.exchangeFailed");

        setErrorMessage(message);

        return;
      }

      const payload = await response.json();

      login({
        token: payload.token,
        refreshToken: payload.refreshToken,
        expiresIn: payload.expiresIn,
        profile: payload.profile ?? null,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error ?? "unknown");

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [clientId, isLoading, login, redirectUri, translate]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const buttonLabel = isAuthenticated
    ? translate("auth.vk.logout")
    : translate("auth.vk.button");

  const handleClick = isAuthenticated ? handleLogout : handleLogin;

  return (
    <div className="flex flex-col gap-2">
      <Button
        className={className}
        color="primary"
        isDisabled={!isScriptReady && !isAuthenticated}
        isLoading={isLoading}
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
      {errorMessage && (
        <p className="text-sm text-danger" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
