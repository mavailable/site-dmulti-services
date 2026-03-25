/**
 * Post-build script: generates dist/_headers with correct CSP script hashes.
 * Run after `astro build` to scan dist/ for inline scripts and compute SHA-256 hashes.
 * This ensures CSP script-src uses hashes instead of 'unsafe-inline'.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

const DIST_DIR = 'dist';

// --- 1. Collect all HTML files ---
function getHtmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...getHtmlFiles(full));
    } else if (entry.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

// --- 2. Extract inline script hashes (skip JSON-LD and scripts with src) ---
function extractInlineScriptHashes(htmlFiles) {
  const hashes = new Set();
  const scriptRegex = /<script(?:\s+type="module")?>([\s\S]*?)<\/script>/g;

  for (const file of htmlFiles) {
    const content = readFileSync(file, 'utf-8');
    let match;
    while ((match = scriptRegex.exec(content)) !== null) {
      const scriptContent = match[1].trim();
      if (!scriptContent) continue;
      const hash = createHash('sha256').update(scriptContent, 'utf-8').digest('base64');
      hashes.add(`'sha256-${hash}'`);
    }
  }
  return [...hashes].sort();
}

// --- 3. Generate _headers file ---
function generateHeaders(scriptHashes) {
  const hashList = scriptHashes.join(' ');
  return `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  X-XSS-Protection: 0
  Content-Security-Policy: default-src 'self'; script-src 'self' ${hashList}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.web3forms.com; frame-src 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com; frame-ancestors 'none'
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

/aide-70ee8bd4/*
  ! Content-Security-Policy
  ! X-Frame-Options
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cloud.umami.is; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://cloud.umami.is https://api-gateway.umami.dev; frame-src https://cloud.umami.is; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
`;
}

// --- Main ---
const htmlFiles = getHtmlFiles(DIST_DIR);
console.log(`🔒 Scanning ${htmlFiles.length} HTML files for inline scripts...`);

const hashes = extractInlineScriptHashes(htmlFiles);
console.log(`  → ${hashes.length} unique script hashes found`);
hashes.forEach(h => console.log(`    ${h}`));

const headersContent = generateHeaders(hashes);
writeFileSync(join(DIST_DIR, '_headers'), headersContent);
console.log('✓ dist/_headers written with CSP hashes (no unsafe-inline)');
