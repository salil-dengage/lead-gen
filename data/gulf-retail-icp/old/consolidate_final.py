import json, csv, io

def normdom(d):
    d = (d or '').strip().lower().replace('https://', '').replace('http://', '').rstrip('/')
    if d.startswith('www.'):
        d = d[4:]
    return d

def normname(n):
    return (n or '').strip().lower()

# ---- master lookup: domain -> (country, name) from the 1017-account universe ----
lookup = {}
rows = list(csv.reader(io.open('reverify_universe.tsv', encoding='utf-8', errors='replace'), delimiter='\t'))[1:]
for source, country, name, domain, verdict, category in rows:
    d = normdom(domain)
    if d:
        lookup[d] = (country, name)

UNIFIED_COLS = ['name', 'domain', 'country', 'verdict', 'gate_failed', 'category_final', 'qualification_path', 'reason']

final_rows = []
seen_domains = set()
seen_names = set()

def add_row(name, domain, country, verdict, gate_failed, category_final, qualification_path, reason, source_tag):
    d = normdom(domain)
    if d:
        if d in seen_domains:
            print(f'SKIP dup domain [{source_tag}]: {d} ({name})')
            return
        seen_domains.add(d)
    else:
        nk = normname(name)
        if nk in seen_names:
            print(f'SKIP dup name [{source_tag}]: {name}')
            return
        seen_names.add(nk)
    final_rows.append({
        'name': name, 'domain': domain, 'country': country, 'verdict': verdict,
        'gate_failed': gate_failed, 'category_final': category_final,
        'qualification_path': qualification_path, 'reason': reason,
    })

# ---- 1. existing 537-row Workflow-verified baseline (authoritative, kept as-is) ----
baseline = list(csv.DictReader(io.open('rollout_baseline_final_gates.tsv', encoding='utf-8'), delimiter='\t'))
for r in baseline:
    d = normdom(r['domain'])
    country = lookup.get(d, ('', ''))[0]
    add_row(r['name'], r['domain'], country, r['verdict'], r['gate_failed'],
            r['category_final'], r['qualification_path'], r['reason'], 'baseline')
print(f'baseline: {len(baseline)} loaded, {len(final_rows)} kept so far')

# ---- 2. auto_out.json (deterministic dead/blocked/strong-category-signal OUT) ----
# Exclude known false-negatives already correctly captured as IN elsewhere:
AUTO_OUT_EXCLUDE = {'cenomiretail.com', 'tamimimarkets.com'}
auto_out = json.load(io.open('rollout/auto_out.json', encoding='utf-8'))
n0 = len(final_rows)
for x in auto_out:
    d = normdom(x['domain'])
    if d in AUTO_OUT_EXCLUDE:
        print(f'DROP auto_out false-negative: {d} (already correctly IN elsewhere)')
        continue
    country, name = lookup.get(d, ('', x['domain']))
    add_row(name, x['domain'], country, x['verdict'], x['gate_failed'],
            'n/a', 'n/a', x['reason'], 'auto_out')
print(f'auto_out: added {len(final_rows) - n0}')

# ---- 3. strong_in.json (price+cart+category corroboration) ----
# Correct global-brand-storefront false positives caught by cross-referencing
# the established GLOBAL_BRANDS list from resolve_gap.py earlier this session.
STRONG_IN_FLIP_TO_OUT = {
    'allbirds.sa': "Allbirds is a US/New Zealand-founded global brand; KSA storefront is a franchise, not a distinct Saudi-HQ'd entity. Matches the established global-brand-storefront exclusion pattern.",
    'katespade.sa': "Kate Spade is a US global brand (Tapestry Inc.); KSA storefront is a franchise, not a distinct Saudi-HQ'd entity. Matches the established global-brand-storefront exclusion pattern.",
    'menbur.sa': "Menbur is a Spanish footwear/wedding-shoe brand; KSA storefront is a franchise, not a distinct Saudi-HQ'd entity. Matches the established global-brand-storefront exclusion pattern.",
    'stevemadden.sa': "Steve Madden is a US global footwear brand; KSA storefront is a franchise, not a distinct Saudi-HQ'd entity. Matches the established global-brand-storefront exclusion pattern.",
    'underarmour.sa': "Under Armour is a US global sportswear brand; KSA storefront is a franchise, not a distinct Saudi-HQ'd entity. Matches the established global-brand-storefront exclusion pattern.",
}
CATEGORY_FIX = {'maktabakw.com': 'general_merchandise'}  # mislabeled "beauty" -- actual content is stationery/office/art supplies
strong_in = json.load(io.open('rollout/strong_in.json', encoding='utf-8'))
n0 = len(final_rows)
for x in strong_in:
    d = normdom(x['domain'])
    country, name = lookup.get(d, ('', x['domain']))
    if d in STRONG_IN_FLIP_TO_OUT:
        add_row(name, x['domain'], country, 'OUT', 'duplicate', 'n/a', 'n/a',
                STRONG_IN_FLIP_TO_OUT[d], 'strong_in_corrected')
        continue
    cat = CATEGORY_FIX.get(d, x['category'])
    reason = f"Strong signal match (price+cart+category corroboration): {x['evidence'][:300]}"
    add_row(name, x['domain'], country, 'IN', 'none', cat, 'substantiality', reason, 'strong_in')
