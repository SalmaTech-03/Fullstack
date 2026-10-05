import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    fetchSessions,
    createSession,
    deleteSession as deleteRemoteSession,
    clearSessions,
} from "../services/speechHistoryService";

export function useSpeechHistory(userId) {
    const queryClient = useQueryClient();

    const queryKey = ["speech-sessions", userId];

    const {
        data: history = [],
        isLoading,
        error,
    } = useQuery({
        queryKey,
        queryFn: fetchSessions,
        enabled: Boolean(userId),

        // Allow cached data to be used while
        // network connectivity is unavailable.
        networkMode: "offlineFirst",
    });

    const createMutation = useMutation({
        mutationFn: createSession,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey,
            });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteRemoteSession,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey,
            });
        },
    });

    const clearMutation = useMutation({
        mutationFn: clearSessions,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey,
            });
        },
    });

    const addSession = async (text) => {
        const cleanText = text.trim();

        if (
            !cleanText ||
            createMutation.isPending
        ) {
            return;
        }

        await createMutation.mutateAsync(
            cleanText
        );
    };

    const deleteSession = async (id) => {
        if (
            !id ||
            deleteMutation.isPending
        ) {
            return;
        }

        await deleteMutation.mutateAsync(id);
    };

    const clearHistory = async () => {
        if (clearMutation.isPending) {
            return;
        }

        await clearMutation.mutateAsync();
    };

    return {
        history,
        isLoading,
        error,

        addSession,
        deleteSession,
        clearHistory,

        isSaving: createMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isClearing: clearMutation.isPending,

        isMutating:
            createMutation.isPending ||
            deleteMutation.isPending ||
            clearMutation.isPending,
    };
}