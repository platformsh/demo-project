#!/usr/bin/env bash

source env/bin/activate
blackfire-python gunicorn main:app