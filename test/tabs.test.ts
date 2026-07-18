import { describe, it, expect, beforeEach } from 'vitest';
import axe from 'axe-core';
import { createTabs } from '../src/tabs.js';

function mount(tabTag = 'button'): HTMLElement {
  document.body.innerHTML = `
    <main>
      <h1>Demo</h1>
      <div data-tabs>
        <div data-tabs-list aria-label="Sections">
          <${tabTag} data-tabs-tab>First</${tabTag}>
          <${tabTag} data-tabs-tab>Second</${tabTag}>
          <${tabTag} data-tabs-tab>Third</${tabTag}>
        </div>
        <div data-tabs-panel>First panel</div>
        <div data-tabs-panel>Second panel</div>
        <div data-tabs-panel>Third panel</div>
      </div>
    </main>`;
  return document.querySelector<HTMLElement>('[data-tabs]')!;
}

const tabs = () => Array.from(document.querySelectorAll<HTMLElement>('[data-tabs-tab]'));
const panels = () => Array.from(document.querySelectorAll<HTMLElement>('[data-tabs-panel]'));

function key(el: HTMLElement, k: string): void {
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
}

describe('createTabs', () => {
  beforeEach(() => mount());

  it('wires tablist/tab/tabpanel roles and relationships', () => {
    createTabs(mount());
    const [t0] = tabs();
    const [p0] = panels();
    expect(document.querySelector('[data-tabs-list]')!.getAttribute('role')).toBe('tablist');
    expect(t0!.getAttribute('role')).toBe('tab');
    expect(p0!.getAttribute('role')).toBe('tabpanel');
    expect(t0!.getAttribute('aria-controls')).toBe(p0!.id);
    expect(p0!.getAttribute('aria-labelledby')).toBe(t0!.id);
  });

  it('selects the first tab by default with roving tabindex', () => {
    createTabs(mount());
    const [t0, t1, t2] = tabs();
    expect(t0!.getAttribute('aria-selected')).toBe('true');
    expect(t0!.getAttribute('tabindex')).toBe('0');
    expect(t1!.getAttribute('tabindex')).toBe('-1');
    expect(t2!.getAttribute('aria-selected')).toBe('false');
    expect(panels()[0]!.hidden).toBe(false);
    expect(panels()[1]!.hidden).toBe(true);
  });

  it('can start on a given tab', () => {
    createTabs(mount(), { selected: 1 });
    expect(tabs()[1]!.getAttribute('aria-selected')).toBe('true');
    expect(panels()[1]!.hidden).toBe(false);
  });

  it('selects on click', () => {
    createTabs(mount());
    tabs()[2]!.click();
    expect(tabs()[2]!.getAttribute('aria-selected')).toBe('true');
    expect(panels()[2]!.hidden).toBe(false);
    expect(panels()[0]!.hidden).toBe(true);
  });

  it('ArrowRight/ArrowLeft move selection and wrap', () => {
    createTabs(mount());
    key(tabs()[0]!, 'ArrowRight');
    expect(tabs()[1]!.getAttribute('aria-selected')).toBe('true');
    key(tabs()[1]!, 'ArrowLeft');
    expect(tabs()[0]!.getAttribute('aria-selected')).toBe('true');
    key(tabs()[0]!, 'ArrowLeft');
    expect(tabs()[2]!.getAttribute('aria-selected')).toBe('true');
    key(tabs()[2]!, 'ArrowRight');
    expect(tabs()[0]!.getAttribute('aria-selected')).toBe('true');
  });

  it('Home/End jump to first and last tab', () => {
    createTabs(mount());
    key(tabs()[0]!, 'End');
    expect(tabs()[2]!.getAttribute('aria-selected')).toBe('true');
    key(tabs()[2]!, 'Home');
    expect(tabs()[0]!.getAttribute('aria-selected')).toBe('true');
  });

  it('select() API clamps out-of-range indices', () => {
    const t = createTabs(mount());
    t.select(99);
    expect(t.selected).toBe(2);
    t.select(-5);
    expect(t.selected).toBe(0);
  });

  it('destroy removes listeners', () => {
    const t = createTabs(mount());
    t.destroy();
    tabs()[2]!.click();
    expect(tabs()[0]!.getAttribute('aria-selected')).toBe('true');
  });

  it('throws when tab and panel counts differ', () => {
    document.body.innerHTML = `
      <div data-tabs>
        <div data-tabs-list>
          <button data-tabs-tab>One</button>
          <button data-tabs-tab>Two</button>
        </div>
        <div data-tabs-panel>Only one</div>
      </div>`;
    expect(() => createTabs(document.querySelector<HTMLElement>('[data-tabs]')!)).toThrow();
  });

  it('has no detectable WCAG A/AA violations', async () => {
    createTabs(mount());
    const results = await axe.run(document.body, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
