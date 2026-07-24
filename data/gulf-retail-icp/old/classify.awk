# Deterministic pre-classification of retail candidates by NAICS/SIC + exclusion domains.
# Adds two columns: prelim_category, prelim_disposition.
# Dispositions: LIKELY_IN | AMBIGUOUS | LIKELY_OUT:<reason> | EXCLUDED_MARKETPLACE
BEGIN{FS=OFS="\t"}
NR==1{print $0,"prelim_category","prelim_disposition"; next}
{
  name=tolower($3); dom=tolower($4); naics=$9;
  # ---- exclusion: mega-marketplaces + ALL delivery / q-commerce (by domain or clear name token) ----
  excl="noon.com amazon.sa amazon.com amazonsaudi.com.sa talabat.com hungerstation.com jahez.net mrsool.co careem.com toyou.io nana.sa snoonu.com rafeeq.qa ananinja.com thechefz.co shgardi.com deliveroo.com instashop.com getbaqala.com cari.com.kw";
  isx=0; n=split(excl,E," "); for(i=1;i<=n;i++){ if(dom==E[i]) isx=1 }
  if(name ~ /(^|[^a-z])(noon|talabat|hungerstation|hunger station|jahez|mrsool|careem|snoonu|deliveroo|instashop)([^a-z]|$)/) isx=1;
  if(name ~ /amazon/) isx=1;
  # ---- category from NAICS groups (consider all codes) ----
  cat=""; hasIN=0; hasAMB=0; hasOUT=0; oreason="";
  m=split(naics,C,"|");
  for(i=1;i<=m;i++){ c=C[i]; g=substr(c,1,3);
    if(c=="44-45"){ if(cat=="")cat="retail_general"; hasIN=1 }
    else if(g=="441"){ hasOUT=1; oreason="automotive" }
    else if(g=="447"){ hasOUT=1; oreason="fuel_station" }
    else if(g=="442"){ if(cat=="")cat="home_furniture"; hasIN=1 }
    else if(g=="443"){ if(cat=="")cat="electronics"; hasIN=1 }
    else if(g=="445"){ cat="grocery"; hasIN=1 }
    else if(g=="446"||g=="456"){ if(cat==""||cat=="retail_general")cat="health_beauty_pharmacy"; hasIN=1 }
    else if(g=="448"||g=="458"){ cat="fashion"; hasIN=1 }
    else if(g=="452"||g=="455"){ if(cat=="")cat="general_merch_dept"; hasIN=1 }
    else if(g=="454"){ if(cat=="")cat="ecommerce_nonstore"; hasIN=1 }
    else if(g=="451"||g=="459"){ if(cat=="")cat="sporting_hobby_books"; hasIN=1 }
    else if(g=="444"){ if(cat=="")cat="home_improvement"; hasAMB=1 }
    else if(g=="453"){ if(cat=="")cat="misc_florist_gift"; hasAMB=1 }
    else if(substr(c,1,2)=="72"){ if(cat=="")cat="food_service_qsr"; hasAMB=1 }
    else if(substr(c,1,2)=="42"){ hasOUT=1; oreason="wholesale" }
    else if(substr(c,1,2)=="31"||substr(c,1,2)=="32"||substr(c,1,2)=="33"){ hasOUT=1; oreason="manufacturing" }
    else if(g=="492"||substr(c,1,2)=="48"||substr(c,1,2)=="49"){ hasOUT=1; oreason="logistics_delivery" }
  }
  if(isx){ disp="EXCLUDED_MARKETPLACE"; if(cat=="")cat="marketplace_delivery" }
  else if(hasIN){ disp="LIKELY_IN" }
  else if(hasAMB){ disp="AMBIGUOUS" }
  else if(hasOUT){ disp="LIKELY_OUT:" oreason; if(cat=="")cat="non_retail" }
  else { disp="AMBIGUOUS"; if(cat=="")cat="unknown_naics" }
  print $0,cat,disp
}
