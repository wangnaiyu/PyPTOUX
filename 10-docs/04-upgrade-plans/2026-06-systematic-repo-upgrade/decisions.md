# 已确认决策

## 2026-06-10 建立任务包工作区

- 决策：建立 `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/` 作为本次系统性升级的 active workbench。
- 原因：任务跨目录、跨 source、跨 skill、跨 session，不能依赖聊天上下文持续管理。
- 影响：后续 session 先读本目录，再按 `status.md` 的 Next Step 继续。

## 2026-06-10 先搭脚手架，不立即修改核心 skills

- 决策：Batch 0 只建立任务包和轻量路由索引，不直接修改 `.agents/skills/*` 的执行逻辑。
- 原因：source governance、私有材料权限、设计系统投影边界仍需进一步确认。
- 影响：Batch A 才正式进入 `pypto-knowledge-source` 和相关规则更新。

## 2026-06-10 `10-docs/04-upgrade-plans/` 的生命周期

- 决策：`10-docs/04-upgrade-plans/` 用作 active workbench；任务完成后先保留为近期审计记录，必要时归档到 `11-archive/upgrade-plans/`。
- 原因：计划目录承载过程状态，不应替代正式规则或知识库。
- 影响：稳定结论必须回写到正式目录，不能只停留在任务包中。

## 2026-06-10 使用 checkpoint 替代 session-end 假设

- 决策：任务包维护不依赖 agent 判断 session 何时结束；改用 checkpoint 触发条件。
- 原因：session 是否结束由用户主观决定，agent 无法可靠预判。
- 影响：完成 batch、完成会影响恢复的子任务、修改计划/决策/source 状态/开放问题、发现阻塞，或用户明确要求收尾时，才更新 `status.md`、`prompts/resume.md` 等状态文件。

## 2026-06-10 Batch prompt 默认先讨论方案再实施

- 决策：Batch A prompt 先要求提出 source governance 方案、影响范围和待确认问题，再修改正式文件。
- 原因：source 优先级、私有仓、运行数据、设计稿权限等仍包含策略判断，直接实施容易过早固化错误规则。
- 影响：下次启动 Batch A 时，先进行方案确认；确认后再更新 `.agents/skills/pypto-knowledge-source` 和 source registry。

## 2026-06-11 Batch A 只制定 clone / local mirror policy

- 决策：Batch A 负责制定 source 审计规则、降级 / 屏蔽规则、web discovery 规则和 clone / local mirror 判断原则，但不默认执行 clone。
- 原因：`github.com/hengliao1972/**`、`yinyucheng0601/pto-design-system`、`gitcode.com/cann/pypto-tools` 等 source 的权限、体量、用途和后续同步方式不同，直接 clone 容易越过 batch 边界。
- 影响：`pypto` refresh 归 Batch B；`pypto-tools` mirror / adapter / demo 使用策略归 Batch C；`pto-design-system` mirror / sync / `07-designsystem` 投影策略归 Batch D。

## 2026-06-11 Batch A 重新定位为 agentic search governance

- 决策：Batch A 不再只做 source governance，而是把 `pypto-knowledge-source` 升级为 agentic search governance。
- 原因：静态知识地图和关键词路由适合 lookup 类问题，但不足以支撑 optimization、workflow-research、trend-research、painpoint-mining、demo-design 和 ux-strategy 类问题。
- 影响：Batch A prompt、plan 和 status 均改为围绕 Intent Mode / Output Mode、evidence strategy、多源探索、claim verification、UX-oriented synthesis 和 source schema 重构展开。

## 2026-06-11 区分 source instance 与 source type

- 决策：Batch A 中需要区分具体来源（source instance）与治理类型（source type）。
- 原因：`pypto-sample-dataset` 与新增算子运行数据、`curated-external-links` 与 web discovery 等存在策略重叠，但权限、状态、路径、可引用性和可追溯性不同。
- 影响：治理后可以合并 source type 和检索策略，但不能合并掉具体 source instance；每个来源仍需保留独立状态、权限、claim policy 和引用边界。

## 2026-06-11 Batch A 先确认 Definition of Done 再用 `/goal` 实施

- 决策：新增 `batch-a-agentic-search-governance-plan.md` 承载 Batch A 的 Plan 确认结果、实施边界和 Definition of Done；在该文件仍为 `pending` 或模板状态时，不直接用 `/goal` 修改核心 skill。
- 原因：Batch A 涉及 source 权限、私有材料、schema 语义和后续 batch 边界；若没有可验证完成标准，`/goal` 容易过早固化不完整方案。
- 影响：后续先在 Plan 模式确认方案并写入该文件；确认无阻塞后，再用 `/goal` 按该文件的 Definition of Done 执行 `.agents/skills/pypto-knowledge-source/` 和 source registry 更新。

