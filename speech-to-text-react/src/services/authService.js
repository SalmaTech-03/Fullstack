import { supabase } from "./supabaseClient";

export async function signUp(email, password) {
    const { data, error } =
        await supabase.auth.signUp({
            email,
            password,
        });

    if (error) {
        throw error;
    }

    return data;
}

export async function signIn(email, password) {
    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (error) {
        throw error;
    }

    return data;
}

export async function signOut() {
    const { error } =
        await supabase.auth.signOut();

    if (error) {
        throw error;
    }
}

export async function getCurrentSession() {
    const { data, error } =
        await supabase.auth.getSession();

    if (error) {
        throw error;
    }

    return data.session;
}

export function subscribeToAuthChanges(callback) {
    return supabase.auth.onAuthStateChange(
        (event, session) => {
            callback(event, session);
        }
    );
}
export async function resetPassword(email) {
    const { error } =
        await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo:
                    window.location.origin,
            }
        );

    if (error) {
        throw error;
    }
}
export async function updatePassword(password) {
    const { data, error } =
        await supabase.auth.updateUser({
            password,
        });

    if (error) {
        throw error;
    }

    return data;
}