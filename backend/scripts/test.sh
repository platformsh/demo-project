#!/usr/bin/env bash

uv sync
# pip-audit will exit 1 if vulnerabilities found (https://github.com/pypa/pip-audit#exit-codes)
uv run pip-audit --ignore-vuln GHSA-4xh5-x5gv-qwph