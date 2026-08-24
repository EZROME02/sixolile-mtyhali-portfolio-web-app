#!/usr/bin/env python3
"""Create and locally verify the EZROME Android production signing identity.

This tool deliberately does not call GitHub APIs, upload secrets, print passwords,
or commit generated credentials. It is an operator-controlled local credential
bootstrapper. Generation requires an exact approval phrase and refuses to
overwrite an existing output directory.
"""

from __future__ import annotations

import base64
import getpass
import hashlib
import os
import re
import secrets
import shutil
import subprocess
import sys
from pathlib import Path

APPROVAL_PHRASE = "GENERATE EZROME PRODUCTION SIGNING IDENTITY"
ALIAS = "s.mtyhali"
PASSWORD_LENGTH = 32


def normalize_fingerprint(value: str) -> str:
    """Normalize a SHA-256 certificate fingerprint for reliable comparison."""
    return re.sub(r"[^0-9A-Fa-f]", "", value).upper()


def validate_approval(value: str) -> bool:
    return value.strip() == APPROVAL_PHRASE


def validate_output_path(path: Path) -> None:
    """Refuse to overwrite an existing signing identity."""
    if path.exists():
        raise FileExistsError(
            f"Refusing to overwrite existing signing output: {path}. "
            "Move it aside deliberately before starting a new identity."
        )


def random_password() -> str:
    return secrets.token_urlsafe(PASSWORD_LENGTH)


def run(command: list[str], *, cwd: Path | None = None) -> str:
    result = subprocess.run(
        command,
        cwd=cwd,
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stdout


def require_tool(name: str) -> str:
    resolved = shutil.which(name)
    if not resolved:
        raise RuntimeError(f"Required tool not found on PATH: {name}")
    return resolved


def extract_sha256(keytool_output: str) -> str:
    for line in keytool_output.splitlines():
        if "SHA256:" in line:
            return normalize_fingerprint(line.split("SHA256:", 1)[1])
    raise RuntimeError("Could not extract SHA-256 certificate fingerprint from keytool output.")


def verify_keystore(keytool: str, keystore: Path, store_password: str) -> str:
    output = run(
        [
            keytool,
            "-list",
            "-v",
            "-keystore",
            str(keystore),
            "-storepass",
            store_password,
            "-alias",
            ALIAS,
        ]
    )
    fingerprint = extract_sha256(output)
    if not fingerprint or len(fingerprint) != 64:
        raise RuntimeError("Certificate fingerprint is not a valid SHA-256 digest.")
    return fingerprint


def create_keystore(
    keytool: str,
    keystore: Path,
    store_password: str,
    key_password: str,
) -> None:
    run(
        [
            keytool,
            "-genkeypair",
            "-v",
            "-keystore",
            str(keystore),
            "-storetype",
            "JKS",
            "-alias",
            ALIAS,
            "-keyalg",
            "RSA",
            "-keysize",
            "4096",
            "-sigalg",
            "SHA256withRSA",
            "-validity",
            "10000",
            "-storepass",
            store_password,
            "-keypass",
            key_password,
            "-dname",
            "CN=s.mtyhali, OU=EZROME, O=EZROME, L=Cape Town, ST=Western Cape, C=ZA",
        ]
    )


def write_secret_file(path: Path, values: dict[str, str]) -> None:
    text = "\n".join(f"{key}={value}" for key, value in values.items()) + "\n"
    path.write_text(text, encoding="utf-8")
    os.chmod(path, 0o600)


def write_manifest(path: Path, fingerprint: str) -> None:
    path.write_text(
        "\n".join(
            [
                "EZROME production signing identity",
                f"alias={ALIAS}",
                f"certificate_sha256={fingerprint}",
                "credentials_generated_locally=true",
                "credentials_uploaded_to_github=false",
                "generated_files_are_not_for_git=true",
            ]
        )
        + "\n",
        encoding="utf-8",
    )
    os.chmod(path, 0o600)


def main() -> int:
    print("EZROME Production Signing Setup Agent")
    print("This will create a new Android signing identity locally.")
    print("It will not upload credentials to GitHub or print passwords.\n")
    approval = input(f'Type exactly: {APPROVAL_PHRASE}\n> ')
    if not validate_approval(approval):
        print("Approval not confirmed. Nothing was generated.")
        return 2

    output_dir = Path.cwd() / ".ezrome-signing"
    validate_output_path(output_dir)

    keytool = require_tool("keytool")
    output_dir.mkdir(mode=0o700)
    keystore = output_dir / "s.mtyhali-production.keystore"
    secret_file = output_dir / "github-actions-secrets.env"
    manifest = output_dir / "signing-manifest.txt"
    b64_file = output_dir / "ANDROID_KEYSTORE_BASE64.txt"

    store_password = random_password()
    key_password = random_password()

    try:
        create_keystore(keytool, keystore, store_password, key_password)
        os.chmod(keystore, 0o600)
        fingerprint = verify_keystore(keytool, keystore, store_password)

        encoded = base64.b64encode(keystore.read_bytes()).decode("ascii")
        b64_file.write_text(encoded + "\n", encoding="ascii")
        os.chmod(b64_file, 0o600)

        secrets_map = {
            "ANDROID_KEYSTORE_BASE64": encoded,
            "ANDROID_STORE_PASSWORD": store_password,
            "ANDROID_KEY_ALIAS": ALIAS,
            "ANDROID_KEY_PASSWORD": key_password,
            "SMTYHALI_SIGNER_SHA256": fingerprint,
        }
        write_secret_file(secret_file, secrets_map)
        write_manifest(manifest, fingerprint)
    except Exception:
        shutil.rmtree(output_dir, ignore_errors=True)
        raise

    print("\nSUCCESS: a new production signing identity was generated and verified locally.")
    print(f"Alias: {ALIAS}")
    print(f"Certificate SHA-256: {fingerprint}")
    print(f"Local credential bundle: {secret_file}")
    print(f"Keystore: {keystore}")
    print("Passwords and the Base64 keystore were not printed to the terminal.")
    print("Do NOT commit .ezrome-signing/ or paste its contents into source code.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (FileExistsError, RuntimeError, subprocess.CalledProcessError) as exc:
        print(f"BLOCKED: {exc}", file=sys.stderr)
        raise SystemExit(1)
