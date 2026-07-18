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
- Accessible WAI-ARIA Menu Button pattern (createMenuButton): haspopup/menu/menuitem roles, roving
  focus with Arrow/Home/End, open-to-first/last, Escape and outside-click dismissal.
- Accessible WAI-ARIA Dialog pattern (createDialog): dialog role, aria-modal, aria-labelledby,
  focus trap over Tab/Shift+Tab, Escape to dismiss, and focus restoration to the opener.
- WordPress block.json wrappers under blocks/ registering each pattern as an editor block
  (apiVersion, namespaced name, title, category, editorScript/viewScript handles).
- 47 tests (vitest + jsdom) including per-pattern axe-core WCAG A/AA scans and block-metadata
  validation; strict TypeScript.
- CI on Node 20 and 22 via pnpm/corepack.
