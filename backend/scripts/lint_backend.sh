#!/usr/bin/env bash

python3 -m venv env
source env/bin/activate
uv pip install -r requirements.txt

pylint main.py app/**/*.py
