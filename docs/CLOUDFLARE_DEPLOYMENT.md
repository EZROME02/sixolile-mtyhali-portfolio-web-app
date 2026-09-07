# Cloudflare deployment

The portfolio is built as a Cloudflare-compatible Worker with static assets. The generated deployment manifest is `.output/server/wrangler.json`.

The GitHub Actions workflow at `.github/workflows/cloudflare-deploy.yml` deploys `ezrome-public-site` whenever `main` changes or when the workflow is started manually.

The repository needs these GitHub Actions secrets before the workflow can deploy:

- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID.
- `CLOUDFLARE_API_TOKEN`: a scoped token with permission to edit Workers scripts and assets for this account.

The workflow deliberately does not contain credentials. After those secrets are configured, the deployment command is:

```sh
npm ci
npm run build
npx wrangler deploy --config .output/server/wrangler.json --cwd .output/server --name ezrome-public-site
```

DNS delegation is separate from Worker deployment. Cloudflare can provide the assigned nameservers, but the domain registrar must publish them at the parent `.co.za` registry. The current Cloudflare nameservers are `kristina.ns.cloudflare.com` and `troy.ns.cloudflare.com`.
