#!/usr/bin/env node
/**
 * Script de téléchargement des polices Outfit et Inter
 * Usage: node scripts/download-fonts.js
 * Requires: npm install @fontsource/outfit @fontsource/inter (or run after npm install)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fontsDir = path.join(__dirname, '../public/fonts');
fs.mkdirSync(fontsDir, { recursive: true });

const files = [
  ['@fontsource/outfit/files/outfit-latin-600-normal.woff2', 'outfit-600.woff2'],
  ['@fontsource/outfit/files/outfit-latin-700-normal.woff2', 'outfit-700.woff2'],
  ['@fontsource/outfit/files/outfit-latin-800-normal.woff2', 'outfit-800.woff2'],
  ['@fontsource/inter/files/inter-latin-400-normal.woff2', 'inter-400.woff2'],
  ['@fontsource/inter/files/inter-latin-500-normal.woff2', 'inter-500.woff2'],
  ['@fontsource/inter/files/inter-latin-600-normal.woff2', 'inter-600.woff2'],
];

let ok = 0, fail = 0;

for (const [src, dest] of files) {
  const srcPath = path.join(__dirname, '../node_modules', src);
  const destPath = path.join(fontsDir, dest);
  try {
    fs.copyFileSync(srcPath, destPath);
    const size = fs.statSync(destPath).size;
    if (size < 10000) {
      console.log(`⚠️  ${dest} — ${(size/1024).toFixed(1)} Ko (trop petit !)`);
      fail++;
    } else {
      console.log(`✅ ${dest} — ${(size/1024).toFixed(1)} Ko`);
      ok++;
    }
  } catch (e) {
    console.log(`❌ ${dest} — ${e.message}`);
    fail++;
  }
}

console.log(`\n${ok} polices copiées, ${fail} erreurs.`);
if (fail > 0) {
  console.log('\nSi node_modules manque, lance d\'abord: npm install');
  process.exit(1);
}
