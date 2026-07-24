#!/bin/bash
# Deterministic live-verification sweep: HTTP status + e-commerce signal detection + Tranco rank.
# Resumable: skips domains already present in the output file.
set -u
cd "$(dirname "$0")"
IN=with_domain.tsv
OUT=sweep_results.tsv
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

[ -f "$OUT" ] || printf "domain\thttp_code\ttranco_rank\tsignal\tsnippet\n" > "$OUT"

done_domains() { cut -f1 "$OUT" 2>/dev/null | tail -n +2; }

check_one() {
  local domain="$1"
  local code body signal rank snippet
  local tf; tf=$(mktemp)
  code=$(curl -s -m 12 -A "$UA" -L -o "$tf" -w "%{http_code}" "https://$domain" 2>/dev/null)
  if [ -z "$code" ]; then code="TIMEOUT"; fi
  body=""
  if [ -f "$tf" ]; then
    body=$(head -c 3000000 "$tf" 2>/dev/null | tr -d '\0')
    rm -f "$tf"
  fi
  bl=$(echo "$body" | tr 'A-Z' 'a-z')
  signal="UNKNOWN"
  if [ "$code" = "TIMEOUT" ] || [ "$code" = "000" ]; then
    signal="DEAD_OR_TIMEOUT"
  elif [ "$code" = "403" ] || [ "$code" = "406" ] || [ "$code" = "429" ]; then
    signal="BLOCKED"
  elif echo "$bl" | grep -qE "domain (is )?for sale|buy this domain|parked ?free|this domain has expired|godaddy\.com/domain|sedo\.com|coming soon"; then
    signal="PARKED_OR_EXPIRED"
  elif echo "$code" | grep -qE "^(404|410|500|502|503)$"; then
    signal="DEAD_HTTP_ERROR"
  elif echo "$code" | grep -qE "^(200|301|302|307|308)$"; then
    # NOTE: keyword counts are a diagnostic hint only, NOT a verdict -- proven unreliable
    # on real pages (WordPress/plugin boilerplate creates false retail-keyword hits even
    # on non-retail sites, e.g. primarycare.sa scored retail_hit=5 from leftover plugin
    # CSS/JS strings despite being a medical clinic). Every LIVE_* case still requires a
    # real semantic check (WebFetch/WebSearch) before being trusted as an IN/OUT verdict.
    retail_hit=$(echo "$bl" | grep -ocE "add to cart|add-to-cart|checkout|شراء|السلة|أضف إلى السلة|sar |sar,|sar\.|kwd |qar |price|السعر|شحن مجاني|free shipping|product|منتج")
    nonretail_hit=$(echo "$bl" | grep -ocE "book an appointment|patient|clinic|hospital|physician|احجز موعد|عيادة|مستشفى|law firm|legal services|our services include consulting|request a quote|b2b only|wholesale only")
    platform_hit=$(echo "$bl" | grep -ocE "cdn.shopify|salla\.sa|zid\.sa|woocommerce|magento|/cart\.js|opencart")
    signal="LIVE_NEEDS_SEMANTIC_CHECK"
  else
    signal="LIVE_NEEDS_SEMANTIC_CHECK"
    retail_hit=0; nonretail_hit=0; platform_hit=0
  fi
  local rjson rok rval attempt
  rank="none"
  for attempt in 1 2; do
    rjson=$(curl -s -m 8 "https://siterank.redirect2.me/api/rank.json?domain=$domain" 2>/dev/null)
    rok=$(printf '%s' "$rjson" | jq -r .success 2>/dev/null)
    rval=$(printf '%s' "$rjson" | jq -r .rank 2>/dev/null)
    if [ "$rok" = "true" ] && [ -n "$rval" ] && [ "$rval" != "null" ] && [ "$rval" != "0" ]; then
      rank="$rval"
      break
    fi
    sleep 1
  done
  snippet=$(echo "$body" | tr -s ' \t\n' ' ' | head -c 150 | tr '\t' ' ')
  printf "%s\t%s\t%s\t%s\t%s\n" "$domain" "$code" "$rank" "$signal" "$snippet" >> "$OUT"
}
export -f check_one
export UA OUT

comm -23 <(cut -f4 "$IN" | sed 's#https\?://##; s#/$##' | sort -u) <(done_domains | sort -u) \
  | xargs -P 15 -I{} bash -c 'check_one "$@"' _ {}

echo "SWEEP_COMPLETE: $(wc -l < "$OUT") rows"
