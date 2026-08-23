import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service | EZROME" }] }),
  component: Terms,
});

function Terms() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6">
      <article className="panel mx-auto max-w-3xl p-6 sm:p-10">
        <p className="eyebrow">EZROME · ezrome.co.za</p>
        <h1 className="mt-3 text-4xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted-foreground">This is a product foundation and must receive legal review before production publication.</p>
        <div className="mt-8 space-y-7 text-sm leading-6 text-muted-foreground">
          <section><h2 className="text-lg font-bold text-foreground">Service</h2><p className="mt-2">EZROME provides AI-assisted productivity, research and business tools. Features and availability may change as the platform develops.</p></section>
          <section><h2 className="text-lg font-bold text-foreground">AI limitations</h2><p className="mt-2">AI output can be incorrect or incomplete. Users should verify important information and should not treat generated output as professional legal, tax, medical or financial advice.</p></section>
          <section><h2 className="text-lg font-bold text-foreground">Acceptable use</h2><p className="mt-2">Users may not use EZROME to facilitate unlawful activity, abuse, privacy violations, malware distribution, copyright infringement or harmful exploitation of other people.</p></section>
          <section><h2 className="text-lg font-bold text-foreground">Subscriptions</h2><p className="mt-2">Paid digital features will be governed by the applicable checkout and platform billing terms presented before purchase.</p></section>
        </div>
      </article>
    </main>
  );
}
