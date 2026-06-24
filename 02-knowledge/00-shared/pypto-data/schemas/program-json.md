# `program.json` Schema Notes

本文记录 `program.json` 作为 PyPTO 图结构主入口时的字段、使用规则和 demo 取材边界。

## 1. 适用范围

`program.json` 常用于控制流、计算图总入口和三栏联动。当前已在本地 sample data 与 `PTO-TestData/threeColumn/ffn_dense/` 中观测到。

## 2. 顶层字段

当前观测到的顶层字段包括：

- `version`
- `entryhash`
- `functions`
- `curr_funcmagic`
- `enable_cvfuse`
- `pass_thread_num`

其中 `entryhash` 是入口函数 hash，`functions` 是函数 / 图节点集合。

## 3. `functions[*]`

当前观测到的常见字段包括：

- `rawname`
- `funcmagic`
- `func_magicname`
- `hash`
- `functype`
- `graphtype`
- `operations`
- `tensors`
- `rawtensors`
- `incasts`
- `outcasts`
- `global_tensors`
- 若干编译 / 调度配置字段，例如 `_funcid`、`_rawid`、`_total_subgraph_count`

## 4. `operations[*]`

当前观测到的常见字段包括：

- `opcode`
- `opmagic`
- `semantic_label`
- `calleehash`
- `ioperands`
- `ooperands`
- `subgraphid`
- `latency`
- `tile`
- `sync_queue`
- `attr`

`semantic_label` 是三栏联动的关键解释层。真实样例中可见字符串数组形态；`pypto-tools` 三栏联动逻辑还支持对象形态，其中可能包含 filename / lineno / label。

## 5. 使用规则

- 用 `entryhash` 找入口函数。
- 用 `hash`、`funcmagic`、`func_magicname` 追踪函数与图文件。
- 用 `operations[*].opmagic` 与泳道图 `event-hint` 中的 `callOpMagic` 对齐。
- 用 `semantic_label` 做代码、图和性能事件的用户可读连接。

## 6. Demo 边界

- 不要把未观测字段写成稳定 schema。
- 不要为了展示统一术语而改写 `opmagic`、`semantic_label`、`entryhash` 等 literal。
- 如果从 `program.json` 抽样入仓，需记录 source、数据等级和抽样规则。
