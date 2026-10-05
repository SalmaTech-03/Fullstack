export const queryConfig = {
    retry: 2,

    retryDelay: (attemptIndex) => {
        const delay = Math.min(
            1000 * 2 ** attemptIndex,
            5000
        );

        return delay;
    },

    refetchOnWindowFocus: false,
};