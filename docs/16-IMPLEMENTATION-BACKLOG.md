# Implementation Backlog

This backlog is the minimum decomposition, not a substitute for issue-specific design. Each issue must include owner, dependencies, security/compatibility/docs impact, test plan and evidence link. Split issues that cannot be reviewed safely in one pull request.

| ID | Work item | Acceptance | Initial status |
|---|---|---|---|
| ISSUE-001 | Bootstrap | Initialize license, governance, CODEOWNERS, security and support files. | Not started |
| ISSUE-002 | Architecture | Accept repository topology, support, schema, environment, trust and test ADRs. | Not started |
| ISSUE-003 | Tooling | Create version files, authoritative lockfiles and immutable installation commands. | Not started |
| ISSUE-004 | Doctor | Implement read-only environment diagnostics and remediation output. | Not started |
| ISSUE-005 | Fixture | Create smallest deterministic known-good fixture and cleanup ownership. | Not started |
| ISSUE-006 | Failure fixture | Create first known-bad fixture and prove the intended gate fails. | Not started |
| ISSUE-007 | Static quality | Configure formatting, lint, types/static analysis, schema and generated-file drift checks. | Not started |
| ISSUE-008 | Integration environment | Create disposable WordPress/database/browser lifecycle with cleanup. | Not started |
| ISSUE-009 | Security | Complete threat model and add permission/input/network/filesystem/redaction tests. | Not started |
| ISSUE-010 | Evidence | Define immutable result/evidence directory, manifest and redaction inspection. | Not started |
| ISSUE-011 | CI | Implement PR target cell using only repository-owned commands. | Not started |
| ISSUE-012 | Scheduled CI | Implement sampled matrix, next-beta checks and maintenance health. | Not started |
| ISSUE-013 | Release | Implement protected tag build, artifact inspection/checksum and artifact-install smoke. | Not started |
| ISSUE-014 | Docs | Verify clean-clone tutorial through an uninvolved reviewer. | Not started |
| ISSUE-015 | Compatibility | Publish dated tested/unsupported matrix tied to release SHA. | Not started |
| ISSUE-016 | Upgrade | Create previous-release fixture and candidate upgrade/recovery test. | Not started |
| ISSUE-017 | CLI: implement `tool lab:start` | Start documentation lab and disposable WordPress demo. Includes unit/contract tests, help text, JSON behavior where applicable, and failure cases. | Not started |
| ISSUE-018 | CLI: implement `tool patterns:list` | List patterns, contract versions, implementation adapters and test status. Includes unit/contract tests, help text, JSON behavior where applicable, and failure cases. | Not started |
| ISSUE-019 | CLI: implement `tool pattern:validate <id>` | Validate behavioral contract and examples. Includes unit/contract tests, help text, JSON behavior where applicable, and failure cases. | Not started |
| ISSUE-020 | CLI: implement `tool test:automated <id>` | Run DOM, keyboard, editor/frontend E2E and axe-assisted checks. Includes unit/contract tests, help text, JSON behavior where applicable, and failure cases. | Not started |
| ISSUE-021 | CLI: implement `tool test:manual:init <id>` | Create a dated manual test record from the protocol template. Includes unit/contract tests, help text, JSON behavior where applicable, and failure cases. | Not started |
| ISSUE-022 | CLI: implement `tool test:manual:validate <record>` | Check required environment, steps, observations and limitations are present. Includes unit/contract tests, help text, JSON behavior where applicable, and failure cases. | Not started |
| ISSUE-023 | CLI: implement `wp a11y-pattern-lab seed` | Install deterministic demo pages and known-bad examples. Includes unit/contract tests, help text, JSON behavior where applicable, and failure cases. | Not started |
| ISSUE-024 | CLI: implement `tool screenshots <id>` | Capture labeled screenshots for layout evidence, not semantic claims. Includes unit/contract tests, help text, JSON behavior where applicable, and failure cases. | Not started |
| ISSUE-025 | CLI: implement `tool catalog:build` | Generate pattern/support catalog from contracts and records. Includes unit/contract tests, help text, JSON behavior where applicable, and failure cases. | Not started |
| ISSUE-026 | Domain: implement `PatternContract` model | PatternContract: semantics, states, events, keyboard, focus, naming, announcements and fallback. Validate serialization, invariants and backward compatibility. | Not started |
| ISSUE-027 | Domain: implement `ImplementationManifest` model | ImplementationManifest: adapter/framework, contract version, source paths and supported contexts. Validate serialization, invariants and backward compatibility. | Not started |
| ISSUE-028 | Domain: implement `ManualTestRecord` model | ManualTestRecord: tester, date, OS/browser/AT versions, steps, observations, failures and limitations. Validate serialization, invariants and backward compatibility. | Not started |
| ISSUE-029 | Domain: implement `AutomatedResult` model | AutomatedResult: assertions, axe findings, browser artifacts and known-bad expectation. Validate serialization, invariants and backward compatibility. | Not started |
| ISSUE-030 | Domain: implement `SupportCatalogEntry` model | SupportCatalogEntry: pattern/adapter/WordPress/browser/AT status with evidence link and review date. Validate serialization, invariants and backward compatibility. | Not started |
| ISSUE-031 | Contract: enforce public API rule | Pattern contract is the primary stable API; markup examples may change while preserving behavior. Add a contract test and documentation link. | Not started |
| ISSUE-032 | Contract: enforce public API rule | Adapters declare implemented contract version and deviations. Add a contract test and documentation link. | Not started |
| ISSUE-033 | Contract: enforce public API rule | Manual records are append-only evidence; corrections create a superseding record. Add a contract test and documentation link. | Not started |
| ISSUE-034 | Contract: enforce public API rule | No automated result may set a universal “accessible” boolean. Add a contract test and documentation link. | Not started |

## Backlog execution rules

- Complete Bootstrap through Failure fixture before parallel feature expansion.
- Public contracts and schemas require ADR/API-owner review.
- Security-sensitive and release-workflow issues require designated owner review.
- A CLI/model issue is not complete until error and negative paths are tested.
- Documentation follows the real command/artifact; never document a command that has not been run from a clean clone.
- Close an issue only with linked PR, tests and evidence; administrative closure states why it is no longer needed.
