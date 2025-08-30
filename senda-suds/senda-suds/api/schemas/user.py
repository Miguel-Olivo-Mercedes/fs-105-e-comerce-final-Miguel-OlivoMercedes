from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int()
    email = fields.Email(required=True)
    name = fields.Str()
    role = fields.Str()
    created_at = fields.DateTime()
