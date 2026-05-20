#!/usr/bin/env node
//
// Writes a static <route>/index.html for each entry in og-routes.js AND for
// each post in src/posts.json, with the social-share meta tags swapped. Runs
// after `npm run build` and before the build/ directory is copied into docs/
// for GitHub Pages deploy.
//
// Per-post overrides are auto-generated from posts.json (title → og:title,
// summary → og:description, imgFileName → og:image). To override the auto-
// generated entry for a specific post, add an entry keyed by its route in
// og-routes.js — manual overrides take precedence.

const fs = require('fs');
const path = require('path');

const POSTS = require('../src/posts.json');
const MANUAL_ROUTES = require('../og-routes.js');
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const SITE_URL = 'https://www.dougissi.com';

const indexPath = path.join(BUILD_DIR, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('build/index.html not found — run `npm run build` first');
  process.exit(1);
}
const baseHtml = fs.readFileSync(indexPath, 'utf8');

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function rewriteMetaContent(html, property, newContent) {
  const propFirst = new RegExp(
    `(<meta[^>]*?property=["']${property}["'][^>]*?content=["'])[^"']*(["'])`
  );
  if (propFirst.test(html)) {
    return html.replace(propFirst, `$1${escapeAttr(newContent)}$2`);
  }
  const contentFirst = new RegExp(
    `(<meta[^>]*?content=["'])[^"']*(["'][^>]*?property=["']${property}["'])`
  );
  if (contentFirst.test(html)) {
    return html.replace(contentFirst, `$1${escapeAttr(newContent)}$2`);
  }
  return html;
}

function removeMetaTag(html, property) {
  const re = new RegExp(`\\s*<meta[^>]*?property=["']${property}["'][^>]*?/?>`);
  return html.replace(re, '');
}

function rewriteTitle(html, newTitle) {
  return html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeAttr(newTitle)}</title>`
  );
}

function buildHtmlForRoute(route, override) {
  let html = baseHtml;
  html = rewriteMetaContent(html, 'og:url', SITE_URL + route);

  if (override.title) {
    html = rewriteTitle(html, override.title);
    html = rewriteMetaContent(html, 'og:title', override.title);
  }
  if (override.description) {
    html = rewriteMetaContent(html, 'og:description', override.description);
  }
  if (override.image === null) {
    html = removeMetaTag(html, 'og:image:url');
  } else if (override.image) {
    const absImage = override.image.startsWith('http')
      ? override.image
      : SITE_URL + override.image;
    html = rewriteMetaContent(html, 'og:image:url', absImage);
  }
  return html;
}

// Auto-generate overrides for every post in posts.json.
// Route is derived from mdFileName: '2025-03-24-party-split.md' → '/party-split'
const autoRoutes = {};
for (const post of POSTS) {
  const path = post.mdFileName.slice(11, -3);
  autoRoutes[`/${path}`] = {
    title: post.title,
    description: post.summary,
    image: post.imgFileName,
  };
}

// Manual entries in og-routes.js take precedence over auto-generated ones.
const ROUTES = { ...autoRoutes, ...MANUAL_ROUTES };

let count = 0;
for (const [route, override] of Object.entries(ROUTES)) {
  if (!route.startsWith('/')) {
    console.error(`og-routes.js: route ${JSON.stringify(route)} must start with '/'`);
    process.exit(1);
  }
  const html = buildHtmlForRoute(route, override);
  const outDir = path.join(BUILD_DIR, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  count++;
}
console.log(`Generated ${count} per-route HTML file(s) (${Object.keys(autoRoutes).length} auto from posts.json + ${Object.keys(MANUAL_ROUTES).length} manual from og-routes.js).`);
