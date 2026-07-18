# Technical Contracts, Commands and Schemas

This chapter removes ambiguity before code. Names may change only through an ADR; the implemented README and CLI help must remain synchronized with the accepted contract.

## Required command surface

| Command | Required behavior |
|---|---|
| tool lab:start | Start documentation lab and disposable WordPress demo. |
| tool patterns:list | List patterns, contract versions, implementation adapters and test status. |
| tool pattern:validate <id> | Validate behavioral contract and examples. |
| tool test:automated <id> | Run DOM, keyboard, editor/frontend E2E and axe-assisted checks. |
| tool test:manual:init <id> | Create a dated manual test record from the protocol template. |
| tool test:manual:validate <record> | Check required environment, steps, observations and limitations are present. |
| wp a11y-pattern-lab seed | Install deterministic demo pages and known-bad examples. |
| tool screenshots <id> | Capture labeled screenshots for layout evidence, not semantic claims. |
| tool catalog:build | Generate pattern/support catalog from contracts and records. |

## Configuration example

```yaml
contractVersion: 1
pattern: disclosure
semantics:
  preferredElement: button
  relationships: [aria-expanded, aria-controls]
keyboard:
  required: [Enter, Space]
focus:
  opening: remains-on-trigger
  closing: remains-on-trigger
announcements:
  liveRegion: none
manualChecks: [keyboard, zoom400, forcedColors, reducedMotion, screenReader]
```

The final implementation must publish a machine-readable JSON Schema, reject unknown/unsafe fields according to policy, report source locations for invalid input, and support `--format=json` for automation where appropriate. Environment variables may provide secrets or CI overrides but cannot silently replace committed project behavior.

## Core data models

- PatternContract: semantics, states, events, keyboard, focus, naming, announcements and fallback.
- ImplementationManifest: adapter/framework, contract version, source paths and supported contexts.
- ManualTestRecord: tester, date, OS/browser/AT versions, steps, observations, failures and limitations.
- AutomatedResult: assertions, axe findings, browser artifacts and known-bad expectation.
- SupportCatalogEntry: pattern/adapter/WordPress/browser/AT status with evidence link and review date.

## API and stability rules

- Pattern contract is the primary stable API; markup examples may change while preserving behavior.
- Adapters declare implemented contract version and deviations.
- Manual records are append-only evidence; corrections create a superseding record.
- No automated result may set a universal “accessible” boolean.

## Common exit-code contract

| Code | Meaning | Retry guidance |
|---|---|---|
| 0 | All requested operations completed and required assertions passed | No retry needed |
| 1 | Valid execution found a contract/budget/audit/test failure | Fix product/configuration; blind retry prohibited |
| 2 | Invalid command or configuration | Correct input |
| 3 | Unsupported or missing environment/dependency | Change environment or support policy |
| 4 | Permission or safety policy denied the operation | Do not bypass; obtain correct authorization/environment |
| 5 | Setup, migration or fixture preparation failed | Inspect diagnostics; clean owned state before retry |
| 6 | Timeout, cancellation or external/network failure | Retry only under documented bounded policy |
| 7 | Infrastructure failure unrelated to evaluated product behavior | Retry after environment repair; preserve original evidence |
| 8 | Internal defect/invariant violation | File a bug with redacted diagnostic bundle |

Commands that do not need all codes may use the applicable subset, but meanings cannot conflict.

## Output and logging contract

- Human output goes to stdout; diagnostics/progress to stderr where CLI conventions require machine-readable stdout.
- `--format=json` emits one valid documented schema, no decorative prose.
- Every run prints or records run ID, tool version, source SHA, platform versions, config hash and safety mode.
- Errors contain stable code, path/subject, remediation and redacted context.
- Verbose/debug mode is opt-in and still redacts secrets and personal data.
- Cancellation returns a distinct status and runs ownership-based cleanup.

## Schema evolution

Schemas include `schemaVersion`. Additive optional fields may be backward compatible; required fields, changed meaning/type, renamed IDs and removed enum values are breaking. Readers must reject unsupported major versions clearly. Golden fixtures for every supported schema version remain in tests through the deprecation window.
