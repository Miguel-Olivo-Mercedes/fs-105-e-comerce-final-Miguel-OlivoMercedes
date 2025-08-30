from flask import Blueprint
try:
    from ..models.product import Category
except ImportError:
    from ..models.product import Category

bp = Blueprint('categories', __name__)

@bp.get('/')
def list_categories():
    data = [{"id": c.id, "name": c.name, "slug": c.slug} for c in Category.query.order_by(Category.name).all()]
    return data
