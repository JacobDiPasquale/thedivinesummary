/**
 * One-time HTML extraction script.
 *
 * Reads inferno.html, purgatorio.html, paradiso.html and writes the three
 * typed TypeScript data files to /data/.
 *
 * Run inside Docker:
 *   docker compose run --rm dev node scripts/extract-html.mjs
 *
 * Review the output files before committing.
 */

import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'node-html-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Ordinal words for numbers 1–34 */
const ORDINALS = [
  '', 'One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
  'Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen',
  'Eighteen','Nineteen','Twenty','Twenty-One','Twenty-Two','Twenty-Three',
  'Twenty-Four','Twenty-Five','Twenty-Six','Twenty-Seven','Twenty-Eight',
  'Twenty-Nine','Thirty','Thirty-One','Thirty-Two','Thirty-Three','Thirty-Four',
];

/** Arabic number → Roman numeral (1–34) */
function toRoman(n) {
  const vals = [10,9,5,4,1];
  const syms = ['X','IX','V','IV','I'];
  let result = '';
  for (let i = 0; i < vals.length; i++) {
    while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
  }
  return result;
}

/**
 * Extract the inner HTML of an element, trimmed.
 * Preserves <em> and <strong> tags; strips everything else.
 */
function innerText(el) {
  if (!el) return '';
  return el.innerHTML
    .replace(/\s+/g, ' ')
    .trim();
}

/** Get the plain text of an element (strips all HTML tags). */
function textContent(el) {
  if (!el) return '';
  return el.text.replace(/\s+/g, ' ').trim();
}

/**
 * Extract paragraph strings from a canto-body element.
 * Each <p> becomes one string; HTML for <em>/<strong> is preserved.
 * The .characters div is excluded.
 */
function extractBody(cantoBodyEl) {
  return cantoBodyEl
    .querySelectorAll('p')
    .map(p => p.innerHTML.replace(/\s+/g, ' ').trim())
    .filter(s => s.length > 0);
}

/** Extract characters text from a canto-body element. */
function extractCharacters(cantoBodyEl) {
  const box = cantoBodyEl.querySelector('.characters');
  if (!box) return '';
  const span = box.querySelector('span');
  return span ? textContent(span) : '';
}

/**
 * Parse a single .canto element into a Canto object.
 * `number` must be provided since the HTML encodes the numeral, not the arabic number.
 */
function parseCanto(cantoEl, number, sectionId) {
  const header = cantoEl.querySelector('.canto-header');
  const body = cantoEl.querySelector('.canto-body');

  const numeralEl = header?.querySelector('.canto-number');
  const labelEl   = header?.querySelector('.canto-label');
  const titleEl   = header?.querySelector('.canto-title');
  const hookEl    = header?.querySelector('.canto-hook');

  return {
    number,
    numeralRoman: numeralEl ? textContent(numeralEl) : toRoman(number),
    ordinalLabel: `Canto ${ORDINALS[number] ?? number}`,
    slug: `canto-${number}`,
    title: titleEl ? textContent(titleEl) : '',
    hook: hookEl ? textContent(hookEl) : '',
    body: body ? extractBody(body) : [],
    characters: body ? extractCharacters(body) : '',
    sectionId,
  };
}

// ─── Section parsers ──────────────────────────────────────────────────────────

/**
 * Parse a 'part' section header (part-header div).
 */
function parsePartHeader(el) {
  const badge = textContent(el.querySelector('.part-number'));
  const title = textContent(el.querySelector('.part-title'));
  const cantoRange = textContent(el.querySelector('.part-cantos'));
  const intro = textContent(el.querySelector('.part-intro'));
  return { variant: 'part', badge, title, subtitle: '', cantoRange, intro };
}

/**
 * Parse a 'circle' section header (circle-section div).
 */
function parseCircleHeader(el) {
  const badge    = textContent(el.querySelector('.circle-badge'));
  const title    = textContent(el.querySelector('.circle-title'));
  const subtitle = textContent(el.querySelector('.circle-sin'));
  return { variant: 'circle', badge, title, subtitle };
}

/**
 * Parse a 'terrace' section header (terrace-section div).
 */
function parseTerraceHeader(el) {
  const badge    = textContent(el.querySelector('.terrace-badge'));
  const title    = textContent(el.querySelector('.terrace-title'));
  const subtitle = textContent(el.querySelector('.terrace-sin'));
  return { variant: 'terrace', badge, title, subtitle };
}

/**
 * Parse a 'heaven' section header (heaven-section div).
 */
function parseHeavenHeader(el) {
  const badge    = textContent(el.querySelector('.heaven-badge'));
  const title    = textContent(el.querySelector('.heaven-title'));
  const subtitle = textContent(el.querySelector('.heaven-sub'));
  return { variant: 'heaven', badge, title, subtitle };
}

// ─── Canticle extractors ──────────────────────────────────────────────────────

/**
 * Extract sections from Inferno HTML.
 *
 * Structure: each <section id="..."> contains either .part-header or
 * .circle-section, followed by .canto divs.
 */
