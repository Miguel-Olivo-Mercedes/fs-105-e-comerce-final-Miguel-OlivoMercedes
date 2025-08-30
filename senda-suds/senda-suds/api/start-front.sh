#!/usr/bin/env bash
set -e
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

# Detectar carpeta frontend sin importar desde dónde se ejecute
if   [ -d "$SCRIPT_DIR/frontend" ]; then FE_DIR="$SCRIPT_DIR/frontend"
elif [ -d "$SCRIPT_DIR/../frontend" ]; then FE_DIR="$(cd "$SCRIPT_DIR/../frontend" && pwd)"
elif [ -d "$SCRIPT_DIR/senda-suds/senda-suds/frontend" ]; then FE_DIR="$SCRIPT_DIR/senda-suds/senda-suds/frontend"
else echo "❌ No encuentro carpeta frontend/"; exit 1; fi

cd "$FE_DIR"
echo "▶️  Frontend (Vite) — dir: $FE_DIR"
npm run dev
