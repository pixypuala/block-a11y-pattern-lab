# Stack commands

Canonical commands the tooling and pre-commit gate run. One authoritative
command per task.

lint: pnpm exec tsc --noEmit
type-check: pnpm exec tsc --noEmit
test-unit: pnpm exec vitest run

## Toolchain

- Language: TypeScript (strict), ESM.
- Test: vitest + jsdom + axe-core.
- Package manager: pnpm (via `corepack enable`).
- Blocks build: `pnpm build` (`@wordpress/scripts`, `blocks/` → `build/`). Run in CI and locally; it
  is not a pre-push gate line because its bundler output is verified by CI rather than the log scan.
- Library build: `pnpm build:lib` (`tsc` → `dist/`).
