/**
 * Accessible Menu Button — the WAI-ARIA Menu Button pattern.
 *
 * A menu button is a button that opens a menu of actions or choices. It follows
 * the APG Menu Button pattern: `aria-haspopup`/`aria-expanded`/`aria-controls`
 * on the button, `role="menu"`/`menuitem` on the list, roving focus (only the
 * focused item is reachable), and keyboard operation that mirrors a desktop
 * menu. Framework-agnostic: it enhances existing semantic markup so it works in
 * a WordPress block or anywhere.
 *
 * Expected markup (ids optional — generated if absent):
 *   <div data-menu>
 *     <button data-menu-trigger>Actions</button>
 *     <ul data-menu-list>
 *       <li data-menu-item>Rename</li>
 *       <li data-menu-item>Delete</li>
 *     </ul>
 *   </div>
 */

export interface MenuButtonOptions {
  /** Whether the menu starts open. Defaults to false (collapsed). */
  expanded?: boolean;
}

export interface MenuButtonInstance {
  /** Open the menu and move focus to the first item. */
  open(): void;
  /** Close the menu and return focus to the trigger. */
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
 * Enhance a container into an accessible menu button.
 *
 * @param root    The `[data-menu]` container.
 * @param options Behavioural options.
 * @returns A handle to control or tear down the menu.
 * @throws If the trigger, list, or any menu item is missing.
 */
export function createMenuButton(root: HTMLElement, options: MenuButtonOptions = {}): MenuButtonInstance {
  const trigger = root.querySelector<HTMLElement>('[data-menu-trigger]');
  const list = root.querySelector<HTMLElement>('[data-menu-list]');
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-menu-item]'));
  if (!trigger || !list || items.length === 0) {
    throw new Error('createMenuButton: requires [data-menu-trigger], [data-menu-list], and at least one [data-menu-item].');
  }

  const group = (uid += 1);
  const triggerId = trigger.id || (trigger.id = `menu-${group}-trigger`);
  const listId = list.id || (list.id = `menu-${group}-list`);

  trigger.setAttribute('aria-haspopup', 'menu');
  trigger.setAttribute('aria-controls', listId);
  list.setAttribute('role', 'menu');
  list.setAttribute('aria-labelledby', triggerId);
  items.forEach((item) => {
    item.setAttribute('role', 'menuitem');
    // Roving focus: items are focusable programmatically but out of the tab order.
    item.setAttribute('tabindex', '-1');
  });

  let expanded = options.expanded ?? false;

  function render(): void {
    trigger!.setAttribute('aria-expanded', String(expanded));
    list!.hidden = !expanded;
  }

  function focusItem(index: number): void {
    const last = items.length - 1;
    const clamped = index < 0 ? last : index > last ? 0 : index;
    items[clamped]!.focus();
  }

  function openMenu(focus: 'first' | 'last'): void {
    expanded = true;
    render();
    focusItem(focus === 'first' ? 0 : items.length - 1);
  }

  function closeMenu(returnFocus: boolean): void {
    expanded = false;
    render();
    if (returnFocus) {
      trigger!.focus();
    }
  }

  function currentIndex(): number {
    return items.indexOf(document.activeElement as HTMLElement);
  }

  function onTriggerClick(): void {
    if (expanded) {
      closeMenu(false);
    } else {
      openMenu('first');
    }
  }

  function onTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar':
      case 'ArrowDown':
        openMenu('first');
        break;
      case 'ArrowUp':
        openMenu('last');
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  function onListKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        focusItem(currentIndex() + 1);
        break;
      case 'ArrowUp':
        focusItem(currentIndex() - 1);
        break;
      case 'Home':
        focusItem(0);
        break;
      case 'End':
        focusItem(items.length - 1);
        break;
      case 'Escape':
        closeMenu(true);
        break;
      case 'Tab':
        // Tabbing away from an open menu dismisses it without trapping focus.
        closeMenu(false);
        return;
      default:
        return;
    }
    event.preventDefault();
  }

  function onDocumentClick(event: MouseEvent): void {
    if (expanded && !root.contains(event.target as Node)) {
      closeMenu(false);
    }
  }

  trigger.addEventListener('click', onTriggerClick);
  trigger.addEventListener('keydown', onTriggerKeydown);
  list.addEventListener('keydown', onListKeydown);
  document.addEventListener('click', onDocumentClick);
  render();

  return {
    open: () => openMenu('first'),
    close: () => closeMenu(true),
    toggle: () => {
      if (expanded) {
        closeMenu(true);
      } else {
        openMenu('first');
      }
      return expanded;
    },
    get expanded() {
      return expanded;
    },
    destroy(): void {
      trigger.removeEventListener('click', onTriggerClick);
      trigger.removeEventListener('keydown', onTriggerKeydown);
      list.removeEventListener('keydown', onListKeydown);
      document.removeEventListener('click', onDocumentClick);
    },
  };
}
