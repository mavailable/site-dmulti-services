// Content collections — schemas Astro Zod
// Miroir fidele de cms.config.ts et src/content/*.json
// Tous les champs sont .optional() par tolerance du CMS
// (le client peut sauvegarder un JSON partiel sans casser le build).

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ============================================================
// Singletons
// ============================================================

const siteInfo = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/site-info' }),
  schema: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    phoneFormatted: z.string().optional(),
    whatsapp: z.boolean().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    region: z.string().optional(),
    zones: z.array(z.string()).optional(),
    facebook: z.string().optional(),
    tagline: z.string().optional(),
  }),
});

const hero = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/hero' }),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    ctaPrimaryText: z.string().optional(),
    ctaPrimaryHref: z.string().optional(),
    ctaSecondaryText: z.string().optional(),
    ctaSecondaryHref: z.string().optional(),
    trustBadge: z.string().optional(),
    backgroundImage: z.string().optional(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/about' }),
  schema: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    founderName: z.string().optional(),
    founderTitle: z.string().optional(),
    founderImage: z.string().optional(),
    stats: z.array(z.object({
      value: z.string().optional(),
      label: z.string().optional(),
    })).optional(),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/contact' }),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    submitButtonText: z.string().optional(),
    successMessage: z.string().optional(),
    rgpdText: z.string().optional(),
  }),
});

// ============================================================
// Singleton SEO (editable client via /admin#/seo)
// ============================================================

const seo = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/seo' }),
  schema: z.object({
    global: z.object({
      siteName: z.string().optional(),
      separator: z.string().optional(),
      defaultOgImage: z.string().optional(),
    }).optional(),
    pages: z.record(z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: z.string().optional(),
      noindex: z.boolean().optional(),
    })).optional(),
  }),
});

// ============================================================
// Collections
// ============================================================

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/services' }),
  schema: z.object({
    title: z.string().optional(),
    shortDesc: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    order: z.number().optional(),
    galleryFilter: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/testimonials' }),
  schema: z.object({
    author: z.string().optional(),
    location: z.string().optional(),
    service: z.string().optional(),
    content: z.string().optional(),
    rating: z.number().optional(),
    order: z.number().optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/faq' }),
  schema: z.object({
    question: z.string().optional(),
    answer: z.string().optional(),
    order: z.number().optional(),
  }),
});

// ============================================================
// Export
// ============================================================

export const collections = {
  'site-info': siteInfo,
  hero,
  about,
  contact,
  seo,
  services,
  testimonials,
  faq,
};
