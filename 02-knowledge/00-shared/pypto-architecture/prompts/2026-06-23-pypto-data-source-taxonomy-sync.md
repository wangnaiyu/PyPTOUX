# Prompt: PyPTO data source taxonomy sync

Use this prompt to reproduce the small architecture orientation terminology sync from 2026-06-23.

```md
In PyPTOUX, sync `02-knowledge/00-shared/pypto-architecture/overview.md` and `sources.md` with the Batch C preflight source taxonomy:

- Keep `pypto-sample-dataset` as the active local source instance for PyPTO sample/test/runtime data under `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据`.
- Add `pypto-testdata` as the source id for the GitCode `PTO-TestData` candidate / manifest source.
- Rename source type `runtime-artifact-source` to `pypto-data-source`.
- Remove `pypto-runtime-data` as an independent source instance.
- Avoid wording that makes generic "pypto runtime data" look like a standalone source lane.

Only update architecture orientation wording where it points to downstream source governance. Do not refresh the `pypto` mirror, clone external repos, copy data files, or modify demo prototypes.
```
