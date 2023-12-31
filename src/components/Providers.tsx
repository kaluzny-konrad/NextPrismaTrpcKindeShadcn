"use client";

import { PropsWithChildren, useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { trpc } from "@/app/_trpc/client";
import { MessagesContextProvider } from "@/components/StandardQueryMessage/MessagesContext";
import { InfQueryMessagesContextProvider } from "@/components/InfiniteQueryMessage/InfQueryMessagesContext";

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MessagesContextProvider>
          <InfQueryMessagesContextProvider>
            {children}
          </InfQueryMessagesContextProvider>
        </MessagesContextProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
