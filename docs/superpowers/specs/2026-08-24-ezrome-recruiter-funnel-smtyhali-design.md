# EZROME Recruiter Funnel + SMTYHALI Signing Design

## Goal

Turn the existing EZROME portfolio into a recruiter-first professional hub while preserving the current published design, existing functionality, PWA/mobile work, and protected Android release workflow.

The professional identity for signing/release verification is **SMTYHALI**. Where a cryptographic signing identity is required, the release gate must verify the certificate fingerprint associated with the user's legitimate SMTYHALI signing key. No private key material or passwords are stored in source control or ChatGPT.

## 1. Portfolio contact ecosystem

The portfolio remains the central professional hub.

Primary recruiter actions, in order of prominence:

1. LinkedIn — professional networking
2. Download CV — recruiter-ready CV
3. GitHub — technical proof
4. Email — professional enquiries
5. WhatsApp — direct contact
6. Facebook/X — optional secondary social links

The public site will not expose unnecessary private personal details.

The contact area will provide a clear **Let's Connect** block and preserve the existing EZROME visual/design system.

## 2. Professional identity loop

Recruiter journey:

`LinkedIn → EZROME Portfolio → Projects / GitHub → CV → Contact`

The portfolio links back to the user's LinkedIn profile, and LinkedIn's Featured section is intended to point back to the portfolio, projects, and CV.

## 3. EZROME LinkedIn Career Agent

Add a controlled career-assistance subsystem rather than an autonomous publisher.

Capabilities:

- Profile audit against selected target roles
- Headline/About/Experience/Skills recommendations
- Legitimate keyword-gap analysis
- Recruiter-message preparation
- Application preparation
- Project and portfolio positioning
- Content/post drafts based on real EZROME work
- GitHub/release milestone summaries
- Career positioning recommendations

Approval boundary:

- The agent may analyze and prepare.
- The user must explicitly approve before any LinkedIn post, message, profile change, or application is published/sent.
- No automated keyword stuffing, fabricated experience, inflated credentials, or unsupervised outreach.

## 4. Android signing policy

Do not redesign the Android app as part of this work.

The existing production workflow already performs:

`protected secrets → keystore materialization → release build → APK signature verification → SMTYHALI certificate fingerprint comparison → APK SHA-256 → artifact upload → byte-for-byte artifact verification`

Required protected secrets remain:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_STORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`
- `SMTYHALI_SIGNER_SHA256`

The workflow must fail closed when any required secret is missing or when the generated certificate fingerprint does not match `SMTYHALI_SIGNER_SHA256`.

The final artifact must be the exact APK whose signer was verified.

The word/name **SMTYHALI** is an identity label; it does not by itself prove cryptographic ownership. The certificate fingerprint is the actual verification mechanism.

## 5. Other signing/attribution

Where the system has a concept of author/release identity, use the user's professional identity consistently as **Sixolile Ezrome Mtyhali / SMTYHALI**, as appropriate to the platform field.

Do not confuse Git commit attribution, application signing, and platform account ownership:

- Git commits use the configured Git author identity.
- Android releases use the cryptographic Android signing key and certificate fingerprint.
- Web deployment ownership is controlled by the hosting account/project permissions.
- LinkedIn publishing is controlled by the user's LinkedIn account and mandatory approval.

No attempt will be made to forge or manufacture a signing identity.

## 6. Release sequence

### Phase 1 — Identity

- Integrate LinkedIn, GitHub, email, WhatsApp and CV into the portfolio.
- Establish the recruiter CTA hierarchy.

### Phase 2 — Web

- Preserve the current EZROME design and verify the production deployment.

### Phase 3 — Android

- Confirm protected signing secrets are present.
- Run the production signing workflow.
- Verify the APK certificate against `SMTYHALI_SIGNER_SHA256`.
- Verify the final artifact byte-for-byte.

### Phase 4 — Distribution preparation

- Prepare the verified production APK for Play Console requirements.
- Do not publish to Google Play until the signing gate passes and release metadata is ready.

### Phase 5 — Recruiter launch

- Optimize LinkedIn positioning for actual target roles.
- Populate Featured section with EZROME portfolio, projects, GitHub and CV.
- Prepare an EZROME launch post for approval.
- Prepare recruiter outreach drafts for approval.

## 7. Acceptance criteria

- Existing EZROME design/functionality remains intact.
- Contact ecosystem is recruiter-first and publicly appropriate.
- LinkedIn is the primary professional CTA.
- Career Agent has a mandatory human approval boundary for external actions.
- No private signing credentials enter source control.
- Production Android workflow refuses to release when signer identity does not match the expected SMTYHALI fingerprint.
- Final uploaded APK is byte-for-byte identical to the verified build output.
- Production distribution is not treated as complete until these gates pass.
