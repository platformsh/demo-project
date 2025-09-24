#!/usr/bin/env bash

python3 -m venv env
source env/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
# pip-audit will exit 1 if vulnerabilities found (https://github.com/pypa/pip-audit#exit-codes)
pip-audit -r requirements.txt
