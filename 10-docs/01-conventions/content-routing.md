# Content Routing Convention

这份文档定义 PyPTOUX 仓库内新增内容时的默认放置规则、命名规则和索引更新动作。

## 0. Language Default

在 PyPTOUX 仓库里新增内容时，默认优先使用中文写作：

- 正文、标题、说明、分析、总结、模板内容 -> 优先中文
- 目录名、稳定文件名、代码标识、路径名 -> 保持英文
- 少量常见技术名词如 `HTML`、`JSX`、`PRD`、`UX` 可保留英文

除非用户明确要求英文，或该内容本身必须以英文表达更准确，否则不要默认写成英文说明文档。

## 1. First Decide: Content Type

按“这份内容主要解决什么问题”来归类：

- 解释 PyPTO、算子开发、编译链路、术语、业务机制
  -> `02-knowledge/`
- 拆解竞品、参考案例、交互亮点、视觉灵感、跨域心智模型
  -> `03-insights/`
- 形成正式设计输出，如 PRD、UX 分析、流程、信息架构、视觉方案
  -> `04-uxdesign/`
- 生成或迭代交互 demo、前端验证稿、HTML/JSX 原型
  -> `05-prototypes/`
- 为原型或工作流提供辅助能力，如 JSX 预览器、转换器、启动脚本
  -> `06-tools/`
- 定义仓库级视觉基线、组件规范、tokens、可复用 UI
  -> `07-designsystem/`
- 保存截图、导出物、图标、视频等静态成果
  -> `08-assets/`
- 保存外部来源索引、资料出处、链接表
  -> `09-references/`
- 内容尚未整理完成，暂时归档
  -> `01-inbox/`
- 内容已废弃或冻结，但仍希望保留
  -> `11-archive/`
- 面向 GitHub Pages 的稳定短链接源码入口
  -> `12-pages/`

## 2. Then Decide: `00-shared/` Or Topic

满足以下任一条件，优先放 `00-shared/`：

- 会被两个及以上课题反复引用
- 是底层框架、通用工作流、共性场景或公共方法
- 暂时还不适合定义成独立专题

否则，放到具体课题目录下。

例子：

- PyPTO 总体架构 -> `02-knowledge/00-shared/pypto-architecture/`
- 跨课题通用交互模式 -> `04-uxdesign/00-shared/common-interaction-patterns/`
- 某个泳道图专题的 UX 方案 -> `04-uxdesign/02-swimlane-profiler/`

## 3. Topic Naming

新课题目录统一用英文 kebab-case，名称要能稳定复用，避免过度描述。

推荐：

- `block-level-coding`
- `swimlane-profiler`
- `operator-doc-assistant`

避免：

- `new-swimlane-idea-v2`
- `some-random-demo`
- `analysis-for-issue-1121-final`

## 4. Canonical Filenames

优先使用稳定文件名，而不是一次性的描述性文件名。

通用文档：

- `overview.md`：课题概览 / 当前理解
- `sources.md`：来源索引
- `glossary.md`：术语表
- `meta.md`：关键词、关联层、检索入口

Codex 正式输出记录：

- `prompts/YYYY-MM-DD-<slug>.md`：可再次执行并复现当次正式输出效果的复合 prompt
- `notes/update-YYYY-MM-DD.md`：本次正式输出的更新摘要、依据、决策、影响范围、待确认问题

说明：

- 适用于 `02-knowledge/<topic>/`、`03-insights/<topic>/`、`04-uxdesign/<topic>/`，包括 `00-shared/` 下的具体主题目录。
- Codex 每次新建或更新正式输出时默认同步记录；纯错别字、链接修复、机械格式化可合并进当天同一条 `notes/update-YYYY-MM-DD.md`。
- `prompts/` 不保存用户原始 prompt 逐字稿；应把用户原始目标、多轮对话中的修正信息、关键引用 / sample data、使用的 skill / 文档索引、工程状态和输出约束揉合成最终“系统式”复合 prompt。
- `prompts/` 的目标是让后续 agent 可以直接再次使用该 prompt，尽量复现当次正式输出的内容结构、判断口径和交付效果。
- `prompts/` 应避免冗长、敏感或无复现价值的过程噪音；必要时用路径和摘要指向上下文。
- `notes/` 记录 Codex 的判断和交付状态，不替代正式输出本身。

UX 设计：

- `prd.md`
- `prd.html`
- `ux-analysis.md`
- `ux-analysis.html`
- `ia.md`
- `interaction-spec.md`
- `visual-direction.md`

说明：

