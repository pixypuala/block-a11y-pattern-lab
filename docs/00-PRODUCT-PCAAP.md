# Product Definition Using PCAAP

## Problem

Teams frequently copy interactive block code that appears correct visually but has incomplete semantics, focus behavior, keyboard support, announcements, zoom behavior, or editor usability.

## Cost

- users are excluded
- regressions recur across projects
- automated scans create false confidence
- editor behavior diverges from frontend behavior
- teams lack repeatable assistive-technology test protocols

## Answer

Publish canonical small patterns, anti-pattern fixtures, WordPress block examples, Interactivity API implementations, adapters, test protocols and recorded evidence.

## Advantage

The repository teaches both implementation and verification, and explicitly separates conformance evidence from unsupported claims.

## Proof

- each pattern has normative behavior requirements
- known-bad version is caught by tests
- manual keyboard and assistive-technology records
- editor and frontend coverage
- versioned browser/AT support matrix

## Ask

Review one pattern with real assistive technology, contribute a reproducible issue, or adapt a pattern while preserving its behavioral contract.

## Product principles

1. **Bound every claim.** State exactly which versions, environments, contracts, roles, journeys and evidence support a claim.
2. **Prefer official platform APIs.** Private internals may be studied but must not become undocumented production dependencies.
3. **Prove failure detection.** Every important gate needs a known-bad fixture or mutation proving that it can fail.
4. **Local equals CI.** CI invokes versioned repository commands; it does not contain hidden logic unavailable to contributors.
5. **Safe by default.** Destructive, privileged, remote, secret-bearing or production-targeting behavior requires explicit opt-in.
6. **Documentation is a product surface.** A new contributor must be able to install, reproduce, test and understand limitations without private guidance.
7. **Maintenance is designed before launch.** Compatibility policy, ownership, deprecation, security disclosure and archive criteria exist before v1.0.

## Success outcomes

- A qualified developer can reach the documented demo from a clean clone without guessing.
- A reviewer can map every user-facing promise to code, tests and evidence.
- A maintainer can identify the supported versions, release process and breaking-change policy.
- A security reviewer can find permissions, sensitive data, network access and unsafe operations in one threat model.
- An outside contributor can select a scoped issue, run checks locally and submit a compliant pull request.

## Failure conditions

The project is not ready when it depends on undocumented local services, hides secrets in examples, uses vague compatibility language, lacks negative tests, has unowned critical code, cannot produce release artifacts from a tag, or has no plan for security reports and breaking changes.
