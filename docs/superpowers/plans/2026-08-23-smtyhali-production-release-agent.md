# s.mtyhali Production Release Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing Android production release workflow into a human-approved, fail-closed release agent that verifies the s.mtyhali signing identity and exact published artifact.

**Architecture:** GitHub Actions remains the release authority. The workflow will target a protected `production` environment so GitHub required reviewers provide the approval gate before any production signing work starts. The existing Android signing configuration will be reused with runner-only environment variables; the workflow will verify the package, signer certificate, and final artifact integrity before a separate publish stage.

**Tech Stack:** GitHub Actions, Android Gradle Plugin, Gradle 8.10.2, Java 17, Android SDK/build-tools 35, `apksigner`, `aapt`, GitHub Actions environments and artifacts.

**Spec:** `docs/superpowers/specs/2026-08-23-smtyhali-production-release-agent-design.md`

## Global Constraints

- Never create, guess, retrieve, print, or expose private production signing credentials.
- Require GitHub protected-environment approval before production signing or publishing.
- Required secrets are `ANDROID_KEYSTORE_BASE64`, `ANDROID_STORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`, and `SMTYHALI_SIGNER_SHA256`.
- Expected Android package identity is `com.ezrome.app`.
- The production signer must exactly match `SMTYHALI_SIGNER_SHA256`.
- Publishing must not execute unless every verification gate passes.
- Kimi 2.7 remains coding/debugging assistance only and receives no signing material or release authority.

---

### Task 1: Replace the boolean release gate with a protected production environment

**Files:**
- Modify: `.github/workflows/smtyhali-production-release-agent.yml`

**Interfaces:**
- Consumes: GitHub Actions `production` environment protection and required reviewers.
- Produces: a workflow job that cannot enter production signing steps until the protected environment approval is granted.

- [ ] **Step 1: Remove the `release` boolean input as the authorization mechanism.**

Delete the `release` input from `workflow_dispatch`; manual dispatch should identify the run but not act as a substitute for reviewer approval.

- [ ] **Step 2: Attach the production job to the protected environment.**

Add:

```yaml
environment:
  name: production
```

under the production job. Do not place secrets into workflow inputs or repository files.

- [ ] **Step 3: Preserve least-privilege workflow permissions.**

Keep contents/actions read access unless a later publish stage demonstrably needs a narrowly scoped additional permission. Do not grant broad write permissions merely to implement approval.

- [ ] **Step 4: Verify the workflow structure.**

Confirm the workflow has no expression or shell branch that can bypass the environment gate and enter signing/publishing work.

- [ ] **Step 5: Commit.**

```bash
git add .github/workflows/smtyhali-production-release-agent.yml
git commit -m "ci: gate production release with protected environment"
```

---

### Task 2: Reuse the existing Android signing configuration safely

**Files:**
- Modify: `.github/workflows/smtyhali-production-release-agent.yml`
- Inspect: `android/app/build.gradle`

**Interfaces:**
- Consumes: the existing `ANDROID_KEYSTORE_PATH`, `ANDROID_STORE_PASSWORD`, `ANDROID_KEY_ALIAS`, and `ANDROID_KEY_PASSWORD` environment-variable contract in `android/app/build.gradle`.
- Produces: a release build signed by the configured production keystore without rewriting Gradle source during the workflow.

- [ ] **Step 1: Remove runtime source rewriting from the workflow.**

Delete the workflow step that edits `android/app/build.gradle` with Python. The repository already contains conditional `signingConfigs.release` configuration driven by environment variables.

- [ ] **Step 2: Materialize the keystore only on the runner.**

Decode `ANDROID_KEYSTORE_BASE64` to a runner-only file such as `android/smtyhali-release.keystore` with `umask 077`, and export:

```yaml
ANDROID_KEYSTORE_PATH: ${{ github.workspace }}/android/smtyhali-release.keystore
```

for the build step only.

- [ ] **Step 3: Pass signing values only through the build process environment.**

Map the secret values to the existing Gradle variable names. Never echo the values, and never write them to a tracked file.

- [ ] **Step 4: Ensure the release build fails closed when signing inputs are absent.**

The workflow's preflight must fail before the build if any required secret is empty. The Gradle configuration must not silently produce an unsigned production artifact.

- [ ] **Step 5: Commit.**

```bash
git add .github/workflows/smtyhali-production-release-agent.yml
git commit -m "ci: reuse existing Android production signing config"
```

---

### Task 3: Make certificate and artifact verification explicit release gates

**Files:**
- Modify: `.github/workflows/smtyhali-production-release-agent.yml`

**Interfaces:**
- Consumes: built APK, expected package ID, and `SMTYHALI_SIGNER_SHA256`.
- Produces: verified APK hash and a failure-closed release summary.

- [ ] **Step 1: Verify the produced APK is present and non-empty.**

Locate exactly one non-unsigned release APK and stop with `BLOCKED` if none is present.

- [ ] **Step 2: Verify package identity.**

