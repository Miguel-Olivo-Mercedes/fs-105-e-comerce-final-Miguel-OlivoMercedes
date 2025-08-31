from flask import request, Blueprint, request, jsonify
try:
    from ..extensions import db
    from ..models.user import User
except ImportError:
    from ..extensions import db
    from ..models.user import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

bp = Blueprint('auth', __name__)

@bp.post('/register')
def register():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''
    name = data.get('name') or ''
    if not email or not password:
        return jsonify(msg="Email y password son obligatorios"), 400
    if User.query.filter_by(email=email).first():
        return jsonify(msg="Ese email ya está registrado"), 409
    u = User(email=email, name=name); u.set_password(password)
    db.session.add(u); db.session.commit()
    token = create_access_token(identity=str(u.id))
    return jsonify(token=token, user={"id": u.id, "email": u.email, "name": u.name})

@bp.post('/login')
def login():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''
    u = User.query.filter_by(email=email).first()
    if not u or not u.check_password(password):
        return jsonify(msg="Credenciales inválidas"), 401
    token = create_access_token(identity=str(u.id))
    return jsonify(token=token, user={"id": u.id, "email": u.email, "name": u.name})

@bp.get('/me')
@jwt_required()
def me():
    u = User.query.get_or_404(int(get_jwt_identity()))
    return jsonify(id=u.id, email=u.email, name=u.name, role=u.role)


@bp.put('/me')
@jwt_required()
def update_me():
    uid = get_jwt_identity()
    data = (request.get_json() or {})
    u = User.query.get(uid)
    if not u:
        return jsonify({"msg":"Usuario no encontrado"}), 404

    new_name  = (data.get("name") or "").strip()
    new_email = (data.get("email") or "").strip()

    if new_email and User.query.filter(User.email==new_email, User.id!=uid).first():
        return jsonify({"msg":"Ese email ya está en uso"}), 400
    if new_name:
        u.name = new_name
    if new_email:
        u.email = new_email

    db.session.commit()
    return jsonify({"id":u.id,"name":u.name,"email":u.email})

@bp.delete('/me')
@jwt_required()
def delete_me():
    uid = get_jwt_identity()
    u = User.query.get(uid)
    if not u:
        return jsonify({"msg":"Usuario no encontrado"}), 404
    db.session.delete(u)
    db.session.commit()
    return jsonify({"msg":"Cuenta eliminada"})
