import { describe, it, expect, beforeEach } from 'vitest';
import axe from 'axe-core';
import { createDisclosure } from '../src/disclosure.js';

function mount(triggerTag = 'button'): HTMLElement {
  document.body.innerHTML = `
    <main>
      <h1>Demo</h1>
      <div data-disclosure>
        <${triggerTag} data-disclosure-trigger>Details</${triggerTag}>
        <div data-disclosure-content>Hidden content</div>
      </div>
    </main>`;
  return document.querySelector<HTMLElement>('[data-disclosure]')!;
}

const trigger = () => document.querySelector<HTMLElement>('[data-disclosure-trigger]')!;
const content = () => document.querySelector<HTMLElement>('[data-disclosure-content]')!;

describe('createDisclosure', () => {
  beforeEach(() => mount());

  it('starts collapsed with correct ARIA', () => {
    createDisclosure(mount());
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    expect(trigger().getAttribute('aria-controls')).toBe(content().id);
    expect(content().hidden).toBe(true);
  });

  it('can start expanded', () => {
    createDisclosure(mount(), { expanded: true });
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    expect(content().hidden).toBe(false);
  });

  it('toggles on click', () => {
    createDisclosure(mount());
    trigger().click();
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    expect(content().hidden).toBe(false);
    trigger().click();
    expect(content().hidden).toBe(true);
  });

  it('open/close/toggle API works', () => {
    const d = createDisclosure(mount());
    d.open();
    expect(d.expanded).toBe(true);
    d.close();
    expect(d.expanded).toBe(false);
    expect(d.toggle()).toBe(true);
  });

  it('gives a non-button trigger button semantics and Space/Enter activation', () => {
    createDisclosure(mount('span'));
    const t = trigger();
    expect(t.getAttribute('role')).toBe('button');
    expect(t.getAttribute('tabindex')).toBe('0');
    t.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(t.getAttribute('aria-expanded')).toBe('true');
  });

  it('destroy removes listeners', () => {
    const d = createDisclosure(mount());
    d.destroy();
    trigger().click();
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
  });

  it('throws on missing content', () => {
    document.body.innerHTML = `<div data-disclosure><button data-disclosure-trigger>x</button></div>`;
    expect(() => createDisclosure(document.querySelector<HTMLElement>('[data-disclosure]')!)).toThrow();
  });

  it('has no detectable WCAG A/AA violations', async () => {
    createDisclosure(mount(), { expanded: true });
    const results = await axe.run(document.body, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
