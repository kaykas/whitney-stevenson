#!/usr/bin/env python3
"""Subprocess fixture tests for scripts/audit-structured-data.mjs."""

from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
VALIDATOR = ROOT / "scripts" / "audit-structured-data.mjs"
FIXTURES = ROOT / "tests" / "fixtures" / "structured-data"


def run_validator(fixture_name: str) -> subprocess.CompletedProcess[str]:
    target = FIXTURES / fixture_name
    return subprocess.run(
        ["node", str(VALIDATOR), str(target)],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        check=False,
    )


def main() -> int:
    clean = run_validator("clean")
    assert clean.returncode == 0, f"Expected exit 0 on clean fixture, got {clean.returncode}: {clean.stderr}"
    assert "structured-data audit OK" in clean.stdout, f"Unexpected stdout on clean fixture: {clean.stdout}"

    dup_faq = run_validator("dup-faq")
    assert dup_faq.returncode != 0, "Expected non-zero exit on dup-faq fixture"
    dup_out = dup_faq.stdout + dup_faq.stderr
    assert "duplicate-faq" in dup_out and "FAQPage" in dup_out, (
        f"Expected duplicate-faq rule in output, got: {dup_out}"
    )

    unrated = run_validator("unrated-software")
    assert unrated.returncode != 0, "Expected non-zero exit on unrated-software fixture"
    unrated_out = unrated.stdout + unrated.stderr
    assert "missing-offers-or-review" in unrated_out and "SoftwareApplication" in unrated_out, (
        f"Expected missing-offers-or-review rule in output, got: {unrated_out}"
    )

    print("test_audit_structured_data: all 3 fixture assertions passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
