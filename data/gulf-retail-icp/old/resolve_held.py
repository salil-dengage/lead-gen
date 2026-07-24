import csv

# Researched, individually-reasoned resolutions for the 102 HELD accounts.
# Each entry: name substring (unique enough to match) -> (verdict, category, tier, reason, dup_of)
RESOLUTIONS = {
    "Abraj Hyper": ("IN", "grocery", "B", "Hypermarket chain (name confirms format); domain live."),
    "Abu Waleed Tea": ("IN", "food_service_qsr", "B", "Multi-branch tea cafe chain, F&B retail, in-scope category."),
    "Al Sadaf Trading": ("OUT", "fashion", "na", "No domain; cannot verify DTC digital presence or scale."),
    "Almajal Alarabi Holding": ("OUT", "diversified_trading", "na", "Confirmed: construction/contracting/facility-management conglomerate, not consumer retail (web-verified)."),
    "Al Mana": ("IN", "fashion", "A", "Confirmed Qatar-HQ'd conglomerate; Al Mana Fashion Group operates 300+ retail outlets (Zara, Mango, Hermes JV), $2B+ turnover, 3500+ staff (web-verified)."),
    "Almana Group": ("OUT", "fashion", "na", "Duplicate of Al Mana (same Qatar group, different domain/name variant)."),
    "Al-Moallem Group": ("HELD", "food_service_qsr", "na", "Large Saudi catering/facilities group; consumer-facing retail vs B2B catering share unconfirmed."),
    "Al Shaheen Est": ("OUT", "diversified_trading", "na", "General trading entity; no confirmed consumer-retail storefront."),
    "Marzooq S. Al Shamlan Holding": ("OUT", "diversified_trading", "na", "General holding; no confirmed consumer-retail storefront."),
    "ALSIDDIQI HOLDING": ("OUT", "diversified_trading", "na", "General holding; no confirmed consumer-retail storefront."),
    "Alsourayia Trading": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Alsulaiman Group": ("IN", "general_merch_dept", "A", "Confirmed Saudi-HQ'd conglomerate (Forbes Top 100 Arab Family Business); operates IKEA Saudi/Bahrain franchise + Circle K Saudi franchise (web-verified)."),
    "Al Sulaiman Jewellers": ("IN", "fashion", "B", "Name confirms jewellery retail (Qatar); distinct entity from Alsulaiman Group (Saudi)."),
    "السلطان | AlSultan": ("OUT", "retail_general", "na", "No identifiable retail signal beyond a generic brand name."),
    "Al Wazzan Group of Companies": ("OUT", "diversified_trading", "na", "General trading group; no confirmed consumer-retail storefront."),
    "Alwazzan United Trading": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "شركة اليحيا Alyahya": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "AlYemni Group": ("OUT", "diversified_trading", "na", "General trading/catering group; no confirmed consumer-retail storefront."),
    "Ansar Group of Companies": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "شركة عثمان الزامل": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Ashley Homestore": ("HELD", "franchise", "na", "US furniture brand storefront; Saudi operating franchisee not confirmed."),
    "Asklan Trading & Agriculture": ("OUT", "diversified_trading", "na", "Trading/agriculture; not consumer retail."),
    "ATHR Gallery": ("OUT", "art_gallery", "na", "Art gallery; outside the approved consumer-retail categories."),
    "Salem Saleh Babgi": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Bastana International": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Bayt Alebaa": ("OUT", "home_improvement", "na", "Weak/no consumer-retail signal; likely home-goods trade, unconfirmed."),
    "BGB Holding": ("OUT", "diversified_trading", "na", "General holding; no confirmed consumer-retail storefront."),
    "Bradma Group": ("OUT", "diversified_trading", "na", "Building-materials/industrial trading (Qatar); not consumer retail."),
    "Build Station": ("OUT", "home_improvement", "na", "Hardware/DIY building materials; out of approved category scope."),
    "Chayah Group": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "CHIPS": ("IN", "retail_general", "B", "Domain (chipsstore.com) confirms a retail storefront (Kuwait)."),
    "Circle K Alsulaiman": ("OUT", "grocery", "na", "Duplicate: same operator as Alsulaiman Group (kept as one consolidated account)."),
    "wholefoodmarket": ("OUT", "grocery", "na", "Domain resolves to an unrelated/mismatched (.in, India) record; data-quality artifact."),
    "Concept Combined Group": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "CREDO TRADING": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Decorella Panits": ("OUT", "diversified_trading", "na", "No domain; cannot verify."),
    "Doha Oasis": ("OUT", "food_service_qsr", "na", "Mixed-use real-estate development (hosts Printemps Doha); not itself a retailer."),
    "Drops": ("OUT", "retail_general", "na", "No identifiable retail signal from name/domain."),
    "Eastern Gate": ("OUT", "home_improvement", "na", "No identifiable consumer-retail signal."),
    "EBEL ابل": ("OUT", "home_improvement", "na", "No domain; cannot verify."),
    "EMAAR ALWATAN": ("OUT", "home_improvement", "na", "Building-materials naming pattern; not consumer retail."),
    "Eurocom": ("OUT", "retail_general", "na", "No identifiable consumer-retail signal."),
    "Fakeeh Vision": ("IN", "health_beauty_pharmacy", "B", "Confirmed: largest optical wholesaler/retailer chain in KSA (web-verified), a genuine retail operation."),
    "FL Development": ("OUT", "unknown_naics", "na", "\"Development\" naming indicates real-estate/property, not retail."),
    "Flora Group": ("OUT", "diversified_trading", "na", "Florist/gift trading; out of approved category scope."),
    "Hussein Bakry Gazzaz": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Ghasham International": ("OUT", "retail_general", "na", "\"RP Tech\" naming indicates IT/tech reseller, not consumer retail."),
    "United Yousef M Naghi Co. Ltd": ("OUT", "diversified_trading", "na", "General trading; dirty Website field (google.com); no confirmed storefront."),
    "United Yousef Naghi Co. Ltd.": ("OUT", "diversified_trading", "na", "Duplicate variant of United Yousef M Naghi."),
    "C1": ("OUT", "unknown_naics", "na", "No identifiable retail signal; name too generic."),
    "GULF STREAM": ("OUT", "home_improvement", "na", "No identifiable consumer-retail signal."),
    "HATCON": ("OUT", "home_improvement", "na", "Naming pattern indicates construction/contracting."),
    "Hilti Qatar": ("OUT", "home_improvement", "na", "Hilti is a Liechtenstein-HQ'd B2B industrial-tools company; not consumer retail."),
    "Hyatt Plaza Shopping Mall": ("OUT", "retail_general", "na", "Mall/real-estate operator, not itself a retail company."),
    "IKEA Alsulaiman": ("OUT", "franchise", "na", "Duplicate: same operator as Alsulaiman Group (kept as one consolidated account)."),
    "INTERTEC GROUP": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Kiffa Roaster": ("IN", "grocery", "B", "Specialty coffee roaster/retailer with an active DTC domain."),
    "Khereiji Showrooms": ("IN", "electronics", "B", "\"Showrooms Company\" naming confirms a retail-facing operation (Saudi trading/electronics house)."),
    "Lighting Stores": ("IN", "electronics", "B", "Domain and name confirm a lighting retail chain (Saudi)."),
    "Logic Group of Companies": ("OUT", "diversified_trading", "na", "No identifiable consumer-retail signal."),
    "LULU RAYYAN GROUP": ("OUT", "diversified_trading", "na", "Confirmed: local entity of LuLu Group International, HQ'd in the UAE; excluded per foreign-HQ operator rule (consistent with Carrefour/Nesto/Spinneys)."),
    "Magrabi Hospitals": ("IN", "health_beauty_pharmacy", "A", "Confirmed: Magrabi Retail Group is a standalone 200+ store optical retail chain across the Gulf (web-verified), distinct from the hospital arm."),
    "Musaed Mohammed Bin Ajlan": ("OUT", "diversified_trading", "na", "Confirmed in the earlier pilot: plumbing/electrical/sanitary building-materials trader, not consumer retail."),
    "مكارم -Makarem": ("OUT", "home_improvement", "na", "No identifiable consumer-retail signal."),
    "MATALAN Middle East": ("HELD", "fashion", "na", "UK value-fashion brand; Qatar/regional operating franchisee not confirmed."),
    "Merch and Partners": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Meshkati Trading": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Mimar": ("OUT", "home_improvement", "na", "No identifiable consumer-retail signal; naming suggests design/architecture."),
    "شركة تقنيات الزراعة الحديثة": ("OUT", "home_improvement", "na", "Agricultural technology; not consumer retail."),
    "Meshaal Al Shatti": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Nabina Group": ("OUT", "diversified_trading", "na", "Ceramics/building-materials trading (Qatar); not consumer retail."),
    "Nasir Bin Abdullah": ("OUT", "diversified_trading", "na", "General trading conglomerate; no confirmed consumer-retail storefront."),
    "Nasco Group": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "نسمو | Nasmo": ("OUT", "home_improvement", "na", "No identifiable consumer-retail signal."),
    "National Building and Marketing": ("OUT", "diversified_trading", "na", "Building-materials naming pattern; not consumer retail."),
    "Printemps Doha": ("OUT", "general_merch_dept", "na", "Confirmed: operated directly by Groupe Printemps, global HQ Paris, France (Qatari-owned investment fund, but not Qatar-HQ'd); excluded per HQ rule."),
    "RIS Group": ("OUT", "diversified_trading", "na", "General trading/services; no confirmed consumer-retail storefront."),
    "SADANA TRADING": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Saleh Al-Othaim Investment": ("OUT", "diversified_trading", "na", "Investment holding entity, distinct from the Al-Othaim Markets retail operating company already covered."),
    "Savola Group": ("OUT", "grocery", "na", "FMCG manufacturer/holding; its retail arm (Panda) is already covered as a separate account."),
    "BEAM": ("IN", "retail_general", "B", "Domain (shopbeam.com) confirms a retail storefront (Saudi)."),
    "SITACO Company": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Sondos": ("OUT", "retail_general", "na", "No identifiable retail signal beyond a generic brand name."),
    "Southwind Telecom": ("OUT", "retail_general", "na", "Telecom naming; consumer-retail storefront unconfirmed."),
    "SPAR Saudi Arabia": ("OUT", "grocery", "na", "Duplicate: operated by Al Sadhan Group (kept as one consolidated account under Al Sadhan)."),
    "SPAR QATAR": ("HELD", "grocery", "na", "SPAR International franchise; Qatar operating entity not confirmed (Saudi operator is Al Sadhan Group, does not extend to Qatar)."),
    "Starco Holding": ("IN", "fashion", "A", "Confirmed Kuwait-HQ'd conglomerate (est. 1958); 300+ stores, 2000+ staff, franchises Benetton/Mango/Stradivarius/U.S. Polo (web-verified)."),
    "TAQAT": ("OUT", "retail_general", "na", "Name/sector suggests energy or staffing services, not consumer retail."),
    "Tawseel Media Group": ("OUT", "diversified_trading", "na", "Media/logistics naming; not consumer retail."),
    "The Blue Group - Qatar": ("OUT", "diversified_trading", "na", "General trading; no confirmed consumer-retail storefront."),
    "Toot Company": ("OUT", "diversified_trading", "na", "General trading/catering; no confirmed consumer-retail storefront."),
    "TSC": ("OUT", "home_improvement", "na", "No domain; cannot verify."),
    "ULTRA LIGHT": ("OUT", "home_improvement", "na", "Lighting/electrical trade naming; likely B2B, unconfirmed retail."),
    "United Retail Trading": ("OUT", "diversified_trading", "na", "General trading despite name; no confirmed consumer storefront."),
    "تجارة بلا حدود": ("OUT", "retail_general", "na", "No identifiable retail signal beyond a generic name."),
    "Virgin Megastore Saudi Arabia": ("HELD", "franchise", "na", "Founded in Jeddah with its own Saudi entity per LinkedIn, but regional Virgin Megastore brand is often Azadea/Lebanon-linked elsewhere; operator ownership genuinely unconfirmed."),
    "Wadi Halfa": ("OUT", "retail_general", "na", "No identifiable retail signal beyond a generic name."),
    "مياه واڤ": ("OUT", "beverage_dtc", "na", "Bottled-water FMCG producer/brand, not a retailer."),
    "Zain Tawseel": ("OUT", "retail_general", "na", "Telecom-linked delivery/logistics service, not consumer retail."),
    "شركة اثاث للتجزئة": ("IN", "home_furniture", "B", "Name translates to \"Furniture Retail Company\" — explicit consumer furniture retail."),
    "ZODE_SA": ("OUT", "retail_general", "na", "No identifiable retail signal beyond a generic brand name."),
    "مجموعة شركات اليسر": ("OUT", "diversified_trading", "na", "No domain; cannot verify."),
}

rows = list(csv.reader(open("held_accounts.tsv"), delimiter="\t"))
header, rows = rows[0], rows[1:]
matched, unmatched = [], []
for r in rows:
    country, name, domain, cat, reason = r
    hit = None
    for key in RESOLUTIONS:
        if key in name:
            hit = key
            break
    if hit:
        verdict, cat2, tier, why = RESOLUTIONS[hit]
        matched.append([country, name, domain, verdict, cat2, tier, why])
    else:
        unmatched.append(r)

print(f"matched: {len(matched)}  unmatched: {len(unmatched)}")
for u in unmatched:
    print("UNMATCHED:", u)

with open("held_resolved.tsv", "w", newline="") as f:
    w = csv.writer(f, delimiter="\t")
    w.writerow(["country", "name", "domain", "verdict", "category", "tier", "reason"])
    w.writerows(matched)

from collections import Counter
print(Counter(m[3] for m in matched))
