# Next 48 Updates — block-a11y-pattern-lab

## Why this file exists

This is a sequenced, honest backlog of at least 48 planned updates that keeps the repository genuinely active over time. Each item is a real unit of work (one issue or pull request) that advances capability, testing, security, documentation, or maintenance — not artificial busywork. Items are ordered so that early work unblocks later work, and grouped into six release milestones. Nothing here is claimed as already done: this is the forward plan.

## How to use it

Convert each checkbox into a tracked issue, attach it to the matching milestone, and close it with the pull request that satisfies it. Aim for a steady cadence (for example one to three items per week) so commit history, releases, and changelog entries reflect continuous, verifiable progress. Re-open or add items whenever revalidation, upstream releases, or user reports surface new work.

Total planned updates: **48** across **6** milestones.

## M1 — v0.1 Foundations & scaffolding

- [ ] **#01** Scaffold the pattern library with a block plugin and a docs workbench
- [ ] **#02** Define the catalog structure: one folder per accessible interaction pattern
- [ ] **#03** Set up wp-env plus a static pattern gallery for review
- [ ] **#04** Add PHPCS, ESLint, and pre-commit hooks
- [ ] **#05** Create ADRs: Interactivity API usage and evidence model
- [ ] **#06** Add CI linting for PHP, JS, and CSS
- [ ] **#07** Publish the first pattern: accessible disclosure/accordion
- [ ] **#08** Establish the per-pattern evidence template (automated + manual)

## M2 — v0.2 Core capability

- [ ] **#09** Add an accessible modal-dialog pattern with focus management
- [ ] **#10** Add a menu/navigation pattern with roving tabindex
- [ ] **#11** Add a tabs pattern with correct ARIA and keyboard support
- [ ] **#12** Add a combobox/autocomplete pattern
- [ ] **#13** Add a carousel pattern with reduced-motion support
- [ ] **#14** Ensure every pattern has editor and frontend parity
- [ ] **#15** Add a live-region/announcement helper pattern
- [ ] **#16** Add conditional asset loading per pattern

## M3 — v0.3 Testing, evidence & negative proof

- [ ] **#17** Add axe-core automated checks for each pattern
- [ ] **#18** Add keyboard-interaction E2E tests per pattern
- [ ] **#19** Add a known-bad variant per pattern proving tests catch the defect
- [ ] **#20** Add editor/frontend parity snapshot tests
- [ ] **#21** Record manual screen-reader results (NVDA/VoiceOver) per pattern
- [ ] **#22** Create an evidence index mapping WCAG criteria to each pattern
- [ ] **#23** Add a coverage gate for the pattern JS
- [ ] **#24** Add visual regression snapshots for each pattern

## M4 — v0.4 Security, compatibility & performance

- [ ] **#25** Run a manual WCAG 2.2 AA audit across the catalog
- [ ] **#26** Add reduced-motion and high-contrast handling with tests
- [ ] **#27** Add escaping/sanitization review for dynamic pattern output
- [ ] **#28** Enforce per-pattern asset-size budgets
- [ ] **#29** Define a WordPress/PHP support matrix and test the floor
- [ ] **#30** Verify patterns degrade gracefully without JavaScript
- [ ] **#31** Document a deprecation path for changed pattern markup
- [ ] **#32** Add dependency scanning

## M5 — v0.5 Documentation, DX & adoption

- [ ] **#33** Write a case study on a pattern that fixed a common a11y mistake
- [ ] **#34** Publish the pattern gallery with copy-paste usage and a11y notes
- [ ] **#35** Record a demo and reproducible Playground blueprint
- [ ] **#36** Document the pattern-contribution guide with an a11y checklist
- [ ] **#37** Add architecture docs for the evidence system
- [ ] **#38** Write an editor-usage guide for each pattern
- [ ] **#39** Add do/don't accessibility guidance per pattern
- [ ] **#40** Add a troubleshooting guide for focus and parity issues

## M6 — v1.0+ Community, release cadence & maintenance

- [ ] **#41** Adopt semantic versioning and a maintained changelog
- [ ] **#42** Add protected-tag release automation with the evidence bundle
- [ ] **#43** Set a cadence to revalidate against new WordPress/Gutenberg releases
- [ ] **#44** Add a quarterly accessibility re-audit to the roadmap
- [ ] **#45** Publish a pattern deprecation policy
- [ ] **#46** Triage issues with documented labels and SLAs
- [ ] **#47** Add 'good first issue' new-pattern tasks
- [ ] **#48** Schedule recurring dependency and WCAG-guidance reviews

## Honesty note

These updates are planned, not completed. They do not assert the software is already built, adopted, certified, bug-free, or secure in every environment. They describe the intended, testable path of work and the cadence for keeping the repository maintained.
