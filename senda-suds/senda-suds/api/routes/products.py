from flask import Blueprint, request
try:
    # modo script (desde /api)
    from ..extensions import db
    from ..models.product import Product
    from ..schemas.product import ProductSchema
except ImportError:
    # modo paquete (import api.app)
    from ..extensions import db
    from ..models.product import Product
    from ..schemas.product import ProductSchema

bp = Blueprint('products', __name__)
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

@bp.get('/')
def list_products():
    q = request.args.get('q')
    query = Product.query
    if q:
        query = query.filter(Product.title.ilike(f'%{q}%'))
    items = query.order_by(Product.created_at.desc()).all()
    return products_schema.dump(items)

@bp.get('/<int:pid>')
def get_product(pid):
    p = Product.query.get_or_404(pid)
    return product_schema.dump(p)
