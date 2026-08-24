import unittest
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent))

from signing_agent import (  # noqa: E402
    APPROVAL_PHRASE,
    normalize_fingerprint,
    validate_approval,
    validate_output_path,
)


class SigningAgentSafetyTests(unittest.TestCase):
    def test_fingerprint_normalization_accepts_colons_and_case(self):
        raw = "aa:bb:CC 11"
        self.assertEqual(normalize_fingerprint(raw), "AABBCC11")

    def test_approval_requires_exact_phrase(self):
        self.assertTrue(validate_approval(APPROVAL_PHRASE))
        self.assertFalse(validate_approval("yes"))
        self.assertFalse(validate_approval("generate"))

    def test_existing_keystore_is_rejected(self):
        path = Path("/tmp/existing-smtyhali.keystore")
        path.write_bytes(b"placeholder")
        try:
            with self.assertRaises(FileExistsError):
                validate_output_path(path)
        finally:
            path.unlink(missing_ok=True)


if __name__ == "__main__":
    unittest.main()
