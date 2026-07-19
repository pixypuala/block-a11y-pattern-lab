/**
 * Frontend runtime for the Accessible Tabs block.
 *
 * Finds every rendered tabs widget and hands it to `createTabs`, which applies
 * the WAI-ARIA roles, roving tabindex, and keyboard navigation.
 */
import { createTabs } from '../../src/tabs';

function init(): void {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    createTabs(root);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
