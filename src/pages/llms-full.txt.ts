import { LLMS_FULL_HEAD, LLMS_FULL_TAIL } from '../data/llms-preamble';
import { pagesPrincipales, plain } from '../data/llms-derive';
import { getSiteInfo, getServices, getAbout, getFaq } from '../data/content';
import { domain, business } from '../data/business';

// Derive au build : ne jamais recopier ici une valeur du contenu (cf. llms-derive.ts).
export async function GET() {
  const info = getSiteInfo();
  const about = getAbout();
  const para = (s: string) => plain(s).split(/\n\s*\n/).map((x) => x.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n\n');

  const services = getServices().map((s) => `### ${s.title}\n\n${para(s.description)}`).join('\n\n');
  const faq = getFaq().map((f) => `### ${f.question}\n\n${para(f.answer)}`).join('\n\n');
  const chiffres = about.stats.map((s) => `- ${s.value} ${s.label}`).join('\n');

  const body = `${LLMS_FULL_HEAD}## Informations générales

- **Nom commercial** : ${info.name}
- **Dirigeant** : ${business.owner}, artisan unique
- **Adresse** : ${info.address}, ${info.postalCode} ${info.city}, ${info.region}
- **Téléphone${info.whatsapp ? ' et WhatsApp' : ''}** : ${info.phoneFormatted}
- **E-mail** : ${info.email}
${info.facebook ? `- **Facebook** : ${info.facebook}\n` : ''}- **Site web** : ${domain.url}/
- **À son compte depuis** : ${business.foundingYear}

## Pages

${pagesPrincipales()}

## Zone d'intervention

${info.zones.map((z) => `- ${z}`).join('\n')}

## À propos

${para(about.content)}

## Chiffres clés

${chiffres}

## Services

${services}

## FAQ

${faq}

${LLMS_FULL_TAIL}`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
