/**
 * Accessible Dialog (modal) — the WAI-ARIA Dialog (Modal) pattern.
 *
 * A modal dialog is a window overlaid on the page that traps focus until it is
 * dismissed. It follows the APG Dialog pattern: `role="dialog"` with
 * `aria-modal="true"`, an accessible name via `aria-labelledby`, focus moved
 * into the dialog on open and restored to the invoking element on close, a
 * focus trap around Tab/Shift+Tab, and Escape to dismiss. Framework-agnostic:
 * it enhances existing semantic markup so it works in a WordPress block or
 * anywhere.
 *
 * Expected markup (ids optional — generated if absent):
 *   <div data-dialog>
 *     <button data-dialog-trigger>Open</button>
 *     <div data-dialog-surface>
 *       <h2 data-dialog-title>Confirm</h2>
 *       <p>Body…</p>
 *       <button data-dialog-close>Close</button>
 *     </div>
 *   </div>
 */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export interface DialogOptions {
  /** Whether the dialog starts open. Defaults to false (closed). */
  open?: boolean;
}

export interface DialogInstance {
  /** Open the dialog and move focus inside it. */
  open(): void;
  /** Close the dialog and restore focus to the opener. */
  close(): void;
  /** Whether the dialog is currently open. */
  readonly isOpen: boolean;
  /** Remove listeners and ARIA wiring. */
  destroy(): void;
}

let uid = 0;

/**
 * Enhance a container into an accessible modal dialog.
 *
 * @param root    The `[data-dialog]` container.
 * @param options Behavioural options.
 * @returns A handle to control or tear down the dialog.
 * @throws If the trigger or surface element is missing.
 */
export function createDialog(root: HTMLElement, options: DialogOptions = {}): DialogInstance {
  const trigger = root.querySelector<HTMLElement>('[data-dialog-trigger]');
  const surface = root.querySelector<HTMLElement>('[data-dialog-surface]');
  if (!trigger || !surface) {
    throw new Error('createDialog: requires [data-dialog-trigger] and [data-dialog-surface].');
  }

  const group = (uid += 1);
  surface.setAttribute('role', 'dialog');
  surface.setAttribute('aria-modal', 'true');

  const title = surface.querySelector<HTMLElement>('[data-dialog-title]');
  if (title) {
    const titleId = title.id || (title.id = `dialog-${group}-title`);
    surface.setAttribute('aria-labelledby', titleId);
  }

  const closers = Array.from(root.querySelectorAll<HTMLElement>('[data-dialog-close]'));

  let open = options.open ?? false;
  // The element focus returns to on close — the opener, captured at open time.
  let opener: HTMLElement | null = null;

  function focusable(): HTMLElement[] {
    return Array.from(surface!.querySelectorAll<HTMLElement>(FOCUSABLE));
  }

  function render(): void {
    surface!.hidden = !open;
  }

  function openDialog(): void {
    if (open) {
      return;
    }
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : trigger;
    open = true;
    render();
    const targets = focusable();
    (targets[0] ?? surface!).focus();
  }

  function closeDialog(): void {
    if (!open) {
      return;
    }
    open = false;
    render();
    opener?.focus();
    opener = null;
  }

  function trapFocus(event: KeyboardEvent): void {
    const targets = focusable();
    if (targets.length === 0) {
      event.preventDefault();
      return;
    }
    const first = targets[0]!;
    const last = targets[targets.length - 1]!;
    const active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onSurfaceKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDialog();
    } else if (event.key === 'Tab') {
      trapFocus(event);
    }
  }

  function onTriggerClick(): void {
    openDialog();
  }

  function onCloserClick(): void {
    closeDialog();
  }

  trigger.addEventListener('click', onTriggerClick);
  surface.addEventListener('keydown', onSurfaceKeydown);
  closers.forEach((closer) => closer.addEventListener('click', onCloserClick));
  render();
  if (open) {
    // Honour an initially-open dialog without a prior focus to restore.
    opener = trigger;
    (focusable()[0] ?? surface).focus();
  }

  return {
    open: openDialog,
    close: closeDialog,
    get isOpen() {
      return open;
    },
    destroy(): void {
      trigger.removeEventListener('click', onTriggerClick);
      surface.removeEventListener('keydown', onSurfaceKeydown);
      closers.forEach((closer) => closer.removeEventListener('click', onCloserClick));
    },
  };
}
