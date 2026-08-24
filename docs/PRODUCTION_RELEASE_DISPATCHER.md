# EZROME Production Release Dispatcher

The Production Release Dispatcher is a GitHub Actions workflow that starts the existing `android-production-release.yml` workflow, waits for the run to finish, rejects failed releases, downloads the exact production APK artifact, calculates its SHA-256, and publishes the verified release result in the dispatcher run summary.

## Required secret

Create a repository secret named:

`DISPATCHER_GITHUB_TOKEN`

Use a dedicated GitHub token rather than placing a token in source code. The token must be allowed to:

- dispatch Actions workflows for this repository (`Actions: write` for a fine-grained token),
- read Actions runs and artifacts (`Actions: read`),
- read repository metadata/content as required by the GitHub API (`Contents: read`).

Do **not** put any of the production signing values in this token or workflow file. The production signing secrets remain owned by the existing production workflow/environment:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_STORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`
- `SMTYHALI_SIGNER_SHA256`

The dispatcher never reads or prints those secrets.

## Running a release

Open **Actions → EZROME Production Release Dispatcher → Run workflow** and select `main` unless a different release ref is intentionally required.

The dispatcher will:

1. dispatch `.github/workflows/android-production-release.yml`;
2. wait for the dispatched run;
3. fail if the production run fails or times out;
4. locate the non-expired `ezrome-android-production-*` artifact;
5. download and hash `app-release.apk`; and
6. write the run number, commit, APK size, and final APK SHA-256 to the dispatcher summary.

The underlying production workflow remains the security authority. It validates all production signing secrets, builds the signed APK, verifies the `s.mtyhali` certificate fingerprint, calculates the APK SHA-256, and verifies the uploaded artifact byte-for-byte before the dispatcher accepts the release.
