/**
 * Schema.org helpers — doctrine C1 wf-00-cms §7 + schemas centralises.
 *
 * Specifique dmulti-services : GeneralContractor (David, artisan
 * multi-services Hautes-Pyrenees + Gers, 30 ans d'experience). Pattern
 * multi-pages avec schemas distribues :
 *  - pages/index.astro : GeneralContractor + WebSite
 *  - pages/mentions-legales.astro : BreadcrumbList
 *  - pages/politique-de-confidentialite.astro : BreadcrumbList
 *  - components/sections/FAQ.astro : FAQPage
 *
 * Tous les helpers sont sync (pas de getCollection, lecture via content.ts
 * custom du projet).
 *
 * aggregateRating OMIS : les testimonials n'ont pas de rating/source
 * structures. Doctrine C1 stricte. Reinjectable via business.rating.platform
 * si David a un GBP actif.
 */

import { business, legal, geo, domain, schemaData } from '@data/business';
import { getSiteInfo, getFaq } from '@data/content';

export interface Breadcrumb {
  name: string;
  url: string;
}

// ============================================================
// getGeneralContractorSchema — GeneralContractor (type depuis business.schemaType)
// ============================================================

export function getGeneralContractorSchema(): object {
  const siteInfo = getSiteInfo();

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': business.schemaType,
    name: siteInfo.name,
    image: domain.ogImage,
    logo: `${domain.url}/images/logo.webp`,
    description: schemaData.defaultDescription,
    url: domain.url,
    telephone: siteInfo.phone,
    email: siteInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteInfo.address,
      addressLocality: siteInfo.city,
      postalCode: siteInfo.postalCode,
      addressRegion: schemaData.addressRegion,
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.lat,
      longitude: geo.lon,
    },
    areaServed: schemaData.areaServed,
    foundingDate: String(business.foundingYear),
    priceRange: schemaData.priceRange,
    taxID: legal.siret,
  };

  // sameAs (filtre les valeurs falsy)
  const sameAs = [siteInfo.facebook].filter(Boolean);
  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  if (schemaData.paymentAccepted.length > 0) {
    schema.paymentAccepted = schemaData.paymentAccepted;
  }

  // aggregateRating OMIS (doctrine C1 — pas de source verifiable)

  return schema;
}

// ============================================================
// getWebsiteSchema — WebSite
// ============================================================

export function getWebsiteSchema(): object {
  const siteInfo = getSiteInfo();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteInfo.name,
    url: domain.url,
    description: schemaData.defaultDescription,
    inLanguage: 'fr-FR',
  };
}

// ============================================================
// getFAQPageSchema — FAQPage (sync, via getFaq helper)
// ============================================================

export function getFAQPageSchema(): object | null {
  const faqs = getFaq();
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================================
// getBreadcrumbSchema — BreadcrumbList (pur)
// Utilise par toutes les pages internes (mentions-legales, politique, etc.)
// ============================================================

export function getBreadcrumbSchema(items: Breadcrumb[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${domain.url}${item.url}`,
    })),
  };
}

// ============================================================
// getSpeakableSchema — Speakable WebPage (pur)
// ============================================================

export function getSpeakableSchema(
  title: string,
  description: string,
  url: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    inLanguage: 'fr-FR',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.intro-text', '.faq-answer'],
    },
  };
}
