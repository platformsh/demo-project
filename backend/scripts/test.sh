#!/usr/bin/env bash

python3 -m venv env
source env/bin/activate
uv pip install -r requirements.txt
uv pip install pip-audit
# pip-audit will exit 1 if vulnerabilities found (https://github.com/pypa/pip-audit#exit-codes)
uv run pip-audit -r requirements.txt
