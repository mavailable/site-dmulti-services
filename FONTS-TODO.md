# Polices à télécharger — DMulti Services

Les polices doivent être téléchargées manuellement et placées dans `public/fonts/`.

## Option A — Script automatique (recommandé)

Lance ce script depuis le dossier `site/` :

```bash
node scripts/download-fonts.js
```

## Option B — Téléchargement npm

```bash
npm install @fontsource/outfit @fontsource/inter
node -e "
const fs = require('fs');
const path = require('path');

const fontsDir = 'public/fonts';
fs.mkdirSync(fontsDir, { recursive: true });

const files = [
  ['@fontsource/outfit/files/outfit-latin-600-normal.woff2', 'outfit-600.woff2'],
  ['@fontsource/outfit/files/outfit-latin-700-normal.woff2', 'outfit-700.woff2'],
  ['@fontsource/outfit/files/outfit-latin-800-normal.woff2', 'outfit-800.woff2'],
  ['@fontsource/inter/files/inter-latin-400-normal.woff2', 'inter-400.woff2'],
  ['@fontsource/inter/files/inter-latin-500-normal.woff2', 'inter-500.woff2'],
  ['@fontsource/inter/files/inter-latin-600-normal.woff2', 'inter-600.woff2'],
];

for (const [src, dest] of files) {
  try {
    fs.copyFileSync(path.join('node_modules', src), path.join(fontsDir, dest));
    const size = fs.statSync(path.join(fontsDir, dest)).size;
    console.log('✅', dest, '-', (size/1024).toFixed(1), 'Ko');
  } catch(e) {
    console.log('❌', dest, e.message);
  }
}
"
```

## Fichiers attendus dans public/fonts/

| Fichier | Police | Poids |
|---------|--------|-------|
| outfit-600.woff2 | Outfit | Semi-bold (H2/H3) |
| outfit-700.woff2 | Outfit | Bold (H1) |
| outfit-800.woff2 | Outfit | Extra-bold (Hero) |
| inter-400.woff2 | Inter | Regular (corps) |
| inter-500.woff2 | Inter | Medium (emphasis) |
| inter-600.woff2 | Inter | Semi-bold (labels/CTA) |

Chaque fichier doit faire > 10 Ko pour être valide.
