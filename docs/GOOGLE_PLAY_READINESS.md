# Google Play Readiness Checklist

This checklist is a preparation document, not a claim of Google Play approval.

## Product

- [ ] Android package/application ID selected and owned.
- [ ] Native/PWA packaging tested on supported Android versions.
- [ ] Current Google Play target API requirement satisfied at release time.
- [ ] App provides meaningful functionality beyond a simple web wrapper.
- [ ] Store listing accurately describes AI, search, productivity and business features.

## Privacy and user data

- [ ] Public privacy policy published on ezrome.co.za.
- [ ] Data collection inventory completed for EZROME and every third-party AI/search provider.
- [ ] Data Safety form matches actual implementation.
- [ ] Account deletion and applicable data export flow implemented.
- [ ] Sensitive data is not collected unnecessarily.
- [ ] Third-party AI data handling is documented.

## Generative AI safety

- [ ] In-app mechanism for reporting/flagging problematic AI output.
- [ ] Abuse/rate-limit controls.
- [ ] Safety filters and prompt/output policies.
- [ ] Clear distinction between live sources and generated analysis.
- [ ] Human-readable error states when retrieval cannot verify information.

## Monetization

- [ ] Free/Pro/Business entitlements defined.
- [ ] Google Play Billing integrated for applicable digital purchases.
- [ ] Server-side entitlement verification.
- [ ] Subscription terms, renewal and cancellation information displayed clearly.
- [ ] Alternative billing used only if the developer is enrolled and the transaction qualifies under a current Google program.

## Testing and release

- [ ] Unit tests.
- [ ] Type checking.
- [ ] Linting.
- [ ] Production build.
- [ ] Android installation test.
- [ ] Offline/PWA behavior test.
- [ ] Accessibility pass.
- [ ] Security review.
- [ ] Closed testing requirements satisfied if applicable to the developer account.
- [ ] Play Console declarations reviewed immediately before submission.
