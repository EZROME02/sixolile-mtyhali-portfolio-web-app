# EZROME Production Signing Setup Agent

This tool creates the long-lived Android production signing identity expected by the existing `s.mtyhali` release workflow.

## Safety model

- Generation is blocked until the operator types the exact approval phrase:
  `GENERATE EZROME PRODUCTION SIGNING IDENTITY`
- A new identity is never written over an existing `.ezrome-signing/` directory.
- Store and key passwords are generated with Python's `secrets` module.
- Passwords and the Base64 keystore are written only to local files with restrictive permissions.
- Passwords and the Base64 keystore are not printed to stdout.
- The agent does not call GitHub, upload credentials, or commit generated files.
- The agent adds `.ezrome-signing/` to the local repository `.gitignore` when it runs.

## Run

From the repository root with Java/keytool installed:

```bash
python3 tools/signing_agent/signing_agent.py
```

After the exact approval phrase is entered, the agent creates:

- `.ezrome-signing/s.mtyhali-production.keystore`
- `.ezrome-signing/github-actions-secrets.env`
- `.ezrome-signing/ANDROID_KEYSTORE_BASE64.txt`
- `.ezrome-signing/signing-manifest.txt`

The secrets file contains exactly these five values required by the production workflow:

```text
ANDROID_KEYSTORE_BASE64
ANDROID_STORE_PASSWORD
ANDROID_KEY_ALIAS
ANDROID_KEY_PASSWORD
SMTYHALI_SIGNER_SHA256
```

Do not commit or share the keystore, password file, or Base64 file. Add the five values to the GitHub `production` environment as encrypted Actions secrets using GitHub's normal secret-management UI or a separately authorized secret-management tool.

The connected GitHub controls used to create this PR do not expose Actions secret creation, so the agent intentionally stops before that upload step.

## Tests

```bash
python3 -m unittest discover -s tools/signing_agent -p 'test_*.py' -v
python3 -m py_compile tools/signing_agent/signing_agent.py
```
