"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/shared/lib/storage";

const SESSION_STORAGE_KEY = "app-session";

export type SessionProfile = {
  id: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

export type SessionSnapshot = {
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  profile: SessionProfile | null;
  isLoading: boolean;
  setSession: (session: SessionPayload) => void;
  updateProfile: (profile: SessionProfile | null) => void;
  clearSession: () => void;
};

export type SessionPayload = {
  token: string;
  refreshToken?: string | null;
  expiresIn?: number | null;
  profile?: SessionProfile | null;
};

type SessionState = {
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  profile: SessionProfile | null;
  isLoading: boolean;
};

type SessionActions = {
  setSession: (session: SessionPayload) => void;
  updateProfile: (profile: SessionProfile | null) => void;
  clearSession: () => void;
};

const listeners = new Set<() => void>();

let isInitialized = false;

let state: SessionState = {
  token: null,
  refreshToken: null,
  expiresAt: null,
  profile: null,
  isLoading: true,
};

const notify = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

type SessionProfileInput = Partial<SessionProfile> & {
  id?: string | number;
  first_name?: string;
  last_name?: string;
  photo?: string;
  photo_200?: string;
};

const sanitizeProfile = (profile: SessionProfileInput | null | undefined) => {
  if (!profile) {
    return null;
  }

  const identifier = profile.id ?? "";

  return {
    id: String(identifier),
    firstName: profile.firstName ?? profile.first_name ?? undefined,
    lastName: profile.lastName ?? profile.last_name ?? undefined,
    avatar: profile.avatar ?? profile.photo ?? profile.photo_200 ?? undefined,
  } satisfies SessionProfile;
};

type StoredSession = {
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  profile: SessionProfile | null;
};

const sanitizeStoredSession = (stored: StoredSession | null | undefined) => {
  if (!stored) {
    return {
      token: null,
      refreshToken: null,
      expiresAt: null,
      profile: null,
    };
  }

  return {
    token: typeof stored.token === "string" ? stored.token : null,
    refreshToken:
      typeof stored.refreshToken === "string" ? stored.refreshToken : null,
    expiresAt:
      typeof stored.expiresAt === "number" && Number.isFinite(stored.expiresAt)
        ? stored.expiresAt
        : null,
    profile: sanitizeProfile(stored.profile),
  };
};

const persistSession = (nextState: SessionState) => {
  const payload: StoredSession = {
    token: nextState.token,
    refreshToken: nextState.refreshToken,
    expiresAt: nextState.expiresAt,
    profile: nextState.profile,
  };

  setLocalStorageItem(SESSION_STORAGE_KEY, payload);
};

const hydrate = () => {
  const stored = getLocalStorageItem<StoredSession | null>(
    SESSION_STORAGE_KEY,
    null,
  );
  const sanitized = sanitizeStoredSession(stored);

  state = {
    ...state,
    ...sanitized,
    isLoading: false,
  };
};

const ensureInitialized = () => {
  if (isInitialized) {
    return;
  }

  isInitialized = true;
  hydrate();
};

const setState = (updater: (prev: SessionState) => SessionState) => {
  state = updater(state);
  notify();
};

const computeExpiresAt = (expiresIn: number | null | undefined) => {
  if (typeof expiresIn !== "number" || !Number.isFinite(expiresIn)) {
    return null;
  }

  return Date.now() + expiresIn * 1000;
};

const actions: SessionActions = {
  setSession: ({ token, refreshToken, expiresIn, profile }) => {
    ensureInitialized();

    setState((_prev) => {
      const nextState: SessionState = {
        token,
        refreshToken: refreshToken ?? null,
        expiresAt: computeExpiresAt(expiresIn),
        profile: sanitizeProfile(profile),
        isLoading: false,
      };

      persistSession(nextState);

      return nextState;
    });
  },
  updateProfile: (profile) => {
    ensureInitialized();

    setState((prev) => {
      const nextState: SessionState = {
        ...prev,
        profile: sanitizeProfile(profile),
        isLoading: false,
      };

      persistSession(nextState);

      return nextState;
    });
  },
  clearSession: () => {
    ensureInitialized();

    setState(() => {
      const nextState: SessionState = {
        token: null,
        refreshToken: null,
        expiresAt: null,
        profile: null,
        isLoading: false,
      };

      removeLocalStorageItem(SESSION_STORAGE_KEY);

      return nextState;
    });
  },
};

const getSnapshot = (): SessionSnapshot => ({
  ...state,
  ...actions,
});

export const useSessionStore = <T>(
  selector: (snapshot: SessionSnapshot) => T,
) => {
  const getSelectedSnapshot = useCallback(
    () => selector(getSnapshot()),
    [selector],
  );

  return useSyncExternalStore(
    subscribe,
    getSelectedSnapshot,
    getSelectedSnapshot,
  );
};

export const useSession = () =>
  useSessionStore((snapshot) => ({
    token: snapshot.token,
    refreshToken: snapshot.refreshToken,
    expiresAt: snapshot.expiresAt,
    profile: snapshot.profile,
    isLoading: snapshot.isLoading,
    isAuthenticated: Boolean(snapshot.token),
    login: snapshot.setSession,
    logout: snapshot.clearSession,
    updateProfile: snapshot.updateProfile,
  }));

export const initializeSessionStore = () => {
  if (isInitialized) {
    return;
  }

  ensureInitialized();
  notify();
};
