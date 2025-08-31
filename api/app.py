from flask_cors import CORS
import os
from flask import Flask, jsonify
from dotenv import load_dotenv
try:
    # cuando se ejecuta como script dentro de /api
    from config import Config
    from .extensions import init_extensions, db
    from routes import register_routes
except ImportError:
    # cuando se importa como paquete api.app
    from .config import Config
    from .extensions import init_extensions, db
    from .routes import register_routes

def create_app():
    load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))
    app = Flask(__name__)
    app.config.from_object(Config)
    init_extensions(app)
    with app.app_context():
        db.create_all()
    @app.get('/api/health')
    def health():
        return jsonify(ok=True)
    register_routes(app)
    return app

app = create_app()
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,https://*.app.github.dev").split(",")
CORS(app, resources={r"\/api\/*": {"origins": origins}}, supports_credentials=True)


@app.get('/api/routes')
def routes_debug():
    return {"routes": sorted([str(r) for r in app.url_map.iter_rules()])}


@app.get("/")
def root():
    from flask import jsonify
    return jsonify({"ok": True, "service":"Senda Suds API", "hint":"visita /api/health o /api/products/"}), 200
