export function normalizeApiError(error) {
    if (!error) {
        return {
            message: "Something went wrong.",
            code: "UNKNOWN_ERROR",
            status: null,
        };
    }

    const status =
        error.status ??
        error.statusCode ??
        null;

    const code =
        error.code ??
        "UNKNOWN_ERROR";

    let message =
        error.message ??
        "Something went wrong.";

    if (status === 401 || status === 403) {
        message =
            "Your session has expired or you do not have permission to perform this action.";
    }

    if (status === 429) {
        message =
            "Too many requests. Please wait a moment and try again.";
    }

    if (status >= 500) {
        message =
            "The server is temporarily unavailable. Please try again later.";
    }

    return {
        message,
        code,
        status,
    };
}