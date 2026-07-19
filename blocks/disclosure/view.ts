/**
 * Frontend runtime for the Accessible Disclosure block.
 *
 * Finds every rendered disclosure on the page and hands it to
 * `createDisclosure`, which applies the WAI-ARIA wiring and keyboard behaviour.
 * This is the bridge between the saved static markup and the tested pattern.
 */
import { createDisclosure } from '../../src/disclosure';

function init(): void {
  document.querySelectorAll<HTMLElement>('[data-disclosure]').forEach((root) => {
    createDisclosure(root);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
