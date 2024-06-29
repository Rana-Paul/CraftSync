"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

export function Provider({ children }: { children: ReactNode }) {
    return <SessionProvider refetchInterval={60}>{children}</SessionProvider>;
}

