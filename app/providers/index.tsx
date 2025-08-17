'use client';

import type { ReactNode } from 'react';
import '@heroui/react/styles.css';
import { HeroUIProvider } from '@heroui/react';

export function Providers({ children }: { children: ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}

