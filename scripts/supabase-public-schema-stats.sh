#!/usr/bin/env bash
# Prints table count and total column count for schema `public`.
# Requires a linked Supabase project (`supabase link`) or local DB (`supabase start`).
#
# Usage:
#   EDU_ENG=/path/to/edu-eng ./scripts/supabase-public-schema-stats.sh
#   ./scripts/supabase-public-schema-stats.sh /path/to/edu-eng --local
#
set -euo pipefail

WORKDIR=""
MODE="--linked"
for arg in "$@"; do
  case "$arg" in
    --local) MODE="--local" ;;
    *) WORKDIR="$arg" ;;
  esac
done
WORKDIR="${WORKDIR:-${EDU_ENG:-}}"

if [[ -z "${WORKDIR}" ]]; then
  echo "Set EDU_ENG or pass the Supabase project directory as the first argument." >&2
  exit 1
fi

cd "${WORKDIR}"

SQL="
SELECT
  COUNT(DISTINCT c.table_name) AS public_tables,
  COUNT(*) AS public_columns
FROM information_schema.columns c
JOIN information_schema.tables t
  ON c.table_schema = t.table_schema
 AND c.table_name = t.table_name
WHERE c.table_schema = 'public'
  AND t.table_type = 'BASE TABLE';
"

supabase db query ${MODE} "${SQL}" -o table