- `.md`、`.html` 都可以作为正式设计文档 / 报告的阅读格式。文件扩展名不单独决定目录归属；先按内容意图判断。
- 如果 `.html` 的主要用途是文档阅读、报告阅读或正式设计说明，可放在 `04-uxdesign/<topic>/`。
- 如果 `.html` 的主要用途是可交互 demo、视觉 / 交互验证、前端实验或可分享原型，则放在 `05-prototypes/<topic>/experiments/html/`。
- Claude 的原型验证、待办、备忘默认使用 `05-prototypes/<topic>/notes/<note-name>.md`。不要在 `04-uxdesign/<topic>/notes/` 新建 Claude 运行记录。
- `04-uxdesign/<topic>/notes/` 用于 Codex 正式设计输出更新记录，以及 Codex 接收后的设计决策记录、review 归档或正式澄清记录；review / decision / clarification 文件头必须标明 `owner`、`status`、`decision`。

原型：

- `experiments/html/<demo-name>.html`
- `experiments/jsx/<demo-name>.jsx`
- `prompts/<demo-name>.md`
- `notes/<demo-name>.md`
- `notes/sample-data.md`：demo 样例数据、数据等级、来源与生成规则；Codex + Claude 共享维护
- `notes/review-YYYY-MM-DD.md`：原型验证、cross-review、Claude 对 Codex owner 文件的澄清请求或修订建议

工具：

- `06-tools/01-prototype-kit/<area>/<toolkit-name>/notes/spec.md`：新增 prototype toolkit 时必须创建，记录 spec、接口约定、输入输出、命令入口、边界和待 review 项

这些文件内部的说明文字、标题和注释，默认优先使用中文。

## 5. Vibe Coding Defaults

当内容由 vibe coding 产生时，默认这样处理：

- Claude 生成的单文件 HTML -> `05-prototypes/<topic>/experiments/html/`
- Claude 生成的 JSX / TSX 草案 -> `05-prototypes/<topic>/experiments/jsx/`
- 对应提示词、生成上下文、迭代说明 -> `05-prototypes/<topic>/prompts/`
- 原型结论、待办、验证结果 -> `05-prototypes/<topic>/notes/`
- demo 样例数据、数据等级、来源与生成规则 -> `05-prototypes/<topic>/notes/sample-data.md`
- Claude 对 Codex owner 文件的 review / 澄清请求 -> `05-prototypes/<topic>/notes/review-YYYY-MM-DD.md`
- 当某个原型进入持续工程化 -> `05-prototypes/<topic>/app/`

如果 Claude 输出的是正式设计文档或报告，而不是前端原型，由 Codex 按 `04-uxdesign/` owner 规则接收、改写或落盘；不要仅因为文件是 `.html` 就自动归入 `05-prototypes/`。

如果暂时无法判断课题归属，但明显属于原型探索：

- 先放 `05-prototypes/00-shared/playground/` 或对应 `00-shared/` 目录
- 等课题稳定后再拆分

## 6. Minimal-Correct Default

当信息不完整时，按“最小正确放置”原则处理：

- 不新建多余顶层目录
- 不为一次性内容发明新的命名体系
- 先放进最接近语义的位置
- 如仍不确定，优先放入 `01-inbox/` 并在文件开头注明候选归属

## 7. Retrieval Pattern

为了让后续搜索更准，新增重要内容时建议同步做三件事：

- 在对应目录补 `overview.md` 或 `meta.md`
- 有外部依据时补 `sources.md`
- 新增课题或共享框架时更新 `10-docs/03-indexes/`

## 7.1 Source Traceability Rule

当内容引用上游仓库、样例数据或外部产物时，区分“解释性正文”和“追溯 literal”：

- 解释性正文可以按仓库约定统一术语口径
- 上游真实文件名、路径、字段键、索引键、trace key 必须保留原样，不要为了术语统一而改写
- 需要同时兼顾可读性与可追溯时，优先写成“解释性术语 + 原始 literal”

常见必须保留原样的内容包括：

- `program.json`
- `*_ROOT.json`
- `*_LEAF_program_id_*.json`
- `rootHash`
- `callOpMagic`
- `leafHash`

## 8. Required Follow-Ups

出现以下情况时，应同步更新索引：

- 新增一个课题目录
  -> 更新 `10-docs/03-indexes/topics.md`
- 新增一个 shared 框架目录
  -> 更新 `10-docs/03-indexes/shared-frameworks.md`
- 新增一个原型课题
  -> 更新 `10-docs/03-indexes/prototypes.md`
- 新增一个长期工具
  -> 更新 `10-docs/03-indexes/tools.md`
- 新增一个设计系统基础模块
  -> 更新 `10-docs/03-indexes/designsystem.md`
