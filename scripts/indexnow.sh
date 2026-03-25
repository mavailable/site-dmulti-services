#!/bin/bash
# scripts/indexnow.sh — Soumettre toutes les pages du sitemap via IndexNow
# Usage : ./scripts/indexnow.sh

DOMAIN="dmultiservices.fr"
KEY="92b249f1d01792e0e9c2e605d01f99b1"

# Extraire les URLs des sous-sitemaps
URLS=$(curl -s "https://$DOMAIN/sitemap-index.xml" \
  | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g' \
  | while read sitemap_url; do
      curl -s "$sitemap_url" | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g'
    done)

# Construire le JSON array
URL_JSON=$(echo "$URLS" | jq -R -s 'split("\n") | map(select(length > 0))')

echo "Soumission de $(echo "$URLS" | grep -c '.') URLs via IndexNow..."

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"$DOMAIN\",
    \"key\": \"$KEY\",
    \"keyLocation\": \"https://$DOMAIN/$KEY.txt\",
    \"urlList\": $URL_JSON
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ]; then
  echo "OK (HTTP $HTTP_CODE) — URLs soumises avec succès"
else
  echo "ERREUR (HTTP $HTTP_CODE) : $BODY"
fi