## 2026-06-12 Batch A 执行完成

- 决策：按 `batch-a-agentic-search-governance-plan.md` 实施 Batch A，将 `pypto-knowledge-source` 从静态 source routing 升级为 agentic search governance。
- 原因：lookup 之外的 diagnostic、optimization、workflow-research、trend-research、painpoint-mining、demo-design、demo-material 和 ux-strategy 需要多源探索、claim verification 和 UX-oriented synthesis。
- 影响：`.agents/skills/pypto-knowledge-source/SKILL.md` 已改为 Intent Mode / Output Mode / evidence strategy / claim verification / UX synthesis 流程；`.agents/skills/pypto-knowledge-source/references/sources.md` 已按 source schema 重构。

## 2026-06-12 已登记 source 采用保守降权

- 决策：已登记 source 默认不降为 `deprecated` 或 `blocked`；通过 `authority_scope`、`best_for`、`not_for` 和 `claim_policy` 限制访问优先级和事实出口。
- 原因：当前没有足够证据证明已登记 source 应直接废弃或屏蔽，但旧规则容易把 design intent、external links 和 official docs 当成同级事实源。
- 影响：`pypto-top-level-design-documents` 保持 design-intent active，但当前实现事实必须回 `pypto` 校验；`curated-external-links` 保持 discovery/supporting，不作 factual source of truth。

## 2026-06-12 新增候选 source 和 discovery pool

- 决策：登记 `pto-isa`、`cannbot-skills`、`ops-transformer`、`pypto-tools`、`PTO-TestData`、`yinyucheng0601/pto-design-system`、`pypto`、`pypto_top_level_design_documents` 作为候选 mirror set，并把 `gitcode.com/org/cann/repos` 作为 discovery pool。
- 原因：这些仓库可能支撑 PyPTO / CANN / toolkit / runtime data / design system / UX strategy 研究，但 Batch A 不应直接 clone 或确认同步策略。
- 影响：后续相关问题可按 source registry 主动联想到这些候选源；具体 mirror、路径、权限、adapter 和投影策略分别留给 Batch B/C/D。

## 2026-06-12 Batch A 未越过后续 batch 边界

- 决策：Batch A 只更新 search governance、source registry 和任务包 checkpoint；不 clone / refresh，不刷新 `pypto-architecture`，不开始 demo build 或 design system sync。
- 原因：`pypto` refresh、toolkit/runtime data、design system sync 分别有独立权限和边界，必须按后续 batch 处理。
- 影响：下一步进入 Batch B：刷新 `pypto` 本地镜像并更新 `02-knowledge/00-shared/pypto-architecture/`。

## 2026-06-24 建立 pto-isa / ops-transformer / cannbot-skills 本地 mirror

