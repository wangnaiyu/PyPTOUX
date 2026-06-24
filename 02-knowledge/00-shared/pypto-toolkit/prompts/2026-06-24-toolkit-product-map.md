# Prompt: Toolkit product capability map

Use this prompt to reproduce the 2026-06-24 `pypto-toolkit` product map update.

```md
Update `02-knowledge/00-shared/pypto-toolkit/` after discussing how to analyze the local `pypto-tools` mirror.

User decisions:

- Treat `pypto-toolkit` as a product capability map and demo interaction baseline, not a full VS Code plugin development manual.
- Use `pypto-tools` to explore new interactions for PyPTOUX demos.
- Treat the `pypto-tools` run-data model as first-class knowledge and start by adding it to `overview.md`.
- Document code / compute graph / swimlane linkage as a separate mechanism under the same topic.
- Mark `src/boot-mock-data/` as `toolkit fixture / schema example`; do not directly treat it as L1 sample data. If later extracted as demo data, route data-level and share-safe decisions to `02-knowledge/00-shared/pypto-data/`.
- Add VS Code plugin capability entry points as `feature-map.md`.
- Include accuracy report / OpCheck, memory visualization and `perf_swimlane.json` conversion as extension capabilities.
- Follow a medium-first, deeper-later writeback strategy.

Source evidence to inspect:

- `pypto-tools/vscode_plugins/pypto_toolkit/package.json`
- `pypto-tools/vscode_plugins/pypto_toolkit/README.md`
- `src/command/registerCommand.ts`
- `src/view/routes.ts`
- `src/services/run-data/utils/scan-run-data.ts`
- `src/services/run-data/utils/scan-output.ts`
- `src/types/workspace/output.ts`
- `src/view/threeColumnEntry.ts`
- `src/view/servers/three-column-server.ts`
- `src/converter/perfSwimlaneConverter.ts`
- `src/handler/memoryTraceHandler.ts`
- `src/view/servers/opcheck-server.ts`
- `src/boot-mock-data/`

Expected writeback:

- Update `overview.md` with product scope, run-data model, extension capabilities and fixture ownership.
- Add `feature-map.md` for product entries, routes, main capabilities and extension capabilities.
- Add `linkage-mechanism.md` for code-compute-swimlane linkage.
- Update `sources.md` with code evidence paths.
- Update `manifest.md` with `toolkit-boot-fixture`.
- Update the daily note and this reproducible prompt.

Do not clone or fetch external repositories, copy raw fixture data into PyPTOUX, copy raw design files, or build a prototype in this task.
```
