#!/usr/bin/env bash

# Install dependencies
uv sync --dev

# Test scenarios 
cp .env.sample .env
