from flask import Blueprint, jsonify, abort
from ..extensions import db
from ..models.product import Product

bp = Blueprint("products", __name__)

@bp.get("/")
def list_products():
    items = Product.query.order_by(Product.id.asc()).all()
    return jsonify([{
        "id": p.id, "slug": p.slug, "title": p.title, "description": p.description,
        "price_cents": p.price_cents, "stock": p.stock,
        "image_url": p.image_url, "category_id": p.category_id,
        "created_at": p.created_at.isoformat(), "updated_at": p.updated_at.isoformat()
    } for p in items])

@bp.get("/<int:pid>")
def product_detail(pid):
    p = db.get_or_404(Product, pid)
    return {
        "id": p.id, "slug": p.slug, "title": p.title, "description": p.description,
        "price_cents": p.price_cents, "stock": p.stock,
        "image_url": p.image_url, "category_id": p.category_id,
        "created_at": p.created_at.isoformat(), "updated_at": p.updated_at.isoformat()
    }
