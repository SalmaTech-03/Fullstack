import { useState } from "react";

function ForgotPasswordForm({
    onResetPassword,
    onBackToLogin,
    error,
}) {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            return;
        }

        setSubmitting(true);
        setMessage("");

        try {
            await onResetPassword(email);

            setMessage(
                "If an account exists for this email, a password reset link has been sent."
            );
        } catch {
            // Error is handled by the auth layer.
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Reset password</h2>

            <p className="auth-subtitle">
                Enter your email and we'll send you a
                password reset link.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="reset-email">
                    Email
                </label>

                <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                />

                {message && (
                    <p className="auth-success">
                        {message}
                    </p>
                )}

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
                        ? "Sending..."
                        : "Send reset link"}
                </button>
            </form>

            <p className="auth-switch">
                Remember your password?{" "}
                <button
                    type="button"
                    onClick={onBackToLogin}
                >
                    Back to sign in
                </button>
            </p>
        </div>
    );
}

export default ForgotPasswordForm;