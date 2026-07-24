#!/bin/bash
# Reconcile IN candidates against existing Zoho 3-country accounts.
# Match: exact domain -> exact normalized-name -> normalized-name containment (POSSIBLE_MATCH) -> CREATE.
cd /home/user/lead-gen/data/gulf-retail-icp
Z=zoho_3country_accounts.tsv
IN=/tmp/in_dedup.tsv
[ -s "$Z" ] || { echo "Zoho file $Z missing/empty"; exit 1; }
[ -s "$IN" ] || tail -n +2 verdicts_master.tsv | awk -F'\t' '$12=="IN"' > "$IN"

awk -F'\t' -v OFS='\t' '
function norm(s){ s=tolower(s);
  gsub(/[^a-z0-9 ]/," ",s);
  gsub(/(^| )(co|ltd|llc|wll|w l l|company|companies|corporation|corp|group|holding|holdings|est|trading|international|inc|jsc|plc|the|for)( |$)/," ",s);
  gsub(/(^| )(ksa|qatar|kuwait|saudi|arabia|arabian)( |$)/," ",s);
  gsub(/  +/," ",s); gsub(/^ +| +$/,"",s); return s }
function dom(s){ s=tolower(s); gsub(/https?:\/\//,"",s); gsub(/^www\./,"",s); sub(/\/.*/,"",s); return s }
NR==FNR{
  if(FNR==1) next;
  zid=$1; znm=$2; zw=dom($3); zc=dom($4); nn=norm(znm);
  if(nn!=""){ if(!(nn in zname)){ zname[nn]=zid"\t"znm; ZN[++zc_n]=nn } }
  if(zw!="" && zw!~/google\.com|facebook\.com|linkedin\.com/) zwww[zw]=zid"\t"znm;
  if(zc!="" && zc!~/google\.com/) zwww[zc]=zid"\t"znm;
  next
}
{
  cnm=$2; cdom=dom($3); nn=norm(cnm); status="CREATE"; zid=""; zn="";
  if(cdom!="" && (cdom in zwww)){ split(zwww[cdom],A,"\t"); status="ENRICH_domain"; zid=A[1]; zn=A[2] }
  else if(nn!="" && (nn in zname)){ split(zname[nn],A,"\t"); status="ENRICH_name"; zid=A[1]; zn=A[2] }
  else if(length(nn)>=7){
    ncw=split(nn,CW," "); cf=CW[1];
    for(i=1;i<=zc_n;i++){ z=ZN[i];
      if(index(z,nn)>0 || index(nn,z)>0){
        zw1=z; sub(/ .*/,"",zw1);
        shorter=(length(nn)<=length(z)?nn:z); sw=split(shorter,SS," ");
        if(zw1==cf && sw>=2){ split(zname[z],A,"\t"); status="POSSIBLE_MATCH"; zid=A[1]; zn=A[2]; break }
      }
    }
  }
  print $1,cnm,$3,$13,$15,status,zid,zn
}
' "$Z" "$IN" > reconciliation_in.tsv

echo "IN candidates reconciled: $(wc -l < reconciliation_in.tsv)"
echo "--- status split ---"; cut -f6 reconciliation_in.tsv | sort | uniq -c | sort -rn
echo "--- ENRICH+POSSIBLE by country ---"; awk -F'\t' '$6!="CREATE"{print $1}' reconciliation_in.tsv | sort | uniq -c
echo "--- sample POSSIBLE_MATCH (candidate  ->  Zoho) ---"; awk -F'\t' '$6=="POSSIBLE_MATCH"{print "  "$2"  ->  "$8}' reconciliation_in.tsv | head -25