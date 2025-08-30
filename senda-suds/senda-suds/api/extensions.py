from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()

def init_extensions(app):
    # CORS (acepta 5173/5174 si viene en .env CORS_ORIGINS)
    origins = app.config.get('CORS_ORIGINS') or 'http://localhost:5173,http://localhost:5174'
    CORS(app, origins=[o.strip() for o in origins.split(',')], supports_credentials=True)

    # DB por defecto si no está seteada
    app.config.setdefault('SQLALCHEMY_DATABASE_URI', app.config.get('DATABASE_URL') or 'sqlite:///ecommerce.db')
    app.config.setdefault('SQLALCHEMY_TRACK_MODIFICATIONS', False)

    db.init_app(app)
    jwt.init_app(app)
