# Business Knowledge Sources | 业务知识源登记

这份文件是常用 business knowledge sources 的注册表（registry）。

## 选择规则 | Source Selection Rule

- 优先选择 scope 与用户问题最匹配的 source。
- 如果有多个候选来源，优先使用该主题下标记为 primary 的 source。
- 正式搜索前，先 refresh 已选 source 的本地镜像。
- 如果本地 checkout 有未提交改动，不要直接替换，先征求确认。

## 已登记来源 | Registered Sources

### pypto

- Role | 角色：`CANN`、`PyPTO`、sample engineering 及相近业务知识的 primary source。
- Remote | 远端：`https://gitcode.com/cann/pypto`
- Local mirror | 本地镜像：`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto`
- Refresh rule | 刷新规则：检索前重新 clone 最新仓库到本地镜像位置，并替换旧的 `pypto` checkout。
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

## 维护规则 | Maintenance Rule

- 新的常用业务来源，统一在这里新增 section。
- 每个新 source 至少写清楚：role、remote、local mirror、refresh rule、overwrite guard。
