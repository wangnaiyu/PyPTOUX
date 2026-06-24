# `dyn_topo.txt` Schema Notes

本文记录 `dyn_topo.txt` 作为静态图与运行事件之间桥接表的字段和规则。

## 1. 字段

当前 sample data 与 `PTO-TestData` 中可见表头：

`seqNo,taskId,rootIndex,rootHash,opmagic,leafIndex,leafHash,coreType,psgId,successors`

## 2. 字段作用

| 字段 | 作用 |
| --- | --- |
| `seqNo` | 任务序号 |
| `taskId` | 编码后的任务 ID，可拆成 function / op index |
| `rootIndex` | root function 索引 |
| `rootHash` | Execute Graph 定位 key |
| `opmagic` | Execute Graph 中 CALL op 定位 key |
| `leafIndex` | leaf function 索引 |
| `leafHash` | Block Graph 定位 key |
| `coreType` | 任务所在核类型 |
| `psgId` | root 内调度 / 分组信息 |
| `successors` | 后继任务，用于依赖关系 |

## 3. 使用规则

- 用 `rootHash + opmagic + leafHash` 解释泳道图事件如何跳回计算图。
- 用 `successors` 做任务依赖图，不要只从泳道图事件顺序推断依赖。
- 用 `coreType`、`psgId` 辅助解释事件落在哪类泳道。

## 4. Demo 边界

`dyn_topo.txt` 很适合作为 demo 中不可见或半可见的中间层：用户可以看到“跳转依据”，但不需要直接阅读整张表。
