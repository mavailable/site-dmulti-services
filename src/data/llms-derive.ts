// Sections DERIVEES des fichiers llms (llms.txt, llms-full.txt), lues au build.
//
// Doctrine wf-04 §9 (decision Marc 28/09/2026, handoffs #195 / #199) : ces deux
// fichiers etaient statiques dans public/, ecrits une fois a la livraison. Ils
// ont derive du site (audit parc du 17/08 : 12 sites sur 13 perimes). Tout ce
// qui existe dans src/content/ (pages, coordonnees, services, FAQ) est donc lu
// ici a chaque build ; seul le texte editorial vit dans llms-preamble.ts.
// Aucune valeur du contenu ne doit etre recopiee dans ce fichier.

import seo from '../content/seo/index.json';
import { domain } from './business';

const SITE = domain.url.replace(/\/$/, '');

/** URL canonique : slash final (trailingSlash 'always'), jamais une URL qui redirige. */
export function url(path: string): string {
  const [p, hash = ''] = path.split('#');
  const clean = p.replace(/^\/+|\/+$/g, '');
  return `${SITE}/${clean ? `${clean}/` : ''}${hash ? `#${hash}` : ''}`;
}

/** Texte brut sur une ligne : HTML retire, pas de tiret cadratin. */
export function plain(s: string | undefined): string {
  return (s ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s*—\s*/g, ', ')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/** Resume coupe sur un mot entier. */
export function oneLine(s: string | undefined, max = 200): string {
  const c = plain(s).replace(/\s+/g, ' ');
  return c.length <= max ? c : `${c.slice(0, max).replace(/\s+\S*$/, '')}...`;
}

/** Libelle court d'une page : le titre SEO sans le nom du site. */
function label(title: string): string {
  return title.split(/\s+[—|·]\s+/)[0].trim();
}

const EXCLUS = /^\/(404|merci|admin|aide|depot|private)(\/|$)/;

/** Pages publiques du site : registre SEO (src/content/seo), hors noindex et exclusions. */
export function pagesPrincipales(): string {
  const pages = (seo as { pages: Record<string, { title: string; description: string; noindex?: boolean }> }).pages;
  return Object.entries(pages)
    .filter(([path, p]) => !p.noindex && !EXCLUS.test(path))
    .map(([path, p]) => `- [${path === '/' ? 'Accueil' : plain(label(p.title))}](${url(path)}): ${oneLine(p.description)}`)
    .join('\n');
}
