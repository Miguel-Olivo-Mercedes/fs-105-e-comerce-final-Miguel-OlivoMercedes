#!/usr/bin/env bash
set -e
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
if   [ -f "$SCRIPT_DIR/api/app.py" ]; then API_DIR="$SCRIPT_DIR/api"
elif [ -f "$SCRIPT_DIR/senda-suds/senda-suds/api/app.py" ]; then API_DIR="$SCRIPT_DIR/senda-suds/senda-suds/api"
else API_DIR="$SCRIPT_DIR/senda-suds/senda-suds/api"; fi
cd "$API_DIR"

# activar venv
if   [ -f "../.venv/bin/activate" ]; then source ../.venv/bin/activate
elif [ -f ".venv/bin/activate" ]; then source .venv/bin/activate
fi

export FLASK_APP=app FLASK_ENV=development DATABASE_URL=sqlite:///ecommerce.db
PORT="${1:-5001}"
echo "▶️  Backend en puerto $PORT — dir: $API_DIR"
flask run -p "$PORT" -h 0.0.0.0
