import os
from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import init_extensions, db
from .routes import register_routes

def create_app():
    app = Flask(__name__, static_folder="static", static_url_path="/static")
    app.config.from_object(Config)
    CORS(app, supports_credentials=True, origins=[
        os.getenv("CORS_ORIGINS", "http://localhost:5173")
    ])
    init_extensions(app)
    with app.app_context():
        db.create_all()
    register_routes(app)
    return app

app = create_app()
