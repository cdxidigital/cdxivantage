import { useLayoutEffect, useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { DEMO_LOGINS } from "@/lib/vantage/accounts";
import { VantageLockup } from "@/components/vantage/mark";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
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
  return <LoginForm />;
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"email" | "oauth" | "demo" | null>(null);

  async function completeEmailSignIn(nextEmail: string, nextPassword: string) {
    setError(null);
    const { data, error: authError } = await authClient.signIn.email({
      email: nextEmail,
      password: nextPassword,
      callbackURL: "/",
    });
    if (authError) {
      setError(authError.message || "Could not sign in. Check the email and password.");
      return;
    }
    if (data?.token && typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem("grok-auth.bearer-token", data.token);
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

  return (
    <main className="logged-out">
      <div className="logged-out-card login-card">
        <Link to="/" className="land-brand" aria-label="cdxi vantage home">
          <VantageLockup stacked tagline />
        </Link>
        <span className="eyebrow">Secure workspace</span>
        <h1>Sign in to vantage</h1>
        <p>Use your account, a demo login, or continue with Google or X.</p>

        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault();
            setBusy("email");
            void completeEmailSignIn(email.trim(), password).finally(() => setBusy(null));
          }}
        >
          <div className="field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button className="button-primary login-submit" type="submit" disabled={busy !== null}>
            {busy === "email" ? "Signing in…" : "Sign in"}
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
          <p className="heading-note">Sign-in is disabled.</p>
        )}

        <div className="demo-logins">
          <p className="panel-kicker">Demo accounts</p>
          {DEMO_LOGINS.map((account) => (
            <button
              key={account.email}
              type="button"
              className="demo-chip"
              disabled={busy !== null}
              onClick={() => {
                setEmail(account.email);
                setPassword(account.password);
                setBusy("demo");
                void completeEmailSignIn(account.email, account.password).finally(() => setBusy(null));
              }}
            >
              <strong>{account.name}</strong>
              <span>{account.role}</span>
              <em>{account.email}</em>
            </button>
          ))}
        </div>
        <small>
          Demo password is <code>VantageDemo1!</code>
        </small>
        <p className="auth-switch">
          New to vantage? <Link to="/signup">Create a workspace</Link>
        </p>
      </div>
    </main>
  );
}
