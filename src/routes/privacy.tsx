import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy | EZROME" }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6">
      <article className="panel mx-auto max-w-3xl p-6 sm:p-10">
        <p className="eyebrow">EZROME · ezrome.co.za</p>
        <h1 className="mt-3 text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This page is a product foundation and must be reviewed and completed for the final EZROME data flows before production release.
        </p>
        <div className="mt-8 space-y-7 text-sm leading-6 text-muted-foreground">
          <section><h2 className="text-lg font-bold text-foreground">Information we may process</h2><p className="mt-2">Depending on enabled features, EZROME may process account information, prompts, documents, workspace records, diagnostics and subscription information.</p></section>
          <section><h2 className="text-lg font-bold text-foreground">How information is used</h2><p className="mt-2">Information is used to provide requested features, secure accounts, operate the service, improve reliability and process applicable subscriptions.</p></section>
          <section><h2 className="text-lg font-bold text-foreground">AI and search providers</h2><p className="mt-2">Production integrations will be disclosed here with the categories of data sent to each provider, retention behavior and the legal/product basis for the transfer.</p></section>
          <section><h2 className="text-lg font-bold text-foreground">Your controls</h2><p className="mt-2">The production account area will provide applicable controls for access, correction, deletion and export of personal information.</p></section>
          <section><h2 className="text-lg font-bold text-foreground">Contact</h2><p className="mt-2">For privacy requests, use the official contact channel published at ezrome.co.za.</p></section>
        </div>
      </article>
    </main>
  );
}