- 决策：允许并完成 `pto-isa`、`ops-transformer`、`cannbot-skills` clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/`，并分别建立 `02-knowledge/00-shared/pto-isa/`、`02-knowledge/00-shared/ops-transformer/`、`02-knowledge/00-shared/cannbot-skills/`。
- 原因：`pto-isa` 需要跨文件检索 ISA / Tile Lib / A5 后端事实；`ops-transformer` 需要支撑 operator workflow 和算子迁移研究；`cannbot-skills` 需要作为 agent-workflow source 支撑技能治理和 CANNBot 工作流借鉴。
- 影响：source registry 已将三者升级为 `active` / `local-mirror`；后续 refresh / fetch 需要记录 snapshot。`cannbot-skills` 仍不作为 PyPTO / CANN factual source。

## 2026-06-17 建立 Batch Handoff Gate

- 决策：完成任一 batch 后，必须准备下一 batch 的 prompt 和 plan shell，并在 `status.md` 记录 `next_batch_prompt`、`next_batch_plan` 和 `next_batch_gate`。
- 原因：Batch A 完成后只更新通用 resume prompt，导致 Batch B 缺少明确启动 prompt、方案承载文件和 preflight 门槛。
- 影响：已新增 `batch-b-pypto-architecture-refresh-plan.md` 和 `prompts/batch-b-pypto-architecture-refresh.md`；后续 batch 完成时必须重复这一 handoff 动作。

## 2026-06-17 Batch B 必须先进行 preflight 讨论

- 决策：Batch B 的 `next_batch_gate` 设为 `discuss-first`，不得直接 refresh 或重写 `pypto-architecture`。
- 原因：Batch B 涉及外部本地镜像、可能的 `fetch` / `pull`、未提交改动保护、snapshot 记录方式和 `overview.md` 信息形态，需要用户先确认。
- 影响：`open-questions.md` 已将 Batch B preflight 问题提升为“启动前必须确认”；`prompts/batch-b-pypto-architecture-refresh.md` 要求先讨论再写 plan。

## 2026-06-17 Batch B refresh 策略采用 read-only mirror hard sync

- 决策：本地 `pypto` 作为 read-only upstream mirror / agent 检索缓存；Batch B 使用 `git fetch --prune` 后 hard sync 到远端默认分支的策略，不使用普通 `git pull`。GitCode 上的正确 sync 目标是 `master`，本轮用 `origin/HEAD` / `origin/master` 对齐。
- 原因：用户通常不在本地 `pypto` mirror 中开发或保留本地修改；hard sync 可避免 merge/rebase 状态，让 snapshot 更接近 upstream。
- 影响：hard sync 前必须检查 tracked worktree；如果 tracked files 有未提交修改，先暂停并汇报。untracked 内容不在本次默认清理范围内，但读取 snapshot 时要避免把 untracked 文件误当 upstream。

## 2026-06-17 Batch B overview 形态和 snapshot 落点

- 决策：`overview.md` 采用“检索地图 + 架构摘要”形态，保留少量来源标注的架构理解正文，但只作为 `orientation_hints`；snapshot 元数据同时写入 `overview.md` 和 `sources.md`。
- 原因：`overview.md` 需要让读者快速判断可信度，同时不能重新变成唯一事实入口；`sources.md` 承载完整 source/snapshot/claim boundary 细节。
- 影响：后续正式修改时，`overview.md` 必须声明使用边界；当前实现事实仍回 `pypto` 源码、文档源码或官方文档校验。

## 2026-06-17 Batch B 执行完成

- 决策：按已确认的 `batch-b-pypto-architecture-refresh-plan.md` 完成 Batch B，刷新 `pypto-architecture`，同步依赖旧 architecture hint 的规则/skills，并准备 Batch C handoff。
- 原因：`pypto` 本地 mirror 已 hard sync 到当前 GitCode `master`，旧 architecture map 中的 snapshot、文档路径和工具路径已经漂移。
- 影响：`02-knowledge/00-shared/pypto-architecture/overview.md` 现在只作为 `orientation_hints`；`sources.md` 记录 snapshot 和 source boundary；`drift.md` 记录本轮已吸收 drift；下一步进入 Batch C preflight。

## 2026-06-23 Batch C PyPTO data source taxonomy

- 决策：保留 `pypto-sample-dataset` 作为本地 active source instance；后续用户放入 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据` 的 PyPTO 相关样例、测试或运行产物继续归入本 source。
- 决策：新增 `pypto-testdata` 作为 candidate / manifest source instance，remote 指向 `https://gitcode.com/zhanghuixin/PTO-TestData`，display name 为 `PTO-TestData`。
- 决策：将 source type `runtime-artifact-source` 重命名为 `pypto-data-source`；`pypto-sample-dataset` 和 `pypto-testdata` 都属于 `pypto-data-source`，并可同时属于 `demo-evidence-source`。
- 决策：移除泛化 source instance `pypto-runtime-data`，不再把“pypto 算子运行数据”作为独立 source lane。
- 原因：`pypto-runtime-data` 与 `pypto-sample-dataset` 的本地 intake 定位重复，容易让 agent 在新增数据材料时误判登记入口；`pypto-data-source` 更贴近本项目对样例、测试和运行产物的统一治理语义。
- 影响：Batch C 后续只围绕 `pypto-sample-dataset`、`pypto-testdata`、`pypto-tools` 和 toolkit design files 继续确认权限、数据等级、manifest、mirror 和 demo 引用规则。

## 2026-06-24 Batch C source governance 完成

