"use client";
import { FC, useState, ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function QueryclientProvider({children}: {children: ReactNode}) {
    const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
    </QueryClientProvider>
  )
}
