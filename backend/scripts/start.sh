#!/usr/bin/env bash

source env/bin/activate
gunicorn main:app