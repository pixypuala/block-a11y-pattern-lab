/**
 * Accessible Tabs — the WAI-ARIA Tabs pattern.
 *
 * A tab list presents a set of tabs, each controlling one panel; only the
 * selected panel is visible. Framework-agnostic: it enhances existing semantic
 * markup so it works in a WordPress block or anywhere.
 *
 * Follows the APG Tabs pattern: `role="tablist"`/`tab`/`tabpanel`, roving
 * tabindex (only the selected tab is in the tab order), automatic activation on
 * Arrow/Home/End, and `aria-selected` on the active tab.
 *
 * Expected markup (ids optional — generated if absent):
 *   <div data-tabs>
 *     <div data-tabs-list>
 *       <button data-tabs-tab>First</button>
 *       <button data-tabs-tab>Second</button>
 *     </div>
 *     <div data-tabs-panel>First panel</div>
 *     <div data-tabs-panel>Second panel</div>
 *   </div>
 */

export interface TabsOptions {
  /** Index of the tab selected on init. Defaults to 0 (the first tab). */
  selected?: number;
}

export interface TabsInstance {
  /** Select the tab at `index` (clamped to range) and reveal its panel. */
  select(index: number): void;
  /** Index of the currently selected tab. */
  readonly selected: number;
  /** Remove listeners and ARIA wiring. */
  destroy(): void;
}

let uid = 0;

/**
 * Enhance a container into an accessible tabs widget.
 *
 * @param root    The `[data-tabs]` container.
 * @param options Behavioural options.
 * @returns A handle to control or tear down the tabs.
 * @throws If the tablist, a tab, or a matching panel is missing, or if the
 *         tab and panel counts differ.
 */
export function createTabs(root: HTMLElement, options: TabsOptions = {}): TabsInstance {
  const list = root.querySelector<HTMLElement>('[data-tabs-list]');
  const tabs = Array.from(root.querySelectorAll<HTMLElement>('[data-tabs-tab]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-tabs-panel]'));
  if (!list || tabs.length === 0 || tabs.length !== panels.length) {
    throw new Error('createTabs: requires [data-tabs-list] and equal counts of [data-tabs-tab] and [data-tabs-panel].');
  }

  const group = (uid += 1);
  list.setAttribute('role', 'tablist');

  tabs.forEach((tab, index) => {
    const panel = panels[index]!;
    // If a tab is not a native <button>, give it button semantics for AT users.
    if (tab.tagName !== 'BUTTON') {
      tab.setAttribute('type', 'button');
    }
    const tabId = tab.id || (tab.id = `tabs-${group}-tab-${index}`);
    const panelId = panel.id || (panel.id = `tabs-${group}-panel-${index}`);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panelId);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.setAttribute('tabindex', '0');
  });

  let selected = clamp(options.selected ?? 0, tabs.length);

  function render(): void {
    tabs.forEach((tab, index) => {
      const active = index === selected;
      tab.setAttribute('aria-selected', String(active));
      // Roving tabindex: only the selected tab is reachable by Tab.
      tab.setAttribute('tabindex', active ? '0' : '-1');
      panels[index]!.hidden = !active;
    });
  }

  function set(next: number): void {
    selected = clamp(next, tabs.length);
    render();
  }

  function activate(index: number): void {
    set(index);
    tabs[selected]!.focus();
  }

  function onClick(event: MouseEvent): void {
    const index = tabs.indexOf(event.currentTarget as HTMLElement);
    set(index);
  }

  function onKeydown(event: KeyboardEvent): void {
    const last = tabs.length - 1;
    switch (event.key) {
      case 'ArrowRight':
        activate(selected === last ? 0 : selected + 1);
        break;
      case 'ArrowLeft':
        activate(selected === 0 ? last : selected - 1);
        break;
      case 'Home':
        activate(0);
        break;
      case 'End':
        activate(last);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', onClick);
    tab.addEventListener('keydown', onKeydown);
  });
  render();

  return {
    select: (index) => set(index),
    get selected() {
      return selected;
    },
    destroy(): void {
      tabs.forEach((tab) => {
        tab.removeEventListener('click', onClick);
        tab.removeEventListener('keydown', onKeydown);
      });
    },
  };
}

function clamp(index: number, length: number): number {
  if (index < 0) {
    return 0;
  }
  if (index > length - 1) {
    return length - 1;
  }
  return index;
}
