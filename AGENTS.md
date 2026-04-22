# PyPTOUX AGENTS

这份文件是 `PyPTOUX` 仓库的项目级 agent 入口，用于回答三类问题：

1. 这个仓库里有哪些 agent skills
2. 遇到不同任务时应该先用哪个 skill
3. 这个项目有哪些需要长期遵守的协作约定

## 1. 项目概况

- Project name: `PyPTOUX`
- Local repository: `/Users/wny/Documents/1 项目 Projects/PyPTOUX`
- GitHub repository: `git@github.com:wangnaiyu/PyPTOUX.git`
- Default branch: `main`

## 2. 如何理解这里的 skills

- 本仓库的项目级 skills 位于 `.agents/skills/`
- 每个 skill 的正式说明都在对应目录下的 `SKILL.md`
- 需要细节时，再按 `SKILL.md` 的指引读取 `references/` 下的辅助文件
- 不要默认把 `.agents/` 里的所有文件全读一遍；应按任务触发最匹配的 skill

推荐的使用方式：

1. 先判断任务类型
2. 再选最匹配的 skill
3. 只读取必要的 `SKILL.md` 和 reference 文件
4. 如果一个任务跨多个能力，再按顺序组合 skills，而不是把规则揉在一起

## 3. Skill 索引

### 3.1 `pyptoux-content-router`

- 路径：`.agents/skills/pyptoux-content-router/SKILL.md`
- 用途：决定新内容该放哪里、用什么稳定文件名、如何更新索引
- 适用场景：
  - 新建 `02-knowledge/`、`03-insights/`、`04-uxdesign/`、`05-prototypes/`、`06-tools/`、`07-designsystem/` 内容
  - 重组文档目录
  - 判断新增 topic 是否应该放进 `00-shared/`

### 3.2 `pyptoux-git-github`

- 路径：`.agents/skills/pyptoux-git-github/SKILL.md`
- 用途：处理分支、提交、推送、PR 和项目内 Git/GitHub 约定
- 适用场景：
  - 创建工作分支
  - 提交本地更改
  - 推送到 GitHub
  - 创建或整理 PR

### 3.3 `pypto-knowledge-source`

- 路径：`.agents/skills/pypto-knowledge-source/SKILL.md`
- 用途：当任务需要查询 `PyPTO` 业务知识、框架事实、外部 source-of-truth 信息时使用
- 适用场景：
  - 回答 `PyPTO` / `CANN` / sample engineering 相关问题
  - 从登记的外部来源检索信息
  - 将提炼后的结论沉淀到 `02-knowledge/`

### 3.4 `pypto-demo-data-filling`

- 路径：`.agents/skills/pypto-demo-data-filling/SKILL.md`
- 用途：用真实 `PyPTO` 代码和样例数据填充 demo 素材
- 适用场景：
  - 三栏联动 demo
  - 代码 -> 图 -> 性能说明型 demo
  - 需要把 `program.json`、`merged_swimlane.json`、`Pass_*`、源码片段组合成演示内容

## 4. 常见任务怎么选 skill

| 任务 | 先用什么 | 再用什么 |
| --- | --- | --- |
| 新增或整理仓库文档 | `pyptoux-content-router` | 按需要补 `pyptoux-git-github` |
| 查 `PyPTO` 业务知识并沉淀结论 | `pypto-knowledge-source` | `pyptoux-content-router` |
| 做 `PyPTO` demo 并填真实素材 | `pypto-demo-data-filling` | 如需先查事实，先用 `pypto-knowledge-source` |
| 提交、推送、开 PR | `pyptoux-git-github` | 无 |
| 查到新业务事实后写回知识库 | `pypto-knowledge-source` | `pyptoux-content-router` |

## 5. 项目级协作约定

### 5.1 内容与写作

- 新写的说明性内容默认优先中文
- 目录名、稳定文件名、命令、路径、代码标识保持英文
- 尽量复用 canonical filenames，如 `overview.md`、`sources.md`、`glossary.md`、`prd.md`
- 新增 topic 或 shared framework 时，记得同步更新 `10-docs/03-indexes/`

### 5.2 `PyPTO` 业务知识检索

- `PyPTO` 相关业务知识任务优先使用 `pypto-knowledge-source`
- 先参考 `02-knowledge/00-shared/pypto-architecture/overview.md` 缩小查询范围
- 再到最匹配的来源检索信息
- 结论需要沉淀回 `02-knowledge/` 对应主题；没有合适主题时新建
- 对上游 `pypto` 仓库或样例数据里的真实文件名、路径、字段键、索引键、trace key 保持原样，不要为了统一术语口径而改写
- 可统一的是我们自己的解释性正文；不可改写的是用于追溯上游产物的 literal，例如 `program.json`、`*_ROOT.json`、`rootHash`、`callOpMagic`、`leafHash`

当前高频来源包括：

- `pypto` 本地镜像：`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto`
- PyPTO 官方文档：[quick_start](https://pypto.gitcode.com/tutorials/introduction/quick_start.html)
- 样例数据目录：`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据`

### 5.3 `pypto` refresh 规则

- 默认每个自然天最多 clone / refresh 一次 `pypto`
- 不要在同一天内因为多个 session 或多个问题反复 clone
- 如果本地镜像存在未提交改动，不要直接覆盖，先确认

### 5.4 Demo 素材规则

- `PyPTO` demo 优先使用真实代码、真实图产物、真实泳道图和真实日志
- 不要把 mock 数据伪装成真实运行结果
- 优先保证“可追溯”，再追求“好看”
- 如果用到样例数据，优先查看 `02-knowledge/00-shared/pypto-sample-datasets/overview.md`
- demo 文案允许统一术语口径，但引用上游真实产物时仍应保留原始路径名、文件名和字段名

### 5.5 Git / GitHub

- Git 操作前先确认工作目录位于本仓库
- `pull` / `push` 前先确认 `origin`
- 本机已安装 `gh`
- 若 GitHub connector 不可用或权限异常，优先回退到 `gh`

## 6. 相关入口文件

- `.agents/notes.md`
- `.agents/skills/pyptoux-content-router/SKILL.md`
- `.agents/skills/pyptoux-git-github/SKILL.md`
- `.agents/skills/pypto-knowledge-source/SKILL.md`
- `.agents/skills/pypto-demo-data-filling/SKILL.md`
- `10-docs/01-conventions/agent-writing-style.md`
- `10-docs/01-conventions/content-routing.md`
