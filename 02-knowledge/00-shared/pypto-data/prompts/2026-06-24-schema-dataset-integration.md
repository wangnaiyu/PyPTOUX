# Prompt: PyPTO data schema / dataset integration

Use this prompt to reproduce the 2026-06-24 `pypto-data` schema and dataset integration.

```md
Consolidate `02-knowledge/00-shared/pypto-sample-datasets` and `02-knowledge/00-shared/pypto-computation-graph-nodes` into `02-knowledge/00-shared/pypto-data`.

User decisions:

- `pypto-data` is the primary entry for data governance and schema/rules.
- Demo material lookup is a secondary use case.
- Organize schema / rules by artifact/schema family.
- Organize data lookup by dataset / scenario.
- Manage permissions, data level, share-safe, and writeback by source instance.
- Use a multi-file, searchable structure:
  - `overview.md`
  - `manifest.md`
  - `sources.md`
  - `schemas/*.md`
  - `datasets/*.md`
  - `notes/`
  - `prompts/`
- Treat `PTO-TestData/mix/fake_testcase` as constructed test data: L2 / synthetic-testcase, even though the files are traceable to the `pypto-testdata` source.

Required writeback:

- Update `pypto-data/overview.md` with the new information architecture.
- Update `pypto-data/manifest.md` with data role rules.
- Update `pypto-data/sources.md`.
- Add schema family docs for:
  - `program.json`
  - `merged_swimlane.json` / traceEvents
  - `perf_swimlane.json`
  - `dyn_topo.txt`
  - PMU / msprof
  - Mix `syncEvents`
  - computation graph node display parameters
- Add dataset docs for:
  - local three-view
  - local A5 PMU G2
  - PTO-TestData catalog
- Remove old active topic files after migrating content.
- Update active references in AGENTS, project skill docs, and indexes.

Do not clone or fetch external repositories and do not write raw external data into PyPTOUX.
```
