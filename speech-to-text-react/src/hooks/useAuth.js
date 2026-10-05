import { useEffect, useState } from "react";

import {
    getCurrentSession,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    subscribeToAuthChanges,
} from "../services/authService";

export function useAuth() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isRecoveryMode, setIsRecoveryMode] =
        useState(false);

    useEffect(() => {
        let mounted = true;

        getCurrentSession()
            .then((currentSession) => {
                if (mounted) {
                    setSession(currentSession);
                }
            })
            .catch((error) => {
                if (mounted) {
                    setError(error.message);
                }
            })
            .finally(() => {
                if (mounted) {
                    setLoading(false);
                }
            });

        const {
            data: { subscription },
        } = subscribeToAuthChanges(
            (event, currentSession) => {
                if (!mounted) {
                    return;
                }

                setSession(currentSession);

                if (event === "PASSWORD_RECOVERY") {
                    setIsRecoveryMode(true);
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        setError("");

        try {
            const data = await signIn(
                email,
                password
            );

            setSession(data.session);

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const register = async (email, password) => {
        setError("");

        try {
            const data = await signUp(
                email,
                password
            );

            setSession(data.session);

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const logout = async () => {
        setError("");

        try {
            await signOut();
            setSession(null);
            setIsRecoveryMode(false);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const sendPasswordReset = async (email) => {
        setError("");

        try {
            await resetPassword(email);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const changePassword = async (password) => {
        setError("");

        try {
            const data =
                await updatePassword(password);

            setIsRecoveryMode(false);

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    return {
        session,
        user: session?.user ?? null,
        loading,
        error,
        isRecoveryMode,
        login,
        register,
        logout,
        sendPasswordReset,
        changePassword,
    };
}