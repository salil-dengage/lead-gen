#!/bin/bash
# Cheap, deterministic, no-subagent sweep: pure Bash + curl, shell-level parallelism.
set -u
cd "$(dirname "$0")"
IN=/tmp/remaining_accounts.tsv
OUT=efficient_results.tsv
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

: > "$OUT"

check_one() {
  local domain="$1"
  local tf; tf=$(mktemp)
  local code
  code=$(curl -s -m 10 -A "$UA" --compressed -L -o "$tf" -w "%{http_code}" "https://$domain" 2>/dev/null)
  [ -z "$code" ] && code="000"
  local body=""
  [ -f "$tf" ] && body=$(cat "$tf" 2>/dev/null | tr -d '\0')
  rm -f "$tf"
  local bl; bl=$(printf '%s' "$body" | tr 'A-Z' 'a-z')
  local signal="LIVE"
  if [ "$code" = "000" ]; then
    signal="DEAD"
  elif echo "$code" | grep -qE "^(403|406|429)$"; then
    signal="BLOCKED"
  elif echo "$code" | grep -qE "^(404|410|500|502|503)$"; then
    signal="DEAD_HTTP"
  elif printf '%s' "$bl" | grep -qE "domain (is )?for sale|buy this domain|parked ?free|godaddy\.com/domain|sedo\.com|this domain has expired|coming soon.{0,50}(launch|website)"; then
    signal="PARKED"
  fi
  # strip tags/scripts for a compact text snapshot, capped generously
  local text
  text=$(printf '%s' "$body" | perl -0pe 's/<script.*?<\/script>//gis; s/<style.*?<\/style>//gis; s/<[^>]+>/ /g; s/&[a-z]+;/ /g; s/\s+/ /g' 2>/dev/null | cut -c1-4000)
  printf "%s\t%s\t%s\t%s\n" "$domain" "$code" "$signal" "$text" >> "$OUT"
}
export -f check_one
export UA OUT

awk -F'\t' '$4!=""{print $4}' "$IN" | sed 's#https\?://##; s#/$##' | sort -u \
  | xargs -P 20 -I{} bash -c 'check_one "$@"' _ {}

echo "SWEEP_DONE: $(wc -l < "$OUT") domains checked"
