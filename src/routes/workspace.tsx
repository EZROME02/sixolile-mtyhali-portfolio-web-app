import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

export const Route = createFileRoute("/workspace")({
  head: () => ({ meta: [{ title: "Workspace | EZROME" }] }),
  component: Workspace,
});

const WORKSPACE_ID_KEY = "ezrome_workspace_id";

type WorkspaceData = {
  notes: string;
  links: string[];
};

type WorkspaceResponse = {
  workspace: { id: string; name: string; data: string; updatedAt: string };
};

function Workspace() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState("My EZROME Workspace");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Loading workspace…");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const meResponse = await fetch("/api/auth/me");
    const me = (await meResponse.json()) as { user?: { email: string } | null };
    if (!me.user) {
      await navigate({ to: "/login" });
      return;
    }
    setEmail(me.user.email);

    const id = localStorage.getItem(WORKSPACE_ID_KEY) ?? crypto.randomUUID();
    localStorage.setItem(WORKSPACE_ID_KEY, id);
    const response = await fetch(`/api/workspace?id=${encodeURIComponent(id)}`);
    if (response.status === 404) {
      setStatus("New workspace — save when ready.");
      return;
    }
    if (!response.ok) {
      setStatus("Workspace could not be loaded.");
      return;
    }
    const payload = (await response.json()) as WorkspaceResponse;
    setName(payload.workspace.name);
    try {
      const data = JSON.parse(payload.workspace.data) as WorkspaceData;
      setNotes(data.notes ?? "");
    } catch {
      setNotes("");
    }
    setStatus(`Saved ${new Date(payload.workspace.updatedAt).toLocaleString()}`);
  }, [navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setSaving(true);
    setStatus("Saving…");
    const id = localStorage.getItem(WORKSPACE_ID_KEY) ?? crypto.randomUUID();
    localStorage.setItem(WORKSPACE_ID_KEY, id);
    try {
      const response = await fetch("/api/workspace", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, data: JSON.stringify({ notes, links: [] }) }),
      });
      if (!response.ok) throw new Error("save failed");
      const payload = (await response.json()) as WorkspaceResponse;
      setStatus(`Saved ${new Date(payload.workspace.updatedAt).toLocaleString()}`);
    } catch {
      setStatus("Save failed. Check your account and database connection.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    await navigate({ to: "/login" });
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="eyebrow">EZROME WORKSPACE</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Your persistent workspace</h1>
            <p className="mt-2 text-sm text-muted-foreground">{email ?? ""}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/ai"
              className="rounded-lg border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-primary hover:text-primary"
            >
              AI
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="rounded-lg border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-primary hover:text-primary"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="panel mt-8 p-6 shadow-panel sm:p-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Workspace name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <label className="mt-6 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Notes
            <textarea
              rows={12}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Keep your project notes, ideas and plans here."
              className="mt-2 w-full resize-y rounded-xl border border-input bg-background p-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => void save()}
              className="rounded-lg bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-glow disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save workspace"}
            </button>
            <span className="text-xs text-muted-foreground">{status}</span>
          </div>
        </section>

        <p className="mt-6 text-xs text-muted-foreground">
          Ownership is enforced on the server. The browser stores only the workspace identifier;
          account sessions and workspace data are protected by the server boundary.
        </p>
      </div>
    </main>
  );
}
