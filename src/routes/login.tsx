import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in | EZROME" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Authentication failed");
      await navigate({ to: "/workspace" });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6">
      <section className="panel mx-auto max-w-md p-6 shadow-panel sm:p-8">
        <p className="eyebrow">EZROME.CO.ZA</p>
        <h1 className="mt-3 text-3xl font-bold">{mode === "login" ? "Welcome back" : "Create your EZROME account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account unlocks an ownership-scoped persistent workspace.
        </p>
        <div className="mt-6 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Password
            <input
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="button"
            disabled={busy || !email || password.length < 12}
            onClick={() => void submit()}
            className="w-full rounded-lg bg-primary px-4 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-glow disabled:opacity-50"
          >
            {busy ? "Working…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError(null);
          }}
          className="mt-5 text-xs font-bold text-primary hover:underline"
        >
          {mode === "login" ? "Create a new account" : "I already have an account"}
        </button>
        <div className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Back to EZROME</Link>
        </div>
      </section>
    </main>
  );
}
