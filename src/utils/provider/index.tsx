"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client/react";
import client from "@/utils/client";
import { Toaster } from "sonner";
import { AuthInitializer } from "@/components/AuthInitializer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthInitializer />
      <Toaster position="top-right" richColors />
      {children}
    </ApolloProvider>
  );
}
