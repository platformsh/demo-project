#!/usr/bin/env bash

uv sync --dev

uv run black . --diff --color --check
