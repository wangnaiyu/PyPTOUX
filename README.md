# PyPTOUX

PyPTOUX 是围绕 PyPTO Toolkit 的 UX 主工作仓库，用来持续保存三类核心资产：

- 业务理解与知识沉淀
- 体验洞察与设计输出
- 可交互原型、辅助工具与设计系统

这个仓库不是传统的纯代码仓库，而是一个面向设计工作流的长期工作台。目录设计遵循两个原则：

- 顶层按工作流分层
- 各层内部按 `shared/` 与具体课题并行组织

## Top-Level Structure

```text
PyPTOUX/
├── inbox/         # 临时输入区
├── knowledge/     # 业务理解与学习沉淀
├── insights/      # 竞品与跨域体验洞察
├── uxdesign/      # UX 设计输出
├── prototypes/    # HTML / JSX / app 原型
├── tools/         # 内部辅助工具
├── designsystem/  # 仓库级设计系统
├── assets/        # 截图、图标、导出资源
├── references/    # 外部资料来源索引
├── docs/          # 规范、模板、索引
└── archive/       # 冻结或已归档内容
```

## Working Rules

- 能明确归属于某个课题的内容，放到对应课题目录下。
- 会被多个课题复用的共性框架、方法、模式，放到各层的 `shared/` 下。
- 原型默认保留在本仓库内持续演进，只有明确产品化后再拆分。
- 研究内容以“提炼后的理解 + 可追溯来源”保存，不做大规模原始资料镜像。
- 所有 demo 默认应逐步接入 `designsystem/` 作为视觉基线。
- 在 PyPTOUX 仓库内新增文档、说明、模板与分析内容时，默认优先使用中文写作；英文主要保留给目录名、稳定文件名、代码标识和少量必要术语。

## Key Entry Points

- 仓库规则见 [docs/conventions/repository-structure.md](/Users/wny/Documents/1%20项目%20Projects/PyPTOUX/docs/conventions/repository-structure.md)
- 内容路由规则见 [docs/conventions/content-routing.md](/Users/wny/Documents/1%20项目%20Projects/PyPTOUX/docs/conventions/content-routing.md)
- 模板见 [docs/templates](/Users/wny/Documents/1%20项目%20Projects/PyPTOUX/docs/templates)
- 索引见 [docs/indexes/README.md](/Users/wny/Documents/1%20项目%20Projects/PyPTOUX/docs/indexes/README.md)
- 工具说明见 [tools/README.md](/Users/wny/Documents/1%20项目%20Projects/PyPTOUX/tools/README.md)
- 设计系统说明见 [designsystem/README.md](/Users/wny/Documents/1%20项目%20Projects/PyPTOUX/designsystem/README.md)
- 项目级 skill 见 [.agents/skills/pyptoux-content-router/SKILL.md](/Users/wny/Documents/1%20项目%20Projects/PyPTOUX/.agents/skills/pyptoux-content-router/SKILL.md)
