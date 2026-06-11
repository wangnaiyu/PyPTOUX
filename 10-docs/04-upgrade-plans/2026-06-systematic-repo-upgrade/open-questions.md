# 待确认问题

## Source Governance

- `pypto-tools` 本地镜像计划放在哪里？是否已经下载？
- `pypto-tools` 是否允许本仓库记录文件结构、schema、截图或代码片段？
- 已登记的 `github.com/hengliao1972/**` 中哪些仍然 active？哪些应降级为 candidate 或 deprecated？
- `cann.csdn.net/**` 是否继续作为 official-community-material？是否需要限定只作 supporting source？
- 是否存在应完全屏蔽的旧来源或误导性来源？
- 哪些已登记 source 已经过时，需要从 `active` 降级为 `deprecated`？
- 哪些 source 应完全 `blocked`，不允许 agent 主动检索或引用？
- 是否有新的业务知识源需要加入 Batch A 的候选清单？

## Clone / Local Mirror Policy

- `github.com/hengliao1972/**` 是否需要建立本地 mirror 供 agent 跨文件检索？
- 如果建立本地 mirror，默认放在仓库外哪个位置？是否允许 refresh？
- `yinyucheng0601/pto-design-system` 是否需要本地 mirror，还是只在 Batch D 设计同步机制时处理？
- `gitcode.com/cann/pypto-tools` 是否已经有本地下载位置？是否允许 agent 读取？
- 对私有仓或大仓库，是否统一采用 `manifest` 先登记、后确认路径和权限的方式？
- issue / discussion / PR / FAQ 类 source 是否需要本地导出快照，还是保持在线检索？

## PyPTO Architecture

- 刷新 `pypto` 本地镜像时，是否允许直接 pull / fetch？
- 当前本地 `pypto` 镜像是否可能有未提交改动需要保留？
- 是否希望 `pypto-architecture` 只做检索地图，还是也保留架构理解正文？

## Toolkit And Runtime Data

- pypto 算子运行数据是否允许进入本仓库？
- 如果允许，进入仓库的是原始数据、抽样数据、脱敏数据，还是只进入 manifest？
- 哪些运行数据可以标记为 `share-safe`？
- toolkit 设计稿源文件是否允许进入本仓库？
- 如果设计稿不入仓，是否允许记录缩略图、截图或结构摘要？

## Design System

- 从 `yinyucheng0601/pto-design-system` 更新时，是希望手动触发脚本、人工 copy，还是维护一个上游镜像？
- `07-designsystem/` 是否只承载稳定投影，不承载 agent-facing preview 和实验 pattern？
- `.agents/skills/pto-design-system` 是否继续作为 agent 使用的主入口？

## Collaboration

- Claude 是否允许修改本任务包中的 `status.md` 或只允许追加 review notes？
- 是否需要把本任务包规则同步进 Claude 侧入口文件？
