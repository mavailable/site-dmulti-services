import type { CmsConfig } from '@marc/cms-engine/types';

// ============================================================
// Configuration CMS — DMulti Services
// ============================================================
// Miroir fidele de src/content/*.json existants.
// Toute modification ici doit rester coherente avec :
//   - src/content.config.ts (schemas Astro Zod)
//   - src/data/content.ts (helpers lecture fs)
//   - src/content/*.json (donnees)
// ============================================================

const cmsConfig: CmsConfig = {
  repo: 'mavailable/site-dmulti-services',
  branch: 'dev',
  siteName: 'DMulti Services',
  // Pas de siteLogo : logo.webp est un lockup vertical (emblème doré + wordmark
  // empilés) en or métallique sur transparent — illisible/écrasé à 28px de haut et
  // faible contraste sur fond clair. Fallback texte siteName (règle wf-00-cms §5).

  // Branding admin — variante CLAIRE dérivée du theme actif (global.css : accent
  // Or, secondary Chêne, primary Ardoise ; fonts Outfit/Inter). Palette chaude
  // bois+or. Gate admin-theme-validate.py OK. Contrastes vérifiés WCAG :
  //   accent 5.93 / accentDeep sur accentSoft 7.43 / ink 15.74 / inkSoft 9.95 /
  //   muted 8.04 / muted2 5.98 sur blanc (muted3 4.18 WARN).
  adminTheme: {
    accent: '#8a5a00',        // or profond (boutons, liens, onglet actif)
    accentDeep: '#6e4700',    // or foncé (texte sur pastille accentSoft, badges)
    accentSoft: '#fff4cc',    // or très pâle (pastilles, boutons secondaires)
    accentBorder: '#ffe799',  // or clair (bordures accent)
    ink: '#371c0d',           // brun chêne encre (titres)
    inkSoft: '#66361e',       // brun chêne (labels)
    muted: '#7c4020',         // brun chêne tertiaire (paragraphes)
    muted2: '#9a4f1c',        // brun chêne clair (méta, contacts)
    muted3: '#bc6520',        // brun-orangé (hints, dates)
    line: '#f4d8b3',          // ligne chêne clair (bordures de cartes)
    lineSoft: '#faedda',      // séparateur crème chêne
    borderInput: '#ecbc84',   // bordure chêne des champs
    surface: '#ffffff',       // fond des cartes
    bg: '#fdf8f1',            // crème chêne (fond de l'espace)
    fontBody: "'Inter', system-ui, sans-serif",     // même corps que le site
    fontHeading: "'Outfit', system-ui, sans-serif", // même titrage que le site
  },

  // Modules du moteur montés dans /admin (AdminIsland les importe via le scaffold).
  // Aucun module actif sur ce site (cœur seul — vérité du cms.config).
  modules: [],

  site: {
    ownerName: 'David Merly',
    phone: '+33608465747',
    phoneDisplay: '06 08 46 57 47',
    email: 'dmms32@outlook.com',
    siteUrl: 'https://dmultiservices.fr',
    previewUrl: 'https://site-dmulti-services.pages.dev',
    clientType: 'entreprise-locale',
    tagline: 'Multiservices dans les Hautes-Pyrenees et le Gers',
    calUrl: 'https://cal.com/david-merly-p1fdkh/30min',
    umamiSiteId: '85ed707d-25f4-4f58-86bd-fdd101388fae',
    umamiShareUrl: 'https://cloud.umami.is/share/9qI3AFgfu0eXeNGp/dmultiservices.fr',
    contactMarc: {
      phone: '06 88 76 66 48',
      whatsapp: '33688766648',
      email: 'marc@muller.im',
    },
  },

  singletons: {
    'site-info': {
      label: 'Informations generales',
      description: 'Nom commercial, telephone, email, adresse, zones, reseaux sociaux',
      path: 'src/content/site-info/index.json',
      fields: {
        name: { type: 'text', label: 'Nom commercial' },
        phone: { type: 'text', label: 'Telephone (format international)', description: '+33608465747' },
        phoneFormatted: { type: 'text', label: 'Telephone (format affiche)', description: '06 08 46 57 47' },
        whatsapp: { type: 'select', label: 'Disponible sur WhatsApp', options: [{ label: 'Oui', value: 'true' }, { label: 'Non', value: 'false' }], defaultValue: 'true' },
        email: { type: 'text', label: 'Email de contact' },
        address: { type: 'text', label: 'Adresse (rue)' },
        city: { type: 'text', label: 'Ville' },
        postalCode: { type: 'text', label: 'Code postal' },
        region: { type: 'text', label: 'Region' },
        zones: {
          type: 'array',
          label: "Zones d'intervention",
          itemLabel: 'value',
          item: { type: 'text', label: 'Zone' },
        },
        facebook: { type: 'text', label: 'URL Facebook' },
        tagline: { type: 'text', label: 'Tagline (reassurance CTA)', description: 'Devis gratuit · Reponse rapide · 30 ans d\'experience' },
      },
    },

    hero: {
      label: "Section Hero (banniere d'accueil)",
      description: "Titre H1, sous-titre et boutons d'appel a l'action",
      path: 'src/content/hero/index.json',
      fields: {
        title: { type: 'text', label: 'Titre principal (H1)' },
        subtitle: { type: 'text', label: 'Sous-titre', multiline: true },
        ctaPrimaryText: { type: 'text', label: 'Bouton principal — texte' },
        ctaPrimaryHref: { type: 'text', label: 'Bouton principal — lien' },
        ctaSecondaryText: { type: 'text', label: 'Bouton secondaire — texte' },
        ctaSecondaryHref: { type: 'text', label: 'Bouton secondaire — lien' },
        trustBadge: { type: 'text', label: 'Badge confiance (sous les CTAs)' },
        backgroundImage: { type: 'image', label: 'Image de fond', description: '/images/hero-bg.jpg' },
      },
    },

    about: {
      label: 'Section A Propos',
      description: 'Texte de presentation, photo et chiffres cles',
      path: 'src/content/about/index.json',
      fields: {
        title: { type: 'text', label: 'Titre de la section' },
        content: { type: 'text', label: 'Texte principal', multiline: true },
        founderName: { type: 'text', label: 'Prenom du dirigeant' },
        founderTitle: { type: 'text', label: 'Titre / role' },
        founderImage: { type: 'image', label: 'Photo du dirigeant' },
        stats: {
          type: 'array',
          label: 'Chiffres cles',
          itemLabel: 'value',
          item: {
            type: 'object',
            label: 'Chiffre cle',
            fields: {
              value: { type: 'text', label: 'Valeur (ex: 30 ans)' },
              label: { type: 'text', label: "Label (ex: d'experience)" },
            },
          },
        },
      },
    },

    contact: {
      label: 'Section Contact',
      description: 'Titre, sous-titre et mention RGPD du formulaire',
      path: 'src/content/contact/index.json',
      fields: {
        title: { type: 'text', label: 'Titre de la section' },
        subtitle: { type: 'text', label: 'Sous-titre' },
        submitButtonText: { type: 'text', label: 'Texte du bouton envoyer' },
        successMessage: { type: 'text', label: 'Message de confirmation', multiline: true },
        web3formsKey: { type: 'text', label: 'Cle Web3Forms (formulaire)', description: 'Collez votre cle pour recevoir vos formulaires directement. Guide : marcm.fr/aide/web3forms' },
      },
    },

    seo: {
      label: 'SEO / Referencement',
      description: 'Nom du site et image de partage reseaux sociaux',
      path: 'src/content/seo/index.json',
      fields: {
        global: {
          type: 'object',
          label: 'Parametres globaux',
          fields: {
            siteName: { type: 'text', label: 'Nom du site (onglets navigateur)' },
            separator: { type: 'text', label: 'Separateur titre (ex: —)' },
            defaultOgImage: { type: 'image', label: 'Image de partage par defaut' },
          },
        },
      },
    },
  },

  collections: {
    services: {
      label: 'Services',
      description: 'Prestations proposees par DMulti Services',
      path: 'src/content/services',
      slugField: 'title',
      labelField: 'title',
      fields: {
        title: { type: 'text', label: 'Titre du service' },
        shortDesc: { type: 'text', label: 'Description courte (2-3 phrases)', multiline: true },
        description: { type: 'text', label: 'Description complete', multiline: true },
        icon: { type: 'text', label: 'Icone (emoji)', description: 'Ex: \ud83e\ude93 ou \ud83d\udd27' },
        image: { type: 'image', label: 'Image du service' },
        order: { type: 'number', label: "Ordre d'affichage", defaultValue: 0 },
        galleryFilter: { type: 'text', label: 'Filtre galerie (categorie photo)' },
      },
    },

    testimonials: {
      label: 'Temoignages',
      description: 'Avis et retours clients',
      path: 'src/content/testimonials',
      slugField: 'author',
      labelField: 'author',
      fields: {
        author: { type: 'text', label: 'Prenom et initiale' },
        location: { type: 'text', label: 'Ville' },
        service: { type: 'text', label: 'Type de prestation' },
        content: { type: 'text', label: 'Temoignage', multiline: true },
        rating: { type: 'number', label: 'Note /5', defaultValue: 5 },
        order: { type: 'number', label: 'Ordre', defaultValue: 0 },
      },
    },

    faq: {
      label: 'FAQ',
      description: 'Questions frequentes',
      path: 'src/content/faq',
      slugField: 'question',
      labelField: 'question',
      fields: {
        question: { type: 'text', label: 'Question' },
        answer: { type: 'text', label: 'Reponse', multiline: true },
        order: { type: 'number', label: 'Ordre', defaultValue: 0 },
      },
    },
  },
};

export default cmsConfig;
