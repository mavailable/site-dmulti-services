import fs from 'node:fs';
import path from 'node:path';

// Types basés sur les schemas Keystatic

export interface SiteInfo {
  name: string;
  phone: string;
  phoneFormatted: string;
  whatsapp: boolean;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  zones: string[];
  facebook: string;
  tagline: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  trustBadge: string;
  backgroundImage: string;
}

export interface About {
  title: string;
  content: string;
  founderName: string;
  founderTitle: string;
  founderImage: string;
  stats: Array<{ value: string; label: string }>;
}

export interface ContactSection {
  title: string;
  subtitle: string;
  submitButtonText: string;
  successMessage: string;
  rgpdText: string;
}

export interface Service {
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  image: string;
  order: number;
  galleryFilter?: string;
}

export interface Testimonial {
  author: string;
  location: string;
  service: string;
  content: string;
  rating: number;
  order: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  order: number;
}

// Helpers de lecture

function readJson<T>(filePath: string): T {
  const fullPath = path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as T;
}

function readCollection<T>(dirPath: string): (T & { _slug: string })[] {
  const fullDir = path.join(process.cwd(), dirPath);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({ _slug: f.replace('.json', ''), ...readJson<T>(path.join(dirPath, f)) }));
}

export function getSiteInfo(): SiteInfo {
  return readJson<SiteInfo>('src/content/site-info/index.json');
}

export function getHero(): Hero {
  return readJson<Hero>('src/content/hero/index.json');
}

export function getAbout(): About {
  return readJson<About>('src/content/about/index.json');
}

export function getContactSection(): ContactSection {
  return readJson<ContactSection>('src/content/contact/index.json');
}

export function getServices() {
  return readCollection<Service>('src/content/services')
    .sort((a, b) => a.order - b.order);
}

export function getTestimonials() {
  return readCollection<Testimonial>('src/content/testimonials')
    .sort((a, b) => a.order - b.order);
}

export function getFaq() {
  return readCollection<FaqItem>('src/content/faq')
    .sort((a, b) => a.order - b.order);
}
