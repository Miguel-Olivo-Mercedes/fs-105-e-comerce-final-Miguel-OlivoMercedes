from app import create_app
from extensions import db
from models.product import Product, Category
from slugify import slugify

PRODUCTS = [
    {"title":"Bosque Fresco","description":"Jabón artesanal con aceite de oliva y notas de pino y eucalipto. Ideal para piel mixta.","price_cents":690,"stock":40,"category":"Aromático","image_url":"https://images.unsplash.com/photo-1585386959984-a4155223168f?q=80&w=1200&auto=format&fit=crop"},
    {"title":"Cítrico Amanecer","description":"Explosión de naranja y bergamota. Refrescante para uso diario.","price_cents":650,"stock":50,"category":"Cítricos","image_url":"https://images.unsplash.com/photo-1603808033171-7f14b08475db?q=80&w=1200&auto=format&fit=crop"},
    {"title":"Lavanda Serena","description":"Calmante de lavanda con manteca de karité. Piel seca y relajación nocturna.","price_cents":720,"stock":35,"category":"Relajantes","image_url":"https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop"},
    {"title":"Carbón Activo Detox","description":"Limpieza profunda con carbón activo y árbol de té. Piel grasa/propensa a acné.","price_cents":790,"stock":45,"category":"Tratamiento","image_url":"https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop"},
    {"title":"Avena & Miel","description":"Exfoliación suave con avena coloidal y miel cruda. Ultra nutritivo.","price_cents":750,"stock":30,"category":"Nutritivos","image_url":"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop"},
    {"title":"Coco Tropical","description":"Base de aceite de coco y leche de coco. Espuma cremosa y aroma playero.","price_cents":680,"stock":55,"category":"Aromático","image_url":"https://images.unsplash.com/photo-1615485737657-7b4b87c76f61?q=80&w=1200&auto=format&fit=crop"},
    {"title":"Rosa Mosqueta Glow","description":"Regenerador con aceite de rosa mosqueta y arcilla rosa. Piel sensible.","price_cents":820,"stock":28,"category":"Tratamiento","image_url":"https://images.unsplash.com/photo-1602595688238-9fffe12d6048?q=80&w=1200&auto=format&fit=crop"},
    {"title":"Menta Alpina","description":"Mentolado intenso para después del entrenamiento. Sensación fría.","price_cents":690,"stock":60,"category":"Cítricos","image_url":"https://images.unsplash.com/photo-1603715749727-3447a0298161?q=80&w=1200&auto=format&fit=crop"}
]

def run():
    app = create_app()
    with app.app_context():
        for p in PRODUCTS:
            cname = p.pop("category")
            cat = Category.query.filter_by(name=cname).first()
            if not cat:
                cat = Category(name=cname, slug=slugify(cname))
                db.session.add(cat)
                db.session.flush()
            p["category_id"] = cat.id
            if not Product.query.filter_by(title=p["title"]).first():
                db.session.add(Product(**p))
        db.session.commit()
        print("✅ Seed completado: 8 productos Senda Suds")

if __name__ == "__main__":
    run()
