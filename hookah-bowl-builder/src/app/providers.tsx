'use client'

import { NextUIProvider } from '@heroui/react'
import { ReactNode } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>
}
