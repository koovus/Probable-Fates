---
name: Dependency remediation
description: pnpm audit behavior and compatibility precautions in this workspace.
---

Running `pnpm audit --fix` from nested packages, including unused skill-template directories, targets the ancestor workspace and writes overrides to its shared configuration.

**Why:** The command reports that it changed package.json, but actually changes the workspace configuration here. Its generated `>=` overrides can also cross major versions.

**How to apply:** Inventory all nested manifests first and honor per-directory audit requests, but inspect the actual changed files. Consolidate overlapping advisory fixes and bound replacement versions to compatible release lines where possible. Explicitly test any necessary major upgrade.
