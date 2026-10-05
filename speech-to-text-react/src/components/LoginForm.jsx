import { useState } from "react";

function LoginForm({
    onLogin,
    onSwitchToRegister,
    onForgotPassword,
    error,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            return;
        }

        setSubmitting(true);

        try {
            await onLogin(email, password);
        } catch {
            // Error is displayed by the form.
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign in</h2>

            <p className="auth-subtitle">
                Sign in to access your account.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="login-email">
                    Email
                </label>

                <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                />

                <label htmlFor="login-password">
                    Password
                </label>

                <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                />

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="auth-button"
                    disabled={submitting}
                >
                    {submitting
                        ? "Signing in..."
                        : "Sign in"}
                </button>
            </form>

            <button
                type="button"
                className="forgot-password-button"
                onClick={onForgotPassword}
            >
                Forgot password?
            </button>

            <p className="auth-switch">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                >
                    Create one
                </button>
            </p>
        </div>
    );
}

export default LoginForm;