import csv, io, re, json

rows = list(csv.reader(io.open('default_out_residual.tsv', encoding='utf-8', errors='replace'), delimiter='\t'))[1:]

EXCLUDE_PATTERNS = [
    (r'construction|contracting|مقاولات|building material|hardware store|sanitary ?ware|صحية|ceramic|سيراميك|\btiles?\b|بلاط|cement|اسمنت|\btimber\b|أخشاب|steel|حديد|\bmarble\b|رخام|scaffold|رافعات|swimming pool contractor|كهربائية للتجارة|electrical.{0,20}(construction|contracting)', 'building_materials'),
    (r'\bautomotive\b|car dealer|auto ?parts|tires?\b|إطارات|automobile|\bmotors?\b|nissan|toyota|nissan|nissan|hyundai|kia\b|ford\b|chevrolet|renault|suzuki|mitsubishi|dealership|showroom.{0,15}car|rent a car|car rental|leasing.{0,10}vehicle|vehicle leasing', 'automotive'),
    (r'wholesale|distributor|distribution (company|only)|b2b only|trading company.{0,10}(distribut|wholesale)|we distribute|premier.{0,15}wholesaler|بيع بالجملة|توزيع', 'wholesale_distribution'),
    (r'hospital|clinic|physician|dental clinic|patient portal|book an appointment.{0,15}(doctor|dr\.)|telemedicine|medical center\b|مستشفى|عيادة|احجز موعد', 'healthcare'),
    (r'real estate|property developer|leasing office space|facility management|شقق للايجار|عقارات|landlord|shopping mall (leasing|developer)', 'realestate_facility'),
    (r'interior design|fit-?out|design.{0,10}build|architectural finishing|تصميم داخلي|تشطيب معماري', 'interior_design_b2b'),
    (r'logistics|freight forward|warehousing services|3pl\b|shipping line|customs clearance', 'logistics_b2b'),
    (r'\bmarina\b|jet ?ski|yacht|boat dealer|watercraft', 'marine_dealership'),
    (r'fuel station|petrol station|gas station|محطة وقود|بترول', 'fuel_station'),
    (r'employee assistance program|corporate wellness platform|hr software|saas platform for (business|hr)', 'b2b_saas'),
    (r'law firm|legal services|advocate|محاماة', 'legal'),
    (r'coming soon|under construction|payment required|account suspended|domain (is )?for sale|parked ?free', 'placeholder_or_dead'),
]

INCLUDE_SIGNALS = re.compile(
    r'add to cart|add-to-cart|أضف (إلى )?السلة|عربة التسوق|checkout|السلة|shop now|تسوق الان|تسوق الآن|'
    r'free shipping|شحن مجاني|new arrivals|وصل حديثا|best ?sellers|الأكثر مبيعا|sale\b|تخفيضات|'
    r'\bsar\b|ريال سعودي|\bkwd\b|دينار|\bqar\b|ريال قطري|price\b|السعر',
    re.I)

def classify(text):
    tl = text.lower()
    for pat, cat in EXCLUDE_PATTERNS:
        if re.search(pat, tl, re.I):
            return 'OUT', cat, f'keyword match: {cat}'
    if INCLUDE_SIGNALS.search(text):
        return 'IN', 'n/a', 'strong retail signal (cart/checkout/price/sale keywords), no exclusion keywords'
    return None, None, None

auto, needs_read = [], []
for domain, code, signal, text in rows:
    v, cat, reason = classify(text)
    if v:
        auto.append({'domain': domain, 'verdict': v, 'category_final': cat, 'reason': reason, 'http_code': code, 'signal': signal})
    else:
        needs_read.append([domain, code, signal, text])

print('auto-classified:', len(auto), '(IN=%d OUT=%d)' % (sum(1 for a in auto if a['verdict']=='IN'), sum(1 for a in auto if a['verdict']=='OUT')))
print('needs manual read:', len(needs_read))

json.dump(auto, open('residual_auto.json', 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
with open('residual_needs_read.tsv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f, delimiter='\t')
    w.writerow(['domain','http_code','signal','text'])
    w.writerows(needs_read)

print()
print('=== auto OUT reasons breakdown ===')
from collections import Counter
print(Counter(a['category_final'] for a in auto if a['verdict']=='OUT'))
print()
print('=== needs-read domains ===')
for d in needs_read: print(' -', d[0])
