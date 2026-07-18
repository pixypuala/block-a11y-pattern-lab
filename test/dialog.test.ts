import { describe, it, expect, beforeEach } from 'vitest';
import axe from 'axe-core';
import { createDialog } from '../src/dialog.js';

function mount(): HTMLElement {
  document.body.innerHTML = `
    <main>
      <h1>Demo</h1>
      <div data-dialog>
        <button data-dialog-trigger>Open</button>
        <div data-dialog-surface>
          <h2 data-dialog-title>Confirm action</h2>
          <p>Are you sure?</p>
          <button data-dialog-confirm>Yes</button>
          <button data-dialog-close>Close</button>
        </div>
      </div>
    </main>`;
  return document.querySelector<HTMLElement>('[data-dialog]')!;
}

const trigger = () => document.querySelector<HTMLElement>('[data-dialog-trigger]')!;
const surface = () => document.querySelector<HTMLElement>('[data-dialog-surface]')!;
const title = () => document.querySelector<HTMLElement>('[data-dialog-title]')!;
const confirm = () => document.querySelector<HTMLElement>('[data-dialog-confirm]')!;
const closeBtn = () => document.querySelector<HTMLElement>('[data-dialog-close]')!;

function key(el: HTMLElement, k: string, init: KeyboardEventInit = {}): void {
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...init }));
}

describe('createDialog', () => {
  beforeEach(() => mount());

  it('wires dialog role, modal flag, and accessible name', () => {
    createDialog(mount());
    expect(surface().getAttribute('role')).toBe('dialog');
    expect(surface().getAttribute('aria-modal')).toBe('true');
    expect(surface().getAttribute('aria-labelledby')).toBe(title().id);
    expect(surface().hidden).toBe(true);
  });

  it('can start open and moves focus inside', () => {
    createDialog(mount(), { open: true });
    expect(surface().hidden).toBe(false);
    expect(document.activeElement).toBe(confirm());
  });

  it('opens on trigger click and moves focus to the first focusable element', () => {
    createDialog(mount());
    trigger().click();
    expect(surface().hidden).toBe(false);
    expect(document.activeElement).toBe(confirm());
  });

  it('closes on the close control and restores focus to the opener', () => {
    createDialog(mount());
    trigger().focus();
    trigger().click();
    closeBtn().click();
    expect(surface().hidden).toBe(true);
    expect(document.activeElement).toBe(trigger());
  });

  it('Escape closes the dialog', () => {
    const d = createDialog(mount());
    trigger().click();
    key(surface(), 'Escape');
    expect(d.isOpen).toBe(false);
    expect(surface().hidden).toBe(true);
  });

  it('traps focus: Tab from the last element wraps to the first', () => {
    createDialog(mount());
    trigger().click();
    closeBtn().focus();
    key(closeBtn(), 'Tab');
    expect(document.activeElement).toBe(confirm());
  });

  it('traps focus: Shift+Tab from the first element wraps to the last', () => {
    createDialog(mount());
    trigger().click();
    confirm().focus();
    key(confirm(), 'Tab', { shiftKey: true });
    expect(document.activeElement).toBe(closeBtn());
  });

  it('open/close API works', () => {
    const d = createDialog(mount());
    d.open();
    expect(d.isOpen).toBe(true);
    d.close();
    expect(d.isOpen).toBe(false);
  });

  it('destroy removes listeners', () => {
    const d = createDialog(mount());
    d.destroy();
    trigger().click();
    expect(d.isOpen).toBe(false);
    expect(surface().hidden).toBe(true);
  });

  it('throws on missing surface', () => {
    document.body.innerHTML = `<div data-dialog><button data-dialog-trigger>x</button></div>`;
    expect(() => createDialog(document.querySelector<HTMLElement>('[data-dialog]')!)).toThrow();
  });

  it('has no detectable WCAG A/AA violations', async () => {
    createDialog(mount(), { open: true });
    const results = await axe.run(document.body, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
