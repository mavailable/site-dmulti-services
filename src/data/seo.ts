/**
 * Helper SEO — lit src/content/seo/index.json via readJson
 * Priorite : seo.json > props BaseLayout (cf. wf-00-cms §7bis)
 */

import fs from 'node:fs';
import path from 'node:path';

export interface PageSeo {
  title: string;
  description: string;
  ogImage: string;
  noindex: boolean;
}

export interface SeoGlobal {
  siteName: string;
  separator: string;
  defaultOgImage: string;
}

let cache: any = null;

function loadSeoData(): any {
  if (cache) return cache;
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'seo', 'index.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    cache = JSON.parse(raw);
    return cache;
  } catch {
    return null;
  }
}

export function getPageSeo(routePath: string): PageSeo | null {
  const data = loadSeoData();
  if (!data?.pages) return null;

  const normalizedPath = routePath === '/' ? '/' : routePath.replace(/\/$/, '');
  const page = data.pages[normalizedPath];
  if (!page) return null;

  return {
    title: page.title ?? '',
    description: page.description ?? '',
    ogImage: page.ogImage ?? '',
    noindex: page.noindex ?? false,
  };
}

export function getSeoGlobal(): SeoGlobal | null {
  const data = loadSeoData();
  if (!data?.global) return null;

  return {
    siteName: data.global.siteName ?? '',
    separator: data.global.separator ?? '\u2014',
    defaultOgImage: data.global.defaultOgImage ?? '',
  };
}

export function buildTitle(pageTitle: string, global: SeoGlobal | null): string {
  if (!global || !global.siteName) return pageTitle;
  if (!pageTitle) return global.siteName;
  return `${pageTitle} ${global.separator} ${global.siteName}`;
}
