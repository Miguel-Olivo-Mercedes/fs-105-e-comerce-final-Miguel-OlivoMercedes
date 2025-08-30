import os
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..extensions import db
from ..models.product import Product
from ..models.cart import Cart, CartItem
from ..models.order import Order, OrderItem

bp = Blueprint('checkout', __name__)

@bp.post('/create-session')
@jwt_required()
def create_session():
    user_id = get_jwt_identity()
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart or not cart.items:
        return jsonify({"msg":"Carrito vacío"}), 400

    # calcular total y crear pedido (demo -> status=paid)
    total = 0
    order = Order(user_id=user_id, total_cents=0, status='paid')
    db.session.add(order)
    db.session.flush()  # obtener order.id

    for it in cart.items:
        # precio unitario según product
        prod = Product.query.get(it.product_id)
        unit = prod.price_cents if prod else it.unit_price_cents or 0
        subtotal = unit * it.qty
        total += subtotal
        db.session.add(OrderItem(
            order_id=order.id,
            product_id=it.product_id,
            title=(prod.title if prod else f"Producto {it.product_id}"),
            unit_price_cents=unit,
            qty=it.qty,
            subtotal_cents=subtotal
        ))

    order.total_cents = total

    # vaciar carrito
    for it in list(cart.items):
        db.session.delete(it)
    db.session.commit()

    # URL de éxito (front local/túnel)
    front = os.getenv('FRONT_URL', 'http://localhost:5173')
    success_url = f"{front}/success?order_id={order.id}"
    return jsonify({"url": success_url, "note": "Stripe no configurado — modo demo", "order_id": order.id})
