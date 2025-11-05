"use client";

import type { Bowl } from "./bowl.types";

import { useCallback, useSyncExternalStore } from "react";

import { BOWLS_STORAGE_KEY } from "./bowl.constants";
import { sanitizeBowl, sanitizeBowls } from "./bowl-normalize";

import { getLocalStorageItem, setLocalStorageItem } from "@/shared/lib/storage";

type BowlsStoreState = {
  bowls: Bowl[];
  isLoading: boolean;
};

type BowlsStoreActions = {
  addBowl: (bowl: Bowl) => void;
  updateBowl: (bowl: Bowl) => void;
  removeBowl: (id: string) => void;
};

type BowlsStoreSnapshot = BowlsStoreState & BowlsStoreActions;

const listeners = new Set<() => void>();

let state: BowlsStoreState = {
  bowls: [],
  isLoading: true,
};

let isInitialized = false;

const notify = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const setState = (updater: (prev: BowlsStoreState) => BowlsStoreState) => {
  state = updater(state);
  notify();
};

const persistBowls = (bowls: Bowl[]) => {
  setLocalStorageItem(BOWLS_STORAGE_KEY, bowls);
};

const hydrate = () => {
  const stored = getLocalStorageItem<Bowl[]>(BOWLS_STORAGE_KEY, []);
  const bowls = sanitizeBowls(stored);

  persistBowls(bowls);

  state = {
    bowls,
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

const actions: BowlsStoreActions = {
  addBowl: (bowl) => {
    ensureInitialized();
    setState((prev) => {
      const nextBowls = [...prev.bowls, sanitizeBowl(bowl)];

      persistBowls(nextBowls);

      return {
        bowls: nextBowls,
        isLoading: false,
      };
    });
  },
  updateBowl: (bowl) => {
    ensureInitialized();
    setState((prev) => {
      const sanitized = sanitizeBowl(bowl);
      const nextBowls = prev.bowls.map((item) =>
        item.id === sanitized.id ? sanitized : item,
      );

      persistBowls(nextBowls);

      return {
        bowls: nextBowls,
        isLoading: false,
      };
    });
  },
  removeBowl: (id) => {
    ensureInitialized();
    setState((prev) => {
      const nextBowls = prev.bowls.filter((item) => item.id !== id);

      persistBowls(nextBowls);

      return {
        bowls: nextBowls,
        isLoading: false,
      };
    });
  },
};

const getSnapshot = (): BowlsStoreSnapshot => ({
  ...state,
  ...actions,
});

export const useBowlsStore = <T>(
  selector: (store: BowlsStoreSnapshot) => T,
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

export const initializeBowlsStore = () => {
  if (isInitialized) {
    return;
  }

  ensureInitialized();
  notify();
};
