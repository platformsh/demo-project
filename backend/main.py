from flask import Flask
from flask_cors import CORS
from app import routes

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
app.register_blueprint(routes.bp)

if __name__ == "__main__":
    app.run(port=8000, debug=True)
