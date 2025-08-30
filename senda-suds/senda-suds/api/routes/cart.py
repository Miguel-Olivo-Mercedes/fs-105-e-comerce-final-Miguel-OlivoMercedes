from flask import Blueprint, request, jsonify
try:
    from ..extensions import db
    from ..models.product import Product
    from ..models.cart import Cart, CartItem
except ImportError:
    from ..extensions import db
    from ..models.product import Product
    from ..models.cart import Cart, CartItem
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('cart', __name__)

def _get_or_create_cart(uid:int):
    cart = Cart.query.filter_by(user_id=uid).first()
    if not cart:
        cart = Cart(user_id=uid)
        db.session.add(cart); db.session.commit()
    return cart

@bp.get('/')
@jwt_required()
def get_cart():
    uid = int(get_jwt_identity())
    cart = _get_or_create_cart(uid)
    data, total = [], 0
    for it in cart.items:
        subtotal = it.unit_price_cents * it.qty
        total += subtotal
        data.append({
            "id": it.id, "product_id": it.product_id, "qty": it.qty,
            "unit_price_cents": it.unit_price_cents, "subtotal_cents": subtotal
        })
    return jsonify(items=data, total_cents=total)

@bp.post('/add')
@jwt_required()
def add_to_cart():
    uid = int(get_jwt_identity())
    data = request.get_json() or {}
    pid = data.get('product_id'); qty = int(data.get('qty') or 1)
    if not pid or qty < 1: return jsonify(msg="product_id y qty>=1"), 400
    cart = _get_or_create_cart(uid)
    prod = Product.query.get_or_404(pid)
    it = next((x for x in cart.items if x.product_id == prod.id), None)
    if it: it.qty += qty
    else:
        it = CartItem(cart_id=cart.id, product_id=prod.id, qty=qty, unit_price_cents=prod.price_cents)
        db.session.add(it)
    db.session.commit()
    return jsonify(msg="Añadido", item_id=it.id)

@bp.put('/item/<int:item_id>')
@jwt_required()
def update_item(item_id):
    uid = int(get_jwt_identity())
    data = request.get_json() or {}
    qty = int(data.get('qty') or 1)
    if qty < 1: return jsonify(msg="qty>=1"), 400
    cart = _get_or_create_cart(uid)
    it = CartItem.query.filter_by(id=item_id, cart_id=cart.id).first_or_404()
    it.qty = qty; db.session.commit()
    return jsonify(msg="Actualizado")

@bp.delete('/item/<int:item_id>')
@jwt_required()
def delete_item(item_id):
    uid = int(get_jwt_identity())
    cart = _get_or_create_cart(uid)
    it = CartItem.query.filter_by(id=item_id, cart_id=cart.id).first_or_404()
    db.session.delete(it); db.session.commit()
    return jsonify(msg="Eliminado")
