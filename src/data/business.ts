/**
 * Technical business data — NOT editable via Keystatic CMS
 * For editable content (texts, services, FAQ...) → see src/content/ via Keystatic
 * For site info (name, phone, address...) → see src/content/site-info/index.json
 */

// Données légales (non éditables par le client)
export const legal = {
  rcs: '',         // À compléter
  tva: '',         // À compléter (si assujetti)
  siret: '511 436 545 00020',
} as const;

// Coordonnées GPS pour Schema.org (non éditables)
// ⚠️ À vérifier sur Google Maps avant mise en production
export const geo = {
  lat: 43.2284,    // Laslades (65350) — vérifié Google Maps
  lon: 0.1687,     // Laslades (65350) — vérifié Google Maps
} as const;

// Configuration du domaine
export const domain = {
  url: 'https://dmultiservices.fr',
  ogImage: 'https://dmultiservices.fr/images/og-image.jpg',
} as const;

// ============================================================
// Business metadata — fallbacks immuables (doctrine wf-00-cms §7, C1 SEO)
// ============================================================

export const business = {
  owner: 'David',
  foundingYear: 2009,
  schemaType: 'GeneralContractor',
} as const;

// ============================================================
// Data SEO technique (non editable par le client — doctrine wf-00-cms §7)
// Extrait de pages/index.astro pre-C1 pour centralisation dans schemas.ts.
// ============================================================

export const schemaData = {
  // Titre + description canoniques (hardcoded dans pages/index.astro pre-C1)
  defaultTitle: 'DMulti Services — Artisan Hautes-Pyrénées (65) et Gers (32)',
  defaultDescription:
    "Artisan multi-services à Laslades (65). Menuiserie, cuisine, terrasses bois, sols, peinture. 30 ans d'expérience. Devis gratuit. Tél. 06 08 46 57 47.",

  // areaServed
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Hautes-Pyrénées' },
    { '@type': 'AdministrativeArea', name: 'Gers' },
  ],

  // Region (le site-info contient city/postalCode mais pas region)
  addressRegion: 'Hautes-Pyrénées',

  priceRange: '€€',
  paymentAccepted: [] as string[],
} as const;

// Web3Forms API key — cascade: CMS content → env var → cle Marc (defaut agence)
const WEB3FORMS_DEFAULT = '9667fcf8-c7da-4b7a-8432-0ec25215c75e';
export const web3formsDefault = WEB3FORMS_DEFAULT;
export const web3formsKey = import.meta.env.WEB3FORMS_KEY || WEB3FORMS_DEFAULT;
