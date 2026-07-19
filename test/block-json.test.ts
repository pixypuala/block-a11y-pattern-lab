import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import disclosure from '../blocks/disclosure/block.json';
import tabs from '../blocks/tabs/block.json';
import menuButton from '../blocks/menu-button/block.json';
import dialog from '../blocks/dialog/block.json';

const blocksDir = resolve(dirname(fileURLToPath(import.meta.url)), '../blocks');

/**
 * A `file:./name.js` script handle names the file `wp-scripts` emits into
 * `build/`. Its TypeScript source lives beside the block.json under the same
 * base name. Resolving the source (rather than the built artifact) keeps this
 * assertion deterministic in CI, where the build has not necessarily run.
 */
function sourceExists(slug: string, handle: string): boolean {
  const base = handle.replace(/^file:\.\//, '').replace(/\.js$/, '');
  return ['tsx', 'ts'].some((ext) => existsSync(resolve(blocksDir, slug, `${base}.${ext}`)));
}

/**
 * The block.json wrappers register each pattern as a WordPress editor block.
 * A successful import already proves the file is valid JSON (a malformed file
 * throws on import); these assertions prove the metadata carries the keys the
 * WordPress block registry requires.
 */
const blocks: ReadonlyArray<readonly [string, Record<string, unknown>]> = [
  ['disclosure', disclosure],
  ['tabs', tabs],
  ['menu-button', menuButton],
  ['dialog', dialog],
];

describe('block.json metadata', () => {
  it.each(blocks)('%s carries the required WordPress block keys', (_slug, meta) => {
    // apiVersion must be a positive integer (the block API contract version).
    expect(typeof meta.apiVersion).toBe('number');
    expect(meta.apiVersion as number).toBeGreaterThan(0);

    // name is a `namespace/slug` pair of lowercase, dash-separated segments.
    expect(meta.name).toMatch(/^[a-z][a-z0-9-]*\/[a-z][a-z0-9-]*$/);

    // Human-facing title and editor category must be non-empty strings.
    expect(typeof meta.title).toBe('string');
    expect((meta.title as string).length).toBeGreaterThan(0);
    expect(typeof meta.category).toBe('string');
    expect((meta.category as string).length).toBeGreaterThan(0);

    // Script handles: a `file:` reference the block loader resolves.
    expect(meta.editorScript).toMatch(/^file:\.\//);
    expect(meta.viewScript).toMatch(/^file:\.\//);

    // Pinned schema keeps the metadata validatable against the WordPress schema.
    expect(meta.$schema).toBe('https://schemas.wp.org/trunk/block.json');
  });

  it.each(blocks)('%s editor and view handles resolve to block source', (slug, meta) => {
    // Each `file:` handle must have a real TypeScript source that the build
    // compiles into the referenced artifact — no dangling script references.
    expect(sourceExists(slug, meta.editorScript as string)).toBe(true);
    expect(sourceExists(slug, meta.viewScript as string)).toBe(true);
  });

  it.each(blocks)('%s declares editable attributes with defaults', (_slug, meta) => {
    // The editor/save components read these attributes; each must carry a
    // string type and a concrete default so a freshly inserted block renders.
    const attributes = meta.attributes as Record<string, { type?: string; default?: unknown }>;
    expect(attributes).toBeTypeOf('object');
    const entries = Object.entries(attributes);
    expect(entries.length).toBeGreaterThan(0);
    for (const [, schema] of entries) {
      expect(schema.type).toBe('string');
      expect(typeof schema.default).toBe('string');
    }
  });

  it('registers a unique namespaced name per block', () => {
    const names = blocks.map(([, meta]) => meta.name as string);
    expect(new Set(names).size).toBe(names.length);
  });
});
