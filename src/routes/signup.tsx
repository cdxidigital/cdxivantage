import { useLayoutEffect, useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { VantageLockup } from "@/components/vantage/mark";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const { user, isPending } = useCurrentUserState();

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = "light";
  }, []);

  if (isPending) {
    return (
      <main className="logged-out" aria-busy="true">
        <div className="logged-out-card login-card">
          <VantageLockup stacked tagline />
          <div className="boot-pulse boot-pulse-wide" />
        </div>
      </main>
    );
  }
  if (user) return <Navigate to="/" />;
  return <SignupForm />;
}

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"email" | "oauth" | null>(null);

  async function completeSession(token?: string | null) {
    if (token && typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem("grok-auth.bearer-token", token);
      } catch {
        /* ignore */
      }
    }
    try {
      await authClient.getSession();
    } catch {
      /* session store recovers on next fetch */
    }
    window.location.assign("/");
  }

  async function createAccount() {
    setError(null);
    const nextName = name.trim();
    const nextEmail = email.trim();
    if (nextName.length < 2) {
      setError("Enter the name that should appear on the workspace.");
      return;
    }
    if (password.length < 8) {
      setError("Use at least 8 characters for the password.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    const { data, error: authError } = await authClient.signUp.email({
      name: nextName,
      email: nextEmail,
      password,
      callbackURL: "/",
    });
    if (authError) {
      setError(authError.message || "Could not create the workspace. Try a different email.");
      return;
    }
    await completeSession(data?.token);
  }

  return (
    <main className="logged-out">
      <div className="logged-out-card login-card">
        <Link to="/" className="land-brand" aria-label="cdxi vantage home">
          <VantageLockup stacked tagline />
        </Link>
        <span className="eyebrow">New workspace</span>
        <h1>Create your vantage</h1>
        <p>Start an empty operating view for your firm. You can restore the Northline demo later.</p>

        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault();
            setBusy("email");
            void createAccount().finally(() => setBusy(null));
          }}
        >
          <div className="field">
            <label htmlFor="signup-name">Your name</label>
            <input
              id="signup-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="signup-confirm">Confirm password</label>
            <input
              id="signup-confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button className="button-primary login-submit" type="submit" disabled={busy !== null}>
            {busy === "email" ? "Creating workspace…" : "Create workspace"}
          </button>
        </form>

        <div className="login-or">or continue with</div>
        {authEnabled ? (
          <div className="login-oauth">
            {GROK_PROVIDERS.map((provider) => (
              <button
                key={provider.providerId}
                type="button"
                className="button-ghost"
                disabled={busy !== null}
                onClick={() => {
                  setBusy("oauth");
                  void signIn(provider.providerId, { callbackURL: "/" }).catch((err: unknown) => {
                    setBusy(null);
                    setError(err instanceof Error ? err.message : "Sign-in failed");
                  });
                }}
              >
                Continue with {provider.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="heading-note">Sign-up is disabled.</p>
        )}

        <p className="auth-switch">
          Already have a workspace? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