Use the installed Android build-tools `aapt` to require package name `com.ezrome.app`.

- [ ] **Step 3: Verify the signing certificate.**

Run `apksigner verify --verbose --print-certs` and normalize the signer SHA-256 fingerprint before comparing it to `SMTYHALI_SIGNER_SHA256`.

- [ ] **Step 4: Do not expose secret-derived expected values in logs.**

The workflow may report that the signer matched or mismatched, but it must not print the expected secret fingerprint. It may record the verified certificate fingerprint only if that fingerprint is already intended to be public release metadata.

- [ ] **Step 5: Record the final APK SHA-256.**

Write the artifact hash to `$GITHUB_OUTPUT` and `$GITHUB_STEP_SUMMARY` without exposing credentials.

- [ ] **Step 6: Commit.**

```bash
git add .github/workflows/smtyhali-production-release-agent.yml
git commit -m "ci: enforce production signer and artifact verification"
```

---

### Task 4: Verify the uploaded artifact is exactly the verified build

**Files:**
- Modify: `.github/workflows/smtyhali-production-release-agent.yml`

**Interfaces:**
- Consumes: verified local APK and its SHA-256.
- Produces: uploaded artifact that is proven byte-for-byte identical to the verified build.

- [ ] **Step 1: Upload only the verified APK.**

Keep the artifact name tied to the immutable commit SHA and fail if no file is found.

- [ ] **Step 2: Retrieve the uploaded artifact inside the same run.**

Use the GitHub Actions artifact interface already available to the workflow and locate the retrieved APK.

- [ ] **Step 3: Compare SHA-256 values.**

Require the retrieved artifact hash to equal the generated APK hash.

- [ ] **Step 4: Compare bytes directly.**

Use `cmp -s` and fail if the retrieved artifact differs byte-for-byte.

- [ ] **Step 5: Add a concise gate summary.**

The summary should report approval/environment, build result, package result, signer result, artifact hash, and byte-for-byte result without secret values.

- [ ] **Step 6: Commit.**

```bash
git add .github/workflows/smtyhali-production-release-agent.yml
git commit -m "ci: verify exact uploaded production artifact"
```

---

### Task 5: Separate publishing from verification and test the release gate

**Files:**
- Modify: `.github/workflows/smtyhali-production-release-agent.yml`
- Test: GitHub Actions workflow execution and job logs

**Interfaces:**
- Consumes: successful verification outputs from Tasks 1-4.
- Produces: a publishing stage that is unreachable unless all verification gates succeed, plus evidence from a real workflow run.

- [ ] **Step 1: Define the publishing boundary.**

If no real production publisher is currently configured, keep publishing as an explicit post-verification boundary without inventing a store credential or publishing integration. The workflow must end in a verified-artifact state rather than falsely claiming publication.

- [ ] **Step 2: Ensure publishing depends on verification success.**

Use a separate job or equivalent explicit dependency so publishing requires the verification job to succeed. Do not use `always()` to bypass failures.

- [ ] **Step 3: Run non-secret structural checks.**

Validate YAML structure and inspect the final workflow for secret exposure, bypass paths, and incorrect Gradle environment names.

- [ ] **Step 4: Run the workflow only after GitHub's `production` environment has required reviewers configured.**

The run should pause at the environment approval boundary. Do not approve the production run on the user's behalf.

- [ ] **Step 5: After user approval in GitHub, inspect the resulting run.**

Verify that the run either completes all gates or stops at the first legitimate missing/mismatched secret. Never infer success from workflow configuration alone.

- [ ] **Step 6: Record final evidence.**

Capture the run URL, commit SHA, final artifact SHA-256, signer verification result, and artifact byte-match result in the release report. Do not include secret values.

- [ ] **Step 7: Commit.**

```bash
git add .github/workflows/smtyhali-production-release-agent.yml
git commit -m "ci: finalize protected production release agent"
```

---

## Verification Matrix

| Gate | Required result | Failure action |
| --- | --- | --- |
| Protected environment | Reviewer approval granted | Stop before production signing |
| Five signing secrets | All non-empty | Stop before build |
| Keystore materialization | Non-empty runner-only keystore | Stop |
| Android release build | Successful signed APK | Stop |
| Package identity | `com.ezrome.app` | Stop |
| Signer identity | Exact `SMTYHALI_SIGNER_SHA256` match | Stop |
| Artifact hash | Generated/retrieved hashes equal | Stop |
| Artifact bytes | `cmp` succeeds | Stop |
| Publishing | Verification job succeeded | Otherwise unreachable |

## Final Review Checklist

- No private signing credential is committed or printed.
- The boolean workflow input is not an authorization bypass.
- The protected `production` environment is the approval boundary.
- Existing Gradle signing configuration is reused.
- The signer identity is independently checked against the supplied fingerprint.
- The exact verified artifact is the only artifact eligible for publishing.
- Kimi 2.7 has no signing or publishing authority.
- A real GitHub Actions run supplies the final evidence before claiming completion.