function extractInferno(root) {
  const sections = [];
  let cantoCounter = 0;

  for (const section of root.querySelectorAll('main > section')) {
    const id = section.getAttribute('id') || '';
    const navLabel = inferNavLabel(id, 'inferno');

    // Determine header type
    const partEl    = section.querySelector('.part-header');
    const circleEl  = section.querySelector('.circle-section');

    let header;
    if (partEl) {
      header = parsePartHeader(partEl);
    } else if (circleEl) {
      header = parseCircleHeader(circleEl);
    } else {
      console.warn(`[inferno] Unknown header type in section#${id}`);
      header = { variant: 'part', badge: id, title: '', subtitle: '' };
    }

    const cantos = section.querySelectorAll('.canto').map(el => {
      cantoCounter++;
      return parseCanto(el, cantoCounter, id);
    });

    sections.push({ id, navLabel, header, cantos });
  }

  return sections;
}

/**
 * Extract sections from Purgatorio HTML.
 *
 * Two structural forms:
 * 1. <section id="ante"> and <section id="paradise"> — straightforward
 * 2. Anonymous <section> containing a part-header + multiple terrace-sections
 *    with interleaved canto cards — split into one part section + N terrace sections
 */
function extractPurgatorio(root) {
  const sections = [];
  let cantoCounter = 0;

  for (const section of root.querySelectorAll('main > section')) {
    const sectionId = section.getAttribute('id');

    if (sectionId) {
      // Named section: straightforward
      const partEl = section.querySelector('.part-header');
      const header = partEl ? parsePartHeader(partEl) : { variant: 'part', badge: sectionId, title: '', subtitle: '' };
      const navLabel = sectionId === 'ante' ? 'Ante-Purgatory'
                     : sectionId === 'paradise' ? 'Earthly Paradise'
                     : sectionId;

      const cantos = section.querySelectorAll('.canto').map(el => {
        cantoCounter++;
        return parseCanto(el, cantoCounter, sectionId);
      });

      sections.push({ id: sectionId, navLabel, header, cantos });
    } else {
      // Anonymous section: contains part-header + terrace-sections + cantos interleaved
      // Walk children linearly, splitting at each terrace-section boundary
      const children = section.childNodes.filter(n => n.nodeType === 1); // element nodes only

      let currentTerraceId = null;
      let currentTerraceEl = null;
      let currentCantos = [];

      // First child should be the part-header (e.g. "Part Two: The Seven Terraces")
      // We emit it as its own section, then emit each terrace as a section
      let partHeaderEmitted = false;

      for (const child of children) {
        const cls = child.getAttribute?.('class') || '';
        const childId = child.getAttribute?.('id') || '';

        if (cls.includes('part-header')) {
          // The big part divider — emit a 'part' section with no cantos.
          // Use a stable id that doesn't conflict with terrace ids.
          const partHeader = parsePartHeader(child);
          const partId = 'seven-terraces';
          sections.push({
            id: partId,
            navLabel: textContent(child.querySelector('.part-title')) || partId,
            header: partHeader,
            cantos: [],
          });
          partHeaderEmitted = true;

        } else if (cls.includes('terrace-section')) {
          // Flush previous terrace section
          if (currentTerraceId !== null) {
            const header = parseTerraceHeader(currentTerraceEl);
            sections.push({
              id: currentTerraceId,
              navLabel: textContent(currentTerraceEl.querySelector('.terrace-title')),
              header,
              cantos: currentCantos,
            });
          }
          // Derive id from element attribute or from the terrace title
          const titleText = textContent(child.querySelector('.terrace-title')) || '';
          const derivedId = titleText.toLowerCase().replace(/[^a-z]/g, '') || childId || 'terrace';
          currentTerraceId = childId || derivedId;
          currentTerraceEl = child;
          currentCantos = [];
          partHeaderEmitted = false;

        } else if (cls.includes('canto')) {
          if (currentTerraceId !== null) {
            cantoCounter++;
            currentCantos.push(parseCanto(child, cantoCounter, currentTerraceId));
          }
        }
      }

      // Flush the last terrace section
      if (currentTerraceId !== null) {
        const header = parseTerraceHeader(currentTerraceEl);
        sections.push({
          id: currentTerraceId,
          navLabel: textContent(currentTerraceEl.querySelector('.terrace-title')),
          header,
          cantos: currentCantos,
        });
      }
    }
  }

  return sections;
}

/**
 * Extract sections from Paradiso HTML.
 *
 * Structure: each <section id="..."> contains either .part-header or
 * .heaven-section, followed by .canto divs.
 */
function extractParadiso(root) {
  const sections = [];
  let cantoCounter = 0;

  for (const section of root.querySelectorAll('main > section')) {
    const id = section.getAttribute('id') || '';
    const navLabel = inferNavLabel(id, 'paradiso');

    const partEl   = section.querySelector('.part-header');
    const heavenEl = section.querySelector('.heaven-section');

    let header;
    if (partEl) {
      header = parsePartHeader(partEl);
    } else if (heavenEl) {
      header = parseHeavenHeader(heavenEl);
    } else {
      console.warn(`[paradiso] Unknown header type in section#${id}`);
      header = { variant: 'part', badge: id, title: '', subtitle: '' };
    }

    const cantos = section.querySelectorAll('.canto').map(el => {
      cantoCounter++;
      return parseCanto(el, cantoCounter, id);
    });

    sections.push({ id, navLabel, header, cantos });
  }

  return sections;
}

