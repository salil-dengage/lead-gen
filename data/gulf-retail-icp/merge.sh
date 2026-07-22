#!/bin/bash
# Rebuild verdicts_master.tsv from source, folding in ALL web-verified results/*.json.
# Precedence: web_verified > judged(ambiguous) > firmographic(solid) > rule(OUT).
cd /home/user/lead-gen/data/gulf-retail-icp
: > /tmp/vlook.tsv
# 1) web-verified (highest precedence)
for f in results/*.json; do
  jq -r '.[]? | [ (if ((.domain//"")|length)>0 then (.domain|ascii_downcase) else (.name|ascii_downcase) end), .verdict, "web_verified", (.category_final//""), (.tier//"na"), ("HQ:"+(.hq_country//"?")) ] | @tsv' "$f" 2>/dev/null
done >> /tmp/vlook.tsv
# 2) rule OUT + firmographic IN (solids) from candidates
awk -F'\t' -v OFS='\t' 'FNR==1{next}{
  key=($4!=""?tolower($4):tolower($3)); cat=$18; disp=$19; rev=$8+0; tier=(rev>=300000000?"A":(rev>0?"B":"na"));
  solid=(cat=="fashion"||cat=="grocery"||cat=="health_beauty_pharmacy"||cat=="electronics"||cat=="home_furniture"||cat=="general_merch_dept");
  if(disp ~ /^LIKELY_OUT/ || disp ~ /^EXCLUDED/) print key,"OUT","rule_naics",cat,"na",disp;
  else if(solid) print key,"IN","firmographic",cat,tier,"solid retail NAICS category";
}' candidates_classified.tsv >> /tmp/vlook.tsv
# 3) judged (ambiguous = LIKELY_IN/AMBIGUOUS non-solid)
awk -f judge.awk candidates_classified.tsv | awk -F'\t' -v OFS='\t' 'NR>1 && ($19 ~ /^(LIKELY_IN|AMBIGUOUS)/) && !($18=="fashion"||$18=="grocery"||$18=="health_beauty_pharmacy"||$18=="electronics"||$18=="home_furniture"||$18=="general_merch_dept"){ key=($4!=""?tolower($4):tolower($3)); print key,$20,"judged",$21,$22,$23 }' >> /tmp/vlook.tsv
# dedup keep-first (precedence)
awk -F'\t' '!seen[$1]++' /tmp/vlook.tsv > /tmp/vlook_dedup.tsv
# join onto full candidate list
awk -F'\t' -v OFS='\t' 'NR==FNR{v[$1]=$2"\t"$3"\t"$4"\t"$5"\t"$6; next}
FNR==1{print "country","name","domain","zoho_id","apollo_id","revenue","naics","city","linkedin","phone","prelim_cat","verdict","basis","cat_final","tier","reason"; next}
{ key=($4!=""?tolower($4):tolower($3)); line=(key in v)?v[key]:"NA\tNA\tNA\tna\tno-verdict"; split(line,A,"\t"); print $1,$3,$4,$6,$7,$8,$9,$11,$12,$13,$18,A[1],A[2],A[3],A[4],A[5] }' /tmp/vlook_dedup.tsv candidates_classified.tsv > verdicts_master.tsv
echo "verdicts:"; tail -n +2 verdicts_master.tsv | cut -f12 | sort | uniq -c
echo "IN by basis:"; tail -n +2 verdicts_master.tsv | awk -F'\t' '$12=="IN"{print $13}' | sort | uniq -c
echo "web_verified total: $(tail -n +2 verdicts_master.tsv | awk -F'\t' '$13=="web_verified"' | wc -l)"