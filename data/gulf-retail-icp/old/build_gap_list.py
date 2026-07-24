import csv, re

def load_zoho():
    rows = []
    with open("zoho_3country_accounts.tsv") as f:
        r = csv.reader(f, delimiter="\t")
        next(r)
        for row in r:
            if len(row) != 4:
                continue
            rows.append(row)  # id, name, website, company_website
    return rows

def dom(s):
    s = (s or "").lower()
    s = re.sub(r'^https?://', '', s)
    s = re.sub(r'^www\.', '', s)
    s = s.split('/')[0]
    return s

RETAIL_KEYWORDS = re.compile(
    r"mart|market|hyper|super\s?market|grocery|pharmacy|pharma|perfum|cosmetic|beauty|fashion|boutique|"
    r"jewel|watch|electronics|appliance|furniture|apparel|store|stores|retail|mall|shoes|footwear|"
    r"optic|toys|bookstore|bookshop|department store", re.I)

all_zoho = load_zoho()
print("total zoho 3-country accounts:", len(all_zoho))

# candidate keys already assessed anywhere in verdicts_master.tsv (any verdict, IN/OUT/HELD)
assessed_keys = set()
with open("verdicts_master.tsv") as f:
    r = csv.reader(f, delimiter="\t")
    next(r)
    for row in r:
        name, domain = row[1], row[2]
        k = dom(domain) if domain else re.sub(r'[^a-z0-9]', '', name.lower())
        assessed_keys.add(k)

# also exclude anything already in the finalized 368 IN plan by zoho_id (belt and suspenders)
already_zoho_ids = set()
with open("accounts_in_plan.tsv") as f:
    r = csv.reader(f, delimiter="\t")
    next(r)
    for row in r:
        if len(row) >= 7 and row[6]:
            already_zoho_ids.add(row[6])

# Union: contiguous bulk-import batch (ID prefix 3978798000138[89]) UNION keyword-signal accounts
batch_ids = {row[0] for row in all_zoho if row[0].startswith("397879800013882") or row[0].startswith("397879800013883") or row[0].startswith("397879800013884") or row[0].startswith("397879800013889")}
keyword_hits = {row[0] for row in all_zoho if RETAIL_KEYWORDS.search(row[1])}
union_ids = batch_ids | keyword_hits
print("bulk-import-batch ids:", len(batch_ids), " keyword-signal ids:", len(keyword_hits), " union:", len(union_ids))

gap = []
for row in all_zoho:
    zid, name, website, coweb = row
    if zid not in union_ids:
        continue
    k = dom(website) or dom(coweb) or re.sub(r'[^a-z0-9]', '', name.lower())
    if k in assessed_keys or zid in already_zoho_ids:
        continue
    gap.append(row)

print("TRUE residual gap (never assessed by any prior pass):", len(gap))
with open("gap_true_residual.tsv", "w", newline="") as f:
    w = csv.writer(f, delimiter="\t")
    w.writerow(["zoho_id", "name", "website", "company_website"])
    w.writerows(gap)
