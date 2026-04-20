# Repository Structure Convention

## Naming

- 目录名统一使用英文、kebab-case。
- 文档文件名尽量简短稳定，如 `overview.md`、`sources.md`、`glossary.md`、`prd.md`。
- 文档正文和标题默认优先使用中文。
- 英文主要用于目录名、文件名、代码标识、路径名和少量不宜翻译的技术术语。

## Placement Rules

- `knowledge/`：业务知识、术语、学习总结、框架理解
- `insights/`：竞品观察、体验分析、视觉参考、模式拆解
- `uxdesign/`：需求、信息架构、交互方案、视觉方案、评审材料
- `prototypes/`：交互 demo 与原型演进记录
- `tools/`：为原型和设计流程服务的工具
- `designsystem/`：视觉基础、组件规则和可复用 UI

更细的判断树见 [content-routing.md](/Users/wny/Documents/1%20项目%20Projects/PyPTOUX/docs/conventions/content-routing.md)。

## Shared vs Topic

- 放进具体课题目录：
  只服务某一个清晰课题或功能模块的内容
- 放进 `shared/`：
  会被多个课题反复复用的框架、方法、模式、公共场景

## Prototype Rules

- `experiments/html/`：可直接打开的 HTML demo
- `experiments/jsx/`：Claude 生成或手工整理的 JSX demo
- `snapshots/`：截图、录屏、阶段快照
- `prompts/`：AI 协作提示词与上下文
- `notes/`：目标、修改记录、待办、验证结论
- `app/`：当原型进入更完整工程化阶段时使用

## Source Traceability

- 研究型目录建议至少包含 `overview.md`
- 有外部依据的内容建议补 `sources.md`
- 术语密集的目录建议补 `glossary.md`

## Design System Rule

- 新 demo 默认从 `designsystem/` 获取视觉基线
- 允许早期实验偏离，但应记录偏离原因
- 进入 `app/` 的原型优先复用 `designsystem/components/ui/`
