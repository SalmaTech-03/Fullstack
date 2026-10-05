import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import "./App.css";

import Header from "./components/Header";
import StatusIndicator from "./components/StatusIndicator";
import Transcript from "./components/Transcript";
import SpeechControls from "./components/SpeechControls";
import WordCount from "./components/WordCount";
import History from "./components/History";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";

import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { useSpeechHistory } from "./hooks/useSpeechHistory";
import { useAuth } from "./hooks/useAuth";

function App() {
    const queryClient = useQueryClient();

    const [authMode, setAuthMode] = useState("login");

    const {
        session,
        user,
        loading: authLoading,
        error: authError,
        login,
        register,
        logout,
        isRecoveryMode,
        changePassword,
        sendPasswordReset,
    } = useAuth();

    const {
        transcript,
        isListening,
        error,
        startRecognition,
        stopRecognition,
        clearTranscript,
        loadTranscript,
    } = useSpeechRecognition();

    const isOnline = useNetworkStatus();

    const {
        history,
        isLoading: historyLoading,
        error: historyError,
        addSession,
        deleteSession,
        clearHistory,
        isSaving,
        isDeleting,
        isClearing,
    } = useSpeechHistory(user?.id);

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            // Always clear server-state cache after logout.
            // This prevents another user from seeing
            // cached data from the previous account.
            queryClient.clear();
        }
    };

    if (authLoading) {
        return (
            <div className="app">
                <div className="container">
                    <p className="auth-loading">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (isRecoveryMode) {
        return (
            <div className="app">
                <div className="container">
                    <Header />

                    <UpdatePasswordForm
                        onUpdatePassword={changePassword}
                        error={authError}
                        onBackToLogin={() => {
                            setAuthMode("login");
                        }}
                    />
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="app">
                <div className="container">
                    <Header />

                    {authMode === "login" && (
                        <LoginForm
                            onLogin={login}
                            error={authError}
                            onSwitchToRegister={() =>
                                setAuthMode("register")
                            }
                            onForgotPassword={() =>
                                setAuthMode(
                                    "forgot-password"
                                )
                            }
                        />
                    )}

                    {authMode === "register" && (
                        <RegisterForm
                            onRegister={register}
                            error={authError}
                            onSwitchToLogin={() =>
                                setAuthMode("login")
                            }
                        />
                    )}

                    {authMode === "forgot-password" && (
                        <ForgotPasswordForm
                            onResetPassword={
                                sendPasswordReset
                            }
                            error={authError}
                            onBackToLogin={() =>
                                setAuthMode("login")
                            }
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="container">
                <Header />

                <div className="user-bar">
                    <span>
                        Signed in as{" "}
                        <strong>{user?.email}</strong>
                    </span>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Sign out
                    </button>
                </div>

                <StatusIndicator
                    isListening={isListening}
                />

                {!isOnline && (
                    <div className="offline-status">
                        You are offline. Saved transcript
                        and cached history remain available.
                    </div>
                )}

                <Transcript
                    transcript={transcript}
                />

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <SpeechControls
                    isListening={isListening}
                    isOnline={isOnline}
                    onStart={startRecognition}
                    onStop={stopRecognition}
                    onClear={clearTranscript}
                />

                {transcript.trim() && (
                    <button
                        className="save-button"
                        onClick={() =>
                            addSession(transcript)
                        }
                        disabled={isSaving}
                    >
                        {isSaving
                            ? "Saving..."
                            : "Save Transcript"}
                    </button>
                )}

                <WordCount
                    transcript={transcript}
                />

                {historyLoading && (
                    <p className="history-status">
                        Loading history...
                    </p>
                )}

                {!isOnline && history.length > 0 && (
                    <p className="history-status">
                        Showing cached speech history.
                    </p>
                )}

                {historyError &&
                    history.length === 0 && (
                        <p className="error">
                            Unable to load speech history.
                        </p>
                    )}

                <History
                    history={history}
                    onLoad={loadTranscript}
                    onDelete={deleteSession}
                    onClear={clearHistory}
                    isDeleting={isDeleting}
                    isClearing={isClearing}
                />
            </div>
        </div>
    );
}

export default App;