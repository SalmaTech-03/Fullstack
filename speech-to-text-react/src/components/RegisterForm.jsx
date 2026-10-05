import { useState } from "react";

function RegisterForm({
    onRegister,
    onSwitchToLogin,
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
            await onRegister(email, password);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Create account</h2>

            <p className="auth-subtitle">
                Create an account to get started.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="register-email">
                    Email
                </label>

                <input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                />

                <label htmlFor="register-password">
                    Password
                </label>

                <input
                    id="register-password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    placeholder="Create a password"
                    autoComplete="new-password"
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
                        ? "Creating account..."
                        : "Create account"}
                </button>
            </form>

            <p className="auth-switch">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                >
                    Sign in
                </button>
            </p>
        </div>
    );
}

export default RegisterForm;