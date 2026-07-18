# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Repository scaffolding: governance files, docs, and CI skeleton.
- Accessible WAI-ARIA Disclosure pattern (createDisclosure) with non-button fallback semantics.
- Accessible WAI-ARIA Tabs pattern (createTabs): tablist/tab/tabpanel roles, roving tabindex,
  Arrow/Home/End keyboard navigation, and aria-selected.
- 18 tests (vitest + jsdom) including per-pattern axe-core WCAG A/AA scans; strict TypeScript.
- CI on Node 20 and 22 via pnpm/corepack.
