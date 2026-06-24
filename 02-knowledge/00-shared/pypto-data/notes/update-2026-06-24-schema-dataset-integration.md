# 2026-06-24 PyPTO data schema / dataset integration

## Owner

- owner: Codex
- status: applied
- decision: consolidate `pypto-sample-datasets` and `pypto-computation-graph-nodes` into `pypto-data`

## User Confirmed Decisions

- `pypto-data` 的首要用途是“数据治理 + schema/rules 总入口”，demo 找素材作为第二层能力。
- schema / rules 按 artifact/schema family 沉淀。
- dataset / scenario 只做索引和 demo 用途说明。
- source instance 负责权限、数据等级、`share-safe` 和写回边界。
- 采用多文件、按问题检索的信息结构。
- `PTO-TestData/mix/fake_testcase` 默认按构造测试数据处理，标为 L2 / synthetic-testcase。

## Files Updated

- `overview.md`
- `manifest.md`
- `sources.md`
- `schemas/*.md`
- `datasets/*.md`
- `AGENTS.md`
- `.agents/skills/pypto-demo-data-filling/SKILL.md`
- `10-docs/03-indexes/content-map.md`
- `10-docs/03-indexes/shared-frameworks.md`
- `04-uxdesign/03-ascend-hardware-architecture/interaction-spec.md`

## Migration

- `02-knowledge/00-shared/pypto-sample-datasets/overview.md` -> `02-knowledge/00-shared/pypto-data/datasets/three-view.md`
- `02-knowledge/00-shared/pypto-computation-graph-nodes/overview.md` -> `02-knowledge/00-shared/pypto-data/schemas/computation-graph-nodes.md`
- Old topic files were removed after migration.

No external clone, fetch or raw data copy was performed.
