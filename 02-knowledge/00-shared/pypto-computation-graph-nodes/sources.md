# PyPTO 计算图节点显示参数 Sources

本文登记 `pypto-computation-graph-nodes` 主题的来源。

## Primary Sources

| 类型 | 名称 | 链接或定位 | 用途 |
| --- | --- | --- | --- |
| 官方文档 | `查看计算图.md` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/computation_graph/查看计算图.md` | 确认 `Tensor Graph`、`Tile Graph`、`Block Graph`、`Execute Graph` 的官方节点类型和节点显示参数 |

## Supporting Sources

| 类型 | 名称 | 链接或定位 | 用途 |
| --- | --- | --- | --- |
| 样例产物 | `Pass_02_ExpandFunction/*.json` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/Pass_02_ExpandFunction/` | 辅助确认 `Tensor Graph` 真实字段，如 `opcode`、`opmagic`、`semantic_label` |
| 样例产物 | `Pass_14_GraphPartition/*.json` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/Pass_14_GraphPartition/` | 辅助确认 `Tile Graph` 真实字段，如 `mem_type`、`tile`、`subgraphid` |
| 样例产物 | `Pass_35_CodegenPreproc/*_ROOT.json` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/Pass_35_CodegenPreproc/` | 辅助确认 `Execute Graph` 的 `CALL` 字段，如 `opcode`、`opmagic`、`semantic_label`、`calleehash` |
| 样例产物 | `Pass_35_CodegenPreproc/*_LEAF_program_id_*.json` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/Pass_35_CodegenPreproc/` | 辅助确认 `Block Graph` 的真实字段和代表性 `opcode` |

## Notes

- 本主题以官方文档的节点类型和显示参数为准。
- 样例 JSON 只用于确认真实产物中的可追溯字段，不替代官方默认显示参数。
- 官方文档引用的截图文件在当前本地镜像中是 Git LFS pointer，不采纳为视觉样式依据。
- 本主题不记录颜色、布局、圆角、卡片样式或其他视觉规范。
