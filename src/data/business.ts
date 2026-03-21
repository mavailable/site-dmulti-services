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
