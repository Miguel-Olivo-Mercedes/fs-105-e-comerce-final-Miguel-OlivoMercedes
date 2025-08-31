#!/usr/bin/env bash
set -e
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

# Detectar carpeta api sin importar desde dónde se ejecute
if   [ -f "$SCRIPT_DIR/api/app.py" ]; then API_DIR="$SCRIPT_DIR/api"
elif [ -f "$SCRIPT_DIR/../api/app.py" ]; then API_DIR="$(cd "$SCRIPT_DIR/../api" && pwd)"
elif [ -f "$SCRIPT_DIR/senda-suds/senda-suds/api/app.py" ]; then API_DIR="$SCRIPT_DIR/senda-suds/senda-suds/api"
elif [ -f "$SCRIPT_DIR/app.py" ]; then API_DIR="$SCRIPT_DIR"   # por si el script está dentro de /api
else echo "❌ No encuentro api/app.py"; exit 1; fi

cd "$API_DIR"

# Activar venv (prueba ../.venv o .venv)
if   [ -f "../.venv/bin/activate" ]; then source ../.venv/bin/activate
elif [ -f ".venv/bin/activate" ]; then source .venv/bin/activate
else echo "⚠️  No encontré .venv, sigo sin venv"; fi

export FLASK_APP=app FLASK_ENV=development DATABASE_URL=sqlite:///ecommerce.db
PORT="${1:-5001}"
echo "▶️  Backend en puerto $PORT — dir: $API_DIR"
flask run -p "$PORT" -h 0.0.0.0
