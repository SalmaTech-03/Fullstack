import { useState } from "react";

function UpdatePasswordForm({
    onUpdatePassword,
    onBackToLogin,
    error,
}) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");

        if (password.length < 6) {
            setMessage(
                "Password must be at least 6 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            setMessage(
                "Passwords do not match."
            );
            return;
        }

        setSubmitting(true);

        try {
            await onUpdatePassword(password);

            setMessage(
                "Password updated successfully. You can now sign in with your new password."
            );

            setPassword("");
            setConfirmPassword("");
        } catch {
            // Error is displayed by the auth layer.
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Set new password</h2>

            <p className="auth-subtitle">
                Enter your new password below.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="new-password">
                    New password
                </label>

                <input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    required
                />

                <label htmlFor="confirm-password">
                    Confirm password
                </label>

                <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) =>
                        setConfirmPassword(
                            event.target.value
                        )
                    }
                    placeholder="Confirm new password"
                    autoComplete="new-password"
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
                        ? "Updating..."
                        : "Update password"}
                </button>
            </form>

            <p className="auth-switch">
                Want to sign in instead?{" "}
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

export default UpdatePasswordForm;