from datetime import datetime
try:
    from extensions import db
except ImportError:
    from ..extensions import db

class Order(db.Model):
    __tablename__ = 'orders'
    id           = db.Column(db.Integer, primary_key=True)
    user_id      = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status       = db.Column(db.String(20), nullable=False, default='pending')
    total_cents  = db.Column(db.Integer, nullable=False, default=0)
    created_at   = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    items        = db.relationship('OrderItem', backref='order', cascade='all, delete-orphan')

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id                = db.Column(db.Integer, primary_key=True)
    order_id          = db.Column(db.Integer, db.ForeignKey('orders.id', ondelete='CASCADE'), nullable=False)
    product_id        = db.Column(db.Integer, nullable=False)
    title             = db.Column(db.String(200), nullable=False)
    unit_price_cents  = db.Column(db.Integer, nullable=False)
    qty               = db.Column(db.Integer, nullable=False, default=1)
    subtotal_cents    = db.Column(db.Integer, nullable=False)
