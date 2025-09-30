#!/usr/bin/env bash

uv sync --dev
# pip-audit will exit 1 if vulnerabilities found (https://github.com/pypa/pip-audit#exit-codes)
uv run pip-audit