/** Derive a short nav label from the section id and canticle. */
function inferNavLabel(id, canticle) {
  if (canticle === 'inferno') {
    const map = {
      prologue: 'Prologue', antehell: 'Ante-Hell',
      c1: 'Circle I', c2: 'Circle II', c3: 'Circle III',
      c4: 'Circle IV', c5: 'Circle V', c6: 'Circle VI',
      c7: 'Circle VII', c8: 'Malebolge', c9: 'Cocytus',
    };
    return map[id] || id;
  }
  if (canticle === 'paradiso') {
    const map = {
      intro: 'Introduction', moon: 'Moon', mercury: 'Mercury',
      venus: 'Venus', sun: 'Sun', mars: 'Mars', jupiter: 'Jupiter',
      saturn: 'Saturn', stars: 'Fixed Stars', primum: 'Primum Mobile',
      empyrean: 'Empyrean',
    };
    return map[id] || id;
  }
  return id;
}

// ─── Header extraction ────────────────────────────────────────────────────────

function extractPageMeta(root, canticleId) {
  const overlineEl = root.querySelector('header .overline');
  const titleEl    = root.querySelector('header h1');
  const subtitleEl = root.querySelector('header .subtitle');
  const epigraphEl = root.querySelector('header .epigraph, header blockquote.epigraph');

  let epigraphLines = [];
  let attribution = '';

  if (epigraphEl) {
    // The epigraph has text nodes separated by <br> and an attribution <span>
    const attrSpan = epigraphEl.querySelector('span');
    attribution = attrSpan ? textContent(attrSpan).replace(/^—\s*/, '') : '';

    // Remove the attribution span, replace <br> with sentinel, then split
    const html = epigraphEl.innerHTML
      .replace(/<span[^>]*>.*?<\/span>/s, '')
      .replace(/<br\s*\/?>/gi, '|||BR|||')
      .replace(/<[^>]+>/g, '')
      .replace(/[^\S\n]+/g, ' ');   // collapse horizontal whitespace only

    epigraphLines = html
      .split('|||BR|||')
      .map(l => l.replace(/\s+/g, ' ').trim())
      .filter(Boolean);
  }

  return {
    id: canticleId,
    title: titleEl ? textContent(titleEl) : '',
    subtitle: subtitleEl ? textContent(subtitleEl) : '',
    overline: overlineEl ? textContent(overlineEl) : '',
    epigraph: { lines: epigraphLines, attribution },
  };
}

// ─── TypeScript file writer ───────────────────────────────────────────────────

function toTSString(value, indent = 0) {
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);

  if (typeof value === 'string') {
    // Escape backticks and template literal delimiters
    const escaped = value
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');
    return `\`${escaped}\``;
  }

  if (typeof value === 'number') return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map(v => `${inner}${toTSString(v, indent + 1)}`).join(',\n');
    return `[\n${items},\n${pad}]`;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([k, v]) => `${inner}${k}: ${toTSString(v, indent + 1)}`)
      .join(',\n');
    return `{\n${entries},\n${pad}}`;
  }

  return String(value);
}

function writeDataFile(canticle, meta, sections) {
  const exportName = `${canticle.id}Data`;
  const data = { ...meta, sections };

  const ts = `import type { CanticleData } from './types';

export const ${exportName}: CanticleData = ${toTSString(data, 0)};
`;

  const outPath = join(ROOT, 'data', `${canticle.id}.ts`);
  writeFileSync(outPath, ts, 'utf-8');
  console.log(`✓ Wrote ${outPath}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function extractCanticle(filename, canticleId, extractor) {
  const html = readFileSync(join(ROOT, filename), 'utf-8');
  const root = parse(html, { comment: false });
  const meta = extractPageMeta(root, canticleId);
  const sections = extractor(root);

  const totalCantos = sections.reduce((sum, s) => sum + s.cantos.length, 0);
  console.log(`[${canticleId}] ${sections.length} sections, ${totalCantos} cantos`);

  // Validate: warn if any canto has empty body
  for (const section of sections) {
    for (const canto of section.cantos) {
      if (canto.body.length === 0) {
        console.warn(`  ⚠ ${canticleId} ${canto.numeralRoman} (${canto.slug}) has no body`);
      }
    }
  }

  return { meta, sections };
}

const inferno = extractCanticle('inferno.html', 'inferno', extractInferno);
writeDataFile(inferno.meta, inferno.meta, inferno.sections);

const purgatorio = extractCanticle('purgatorio.html', 'purgatorio', extractPurgatorio);
writeDataFile(purgatorio.meta, purgatorio.meta, purgatorio.sections);

const paradiso = extractCanticle('paradiso.html', 'paradiso', extractParadiso);
writeDataFile(paradiso.meta, paradiso.meta, paradiso.sections);

console.log('\nDone. Review the generated data files before committing.');
