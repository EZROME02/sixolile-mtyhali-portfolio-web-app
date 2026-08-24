# EZROME Production Guardian Bot Design

## Goal
Create a lightweight production-verification agent that observes the existing Android production workflow and records trustworthy evidence without duplicating or exposing production signing credentials.

## Scope
- Monitor `main` and the `android-production-release` workflow.
- Identify runs associated with production commits.
- Record commit SHA, run ID, workflow status, conclusion, signer verification evidence, APK SHA-256, artifact identity, and byte-for-byte verification evidence.
- Emit a machine-readable audit record and a human-readable report carrying the EZROME / Sixolile Mtyhali footprint.
- Treat missing execution evidence as `BLOCKED`, never `VERIFIED`.
- Do not store, print, decode, or transmit keystore contents or production passwords.

## Existing production gate
The existing `.github/workflows/android-production-release.yml` remains authoritative. It already validates five production secrets, builds the signed APK, verifies the signer certificate against `SMTYHALI_SIGNER_SHA256`, calculates the final APK SHA-256, uploads/downloads the artifact, performs a byte-for-byte comparison, and writes a `VERIFIED` step summary.

## Architecture
The Guardian is a read-only observer around the existing GitHub Actions workflow. It consumes GitHub Actions run metadata and, where available, job/step/artifact evidence. It does not replace the signing workflow and does not need access to production secrets.

## Verification states
- `VERIFIED`: a completed successful production run exists and all required evidence is present.
- `FAILED`: a production run completed unsuccessfully or a required verification gate failed.
- `RUNNING`: a production run exists but has not completed.
- `BLOCKED`: no execution evidence is exposed or required evidence cannot be retrieved.

## Required evidence
1. Exact target commit SHA.
2. Production workflow run ID.
3. Run conclusion `success`.
4. Signing-secret validation step passed.
5. Signer verification step passed.
6. Final APK SHA-256 calculation step passed and produced a 64-character digest.
7. Production APK artifact exists.
8. Byte-for-byte artifact verification step passed.
9. `EZROME Production Release — VERIFIED` summary is present.

## Audit record
Each observation is stored as JSON with:
- `project`: `EZROME`
- `agent`: `EZROME Production Guardian`
- `owner`: `Sixolile Mtyhali`
- `observed_at`
- `commit_sha`
- `run_id`
- `workflow`
- `status`
- `conclusion`
- `apk_sha256` when available
- `evidence` array
- `verification_state`
- `reason` when not verified

No secrets, passwords, keystore data, or secret values are included.

## Footprint
Human-readable reports use `EZROME Production Guardian` and `Sixolile Mtyhali` as attribution. The bot must not embed private credentials or sensitive signing material in its output.

## Non-goals
- Generating or rotating production signing credentials.
- Replacing GitHub Actions signing/build logic.
- Claiming a release is verified without an actual run.
- Downloading or publishing the production APK automatically unless an explicitly authorized artifact-download operation is available.
