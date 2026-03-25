import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'cloud' },
  cloud: { project: 'dmulti-services/site-dmulti-services' },

  singletons: {
    siteInfo: singleton({
      label: 'Informations générales',
      path: 'src/content/site-info/index',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Nom commercial' }),
        phone: fields.text({ label: 'Téléphone (format international)', description: '+33608465747' }),
        phoneFormatted: fields.text({ label: 'Téléphone (format affiché)', description: '06 08 46 57 47' }),
        whatsapp: fields.checkbox({ label: 'Disponible sur WhatsApp', defaultValue: true }),
        email: fields.text({ label: 'Email de contact' }),
        address: fields.text({ label: 'Adresse' }),
        city: fields.text({ label: 'Ville' }),
        postalCode: fields.text({ label: 'Code postal' }),
        region: fields.text({ label: 'Région' }),
        zones: fields.array(fields.text({ label: 'Zone' }), { label: "Zones d'intervention", itemLabel: (props) => props.fields.value.value }),
        facebook: fields.url({ label: 'URL Facebook' }),
        tagline: fields.text({ label: 'Tagline (réassurance CTA)', description: 'Devis gratuit · Réponse rapide · 30 ans d\'expérience' }),
      },
    }),

    hero: singleton({
      label: 'Section Hero',
      path: 'src/content/hero/index',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Titre H1' }),
        subtitle: fields.text({ label: 'Sous-titre', multiline: true }),
        ctaPrimaryText: fields.text({ label: 'Texte bouton principal' }),
        ctaPrimaryHref: fields.text({ label: 'Lien bouton principal' }),
        ctaSecondaryText: fields.text({ label: 'Texte bouton secondaire' }),
        ctaSecondaryHref: fields.text({ label: 'Lien bouton secondaire' }),
        trustBadge: fields.text({ label: 'Badge confiance (sous les CTAs)' }),
        backgroundImage: fields.text({ label: 'Image de fond (chemin)', description: '/images/hero-bg.jpg' }),
      },
    }),

    about: singleton({
      label: 'Section À Propos',
      path: 'src/content/about/index',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Titre de la section' }),
        content: fields.text({ label: 'Texte principal', multiline: true }),
        founderName: fields.text({ label: 'Prénom du dirigeant' }),
        founderTitle: fields.text({ label: 'Titre/rôle' }),
        founderImage: fields.text({ label: 'Photo du dirigeant (chemin)' }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Valeur (ex: 30 ans)' }),
            label: fields.text({ label: 'Label (ex: d\'expérience)' }),
          }),
          { label: 'Chiffres clés', itemLabel: (props) => props.fields.value.value }
        ),
      },
    }),

    contact: singleton({
      label: 'Section Contact',
      path: 'src/content/contact/index',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Titre de la section' }),
        subtitle: fields.text({ label: 'Sous-titre' }),
        submitButtonText: fields.text({ label: 'Texte du bouton envoyer' }),
        successMessage: fields.text({ label: 'Message de confirmation', multiline: true }),
        rgpdText: fields.text({ label: 'Texte RGPD', multiline: true }),
      },
    }),
  },

  collections: {
    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Titre du service' } }),
        shortDesc: fields.text({ label: 'Description courte (2-3 phrases)', multiline: true }),
        description: fields.text({ label: 'Description complète', multiline: true }),
        icon: fields.text({ label: 'Icône (emoji ou nom)', description: 'Ex: 🪵 ou wrench' }),
        image: fields.text({ label: 'Image (chemin)', description: '/images/services/cuisine.jpg' }),
        order: fields.integer({ label: 'Ordre d\'affichage', defaultValue: 0 }),
      },
    }),

    testimonials: collection({
      label: 'Témoignages',
      slugField: 'author',
      path: 'src/content/testimonials/*',
      format: { data: 'json' },
      schema: {
        author: fields.slug({ name: { label: 'Prénom et initiale' } }),
        location: fields.text({ label: 'Ville' }),
        service: fields.text({ label: 'Type de prestation' }),
        content: fields.text({ label: 'Témoignage', multiline: true }),
        rating: fields.integer({ label: 'Note /5', defaultValue: 5 }),
        order: fields.integer({ label: 'Ordre', defaultValue: 0 }),
      },
    }),

    faq: collection({
      label: 'FAQ',
      slugField: 'question',
      path: 'src/content/faq/*',
      format: { data: 'json' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.text({ label: 'Réponse', multiline: true }),
        order: fields.integer({ label: 'Ordre', defaultValue: 0 }),
      },
    }),
  },
});
