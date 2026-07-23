import json, re
from collections import Counter

novel = json.load(open('../apollo_gap1_novel_raw.json', encoding='utf-8'))

# NAICS prefixes that are clear non-retail exclusions per Gate 2 (hard excludes)
EXCLUDE_NAICS_PREFIXES = [
    '42',      # wholesale trade (B2B)
    '23',      # construction
    '31', '32', '33',  # manufacturing (all of it, except we special-case 449xxx/44921 which is appliance/electronics RETAIL not mfg)
    '48', '49',  # transportation/warehousing/logistics/courier (except 492110 handled below case by case)
    '51',      # information/media/publishing/telecom/software platforms
    '52',      # finance/insurance
    '53',      # real estate/rental (leasing) -- 532xxx equipment rental ambiguous but default exclude
    '54',      # professional/scientific/technical services (consulting, agencies, law)
    '55',      # management of companies (pure holding co without further info)
    '56',      # administrative/support/waste services
    '61',      # educational services
    '62',      # healthcare
    '71',      # arts/entertainment/recreation
    '81',      # other services (repair, religious, personal/laundry -- mostly not retail)
    '92',      # public administration
]
# But claw back retail-coded NAICS even if they start with an excluded-looking prefix pattern collision
RETAIL_NAICS_PREFIXES = ['44', '45']  # Retail Trade sector -- 44-45 broadly, always keep for individual review
FURNITURE_MFG_NAICS = {'337121','337122','337127','337211','337214','337212','33712','33721','337910'}  # furniture MANUFACTURING, not retail
QSR_NAICS = {'722513', '722511'}  # limited/full service restaurants -- gate 2 explicitly allows F&B/QSR

NAME_HARD_EXCLUDE = re.compile(
    r'holding|group holding|investment|real estate|properties|contracting|construction|trading company$|'
    r'general trading|manufactur|factory|factories|industries|industrial|chemical|petrochemical|'
    r'medical (center|services)|clinic|hospital|pharmaceutical(?! retail)|healthcare|'
    r'law firm|legal|consult|advisory|logistics|freight|courier|shipping|express$|'
    r'insurance|bank\b|financial|capital|leasing|rental company|'
    r'publishing|newspaper|press$|media (group|company)|research (and|&) policy|institute|'
    r'university|academy|school|college|'
    r'jobs now|staffing|recruitment|employment services|'
    r'telecom|telecommunications|internet service|isp\b',
    re.I)

NAME_RETAIL_SIGNAL = re.compile(
    r'store|stores|shop|shopping|boutique|mart\b|market(?!ing)|hypermarket|supermarket|'
    r'fashion|cosmetics|perfume|beauty|pharmacy|jewellery|jewelry|toys|furniture|electronics|'
    r'appliance|bookstore|stationery|pet\b|gift|e-?commerce|online store', re.I)

def naics_list(s):
    return [c.strip() for c in (s or '').split(',') if c.strip()]

def classify(entry):
    name = entry['name']
    naics = naics_list(entry['naics'])
    nl = name.lower()

    if NAME_HARD_EXCLUDE.search(nl):
        return 'auto_out', 'name-pattern non-retail (holding/real-estate/construction/mfg/healthcare/legal/logistics/media/finance/etc.)'

    if any(n in QSR_NAICS for n in naics):
        return 'needs_read', 'QSR NAICS -- gate 2 explicitly allows F&B/QSR, needs individual read'

    if any(n in FURNITURE_MFG_NAICS or n.startswith(tuple(FURNITURE_MFG_NAICS)) for n in naics):
        if NAME_RETAIL_SIGNAL.search(nl):
            return 'needs_read', 'furniture-manufacturing NAICS but retail-signal name -- needs individual read'
        return 'auto_out', 'furniture MANUFACTURING NAICS (337xxx), not retail'

    has_retail_naics = any(n.startswith(tuple(RETAIL_NAICS_PREFIXES)) for n in naics)
    has_excluded_naics = any(n.startswith(tuple(EXCLUDE_NAICS_PREFIXES)) for n in naics)

    if has_retail_naics and not has_excluded_naics:
        return 'needs_read', 'clean retail NAICS'
    if has_retail_naics and has_excluded_naics:
        return 'needs_read', 'mixed retail+non-retail NAICS -- needs individual read'
    if has_excluded_naics and not has_retail_naics:
        if NAME_RETAIL_SIGNAL.search(nl):
            return 'needs_read', 'excluded-looking NAICS but retail-signal name -- needs individual read'
        return 'auto_out', f'non-retail NAICS only ({",".join(naics)})'
    # no naics at all
    if NAME_RETAIL_SIGNAL.search(nl):
        return 'needs_read', 'no NAICS, retail-signal name'
    return 'needs_read', 'no NAICS, no clear signal either way -- default to read rather than guess'

auto_out = []
needs_read = []
for e in novel:
    verdict, reason = classify(e)
    e['prefilter_reason'] = reason
    if verdict == 'auto_out':
        auto_out.append(e)
    else:
        needs_read.append(e)

print('total:', len(novel))
print('auto_out (deterministic, confident non-retail):', len(auto_out))
print('needs_read:', len(needs_read))
print()
print(Counter(e['prefilter_reason'].split(' -- ')[0].split('(')[0].strip() for e in auto_out))

json.dump(auto_out, open('gap1_auto_out.json', 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
json.dump(needs_read, open('gap1_needs_read.json', 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
