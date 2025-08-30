from marshmallow import Schema, fields

class ProductSchema(Schema):
    id = fields.Int()
    title = fields.Str(required=True)
    slug = fields.Str()
    description = fields.Str()
    price_cents = fields.Int(required=True)
    stock = fields.Int(required=True)
    image_url = fields.Str()
    category_id = fields.Int(allow_none=True)
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
