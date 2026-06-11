# Source Refresh 清单

## 状态说明

- `active`：当前应优先使用或维护。
- `candidate`：可能纳入，但需要确认权限、范围或可靠性。
- `deprecated`：仍可作为历史背景，但默认不主动使用。
- `blocked`：不可访问、不可使用或用户明确要求屏蔽。

## Sources

说明：本表记录 source instance；Batch A 需要进一步定义可复用的 `source_type`，用于合并治理类型和检索策略。不要为了合并类型而合并具体 source instance。

| Source | 当前状态 | 目标处理 | 备注 |
| --- | --- | --- | --- |
| `pypto` | `active` | 刷新本地镜像并记录 snapshot | 影响 `pypto-architecture` 与多个 skills |
| `pypto-official-docs` | `active` | 确认官网口径和文档 freshness 边界 | 官网对外措辞优先 |
| `pypto-top-level-design-documents` | `active-to-review` | 重新判断 active / candidate 范围 | 用户反馈 agent 很少主动使用 |
| `cann-docs-community-edition` | `active` | 保持非 PyPTO CANN 问题 primary source | 需继续按官网最新版处理 |
| `curated-external-links` | `active-to-review` | 拆分 supporting、official-community-material、deprecated | 不能直接作为 source of truth |
| `pypto-sample-dataset` | `active` | 保持 demo 真实数据 primary source | 后续要与新增运行数据整合 |
| `pypto-tools` | `candidate` | 登记为官方 toolkit source，等待本地路径/权限确认 | 私有仓，不能假设可联网访问 |
| pypto 算子运行数据 | `candidate` | 建立 intake、权限、数据等级和脱敏规则 | 可能成为 demo L1 数据 |
| pypto toolkit 设计稿源文件 | `candidate` | 建立 intake 与可引用边界 | 可能影响 design system 和 demo 准确性 |
| `yinyucheng0601/pto-design-system` | `candidate-active` | 建立手动同步和变更报告流程 | 服务 `.agents/skills/pto-design-system` 与 `07-designsystem/` |
| issues / discussions / PR / FAQ / trouble shooting | `candidate` | Batch A 定义 painpoint-mining source 类型与检索策略 | 用于用户痛点、诉求和 UX 策略分析 |
| web discovery | `candidate` | Batch A 定义何时允许主动发现新 source 以及 claim 校验规则 | 用于 why/how/design/trend 类问题，不直接作为 source of truth |

## Source Type Draft

Batch A 可考虑定义以下 `source_type`。一个 source instance 可以拥有多个 type。

| Source Type | 可能包含的 source instance | 用途 |
| --- | --- | --- |
| `code-source` | `pypto`、`pypto-tools` | 代码事实、实现路径、API / schema / adapter 线索 |
| `official-doc-source` | `pypto-official-docs`、`cann-docs-community-edition` | 官方口径、API、开发指南、工具链说明 |
| `design-intent-source` | `pypto-top-level-design-documents` | 架构意图、设计决策、方向规划 |
| `runtime-artifact-source` | `pypto-sample-dataset`、pypto 算子运行数据 | 真实运行产物、性能/图/日志证据 |
| `demo-evidence-source` | `pypto-sample-dataset`、pypto 算子运行数据、toolkit 设计稿源文件 | demo 真实性、素材选择、联动设计依据 |
| `external-discovery-source` | `curated-external-links`、web discovery | 外部文章、帖子、社区材料的发现和 claim 提取 |
| `user-feedback-source` | issues / discussions / PR / FAQ / trouble shooting | 痛点挖掘、诉求分析、UX 策略输入 |
| `design-system-source` | `yinyucheng0601/pto-design-system`、toolkit 设计稿源文件 | 视觉规范、交互模式、设计系统同步 |
| `toolkit-product-source` | `pypto-tools`、toolkit 设计稿源文件 | Toolkit 能力、产品交互、demo 演进 |

## Clone / Local Mirror Policy Draft

- Batch A 负责制定 clone / local mirror 判断规则，不默认执行 clone。
- 高频、结构化、可检索、需要跨文件理解的 source，倾向建立本地 mirror。
- 私有仓、大仓库、运行数据和设计稿，先按 `manifest` 登记，再由用户确认路径、权限和可引用范围。
- 偶尔查询且在线结构稳定的 source，可保持在线检索。
- supporting article / 社区帖子默认不 clone，只登记链接、claim 和验证状态。
- `pypto` 本体 refresh 归 Batch B。
- `pypto-tools` 的本地路径、mirror、adapter 和 demo 使用策略归 Batch C。
- `yinyucheng0601/pto-design-system` 的本地 mirror、同步和投影策略归 Batch D。

## 下一步

Batch A 中先设计 source governance、source 状态、web discovery、claim policy 和 clone / local mirror policy，再决定哪些 source 进入正式 active registry。
