import { normalizeApiError } from "../adapters/apiErrorAdapter";
import { supabase } from "./supabaseClient";

function normalizeSpeechSession(session) {
    return {
        id: session.id,
        userId: session.user_id,
        text: session.text,
        createdAt: session.created_at,
    };
}

export async function fetchSessions() {
    const {
        data,
        error,
    } = await supabase
        .from("speech_sessions")
        .select(
            "id, user_id, text, created_at"
        )
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw normalizeApiError(error);
    }

    return (data ?? []).map(
        normalizeSpeechSession
    );
}

export async function createSession(text) {
    const cleanText = text.trim();

    if (!cleanText) {
        throw new Error(
            "Transcript cannot be empty."
        );
    }

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        throw normalizeApiError(userError);
    }

    if (!user) {
        throw new Error(
            "You must be signed in to save a session."
        );
    }

    const {
        data,
        error,
    } = await supabase
        .from("speech_sessions")
        .insert({
            user_id: user.id,
            text: cleanText,
        })
        .select(
            "id, user_id, text, created_at"
        )
        .single();

    if (error) {
        throw normalizeApiError(error);
    }

    return normalizeSpeechSession(data);
}

export async function deleteSession(id) {
    if (!id) {
        throw new Error(
            "Session ID is required."
        );
    }

    const {
        error,
    } = await supabase
        .from("speech_sessions")
        .delete()
        .eq("id", id);

    if (error) {
        throw normalizeApiError(error);
    }
}

export async function clearSessions() {
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        throw normalizeApiError(userError);
    }

    if (!user) {
        throw new Error(
            "You must be signed in to clear history."
        );
    }

    const {
        error,
    } = await supabase
        .from("speech_sessions")
        .delete()
        .eq("user_id", user.id);

    if (error) {
        throw normalizeApiError(error);
    }
}