print(f'strong_in: added {len(final_rows) - n0}')

# ---- 4. pattern_resolved.json (known Cenomi-duplicate global brands + jaidah.com) ----
pattern_resolved = json.load(io.open('rollout/pattern_resolved.json', encoding='utf-8'))
n0 = len(final_rows)
for x in pattern_resolved:
    d = normdom(x['domain'])
    country, name = lookup.get(d, ('', x['domain']))
    add_row(name, x['domain'], country, x['verdict'], x['gate_failed'], 'n/a', 'n/a', x['reason'], 'pattern_resolved')
print(f'pattern_resolved: added {len(final_rows) - n0}')

# ---- 5. truly_novel_verdicts.json (101 manually gated accounts) ----
# Exclude gazzaz.com.sa: duplicate of an already-IN baseline row (Gazzaz قزاز).
TRULY_NOVEL_EXCLUDE = {'gazzaz.com.sa'}
truly_novel = json.load(io.open('rollout/truly_novel_verdicts.json', encoding='utf-8'))
n0 = len(final_rows)
for x in truly_novel:
    d = normdom(x['domain'])
    if d in TRULY_NOVEL_EXCLUDE:
        print(f'DROP truly_novel duplicate: {d} (already IN in baseline)')
        continue
    add_row(x['name'], x['domain'], x['country'], x['verdict'], x['gate_failed'],
            x['category_final'], x['qualification_path'], x['reason'], 'truly_novel')
print(f'truly_novel: added {len(final_rows) - n0}')

# ---- 6. js_shell_verdicts.json (59 JS-rendering blind spots) ----
js_shell = json.load(io.open('rollout/js_shell_verdicts.json', encoding='utf-8'))
n0 = len(final_rows)
for x in js_shell:
    add_row(x['name'], x['domain'], x['country'], x['verdict'], x['gate_failed'],
            x['category_final'], x['qualification_path'], x['reason'], 'js_shell')
print(f'js_shell: added {len(final_rows) - n0}')

# ---- 7. nodomain_verdicts.json (53 no-domain accounts) ----
# Correct 3 entries whose web-search-found domain turned out to already be a
# separate, already-verified baseline row for the same real-world company.
NODOMAIN_FLIP_TO_OUT = {
    'Al Nasser Kuwait': "Same company as the baseline's 'AL NASSER' (alnasser.net), already resolved IN there; this is a duplicate CRM record without a domain on file.",
    'Saudia Group Of Companies': "Same company as the baseline's 'Saudia Group' (saudiagroup.com), already resolved IN there; this is a duplicate CRM record without a domain on file.",
    'Al Anees Group': "Same company as the baseline's 'AlaneesQatar' (alaneesqatar.qa), already resolved IN there; this is a duplicate CRM record without a domain on file.",
}
nodomain = json.load(io.open('rollout/nodomain_verdicts.json', encoding='utf-8'))
n0 = len(final_rows)
for x in nodomain:
    if x['name'] in NODOMAIN_FLIP_TO_OUT:
        add_row(x['name'], '', x['country'], 'OUT', 'duplicate', 'n/a', 'n/a',
                NODOMAIN_FLIP_TO_OUT[x['name']], 'nodomain_corrected')
        continue
    add_row(x['name'], x['domain'], x['country'], x['verdict'], x['gate_failed'],
            x['category_final'], x['qualification_path'], x['reason'], 'nodomain')
print(f'nodomain: added {len(final_rows) - n0}')

# ---- write out ----
with open('rollout_baseline_final_gates.tsv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f, delimiter='\t')
    w.writerow(UNIFIED_COLS)
    for r in final_rows:
        w.writerow([r[c] for c in UNIFIED_COLS])

inC = sum(1 for r in final_rows if r['verdict'] == 'IN')
outC = sum(1 for r in final_rows if r['verdict'] == 'OUT')
print()
print(f'TOTAL final rows: {len(final_rows)}  (IN={inC} OUT={outC})')
