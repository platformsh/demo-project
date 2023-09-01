#!/usr/bin/env bash

# Setup a virtual environment
python3 -m venv env
source env/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Test scenarios 
cp .env.sample .env
