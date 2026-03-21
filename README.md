# DMulti Services — Site Web

Site web professionnel pour **DMulti Services**, artisan multi-services bâtiment à Laslades (Hautes-Pyrénées, 65).

**URL de production** : https://dmulti-services.fr  
**Hébergement** : Cloudflare Pages  
**CMS** : Keystatic (JSON files)

---

## Stack technique

- [Astro 5](https://astro.build) — site statique ultra-rapide
- [Tailwind CSS v4](https://tailwindcss.com) — design system
- [TypeScript](https://www.typescriptlang.org)
- [Keystatic](https://keystatic.com) — CMS headless (édition via JSON)
- [Web3Forms](https://web3forms.com) — formulaire de contact sans backend
- [Umami Analytics](https://umami.is) — analytics sans cookies, RGPD-exempt

---

## Démarrage rapide

```bash
# Installer les dépendances (copie aussi les polices dans public/fonts/)
npm install

# Développement
npm run dev

# Développement avec CMS Keystatic
npm run dev:cms

# Build de production
npm run build

# Preview du build
npm run preview
```

## Configuration

```bash
# Copier les variables d'environnement
cp .env.example .env
# Remplir WEB3FORMS_KEY avec la clé obtenue sur web3forms.com
```

## Structure du contenu

Le contenu éditable est dans `src/content/` (fichiers JSON) :

```
src/content/
├── site-info/index.json     # Nom, téléphone, adresse, réseaux
├── hero/index.json          # H1, sous-titre, CTA
├── about/index.json         # À Propos + statistiques
├── contact/index.json       # Textes formulaire de contact
├── services/                # 7 prestations
├── testimonials/            # 3 témoignages clients
└── faq/                     # 5 questions fréquentes
```

## Données non-éditables

Les données techniques (SIRET, GPS, domaine) sont dans `src/data/business.ts`.

## Ajouter les photos de David

1. Placer les photos dans `public/images/realisations/`
2. Mettre à jour `src/content/services/*.json` (champ `image`)
3. Remplacer les placeholders dans `Gallery.astro` et `About.astro`

---

*Site réalisé par [DMulti Agency](https://muller.im) — Pipeline Web Factory wf-01→wf-10*
