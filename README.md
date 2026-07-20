# Block Accessibility Pattern Lab

## Getting started

Requires Node 20+ and pnpm (`corepack enable`).

```bash
pnpm install
pnpm test        # 67 tests: ARIA state, keyboard activation, lifecycle, axe scan, block + plugin metadata
pnpm build       # compile the four blocks to build/ (wp-scripts)
pnpm build:lib   # emit dist/ (ESM + .d.ts) for library consumers
```

## What is built today

Four framework-agnostic, WAI-ARIA-correct patterns:

- **Disclosure** — `createDisclosure` (`src/disclosure.ts`), the basis of accordions and
  "read more" toggles. Progressively enhances semantic markup: `aria-expanded` + `aria-controls`
  wiring, content show/hide, and — when the trigger is not a native `<button>` — button semantics
  with Space/Enter activation. Supports open/close/toggle and destroy().
- **Tabs** — `createTabs` (`src/tabs.ts`), the APG Tabs pattern. Wires `role="tablist"`/`tab`/
  `tabpanel`, `aria-controls`/`aria-labelledby`, and `aria-selected`; applies roving tabindex and
  automatic activation on click, Arrow (wrapping), Home, and End. Supports select(index) and destroy().
- **Menu button** — `createMenuButton` (`src/menu-button.ts`), the APG Menu Button pattern. Wires
  `aria-haspopup`/`aria-expanded`/`aria-controls` and `role="menu"`/`menuitem`; opens to the first
  item on Enter/Space/Down and the last on Up; moves roving focus with Arrow (wrapping)/Home/End;
  Escape restores focus to the trigger; Tab and outside clicks dismiss. Supports open/close/toggle
  and destroy().
- **Dialog** — `createDialog` (`src/dialog.ts`), the APG Modal Dialog pattern. Wires `role="dialog"`,
  `aria-modal="true"`, and `aria-labelledby`; moves focus into the dialog on open and restores it to
  the opener on close; traps Tab/Shift+Tab within the surface; Escape dismisses. Supports open/close
  and destroy().

Each pattern ships a full WordPress block under `blocks/`: a schema-pinned `block.json` (namespaced
`name`, `title`, `category`, editable `attributes`, and `editorScript`/`viewScript` handles), an
`edit.tsx` editor component, a `save.tsx` that emits the semantic markup, and a `view.ts` frontend
runtime that instantiates the matching `create*` pattern so the shipped block wires the ARIA
behaviour on the published page. `@wordpress/scripts` compiles the blocks to `build/` via
`pnpm build`; the `view.ts` bundle carries the tested pattern code that enhances the saved markup.

Tests cover ARIA state, click and keyboard activation, roving tabindex, focus trapping, lifecycle,
error handling, a per-pattern axe-core WCAG A/AA scan, block-metadata validation, coherence of
each block's script handles and editable attributes, and the plugin wrapper's headers, guards, and
directory-discovery registration.

This is the extraction of the accessible-pattern work from the Accessible Frontend Design System Lab.

## Verified in a running WordPress

`block-a11y-pattern-lab.php` is the plugin wrapper: a header, an `ABSPATH` guard, and one function
that globs `build/*/block.json` and calls `register_block_type()` on each directory. It names no
block, so a new pattern is picked up by rebuilding rather than by editing PHP; a checkout without a
compiled `build/` reports the problem under `WP_DEBUG` and returns instead of fataling.

Symlinked into a live WordPress 7.0.2 / PHP 8.2 install, the three previously unproven claims now
have evidence — the commands and raw output are in [`docs/RUNTIME-VERIFICATION.md`](docs/RUNTIME-VERIFICATION.md):

- **Insertion.** All four blocks register in `WP_Block_Type_Registry` with their editor and view
  script handles. `/wp-admin/post-new.php?post_type=page` returns 200, all four appear in
  `wp.blocks.getBlockType()`, and inserting all four leaves every one of them `isValid` — WordPress
  re-parsed each block's saved markup against `save.tsx` without a validation warning. The browser
  console carried no error or warning from this plugin.
- **Attribute editing.** Non-default attributes (`tabOneLabel: "Shipping"`, `triggerLabel:
  "Show shipping policy"`) serialize into the block delimiter, defaults are omitted and re-supplied
  from `block.json`, and `do_blocks()` on the stored post renders the overridden values.
- **Enhanced markup end to end.** The blocks were published to a real page and fetched over HTTP:
  the served HTML is plain semantic markup with all four `viewScript` bundles enqueued, and in the
  browser the runtime applies `role=tablist/tab/tabpanel` with reciprocal
  `aria-selected`/`aria-controls`/`aria-labelledby` and roving tabindex; `aria-expanded` +
  `aria-controls` on the disclosure; `aria-haspopup="menu"` + `aria-expanded` + `role=menu/menuitem`
  on the menu button; and `role="dialog"` + `aria-modal="true"` + `aria-labelledby` on the dialog,
  with focus moved in on open and restored to the opener on Escape.

`WP_DEBUG` and `WP_DEBUG_LOG` were on throughout; `debug.log` records no notice, warning,
deprecation, or fatal from this plugin.

Still unproven: screen-reader behaviour (the assertions above read the DOM, not what NVDA, JAWS, or
VoiceOver announces), browsers other than Chromium, multiple instances of the same block on one
page, and any APG pattern beyond these four.

A testable reference library for accessible WordPress editor and frontend interaction patterns, with honest automated and manual evidence.

## Who this is for

- block developers
- design-system teams
- accessibility specialists
- theme and plugin reviewers

## Required implementation outputs

- pattern contracts
- WordPress demo plugin
- documentation lab
- manual test records
- anti-pattern fixtures
- adapter guidance
- Playground demos

## Non-negotiable rule

A feature is not complete because code exists. It is complete only when its contract, permissions, failure behavior, automated tests, manual evidence where applicable, documentation, migration/deprecation impact and release artifact are all reviewed.
