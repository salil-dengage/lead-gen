#!/bin/bash
# Reconcile IN candidates against existing Zoho 3-country accounts.
# Match by normalized domain, then normalized name. Output: ENRICH(existing) vs CREATE(new).
cd /home/user/lead-gen/data/gulf-retail-icp
Z=zoho_3country_accounts.tsv
IN=/tmp/in_dedup.tsv
[ -s "$Z" ] || { echo "Zoho file $Z missing/empty"; exit 1; }
[ -s "$IN" ] || { tail -n +2 verdicts_master.tsv | awk -F'\t' '$12=="IN"' > "$IN"; }

awk -F'\t' -v OFS='\t' '
function norm(s){ s=tolower(s);
  gsub(/[^a-z0-9 ]/," ",s);
  gsub(/(^| )(co|ltd|llc|wll|w l l|company|companies|corporation|corp|group|holding|holdings|est|trading|international|inc|jsc|plc|the|for)( |$)/," ",s);
  gsub(/(^| )(ksa|qatar|kuwait|saudi|arabia|arabian)( |$)/," ",s);
  gsub(/  +/," ",s); gsub(/^ +| +$/,"",s); return s }
function dom(s){ s=tolower(s); gsub(/https?:\/\//,"",s); gsub(/^www\./,"",s); sub(/\/.*/,"",s); return s }
# pass 1: Zoho existing
NR==FNR{
  if(FNR==1) next;
  zid=$1; znm=$2; zw=dom($3); zc=dom($4); nn=norm(znm);
  if(nn!=""){ zdup[nn]++; if(!(nn in zname)) zname[nn]=zid"\t"znm }
  if(zw!="" && zw!~/google\.com|facebook\.com|linkedin\.com/) zwww[zw]=zid"\t"znm;
  if(zc!="" && zc!~/google\.com/) zwww[zc]=zid"\t"znm;
  next
}
# pass 2: IN candidates (no header)
{
  cnm=$2; cdom=dom($3); nn=norm(cnm); status="CREATE"; zid=""; zn="";
  if(cdom!="" && (cdom in zwww)){ split(zwww[cdom],A,"\t"); status="ENRICH_domain"; zid=A[1]; zn=A[2] }
  else if(nn!="" && (nn in zname)){ split(zname[nn],A,"\t"); status="ENRICH_name"; zid=A[1]; zn=A[2] }
  print $1,cnm,$3,$13,$15,status,zid,zn
}
' "$Z" "$IN" > reconciliation_in.tsv

echo "IN candidates reconciled: $(wc -l < reconciliation_in.tsv)"
echo "--- status split ---"; cut -f6 reconciliation_in.tsv | sort | uniq -c | sort -rn
echo "--- Zoho internal duplicate name-clusters (existing mess) ---"
awk -F'\t' 'NR>1{n=tolower($2); gsub(/[^a-z0-9 ]/," ",n); gsub(/  +/," ",n); gsub(/^ +| +$/,"",n); if(n!="")c[n]++} END{for(k in c) if(c[k]>1) print c[k]"  "k}' "$Z" | sort -rn | head -25