- 决策：`pypto-tools` planned mirror root 为 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件`；Batch C preflight 当时未下载或 clone；PyPTOUX 允许记录其文件结构、schema、截图和少量代码片段。
- 决策：`pypto-sample-dataset` 可写回 manifest、摘要、数据等级和 schema；允许抽样或脱敏后的数据进入 PyPTOUX。
- 决策：只有抽样 / 脱敏后的数据，或按 schema 编造并明确标记为 L2 的数据，才可标记为 `share-safe`。
- 决策：`pypto-testdata` 允许 clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件`；数据等级为 L1，权限和可外发边界同 `pypto-sample-dataset`。
- 决策：toolkit 设计稿原始文件不进入 PyPTOUX；本地存放地址为 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/设计文件`；允许记录缩略图、截图和结构摘要。
- 决策：`02-knowledge/00-shared/pypto-toolkit/` 使用 canonical files `overview.md`、`sources.md`、`manifest.md`，且只保留 Toolkit、`pypto-tools` 和 toolkit design inputs。
- 决策：新增 `02-knowledge/00-shared/pypto-data/`，使用 canonical files `overview.md`、`sources.md`、`manifest.md`，承接 `pypto-sample-dataset`、`pypto-testdata`、PyPTO 数据等级和 `share-safe` 规则。
- 原因：Batch C 需要让后续 demo 能引用 Toolkit 能力和 PyPTO data sources，同时避免原始私有材料误入仓库。
- 影响：Batch C 治理结论已回写到 source registry、`pypto-toolkit`、`pypto-data`、`pypto-demo-data-filling` 和任务包 checkpoint；下一步进入 Batch D preflight，不自动 clone 外部仓库。

## 2026-06-24 Batch C mirrors cloned

- 决策：按用户要求 clone `pypto-tools` 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools`。
- 决策：按用户要求 clone `pypto-testdata` / `PTO-TestData` 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData`。
- Snapshot：`pypto-tools` branch `master`，commit `5a4fae5cb574276cedb01880f649011d7f09ca61`，commit date `2026-06-24T14:11:17+08:00`。
- Snapshot：`PTO-TestData` branch `main`，commit `9303ae914f4bc28908b41c6dfb11b93b3fdcbc15`，commit date `2026-06-17T16:16:59+08:00`。
- 原因：用户已确认 GitCode SSH key，并要求将两个 source clone 到本地 mirror。
- 影响：source registry、`pypto-toolkit` 和 `pypto-data` 已从 planned / candidate mirror 更新为 active local mirror；后续 refresh 需单独记录 snapshot。

## 2026-06-24 Batch D preflight 策略确认

- 决策：整体采用 `yinyucheng0601/pto-design-system` 本地 mirror + 手动触发 sync / audit + diff / change report 的策略。
- 决策：允许在 `/goal` 阶段 clone `yinyucheng0601/pto-design-system` 到推荐 mirror path `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-design-system`。
- 决策：`07-designsystem/` 作为 stable human-facing projection，只承载稳定投影，不承载 agent-facing preview、实验 pattern 或上游全量 mirror。
- 决策：`07-designsystem/` 的人类阅读入口倾向采用更可视化的静态 HTML portal；Markdown 和投影源码仍保留，用于搜索、diff、审计和 implementation contract。
- 决策：`.agents/skills/pto-design-system` 继续作为 agent-facing 主入口，承载可执行 tokens、CSS、patterns、preview gate 和 agent workflow。
- 决策：允许投影到 `07-designsystem/` 的内容包括 tokens 摘要、token CSS、CSS contract、approved pattern specs、approved pattern code、usage docs、preview gate 规则、source sync / change report 规则、稳定截图或缩略图、`index.html` 和 changelog；上游全量源码、实验 preview、未批准 pattern 和大量原始资产默认不投影。
- 决策：每次设计系统同步需要生成 diff / change report。
- 决策：本轮先确认和更新 plan，暂不落地同步脚本；首次投影除了更新文档层，也复制 token CSS 或 approved pattern code。
- 决策：首次投影 pattern code 时，复制全部当前已注册 approved patterns。
- 决策：Batch D `/goal` 执行顺序为：先 clone / inspect 上游 `yinyucheng0601/pto-design-system` 到本地 mirror，再系统性更新 `.agents/skills/pto-design-system`（如需更新），最后投影 `07-designsystem/`。
- 原因：Batch D 需要让上游设计系统可审计地进入 PyPTOUX，同时保持 agent 执行入口与人类稳定设计系统目录的边界清晰。
- 影响：`batch-d-design-system-sync-strategy-plan.md` 已进入 draft-ready-for-user-confirmation；正式修改 source registry、PTO skill 和 `07-designsystem/` 前仍需用户确认 plan。

## 2026-06-24 Batch D 执行完成

- 决策：clone `yinyucheng0601/pto-design-system` 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-design-system`。
- Snapshot：branch `main`，commit `e26a85628658fa2894aba52e95e335cf60f8dfdc`，commit date `2026-06-16T17:35:58+08:00`。
- 决策：以该 snapshot 更新 `.agents/skills/pto-design-system` 的 agent-facing bundle，吸收 Workflow C、pattern-first rules、retrofit container audit、新增 approved patterns、assets、scripts 和 generated token artifacts；同时保留 PyPTOUX project integration 说明。
- 决策：`07-designsystem/` 首次投影采用静态 `index.html` portal + Markdown / CSS / pattern code 共存方式。
- 决策：首次投影复制 token CSS、UI CSS 和全部当前已注册 approved pattern code，并生成 pattern `overview.md`。
- 决策：本轮不落地同步脚本，只写 source sync 规则、change report template 和实际 change report。
- 原因：先让上游设计系统成为可检索、可审计的 source，再让 agent-facing skill 获得最新执行规则，最后为人类审阅提供稳定投影。
- 影响：source registry 已将 `yinyucheng0601/pto-design-system` 更新为 `active` / `local-mirror`；`07-designsystem/` 已具备 human-facing portal、token / UI / pattern projection 和 source sync governance；下一步进入 Batch E rule consolidation。
