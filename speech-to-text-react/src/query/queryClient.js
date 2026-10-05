import { QueryClient } from "@tanstack/react-query";

import { queryConfig } from "./queryConfig";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 1000,

            gcTime: 24 * 60 * 60 * 1000,

            retry: queryConfig.retry,

            retryDelay: queryConfig.retryDelay,

            refetchOnWindowFocus:
                queryConfig.refetchOnWindowFocus,
        },

        mutations: {
            retry: 0,
        },
    },
});