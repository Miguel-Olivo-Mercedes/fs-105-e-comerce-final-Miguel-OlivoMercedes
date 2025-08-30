import os
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

try:
    import stripe
except Exception:
    stripe = None

try:
    from extensions import db
    from models.cart import Cart, CartItem
    from models.product import Product
except ImportError:
    from ..extensions import db
    from ..models.cart import Cart, CartItem
    from ..models.product import Product

bp = Blueprint("checkout", __name__)

@bp.post("/create-session")
@jwt_required()
def create_session():
    uid = get_jwt_identity()
    cart = Cart.query.filter_by(user_id=uid).first()
    if not cart or not cart.items:
        return jsonify({"msg":"Carrito vacío"}), 400

    line_items = []
    for it in cart.items:
        p = Product.query.get(it.product_id)
        if not p: 
            continue
        line_items.append({
            "price_data": {
                "currency": os.getenv("CURRENCY","eur"),
                "product_data": {"name": p.title},
                "unit_amount": p.price_cents
            },
            "quantity": it.qty
        })

    if not line_items:
        return jsonify({"msg":"No hay ítems válidos"}), 400

    frontend = os.getenv("FRONTEND_URL", "http://localhost:5173")
    success_url = f"{frontend}/success"
    cancel_url  = f"{frontend}/cart"

    # Si Stripe está configurado -> sesión real
    if stripe and os.getenv("STRIPE_SECRET_KEY"):
        stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
        session = stripe.checkout.Session.create(
            mode="payment",
            payment_method_types=["card"],
            line_items=line_items,
            success_url=success_url,
            cancel_url=cancel_url,
        )
        return jsonify({"url": session.url})

    # Fallback dev: redirige a /success para poder presentar hoy
    return jsonify({"url": success_url, "note":"Stripe no configurado, usando fallback dev"})
