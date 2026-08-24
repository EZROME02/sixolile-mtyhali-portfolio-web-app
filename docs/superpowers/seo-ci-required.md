# SEO CI Verification Requirement

Before merging the EZROME SEO entity-discoverability branch, GitHub Actions must report successful results for:

- `bun test`
- `bun run lint`
- `bun run build`

The implementation must not be described as production-verified until those checks succeed.
