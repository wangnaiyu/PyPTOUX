# Content Routing Convention

这份文档定义 PyPTOUX 仓库内新增内容时的默认放置规则、命名规则和索引更新动作。

## 1. First Decide: Content Type

按“这份内容主要解决什么问题”来归类：

- 解释 PyPTO、算子开发、编译链路、术语、业务机制
  -> `knowledge/`
- 拆解竞品、参考案例、交互亮点、视觉灵感、跨域心智模型
  -> `insights/`
- 形成正式设计输出，如 PRD、UX 分析、流程、信息架构、视觉方案
  -> `uxdesign/`
- 生成或迭代交互 demo、前端验证稿、HTML/JSX 原型
  -> `prototypes/`
- 为原型或工作流提供辅助能力，如 JSX 预览器、转换器、启动脚本
  -> `tools/`
- 定义仓库级视觉基线、组件规范、tokens、可复用 UI
  -> `designsystem/`
- 保存截图、导出物、图标、视频等静态成果
  -> `assets/`
- 保存外部来源索引、资料出处、链接表
  -> `references/`
- 内容尚未整理完成，暂时归档
  -> `inbox/`
- 内容已废弃或冻结，但仍希望保留
  -> `archive/`

## 2. Then Decide: `shared/` Or Topic

满足以下任一条件，优先放 `shared/`：

- 会被两个及以上课题反复引用
- 是底层框架、通用工作流、共性场景或公共方法
- 暂时还不适合定义成独立专题

否则，放到具体课题目录下。

例子：

- PyPTO 总体架构 -> `knowledge/shared/pypto-architecture/`
- IDE 插件共性布局模式 -> `uxdesign/shared/ide-plugin-foundations/`
- 某个泳道图专题的 UX 方案 -> `uxdesign/swimlane-profiler/`

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

UX 设计：

- `prd.md`
- `ux-analysis.md`
- `ia.md`
- `interaction-spec.md`
- `visual-direction.md`

原型：

- `experiments/html/<demo-name>.html`
- `experiments/jsx/<demo-name>.jsx`
- `prompts/<demo-name>.md`
- `notes/<demo-name>.md`

## 5. Vibe Coding Defaults

当内容由 vibe coding 产生时，默认这样处理：

- Claude 生成的单文件 HTML -> `prototypes/<topic>/experiments/html/`
- Claude 生成的 JSX / TSX 草案 -> `prototypes/<topic>/experiments/jsx/`
- 对应提示词、生成上下文、迭代说明 -> `prototypes/<topic>/prompts/`
- 原型结论、待办、验证结果 -> `prototypes/<topic>/notes/`
- 当某个原型进入持续工程化 -> `prototypes/<topic>/app/`

如果暂时无法判断课题归属，但明显属于原型探索：

- 先放 `prototypes/shared/playground/` 或对应 `shared/` 目录
- 等课题稳定后再拆分

## 6. Minimal-Correct Default

当信息不完整时，按“最小正确放置”原则处理：

- 不新建多余顶层目录
- 不为一次性内容发明新的命名体系
- 先放进最接近语义的位置
- 如仍不确定，优先放入 `inbox/` 并在文件开头注明候选归属

## 7. Retrieval Pattern

为了让后续搜索更准，新增重要内容时建议同步做三件事：

- 在对应目录补 `overview.md` 或 `meta.md`
- 有外部依据时补 `sources.md`
- 新增课题或共享框架时更新 `docs/indexes/`

## 8. Required Follow-Ups

出现以下情况时，应同步更新索引：

- 新增一个课题目录
  -> 更新 `docs/indexes/topics.md`
- 新增一个 shared 框架目录
  -> 更新 `docs/indexes/shared-frameworks.md`
- 新增一个原型课题
  -> 更新 `docs/indexes/prototypes.md`
- 新增一个长期工具
  -> 更新 `docs/indexes/tools.md`
- 新增一个设计系统基础模块
  -> 更新 `docs/indexes/designsystem.md`
