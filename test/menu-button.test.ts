import { describe, it, expect, beforeEach } from 'vitest';
import axe from 'axe-core';
import { createMenuButton } from '../src/menu-button.js';

function mount(itemTag = 'li'): HTMLElement {
  document.body.innerHTML = `
    <main>
      <h1>Demo</h1>
      <div data-menu>
        <button data-menu-trigger>Actions</button>
        <ul data-menu-list>
          <${itemTag} data-menu-item>Rename</${itemTag}>
          <${itemTag} data-menu-item>Duplicate</${itemTag}>
          <${itemTag} data-menu-item>Delete</${itemTag}>
        </ul>
      </div>
    </main>`;
  return document.querySelector<HTMLElement>('[data-menu]')!;
}

const trigger = () => document.querySelector<HTMLElement>('[data-menu-trigger]')!;
const list = () => document.querySelector<HTMLElement>('[data-menu-list]')!;
const items = () => Array.from(document.querySelectorAll<HTMLElement>('[data-menu-item]'));

function key(el: HTMLElement, k: string): void {
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
}

describe('createMenuButton', () => {
  beforeEach(() => mount());

  it('wires haspopup/menu/menuitem roles and relationships', () => {
    createMenuButton(mount());
    expect(trigger().getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    expect(trigger().getAttribute('aria-controls')).toBe(list().id);
    expect(list().getAttribute('role')).toBe('menu');
    expect(list().getAttribute('aria-labelledby')).toBe(trigger().id);
    expect(items()[0]!.getAttribute('role')).toBe('menuitem');
    expect(items()[0]!.getAttribute('tabindex')).toBe('-1');
    expect(list().hidden).toBe(true);
  });

  it('can start expanded', () => {
    createMenuButton(mount(), { expanded: true });
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    expect(list().hidden).toBe(false);
  });

  it('opens on trigger click and focuses the first item', () => {
    createMenuButton(mount());
    trigger().click();
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(items()[0]);
  });

  it('ArrowDown on the trigger opens to the first item, ArrowUp to the last', () => {
    createMenuButton(mount());
    key(trigger(), 'ArrowDown');
    expect(document.activeElement).toBe(items()[0]);
    createMenuButton(mount());
    key(trigger(), 'ArrowUp');
    expect(document.activeElement).toBe(items()[2]);
  });

  it('Arrow keys move focus and wrap within the menu', () => {
    createMenuButton(mount());
    trigger().click();
    key(items()[0]!, 'ArrowDown');
    expect(document.activeElement).toBe(items()[1]);
    key(items()[1]!, 'ArrowUp');
    expect(document.activeElement).toBe(items()[0]);
    key(items()[0]!, 'ArrowUp');
    expect(document.activeElement).toBe(items()[2]);
    key(items()[2]!, 'ArrowDown');
    expect(document.activeElement).toBe(items()[0]);
  });

  it('Home/End jump to first and last item', () => {
    createMenuButton(mount());
    trigger().click();
    key(items()[0]!, 'End');
    expect(document.activeElement).toBe(items()[2]);
    key(items()[2]!, 'Home');
    expect(document.activeElement).toBe(items()[0]);
  });

  it('Escape closes and returns focus to the trigger', () => {
    createMenuButton(mount());
    trigger().click();
    key(items()[0]!, 'Escape');
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger());
  });

  it('Tab dismisses the menu without trapping focus', () => {
    createMenuButton(mount());
    trigger().click();
    key(items()[0]!, 'Tab');
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
  });

  it('a click outside the menu closes it', () => {
    createMenuButton(mount());
    trigger().click();
    document.body.click();
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
  });

  it('open/close/toggle API works', () => {
    const m = createMenuButton(mount());
    m.open();
    expect(m.expanded).toBe(true);
    m.close();
    expect(m.expanded).toBe(false);
    expect(m.toggle()).toBe(true);
  });

  it('destroy removes listeners', () => {
    const m = createMenuButton(mount());
    m.destroy();
    trigger().click();
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
  });

  it('throws when items are missing', () => {
    document.body.innerHTML = `<div data-menu><button data-menu-trigger>x</button><ul data-menu-list></ul></div>`;
    expect(() => createMenuButton(document.querySelector<HTMLElement>('[data-menu]')!)).toThrow();
  });

  it('has no detectable WCAG A/AA violations', async () => {
    createMenuButton(mount(), { expanded: true });
    const results = await axe.run(document.body, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
