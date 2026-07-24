# Knowledge-encoded classifier for the ambiguous REVIEW bucket.
# Input: candidate rows (19 cols). Output: +verdict +category_final +tier +reason
# Verdicts: IN | OUT | HELD. Conservative: genuine ambiguity -> HELD (flagged, never silently IN/OUT).
BEGIN{FS=OFS="\t"}
function has(p){ return (naics ~ ("(^|[|])" p)) }
{
 nm=tolower($3); dom=tolower($4); naics=$9; rev=$8+0; cat=$18;
 tier=(rev>=300000000?"A":(rev>0?"B":"na"));
 v=""; cf=cat; r="";

 # 1) resale / classifieds / cross-border marketplaces -> excluded
 if(nm ~ /(^|[^a-z])(soum|smsm|opensooq|haraj|4sale|ubuy|yougotagift|dubizzle)([^a-z]|$)/){ v="OUT"; cf="marketplace"; r="resale/marketplace platform (excluded)" }
 # 2) foreign-HQ (UAE etc.) operators / group subsidiaries
 else if(nm ~ /gulf marketing|(^|[^a-z])gmg([^a-z]|$)|landmark|al-?futtaim|majid al futtaim|carrefour|chalhoub|apparel group|azadea|americana/){ v="OUT"; cf="foreign_operator"; r="foreign-HQ (non in-country) operator/subsidiary" }
 # 3) fuel / service stations
 else if(has("457")||has("447")|| nm ~ /fuel|petro|gas station|وقود|بترو|محطات|tas-?helat|aramco lubricants|araboil/){ v="OUT"; cf="fuel_station"; r="fuel/service-station retail (out of scope)" }
 # 4) foreign-brand franchise -> HELD (confirm in-country operating entity)
 else if(nm ~ /ikea|virgin megastore|ashley|(^|[^a-z])(h&m|zara|nike|adidas)([^a-z]|$)/){ v="HELD"; cf="franchise"; r="foreign-brand franchise; confirm operating entity is in-country" }
 # 5) consumer home / furniture / appliance retailers (rescue from building-materials bucket)
 else if(nm ~ /saco|artecasa|casa piu|home ?& ?garden|safat home|hassan abul|bed shop|(^|[^a-z])midas|alomar|almutlaq|rugaib|alsaif|saif gallery|line furniture|tivoli|(^|[^a-z])eddy|zagzoog|(^|[^a-z])raneen|رنين|مفروشات|(^|[^a-z])أثاث|furniture|home ?appliance|بيت هايل|hail house|ashley|my little home|بيتي الصغير|مفارش|bed shop|the bed/){ v="IN"; cf="home_furniture_appliance"; r="consumer home/furniture/appliance retailer" }
 # 6) building materials / B2B trade / contractors / industrial -> OUT
 else if((cat=="home_improvement"||cat=="unknown_naics"||cat=="retail_general") && nm ~ /building material|sanitary|صحية|ceramic|سيراميك|(^|[^a-z])paint|دهان|hardware|steel|حديد|timber|أخشاب|tiles|بلاط|contract|مقاولات|cement|اسمنت|marble|رخام|(^|[^a-z])sabk|جسور|electric trd|electric trad|equipment|technical|industr|مصنع|factory|swimming pool|metal|لإنارة|إنارة|كهربائية للتجارة/){ v="OUT"; cf="building_materials_b2b"; r="building materials/B2B trade or contractor (not consumer retail)" }
 # 7) electronics retailers
 else if(nm ~ /(^|[^a-z])xcite|(^|[^a-z])extra($|[^a-z])|techno ?blue|future communications|(^|[^a-z])eureka|كهرباء الجنوب|electronics|أجهزة كهربائية|al-?ghanim store|الغانم|home & electronics/){ v="IN"; cf="electronics"; r="consumer electronics retailer" }
 # 8) sporting goods / toys / books / stationery
 else if(cat=="sporting_hobby_books" || cat=="misc_florist_gift" || nm ~ /(^|[^a-z])sport|(^|[^a-z])toy|kiddy|game store|مكتبة|مكتبه|maktab|bookstore|(^|[^a-z])جرير|fitness|رياض/){
   if(nm ~ /gallery|athr|(^|[^a-z])art($|[^a-z])/){ v="HELD"; cf="art_gallery"; r="art gallery; confirm consumer-retail model" }
   else if(nm ~ /plaza hollandi|florist|زهور|flower/){ v="OUT"; cf="florist"; r="florist (out of scope category)" }
   else { v="IN"; cf="sporting_toys_books"; r="sporting goods / toys / books / stationery retailer" }
 }
 # 9) pure online consumer retailers (nonstore 454)
 else if(cat=="ecommerce_nonstore" || has("454")){
   if(nm ~ /(^|[^a-z])water|واڤ|(^|[^a-z])wav([^a-z]|$)/){ v="HELD"; cf="beverage_dtc"; r="beverage brand DTC; confirm retail vs FMCG producer" }
   else if(nm ~ /roaster|محمصة|roastery|coffee/){ v="IN"; cf="specialty_fnb_retail"; r="specialty coffee roaster with retail/e-commerce" }
   else { v="IN"; cf="ecommerce"; r="online consumer retailer" }
 }
 # 10) known in-scope majors in retail_general 44-45
 else if(nm ~ /(^|[^a-z])jarir|(^|[^a-z])abyat|boutiq|dabdoob|petzone|toyland|(^|[^a-z])cenomi|tamkeen|almanea|(^|[^a-z])safari|store 974|duty free|(^|[^a-z])nahdi|dream fitness|hassan.?s optician|optic/){ v="IN"; cf="specialty_retail"; r="known in-country consumer retailer" }
 # 11) diversified trading / holding / general trading -> HELD (flag, don't guess)
 else if(nm ~ /holding|(^|[^a-z])group|trading|(^|[^a-z])est($|[^a-z])|w\.?l\.?l|sons|والاولاد|واخوانه|للتجارة|القابضة|مجموعة|company|(^|[^a-z])co\.?($|[^a-z])/){ v="HELD"; cf="diversified_trading"; r="general trading/holding; consumer-retail fit unconfirmed" }
 # 12) fallback
 else { v="HELD"; cf=cat; r="ambiguous; needs confirmation" }

 print $0, v, cf, tier, r
}
