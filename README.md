# Block Accessibility Pattern Lab

## Getting started

Requires Node 20+ and pnpm (`corepack enable`).

```bash
pnpm install
pnpm test        # 8 tests: ARIA state, keyboard activation, lifecycle, axe scan
pnpm build       # emit dist/ (ESM + .d.ts)
```

## What is built today

A framework-agnostic, WAI-ARIA-correct **Disclosure** pattern (the basis of accordions and
"read more" toggles):

- `createDisclosure` (`src/disclosure.ts`) progressively enhances semantic markup: `aria-expanded`
  + `aria-controls` wiring, content show/hide, and — when the trigger is not a native `<button>` —
  button semantics with Space/Enter activation. Supports open/close/toggle and destroy().
- Tests cover ARIA state, click and keyboard activation, the non-button path, lifecycle, error
  handling, and an axe-core WCAG A/AA scan.

This is the extraction of the accessible-pattern work from the Accessible Frontend Design System
Lab; more patterns (Tabs, Menu button, Dialog) land here over time.

## Documented boundary (not yet built)

Additional patterns and the WordPress block.json wrappers that ship these as editor blocks.

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
