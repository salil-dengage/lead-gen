import csv, re
from collections import Counter

NONRETAIL_PATTERNS = [
    (r"pharma|pharmaceutical|hospital|clinic|medical center|medical group|medi[ck]|dental|healthcare|health care", "healthcare_or_pharma_mfr"),
    (r"\blaw\b|legal|advocate", "legal"),
    (r"marketing solutions|marketer network|advertising|\bbpo\b|solutions$|route to market|martech", "agency_or_services"),
    (r"\bhotel\b|suites|resort|\bavis\b|car rental|rent a car", "hospitality_or_travel"),
    (r"\bhilti\b|schindler|\bvw\b|renault|gehealthcare|novonordisk|astrazeneca|\bpfizer|philips|\bdyson\b|\btefal\b|almaraipro", "industrial_or_mfr"),
    (r"propertyfinder|visitsaudi|investsaudi|tamracapital|smartlaw|tejaradirect", "nonretail_services"),
]
GLOBAL_BRANDS = set("""nike gap lacoste tiffany decathlon calvinklein guess michaelkors toryburch charleskeith underarmour
hollisterco abercrombie aldo cb2 bloomingdales harveynichols katespade dkny stevemadden allbirds
mamasandpapas ethanallen watsons moltonbrown yvesrocher tedbaker tumi camicissima menbur liujo
jacquemus clarins makeupforever narscosmetics itcosmetics philips dyson tefal renault vw schindler
hilti gehealthcare novonordisk astrazeneca pfizer pfizerpro pfizermedicalinformation almaraipro
propertyfinder visitsaudi investsaudi tamracapital smartlaw tejaradirect avis timehotels hp""".split())

KNOWN = {
    "cenomiretail": ("IN", "fashion", "A", "Confirmed: Cenomi Retail (formerly Fawaz Alhokair), Riyadh-HQ'd, Tadawul-listed, 880 stores/9 countries (web-verified). Consolidates the HELD Cenomi/Cenomi Group entries into one account."),
    "othaimmalls": ("OUT", "grocery", "na", "Mall/real-estate division of the Al-Othaim group; the retail operating company (Abdullah Al-Othaim Markets) is already covered separately."),
    "savecoonlinehypermarket": ("IN", "grocery", "A", "Savola Group's online hypermarket arm; substantial grocery e-commerce operation (Saudi-HQ'd)."),
    "albassamhomeappliances": ("IN", "electronics", "B", "Known multi-branch Saudi home-appliance retail chain."),
    "adawliahelectronics": ("OUT", "electronics", "na", "Already present in the finalized 368 IN set; duplicate Zoho record for the same company."),
    "xcitebyalghanimelectronics": ("OUT", "electronics", "na", "Alghanim Industries' electronics chain; Alghanim Industries is already covered as the parent account."),
    "modernelectronicscompany": ("OUT", "electronics", "na", "Duplicate of 'Modern Electronics - MEC (AL-Faisaliah Group)', already in the finalized 368 IN set."),
    "yallatoys": ("IN", "sporting_hobby_books", "B", "Qatar-based toy e-commerce retailer with an active DTC store."),
    "yallatoyscom": ("OUT", "sporting_hobby_books", "na", "Duplicate of Yalla Toys (same company, kept as one account)."),
    "cityhypermarket": ("IN", "grocery", "B", "Named grocery hypermarket chain (Kuwait)."),
    "alifstores": ("HELD", "fashion", "na", "Plausible Qatar multi-brand retailer; scale and category not independently confirmed."),
    "minizmarkets": ("HELD", "grocery", "na", "Small Kuwait grocery chain; 100+ employee scale not confirmed."),
    "mallofqatar": ("OUT", "grocery", "na", "Shopping-mall real-estate operator/landlord, not itself a retail company."),
    "hpstoreksa": ("OUT", "electronics", "na", "HP-branded storefront; HP Inc. is a foreign-HQ'd (US) principal, not a distinct Saudi-HQ'd operating company."),
    "facesbeautymiddleeast": ("OUT", "health_beauty_pharmacy", "na", "FACES cosmetics chain is an Alshaya Group brand; Alshaya is already covered as the parent account."),
    "tafaseelstore": ("HELD", "retail_general", "na", "Name suggests a retail storefront; company identity and scale unconfirmed."),
    "smartable": ("OUT", "unknown_naics", "na", "No confirmable retail identity from name/domain."),
    "samehmall": ("OUT", "grocery", "na", "Egypt-oriented marketplace app; outside the KSA/Kuwait/Qatar scope."),
}

def normkey(name):
    return re.sub(r'[^a-z0-9]', '', (name or '').lower())

rows = list(csv.reader(open("gap_true_residual.tsv"), delimiter="\t"))[1:]
out_rows = []
for zid, name, website, coweb in rows:
    nk = normkey(name)
    nm_l = name.lower()
    verdict = cat = tier = reason = None

    for pat, tag in NONRETAIL_PATTERNS:
        if re.search(pat, nm_l):
            verdict, cat, tier, reason = "OUT", tag, "na", f"Non-retail category ({tag})."
            break

    if verdict is None and nk in GLOBAL_BRANDS:
        verdict, cat, tier, reason = "OUT", "franchise", "na", "Global brand storefront; foreign HQ, not a distinct in-country operating company."

    if verdict is None and nk in KNOWN:
        verdict, cat, tier, reason = KNOWN[nk]

    if verdict is None:
        verdict, cat, tier, reason = ("OUT", "ecommerce_unverified", "na",
            "Bulk-imported small/DTC storefront; no evidence of confirmed company identity or 100+ employee scale (default per approved size floor).")

    out_rows.append([zid, name, website, verdict, cat, tier, reason])

with open("gap_resolved.tsv", "w", newline="") as f:
    w = csv.writer(f, delimiter="\t")
    w.writerow(["zoho_id", "name", "website", "verdict", "category", "tier", "reason"])
    w.writerows(out_rows)

print(Counter(r[3] for r in out_rows))
print("\n--- IN/HELD from the gap batch ---")
for r in out_rows:
    if r[3] != "OUT":
        print(" ", r[3], "|", r[1], "|", r[6])
