/**
 * Accessible Disclosure (show/hide) — the WAI-ARIA Disclosure pattern.
 *
 * A disclosure is a button that toggles the visibility of a region. It is the
 * building block of accordions and "read more" toggles. Framework-agnostic: it
 * enhances existing semantic markup so it works in a WordPress block or anywhere.
 *
 * Expected markup (ids optional — generated if absent):
 *   <div data-disclosure>
 *     <button data-disclosure-trigger>Details</button>
 *     <div data-disclosure-content>…</div>
 *   </div>
 */

export interface DisclosureOptions {
  /** Whether the region starts open. Defaults to false (collapsed). */
  expanded?: boolean;
}

export interface DisclosureInstance {
  /** Open the region. */
  open(): void;
  /** Close the region. */
  close(): void;
  /** Toggle and return the new expanded state. */
  toggle(): boolean;
  /** Current expanded state. */
  readonly expanded: boolean;
  /** Remove listeners and ARIA wiring. */
  destroy(): void;
}

let uid = 0;

/**
 * Enhance a container into an accessible disclosure.
 *
 * @param root    The `[data-disclosure]` container.
 * @param options Behavioural options.
 * @returns A handle to control or tear down the disclosure.
 * @throws If the trigger or content element is missing.
 */
export function createDisclosure(root: HTMLElement, options: DisclosureOptions = {}): DisclosureInstance {
  const trigger = root.querySelector<HTMLElement>('[data-disclosure-trigger]');
  const content = root.querySelector<HTMLElement>('[data-disclosure-content]');
  if (!trigger || !content) {
    throw new Error('createDisclosure: requires [data-disclosure-trigger] and [data-disclosure-content].');
  }

  // Ensure the trigger is a real button semantically; if it is not a <button>,
  // give it button semantics so keyboard/AT users get correct behaviour.
  if (trigger.tagName !== 'BUTTON') {
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
  }

  const contentId = content.id || (content.id = `disclosure-${(uid += 1)}`);
  trigger.setAttribute('aria-controls', contentId);

  let expanded = options.expanded ?? false;

  function render(): void {
    trigger!.setAttribute('aria-expanded', String(expanded));
    content!.hidden = !expanded;
  }

  function set(next: boolean): void {
    expanded = next;
    render();
  }

  function onClick(): void {
    set(!expanded);
  }

  // For a non-native button, Space/Enter must activate it (native buttons do this).
  function onKeydown(event: KeyboardEvent): void {
    if (trigger!.tagName === 'BUTTON') {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      set(!expanded);
    }
  }

  trigger.addEventListener('click', onClick);
  trigger.addEventListener('keydown', onKeydown);
  render();

  return {
    open: () => set(true),
    close: () => set(false),
    toggle: () => {
      set(!expanded);
      return expanded;
    },
    get expanded() {
      return expanded;
    },
    destroy(): void {
      trigger.removeEventListener('click', onClick);
      trigger.removeEventListener('keydown', onKeydown);
    },
  };
}
