/**
 * Frontend runtime for the Accessible Menu Button block.
 *
 * Finds every rendered menu button and hands it to `createMenuButton`, which
 * applies the WAI-ARIA menu roles, roving focus, and keyboard operation.
 */
import { createMenuButton } from '../../src/menu-button';

function init(): void {
  document.querySelectorAll<HTMLElement>('[data-menu]').forEach((root) => {
    createMenuButton(root);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
