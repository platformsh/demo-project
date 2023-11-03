"""
This module sets up and defines the routes for the application's API endpoints.
It establishes routes for accessing the environment settings and home greeting.
Utility functions to determine session storage type and platform environment are also provided.
"""

import os
import base64
import json
from flask import Blueprint, jsonify

bp = Blueprint("routes", __name__)

API_PREFIX = "/api/v1"


@bp.route(f"{API_PREFIX}/environment")
def environment():
    """Return the platform environment and session storage type as JSON."""
    return jsonify(
        type=get_platform_environment(), session_storage=get_session_storage_type()
    )


@bp.route("/api/")
def home():
    """Return a greeting message from the Python backend."""
    return "Hello from the Python backend!"


def get_session_storage_type():
    """
    Determine the session storage type based on platform relationships.
    Defaults to 'file' if the relevant environment variable is not set or cannot be decoded.
    """
    platform_relationships_data = os.environ.get("PLATFORM_RELATIONSHIPS")

    if not platform_relationships_data:
        return "file"

    try:
        platform_relationships = json.loads(
            base64.b64decode(platform_relationships_data)
        )

        if "redis_session" in platform_relationships:
            return "redis"

        return "file"
    except (json.JSONDecodeError, TypeError, ValueError):
        # Catching potential exceptions due to invalid JSON or other issues
        return "file"


def get_platform_environment():
    """
    Retrieve the type of platform environment where the app is running.
    Defaults to 'local' if the PLATFORM_ENVIRONMENT_TYPE environment variable is not set.
    """
    return os.environ.get("PLATFORM_ENVIRONMENT_TYPE", "local")
