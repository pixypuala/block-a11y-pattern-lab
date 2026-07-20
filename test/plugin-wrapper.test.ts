import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { describe, it, expect } from 'vitest';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const plugin = readFileSync(resolve(repoRoot, 'block-a11y-pattern-lab.php'), 'utf8');

/**
 * The plugin file is what turns the compiled `build/` output into blocks a
 * running WordPress can insert. It is not covered by the TypeScript suite, so
 * these assertions pin the properties that make it safe to install: a complete
 * header, an ABSPATH guard, registration by directory discovery rather than by
 * an enumerated list, and no state left in the global scope.
 */
describe('WordPress plugin wrapper', () => {
  it.each([
    ['Plugin Name', /^\s*\*\s*Plugin Name:\s+\S/m],
    ['Description', /^\s*\*\s*Description:\s+\S/m],
    ['Version', /^\s*\*\s*Version:\s+\d+\.\d+\.\d+/m],
    ['Requires at least', /^\s*\*\s*Requires at least:\s+6\.5/m],
    ['Requires PHP', /^\s*\*\s*Requires PHP:\s+8\.1/m],
    ['License', /^\s*\*\s*License:\s+GPL-2\.0-or-later/m],
    ['Text Domain', /^\s*\*\s*Text Domain:\s+block-a11y-pattern-lab/m],
  ])('declares the %s header', (_field, pattern) => {
    expect(plugin).toMatch(pattern);
  });

  it('refuses to execute outside WordPress', () => {
    expect(plugin).toMatch(/if \(\s*!\s*defined\(\s*'ABSPATH'\s*\)\s*\)\s*\{\s*exit;/);
  });

  it('discovers block metadata instead of enumerating block names', () => {
    // A new directory under build/ must be registered without editing PHP, so
    // no individual block may be named in the executable body. The header
    // docblock is prose for the plugin listing and is excluded.
    const code = plugin.slice(plugin.indexOf('declare( strict_types=1 );'));
    for (const slug of readdirSync(resolve(repoRoot, 'blocks'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)) {
      expect(code).not.toContain(slug);
    }
    expect(code).toMatch(/glob\(\s*\$build_dir \. '\/\*\/block\.json'\s*\)/);
    expect(code).toContain('register_block_type(');
  });

  it('skips cleanly when the build output is absent', () => {
    // build/ is not committed, so a fresh checkout must not fatal.
    expect(plugin).toMatch(/if \(\s*!\s*is_dir\(\s*\$build_dir\s*\)\s*\)/);
    expect(plugin).toMatch(/_doing_it_wrong\(/);
  });

  it('leaks no variable into the global scope', () => {
    // Every assignment must sit inside the registration function's body.
    const body = plugin.slice(plugin.indexOf('function register_blocks'));
    const outside = plugin.slice(0, plugin.indexOf('function register_blocks'));
    expect(outside).not.toMatch(/^\$\w+\s*=/m);
    expect(body).toMatch(/\$build_dir\s*=/);
  });

  it('registers on the init hook', () => {
    expect(plugin).toMatch(/add_action\(\s*'init',\s*__NAMESPACE__ \. '\\\\register_blocks'\s*\)/);
  });
});
