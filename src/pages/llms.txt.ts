import { LLMS_HEAD } from '../data/llms-preamble';
import { pagesPrincipales, url, oneLine } from '../data/llms-derive';
import { getSiteInfo, getServices } from '../data/content';

// Derive au build : ne jamais recopier ici une valeur du contenu (cf. llms-derive.ts).
export async function GET() {
  const info = getSiteInfo();
  const services = getServices()
    .map((s) => `- [${s.title}](${url('/#services')}): ${oneLine(s.shortDesc)}`)
    .join('\n');

  const body = `${LLMS_HEAD}## Pages principales

${pagesPrincipales()}

## Services

${services}

## Informations clés

- Nom commercial : ${info.name}
- Téléphone${info.whatsapp ? ' et WhatsApp' : ''} : ${info.phoneFormatted}
- E-mail : ${info.email}
- Adresse : ${info.address}, ${info.postalCode} ${info.city}, ${info.region}
- Zone d'intervention : ${info.zones.join(', ')}
${info.facebook ? `- Facebook : ${info.facebook}\n` : ''}`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
