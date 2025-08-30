from .products import bp as products_bp
from .categories import bp as categories_bp
from .auth import bp as auth_bp
from .orders import bp as orders_bp
from .checkout import bp as checkout_bp
try:
    from .users import bp as users_bp
except Exception:
    users_bp = None
try:
    from .cart import bp as cart_bp
except Exception:
    cart_bp = None

def register_routes(app):
    app.register_blueprint(products_bp,   url_prefix='/api/products')
    app.register_blueprint(checkout_bp,   url_prefix='/api/checkout')
    app.register_blueprint(categories_bp, url_prefix='/api/categories')
    app.register_blueprint(auth_bp,       url_prefix='/api/auth')
    if users_bp:
        app.register_blueprint(users_bp,  url_prefix='/api/users')
    if cart_bp:
        app.register_blueprint(cart_bp,   url_prefix='/api/cart')
