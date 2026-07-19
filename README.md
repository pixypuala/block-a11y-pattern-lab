# Block Accessibility Pattern Lab

## Getting started

Requires Node 20+ and pnpm (`corepack enable`).

```bash
pnpm install
pnpm test        # 55 tests: ARIA state, keyboard activation, lifecycle, axe scan, block metadata
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
error handling, a per-pattern axe-core WCAG A/AA scan, block-metadata validation, and coherence of
each block's script handles and editable attributes.

This is the extraction of the accessible-pattern work from the Accessible Frontend Design System Lab.

## Documented boundary (not yet built)

The blocks compile and their runtime is wired, but they have not yet been exercised inside a running
WordPress editor: registering them requires a thin PHP plugin wrapper (`register_block_type` per
`build/` directory) and a live editor/frontend to confirm insertion, attribute editing, and the
enhanced markup end to end. Additional patterns beyond the four above also remain future work.

> **Document status:** implementation-complete engineering blueprint, not a claim that the software has already been built.

A testable reference library for accessible WordPress editor and frontend interaction patterns, with honest automated and manual evidence.

## Who this is for

- block developers
- design-system teams
- accessibility specialists
- theme and plugin reviewers

## Start-to-finish route

1. Read `docs/00-PRODUCT-PCAAP.md` and accept or change the problem boundary.
2. Freeze v1 scope using `docs/01-SCOPE-REQUIREMENTS-ACCEPTANCE.md`.
3. Record architecture decisions from `docs/02-ARCHITECTURE-AND-ADRS.md` before scaffolding.
4. Create the exact repository skeleton in `docs/03-REPOSITORY-STRUCTURE.md`.
5. Apply the stack and compatibility policy in `docs/04-STACK-COMPATIBILITY-DEPENDENCIES.md`.
6. Execute phases in `docs/05-IMPLEMENTATION-PLAN.md`; do not jump to polish before contracts and failure paths.
7. Apply security/privacy controls and threat model from `docs/06-SECURITY-PRIVACY-THREAT-MODEL.md`.
8. Build the test system in `docs/07-TEST-QUALITY-ACCESSIBILITY-PERFORMANCE.md`.
9. Enforce merge/release gates in `docs/08-CI-CD-SUPPLY-CHAIN-RELEASE.md`.
10. Produce user, contributor, API and evidence documentation from `docs/09-DOCUMENTATION-DEMO-EVIDENCE.md`.
11. Establish governance and maintainer expectations from `docs/10-OPEN-SOURCE-GOVERNANCE.md`.
12. Operate support, deprecation and incident handling from `docs/11-MAINTENANCE-SUPPORT-INCIDENTS.md`.
13. Follow `docs/12-ROADMAP-MILESTONES-ISSUES.md` and release only through `docs/13-STRICT-AUDIT-FIX-DEFINITION-OF-DONE.md`.
14. Freeze commands and machine contracts in `docs/15-TECHNICAL-CONTRACTS-COMMANDS-SCHEMAS.md`.
15. Execute the decomposed work in `docs/16-IMPLEMENTATION-BACKLOG.md`.
16. Release and transfer maintainership using `docs/17-RELEASE-MANIFEST-AND-HANDOFF.md`.
17. Use `TEMPLATES/` to initialize repository community and CI files; replace all placeholders before publishing.

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
