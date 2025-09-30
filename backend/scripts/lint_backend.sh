#!/usr/bin/env bash

uv sync --dev

uv run pylint main.py app/**/*.py
