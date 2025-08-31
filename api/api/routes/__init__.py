from flask import Blueprint, jsonify
from .products import bp as products_bp

bp = Blueprint("root", __name__)

@bp.get("/api/health")
def health():
    return {"ok": True}

def register_routes(app):
    app.register_blueprint(bp)
    app.register_blueprint(products_bp, url_prefix="/api/products")
