# Business Knowledge Sources | 业务知识源登记

这份文件是常用 business knowledge sources 的注册表（registry）。

## 选择规则 | Source Selection Rule

- 优先选择 scope 与用户问题最匹配的 source。
- 如果有多个候选来源，优先使用该主题下标记为 primary 的 source。
- 先判断该 source 今天是否已经 refresh 过；只有当天尚未 refresh 时，才执行 refresh。
- 如果本地 checkout 有未提交改动，不要直接替换，先征求确认。
- `PyPTO` 相关问题，优先参考 `02-knowledge/00-shared/pypto-architecture/overview.md` 来缩小查询范围，再决定要进入哪类目录。

## 已登记来源 | Registered Sources

### pypto

- Role | 角色：`CANN`、`PyPTO`、sample engineering 及相近业务知识的 primary source。
- Remote | 远端：`https://gitcode.com/cann/pypto`
- Local mirror | 本地镜像：`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto`
- Search map | 检索地图：优先参考 `02-knowledge/00-shared/pypto-architecture/overview.md` 缩小到 `docs/`、`examples/`、`models/`、`python/pypto/`、`framework/src/` 等更具体范围。
- Refresh rule | 刷新规则：默认每个自然天最多 clone / refresh 一次 `pypto`；如果当天已经 refresh 过，后续检索直接复用当天的本地镜像。
- Overwrite guard | 覆盖保护：如果当前本地镜像存在未提交改动，替换前先询问用户。
- Search preference | 检索偏好：优先查看刷新后镜像中的 sample code、docs、readmes、configuration、scripts，以及相邻工程资料。

### pypto-official-docs

- Role | 角色：PyPTO 官方教程、onboarding 流程、文档型解释的重要 secondary source。
- Remote | 远端：`https://pypto.gitcode.com/tutorials/introduction/quick_start.html`
- Local mirror | 本地镜像：默认无；需要时直接浏览在线文档。
- Refresh rule | 刷新规则：检索时把在线文档站点视为当前版本。
- Overwrite guard | 覆盖保护：不适用，因为默认没有本地镜像。
- Priority note | 优先级说明：如果官方文档与 `pypto` GitCode 仓库冲突，默认优先仓库版本的 freshness；但如果任务明确要求官方表述或教程步骤，则以官方文档为准。
- Search preference | 检索偏好：`quick-start`、tutorials、conceptual explanations、official usage guidance。

### pypto-sample-dataset

- Role | 角色：PyPTO 框架算子跑出来的样例数据集，是 demo 填充、样例结果理解、真实输入输出示意的重要业务来源。
- Remote | 远端：无默认远端；当前以本地数据目录为准。
- Local mirror | 本地镜像：`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据`
- Current known structure | 当前已知结构：已确认存在 `three-view/` 数据集，内部包含 `code/`、`output_*/`、`program.json`、`merged_swimlane.json`、`topo.json`、`run.log` 等适合联动 demo 的真实产物。
- Refresh rule | 刷新规则：默认直接使用当前本地数据目录；只有用户明确提供了新的同步方式或更新来源时，才改变这条规则。
- Overwrite guard | 覆盖保护：不主动改写该目录内容；如果后续需要清理、替换或批量写入，先征求确认。
- Priority note | 优先级说明：当任务涉及 demo 填充、样例结果展示、输入输出示例或真实数据形态时，优先把这份样例数据与 `pypto` 工程里的真实代码结合起来使用。
- Search preference | 检索偏好：样例输入输出、算子运行结果、可视化演示素材、demo 填充值，以及与 `pypto` 示例代码相互印证的数据文件；优先关注 `code/`、`output_*/program.json`、`merged_swimlane.json`、`topo.json`、`run.log` 一类产物。

## 维护规则 | Maintenance Rule

- 新的常用业务来源，统一在这里新增 section。
- 每个新 source 至少写清楚：role、remote、local mirror、refresh rule、overwrite guard。
