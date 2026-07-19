/**
 * Frontend runtime for the Accessible Dialog block.
 *
 * Finds every rendered dialog and hands it to `createDialog`, which applies the
 * WAI-ARIA modal roles, focus trap, Escape handling, and focus restoration.
 */
import { createDialog } from '../../src/dialog';

function init(): void {
  document.querySelectorAll<HTMLElement>('[data-dialog]').forEach((root) => {
    createDialog(root);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
