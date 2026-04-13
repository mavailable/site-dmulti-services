# Rapport Webmasters — DMulti Services

**Date** : 2026-03-25
**Domaine** : https://dmultiservices.fr

---

## Google Search Console

| Élément | Statut |
|---------|--------|
| Propriété créée | ⏳ À faire (instructions fournies) |
| Vérification DNS | ⏳ À faire (enregistrement TXT via Cloudflare) |
| Sitemap soumis | ⏳ À faire après vérification (`sitemap-index.xml`) |
| Indexation demandée | ⏳ À faire (homepage + mentions-legales) |
| Pages indexées | — |
| Erreurs de crawl | — |

## Bing Webmaster Tools

| Élément | Statut |
|---------|--------|
| Site ajouté | ⏳ À faire (import depuis GSC recommandé) |
| Vérification | ⏳ À faire (méthode : import GSC) |
| Sitemap soumis | ⏳ À faire |
| IndexNow configuré | ✅ Clé déployée et vérifiée |
| URLs soumises via IndexNow | ✅ 3 URLs (HTTP 202) |

## Diagnostics

| Check | Résultat |
|-------|---------|
| robots.txt accessible | ✅ (bots IA autorisés : GPTBot, ClaudeBot, PerplexityBot, Amazonbot) |
| sitemap-index.xml valide | ✅ (3 URLs) |
| Toutes les URLs du sitemap en 200 | ✅ |
| Schema.org valide | ✅ 3 blocs JSON-LD (GeneralContractor, WebSite, FAQPage) |
| OG image accessible | ✅ (200) |
| Pas de meta noindex involontaire | ✅ (seuls /merci, /aide, /404 en noindex) |
| Canonical correct | ✅ |

## Corrections effectuées

- Aucune correction nécessaire — le site est techniquement prêt

## Fichiers ajoutés

- `public/92b249f1d01792e0e9c2e605d01f99b1.txt` — clé IndexNow
- `scripts/indexnow.sh` — script de soumission (à relancer après chaque déploiement avec nouveau contenu)

## Actions à suivre

- [ ] **GSC** : Créer la propriété domaine + vérification DNS TXT via Cloudflare
- [ ] **GSC** : Soumettre le sitemap (`sitemap-index.xml`)
- [ ] **GSC** : Demander l'indexation de la homepage + pages clés
- [ ] **Bing** : Importer depuis GSC (méthode la plus rapide)
- [ ] **Bing** : Soumettre le sitemap
- [ ] Vérifier l'indexation dans 3-5 jours (`site:dmultiservices.fr` dans Google)
- [ ] Relancer `./scripts/indexnow.sh` après prochain déploiement avec nouveau contenu
- [ ] Check mensuel GSC/Bing
- [ ] Valider Schema.org via https://search.google.com/test/rich-results

---

**IndexNow key** : `92b249f1d01792e0e9c2e605d01f99b1` (fichier : `public/92b249f1d01792e0e9c2e605d01f99b1.txt`)
