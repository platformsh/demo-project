from flask import Flask
import os
# from flask_session import Session
from flask_cors import CORS
from app import routes
from dotenv import load_dotenv

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


    app.register_blueprint(routes.bp)

    return app

app = createApp()

if __name__ == "__main__":
    flask_environment = os.environ.get('FLASK_ENV', 'local')
    enable_debug = flask_environment != "production"
    web_port = os.environ.get('PORT', 8000)
    app.run(port=web_port, debug=enable_debug)
