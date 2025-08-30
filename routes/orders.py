from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

try:
    from extensions import db
    from models.order import Order, OrderItem
except ImportError:
    from ..extensions import db
    from ..models.order import Order, OrderItem

bp = Blueprint('orders', __name__)

@bp.get('/')
@jwt_required()
def list_orders():
    uid = get_jwt_identity()
    orders = Order.query.filter_by(user_id=uid).order_by(Order.id.desc()).all()
    return jsonify([
        {
            "id": o.id,
            "status": o.status,
            "total_cents": o.total_cents,
            "created_at": o.created_at.isoformat(),
            "items": [
                {
                    "product_id": i.product_id,
                    "title": i.title,
                    "qty": i.qty,
                    "unit_price_cents": i.unit_price_cents,
                    "subtotal_cents": i.subtotal_cents,
                } for i in o.items
            ]
        } for o in orders
    ])
