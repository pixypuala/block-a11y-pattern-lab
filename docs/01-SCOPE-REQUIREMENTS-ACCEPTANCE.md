# Scope, Requirements and Acceptance

## V1 users and jobs

- block developers: install, evaluate, integrate or contribute without private setup knowledge.
- design-system teams: install, evaluate, integrate or contribute without private setup knowledge.
- accessibility specialists: install, evaluate, integrate or contribute without private setup knowledge.
- theme and plugin reviewers: install, evaluate, integrate or contribute without private setup knowledge.

## V1 functional requirements

| ID | Requirement | Acceptance evidence | Priority |
|---|---|---|---|
| FR-01 | Disclosure/accordion, tabs, modal dialog, navigation menu, form validation summary, status message and filtering pattern. | Automated test plus documented evidence | Must |
| FR-02 | Block editor controls and frontend behavior for every pattern. | Automated test plus documented evidence | Must |
| FR-03 | Interactivity API where suitable, progressive enhancement and no forced client rendering. | Automated test plus documented evidence | Must |
| FR-04 | Pattern contract documents: roles, names, states, relationships, keyboard, focus, announcements and failure behavior. | Automated test plus documented evidence | Must |
| FR-05 | Automated axe and DOM behavior tests plus manual test scripts. | Automated test plus documented evidence | Must |
| FR-06 | Anti-pattern gallery demonstrating common failures and why they fail. | Automated test plus documented evidence | Must |
| FR-07 | React/vanilla/WordPress adapter notes without pretending one implementation fits all contexts. | Automated test plus documented evidence | Must |

## Cross-cutting requirements

| ID | Requirement | Acceptance |
|---|---|---|
| QR-01 | Clean installation | Fresh clone/install succeeds using documented supported tooling and no globally hidden dependency. |
| QR-02 | Determinism | Lockfiles, fixture versions, schemas and generated artifacts are committed or reproducibly created. |
| QR-03 | Security | Threat model completed; privileged and network boundaries have tests; no known critical/high unresolved finding. |
| QR-04 | Accessibility | Documentation and UIs meet the project accessibility policy; manual checks are recorded where automation is insufficient. |
| QR-05 | Performance | Budgets are defined before optimization and enforced on representative journeys or package size. |
| QR-06 | Compatibility | Published matrix is executed; unsupported combinations fail clearly rather than silently degrading. |
| QR-07 | Observability | Errors use stable codes/categories, useful context and redaction; debug mode is documented. |
| QR-08 | Recoverability | Setup and migrations are idempotent or have documented recovery/rollback paths. |
| QR-09 | Supply chain | Dependencies are locked, reviewed, licensed and scanned; release provenance is documented. |
| QR-10 | Maintainability | Public APIs, ownership, ADRs, test commands, support policy and deprecation path are documented. |

## First useful release

- Disclosure/accordion, tabs, modal dialog, navigation menu, form validation summary, status message and filtering pattern.
- Block editor controls and frontend behavior for every pattern.
- Interactivity API where suitable, progressive enhancement and no forced client rendering.
- Pattern contract documents: roles, names, states, relationships, keyboard, focus, announcements and failure behavior.
- Automated axe and DOM behavior tests plus manual test scripts.
- Anti-pattern gallery demonstrating common failures and why they fail.
- React/vanilla/WordPress adapter notes without pretending one implementation fits all contexts.

## Explicit non-goals

- certifying legal compliance
- claiming all screen readers behave identically
- replacing usability testing with disabled people
- inventing ARIA where native HTML works
- shipping a giant UI component framework

## Acceptance scenarios

1. **Clean-clone scenario:** a contributor follows only the README and reaches a known-good result.
2. **Known-bad scenario:** an intentional regression fails the correct gate with a useful, stable error.
3. **Unsupported scenario:** an unsupported platform/version is rejected with remediation guidance.
4. **Least-privilege scenario:** unauthorized or lower-privilege actors cannot execute or view privileged behavior/data.
5. **Upgrade scenario:** previous released state upgrades to the new version without data loss or undocumented manual repair.
6. **Downgrade/recovery scenario:** rollback limits are explicit and a backup/recovery route is tested where downgrade is unsafe.
7. **Failure-cleanup scenario:** interrupted setup/test/release leaves no unowned processes, corrupted fixture state or exposed secret.
8. **Documentation scenario:** API, user, contributor, security and release docs match the released artifact.

## Scope change control

Any new v1 feature must name the user/job, define acceptance, identify security/data/network implications, add test cost, state maintenance owner and remove or defer equivalent effort. “Nice to have” is not accepted without an owner and measurable value.
