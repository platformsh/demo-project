import os
from flask import Blueprint, jsonify
import base64
import json

bp = Blueprint('routes', __name__)

API_PREFIX = '/api/v1'

@bp.route(f'{API_PREFIX}/environment')
def environment():
    return jsonify(type=getPlatformEnvironment(), instance_count=getPlatformInstances(), session_storage=getSessionStorageType())

@bp.route('/')
def home():
    return "Hello from the Python backend!"

def getPlatformInstances():
    platform_application_data = os.environ.get('PLATFORM_APPLICATION')
    if platform_application_data is None:
        return None

    platform_application = json.loads(base64.b64decode(platform_application_data))

    if 'instance_count' in platform_application:
        instance_count = platform_application['instance_count']
    else :
        instance_count = None
    return instance_count

def getSessionStorageType():
    platform_relationships_data = os.environ.get('PLATFORM_RELATIONSHIPS')
    
    if not platform_relationships_data:
        return 'file'

    try:
        platform_relationships = json.loads(base64.b64decode(platform_relationships_data))
        
        if 'redis-session' in platform_relationships:
            return 'redis'
        else:
            return 'file'
    except (json.JSONDecodeError, TypeError, ValueError):
        # Catching potential exceptions due to invalid JSON or other issues
        return 'file'


def getPlatformEnvironment():
    return os.environ.get('PLATFORM_ENVIRONMENT_TYPE', 'local')
