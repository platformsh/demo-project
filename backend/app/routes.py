import os
from flask import Blueprint, jsonify

bp = Blueprint('routes', __name__)

API_PREFIX = '/api/v1'

@bp.route(f'{API_PREFIX}/environment')
def environment():
    platform_environment_type = os.environ.get('PLATFORM_ENVIRONMENT_TYPE', 'local')
    return jsonify(environment_type=platform_environment_type)

@bp.route('/')
def home():
    return "Hello from the Python backend!"
