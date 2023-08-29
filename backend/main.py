import json
from flask import Flask
import os
from flask_session import Session
from flask_cors import CORS
from app import routes
from dotenv import load_dotenv
import base64

def get_frontend_url():
    # Default frontend URL
    frontend_url = 'http://localhost:3000'
    
    # Decode the PLATFORM_ROUTES environment variable
    platform_routes_base64 = os.environ.get('PLATFORM_ROUTES', '')
    platform_routes_json = ''
    if platform_routes_base64:
        platform_routes_json = base64.b64decode(platform_routes_base64).decode('utf-8')
    
    # Parse the JSON and fetch the demo-app-frontend route
    if platform_routes_json:
        try:
            platform_routes = json.loads(platform_routes_json)
            for url, details in platform_routes.items():
                if details.get('upstream') == 'demo-app-frontend':
                    frontend_url = url.rstrip('/')  # Remove trailing slash if present
                    break
        except json.JSONDecodeError:
            print("Could not JSON decode $PLATFORM_ROUTES")
    
    return frontend_url

def createApp():
    # Bring in environment variables
    load_dotenv()

    # Initialize app
    app = Flask(__name__)

    # Use Redis for Sessions if available
    # if 'implement redis but consider how to handle in local dev environment':
    #     app.config['SESSION_TYPE'] = 'redis'  # Session storage type
    #     app.config['SESSION_PERMANENT'] = False  # Make the sessions non-permanent
    #     app.config['SESSION_USE_SIGNER'] = True  # Securely sign the session cookie
    #     app.config['SESSION_KEY_PREFIX'] = 'session:'  # Prefix for storing session data in Redis
    #     app.config['SESSION_REDIS'] = redis.StrictRedis(host='localhost', port=6379, db=0)  # Redis configuration

    #     sess = Session()
    #     sess.init_app(app)


    CORS(app, origins=[get_frontend_url()])
    app.register_blueprint(routes.bp)

    return app

app = createApp()

if __name__ == "__main__":
    flask_environment = os.environ.get('FLASK_ENV', 'local')
    enable_debug = flask_environment != "production"
    web_port = os.environ.get('PORT', 8000)
    app.run(port=web_port, debug=enable_debug)
