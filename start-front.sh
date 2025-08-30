#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

for CANDIDATE in \
  "$SCRIPT_DIR/frontend" \
  "$SCRIPT_DIR/senda-suds/senda-suds/frontend"
do
  if [ -f "$CANDIDATE/package.json" ]; then
    cd "$CANDIDATE"
    echo "▶️  Frontend (Vite) — dir: $PWD"
    npm run dev
    exit 0
  fi
done

echo "❌ No se encontró la carpeta 'frontend'."
echo "   Esperaba: $SCRIPT_DIR/frontend"
exit 1
