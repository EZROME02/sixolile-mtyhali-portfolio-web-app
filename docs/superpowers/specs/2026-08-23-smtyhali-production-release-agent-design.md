# s.mtyhali Production Release Agent Design

## Goal
Provide a human-approved production Android release gate that builds, verifies, and publishes only an artifact signed by the independently established s.mtyhali certificate identity.

## Architecture
GitHub Actions is the release authority. A protected `production` environment with required reviewers creates the human approval boundary; the workflow cannot bypass it with an input variable. The workflow checks the five required signing secrets for presence without printing values, materializes the keystore only on the ephemeral runner, signs the release artifact, verifies package identity and the certificate SHA-256 fingerprint, and fails closed on any mismatch.

Coding assistance is intentionally separated from release authority. Kimi 2.7 may inspect code, diagnose Gradle/CI/test failures, and propose or implement ordinary code changes, but must never receive signing secret values, the private keystore, or permission to approve/publish production releases.

## Release Flow
1. Dispatch the release workflow for the intended commit.
2. Reach the protected `production` environment and require the user's explicit GitHub reviewer approval.
3. Verify `ANDROID_KEYSTORE_BASE64`, `ANDROID_STORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`, and `SMTYHALI_SIGNER_SHA256` are non-empty without exposing values.
4. Decode the keystore into a runner-only file with restrictive permissions.
5. Configure the Android release signing from environment variables; never commit credentials or the generated keystore.
6. Build the production release APK.
7. Verify the expected package ID `com.ezrome.app`.
8. Extract the APK signer SHA-256 and require an exact match with `SMTYHALI_SIGNER_SHA256`.
9. Record the final APK SHA-256 and upload the exact signed artifact.
10. Re-download the artifact and require both SHA-256 equality and byte-for-byte equality.
11. Produce a concise run summary containing release identity, artifact hash, and gate results.
12. Publishing is a separate protected stage and is permitted only after all verification gates pass.

## Failure Behavior
Missing secrets, failed builds, absent/unsigned artifacts, wrong package identity, certificate mismatch, failed artifact retrieval, or artifact hash/byte mismatch terminate the release. No publishing step may run after a failed verification gate.

## Security Constraints
- Never create, guess, retrieve, print, or expose private signing credentials.
- Never commit the production keystore or secret values.
- Do not use workflow inputs as a substitute for GitHub environment approval.
- Keep production signing and publishing permissions isolated from coding assistance.
- Do not log secret-derived material other than the intentionally public certificate fingerprint comparison result and final artifact hash.

## Current Repository Findings
The target branch is `feat/ezrome-android-app`. It already contains `.github/workflows/smtyhali-production-release-agent.yml`, which implements most verification steps but currently uses a boolean `release` input as its only gate. The Android `app/build.gradle` already has conditional release signing based on environment variables, so the workflow should reuse that configuration rather than inject a second signing model at runtime.

## Success Criteria
A production run cannot sign or publish until the protected environment approval is granted; with approval and valid secrets, the generated APK must be signed by the expected s.mtyhali certificate and the uploaded artifact must be byte-for-byte identical to the verified build artifact. Any violation fails closed with an actionable summary.
