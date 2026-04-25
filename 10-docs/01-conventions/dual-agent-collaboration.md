# PyPTOUX 双 Agent 协同分工指导

## 一、文档目标与适用范围

这份文档定义 `PyPTOUX` 仓库内 **Codex** 与 **Claude Desktop** 的长期协作规则，回答四类问题：

1. 新任务进入仓库后，应该由谁先做什么。
2. 不同目录由谁主写，谁可以读，谁不应直接改。
3. demo 缺少真实数据时，应该走 `L1`、`L2` 还是 `L3`。
4. 原型准备外发时，应该按哪一种分享形态交付。

本文档按“可直接执行”的标准撰写，但**本轮只完成文档写作**。是否落地执行，由后续明确指令触发。

本文档是旧版《`PyPTOUX-双Agent协同分工指导.md`》的优化替代稿，可独立阅读，不依赖旧版补充上下文。

---

## 二、双 Agent 协作总原则

### 2.1 基本分工

- **Codex** 主导规划、后端、仓库边界、业务知识检索、内容路由、结构维护、原型素材准备、构建与集成。
- **Claude Desktop** 主导前端原型、视觉、交互、动效、前端工作台整合、原型自测与可分享产物打磨。

### 2.2 工作方式

- 原型工作默认采用“**Codex 先准备上下文与约束，Claude 再实现前端与视觉**”的顺序。
- 多轮迭代时，Codex 负责收敛事实、结构、边界与一致性，Claude 负责收敛界面、交互与分享体验。
- 两个 agent 都可以提出建议，但**最终是否落盘**由对应目录的 owner 决定。

### 2.3 不提前过度工程化

- 当前主形态仍是单文件 HTML 原型。
- 只有在明确触发条件满足时，才升级到 `app/` 或跨课题工作台 demo。
- 不为了“看起来完整”提前引入后端、monorepo、复杂构建链或额外流程。

### 2.4 与现有项目规则的关系

- 项目级 skill 入口与长期协作约定仍以 `AGENTS.md` 为准。
- 路径、命名、索引、literal 保留等基础规则仍遵守 `AGENTS.md` 与 `10-docs/01-conventions/content-routing.md`。
- 本文档只补充“**双 Agent 怎么协作**”，不取代仓库其他基础约定。

---

## 三、Codex 与 Claude 的职责分工

### 3.1 Codex 负责

| 类别 | 具体内容 |
| --- | --- |
| 规划与方案 | 工作台演进路线、原型整合策略、技术选型、升级时机判断 |
| 业务知识检索 | 检索 `pypto`、样例数据、业务规则、schema、真实产物，并沉淀到 `02-knowledge/` |
| 内容路由与结构维护 | 决定新内容放哪里、怎么命名、是否要更新索引 |
| 原型素材准备 | 准备 `L1` 真实数据或 `L2` 推导数据，整理 sample-data |
| 设计输出整理 | 维护 `04-uxdesign/` 下的 PRD、UX 分析、interaction-spec |
| 构建与集成 | 初始化 `app/` 工程、设计数据层、维护构建脚本与工作台集成方案 |
| 后端与契约 | 未来引入 API、数据库、文件操作、数据契约、接口层时主导实现 |
| Git / GitHub | 分支、提交、推送、PR、索引同步、版本归档 |
| 跨课题 review | 事实准确性、术语一致性、结构合理性、跨原型整合性 |

### 3.2 Claude Desktop 负责

| 类别 | 具体内容 |
| --- | --- |
| 单文件原型实现 | 在 `experiments/html/` 或 `experiments/jsx/` 实现前端原型 |
| 视觉与动效 | 配色、排版、间距、状态反馈、过渡、微交互 |
| 工程化前端实现 | 进入 `app/` 阶段后实现页面、组件、状态与前端交互逻辑 |
| 工作台前端 | 实现工作台外壳、导航、布局、模块切换与统一主题 |
| 自我验证 | 使用预览验证界面、交互、分享体验，并记录问题 |
| 原型记录 | 维护 `prompts/`、`notes/`、`snapshots/` 等前端迭代记录 |
| 组件实现 | 在 `07-designsystem/02-components/ui/` 提供可复用 UI 实现 |

### 3.3 双方都可以参与，但要区分“谁建议、谁落盘”

- Claude 可以指出 PRD 不清晰、sample-data 不足、结构不合理，但不直接修改非自己 owner 的正文目录。
- Codex 可以评审原型结构、数据使用和模式提炼，但不直接进入 Claude owner 的前端文件做视觉微调。
- 当需要修改 Claude owner 的原型代码时，Codex 提供明确建议，由 Claude 落盘。
- 当需要修改 Codex owner 的知识库、PRD 或索引时，Claude 在 `notes/` 或对话中提出，由 Codex 落盘。

默认建议载体：

- Codex 对 Claude owner 文件的结构、数据、事实类建议，默认写入当前课题 `notes/`，如 `review-YYYY-MM-DD.md`，或留在 PR comment 中。
- Claude 对 Codex owner 文件的澄清请求与修订建议，默认写入当前课题 `notes/` 的对应记录，或在 PR / 对话中明确列出。
- 只有当建议已经被目标 owner 接收后，才进入实际落盘修改。

---

## 四、协作边界与最终 owner 规则

### 4.1 目录 owner

| 目录 | 最终 owner | 说明 |
| --- | --- | --- |
| `02-knowledge/` | Codex | 业务知识、事实、schema、上游解释 |
| `03-insights/` | Codex | 竞品、跨域洞察、研究归纳 |
| `04-uxdesign/` | Codex | PRD、IA、interaction-spec、设计分析 |
| `05-prototypes/*/experiments/` | Claude | 单文件 HTML / JSX 实验稿 |
| `05-prototypes/*/prompts/` | Claude | 原型 prompt 与上下文记录 |
| `05-prototypes/*/notes/` | Claude | 原型验证记录、待办、待澄清 |
| `05-prototypes/*/snapshots/` | Claude | 原型截图与验证图 |
| `05-prototypes/*/app/src/` | Claude | 前端工程源码 |
| `05-prototypes/*/app/package.json`、`tsconfig*.json`、`vite.config.*`、构建脚本 | Codex | 脚手架、构建配置、集成配置 |
| `07-designsystem/02-components/ui/` | Claude | 可复用 UI 实现 |
| `07-designsystem/01-foundations/`、`02-components/specs/`、`03-guidance/` | Codex | tokens 规范、组件规范、原则约束 |
| `10-docs/` | Codex | 索引、模板、全局规范 |

`app/` 兜底规则：

- `app/src/**` 默认归 Claude。
- `app/` 下除 `src/` 外的工程、配置与说明文件默认归 Codex，例如 `index.html`、`public/`、`.env.*`、`eslint.config.*`、`README.md`。

### 4.2 最终拍板规则

出现争议时，按以下顺序收口：

1. **目录 owner 优先**：谁对该目录拥有最终 owner，谁决定是否落盘。
2. **决策 owner 优先**：如果争议同时涉及多个目录，则按决策类型拍板：
   - 事实、schema、literal、数据来源、索引、结构、构建、后端、契约 -> Codex 拍板
   - 视觉、交互、布局、前端呈现、状态反馈、可分享体验 -> Claude 拍板
3. **跨边界改动最小化**：尽量由当前 owner 自己修改自己的文件，避免两个 agent 同时改同一文件。
4. **用户最终仲裁**：当目录 owner 与决策 owner 都无法收敛，且争议影响方向性选择时，由用户最终拍板。

### 4.3 明确禁止的越界行为

- Codex 不直接微调 Claude owner 原型文件中的视觉细节，如颜色、动画曲线、SVG 路径、像素级布局。
- Claude 不直接改写 `02-knowledge/`、`03-insights/`、`04-uxdesign/`、`10-docs/` 下的正文。
- 两个 agent 都不得把上游 literal 改写成更“统一”的命名方式，例如把 `leafHash` 改成 `leaf_hash`。
- Claude 不得自行把 `L3` 升级为 `L2`。

### 4.4 允许的协作方式

- Codex 可以在对话、`notes/` 建议稿或 review 意见中指出原型数据与事实问题。
- Claude 可以在 `notes/` 中记录 `PRD 待澄清`、`sample-data 不足`、`结构待确认`，推动 Codex 补齐外围约束。
- 进入 `app/` 或 workbench 阶段后，若前端代码同时涉及构建与视觉，按“Codex 改配置与契约，Claude 改页面与组件”的原则拆开执行。

### 4.5 协作灰区规则（补充）

本节只补充灰区目录的协作方式，不替代 §4.1 的 owner 表。

#### `.agents/skills/`：Codex 主写 / Claude 共写

- Codex 主导：新增 skill、章节结构、流程定义、矩阵规则、模板 / schema、删除内容。
- Claude 可做：错别字、标点、链接修复、不改语义的措辞润色、补例子。
- 冲突避免：遵守未提交工作树锁；结构性大改动建议先在 PR 或对话登记。

#### `09-references/`：对等共写

- Codex 与 Claude 均可写、可主导。
- 冲突避免：遵守未提交工作树锁。
- 结构性大改动（重排、拆分、归档、模板变更）建议先在 PR 或对话登记。
- 新文件可选 frontmatter 标注 `owner: claude`、`owner: codex` 或 `owner: shared`。

#### `02-knowledge/` / `03-insights/` / `04-uxdesign/` / `10-docs/`：Codex 单边主写

- Claude 默认只读不写。
- Claude 运行时发现 drift、verified claim、conflict 或 empirical note 时，跳过文件写入，在回答末尾“待人工处理”固定区块汇总。
- 由用户决定是否手动处理或通知 Codex。
- 一次会话只汇总一次；下次会话不主动重提。

#### 未提交工作树锁定义

- 一份文件在 git 上已 commit 的修改 = 交接完成，对方可接力。
- 一份文件存在未 commit / 未 merge 的修改 = 该文件被锁定，对方不写。
- 不确定时，先看 `git status` / `git log` 和最近一次写者。

---

## 五、原型形态的演进路径

### 5.1 阶段 1：单文件 HTML / JSX 原型

**默认形态**：

- `05-prototypes/<topic>/experiments/html/<demo-name>.html`
- `05-prototypes/<topic>/experiments/jsx/<demo-name>.jsx`

**适用场景**：

- 体验探索
- 视觉方向试验
- 快速交流 idea
- 早期原型分享

**默认协作顺序**：

1. Codex 准备 PRD、sample-data、术语边界。
2. Claude 产出前端原型与视觉。
3. Claude 自测并记录问题。
4. Codex review 事实、结构与后续沉淀点。
5. 如果 review 发现问题：
   - Codex 输出问题清单与修订建议
   - Claude 修改 Claude owner 文件并回报结果
   - 涉及 Codex owner 目录时，由 Codex 落盘对应修订

### 5.2 阶段 2：课题级 `app/`

**典型位置**：

- `05-prototypes/<topic>/app/`

**触发条件**，满足任一项即可升级：

- 单文件原型已难维护，页面、状态或组件复用明显增多。
- 需要更稳定的路由、状态管理或 TypeScript 支撑。
- 同一课题需要持续演进，而不仅是一次性 demo。
- 需要接入设计系统组件实现，而不是继续复制 HTML 片段。

**分工**：

- Codex 负责脚手架、构建、数据层、集成方式。
- Claude 负责页面、组件、视觉、交互与前端实现。

### 5.3 阶段 3：跨课题工作台 demo

**建议位置**：

- `05-prototypes/00-shared/workbench/`

**触发条件**，满足任一项即可评估：

- 已有多个独立课题需要放在同一叙事或工作流中展示。
- 业务方开始关注“完整算子开发工作台”而非单点能力。
- 多个原型之间开始出现共享导航、共享状态或共享数据流需求。

**分工**：

- Codex 负责工作台 IA、模块边界、接入方式、技术架构。
- Claude 负责工作台前端外壳、统一视觉、模块切换体验。

### 5.4 阶段 4：引入后端

只有当以下需求出现时才考虑引入：

- 前端无法承受的数据规模或文件处理需求
- 真实 API 联调需求
- 用户配置持久化
- 与真实工具链联动
- 多用户协作或权限控制

引入后端后：

- Codex 主导后端栈、目录与契约设计。
- Claude 消费契约并调整前端。

---

## 六、Demo 数据分层策略

### 6.1 三层数据定义

| 等级 | 定义 | 是否可外发 | 谁负责 |
| --- | --- | --- | --- |
| `L1` | 真实数据，直接来自上游仓库、样例数据或真实产物 | 可以 | Codex 准备，Claude 消费 |
| `L2` | 基于 schema、字段定义、业务规则推导出的合成数据 | 可以，但必须可追溯 | Codex 准备，Claude 消费 |
| `L3` | 仅用于布局与交互验证的占位数据 | 不可以 | Claude 可临时使用并标记 |

### 6.2 默认选择顺序

1. 优先找 `L1`。
2. `L1` 不可得但 schema 与规则已明确时，使用 `L2`。
3. 仅当连 `L2` 所需信息都不足，且原型只是早期探索时，才允许临时使用 `L3`。

### 6.3 `L1` 规则

- 保留上游 literal、字段名、文件名、trace key 原样。
- 引用时尽量注明来源路径或来源说明。
- 这是所有外发 demo 的默认优先方案。

### 6.4 `L2` 规则

`L2` 可用于外发，但必须同时满足：

- 基于明确的 schema、字段定义或业务规则推导。
- 字段名严格遵循上游真实定义。
- 数值范围、依赖关系、时间顺序、引用关系逻辑自洽。
- 在 `notes/sample-data.md` 或相邻说明中注明：这是 `L2`，以及来源与生成规则。

`L2` 的生成责任：

- 由 Codex 负责生成或明确给出生成规则。
- Claude 只能消费，不自行发明新的 `L2` 数据结构。

### 6.5 `L3` 规则

- 仅用于早期布局验证或交互探索。
- 不外发给业务方、产品方、设计师或用户。
- 必须在 `notes/` 中标记 `L3 待替换`。
- 字段结构仍应尽量贴近未来真实结构，避免后续重写过大。

### 6.6 缺数据时的标准动作

1. Claude 发现当前任务缺数据。
2. 先检查是否已有 `notes/sample-data.md`。
3. 如果没有足够数据：
   - 有明确 schema / 规则 -> 请求 Codex 准备 `L2`
   - 没有明确 schema / 规则 -> 仅允许临时用 `L3`，同时请求 Codex 先补外围知识；使用 `L3` 时必须同时满足：
     - 在原型文件顶部或相邻说明中标记 `L3-placeholder`
     - 在 `notes/` 中登记待替换项
     - 当前原型归类为 `exploration-only`
4. Claude 拿到 `L1` 或 `L2` 后严格使用，不在其上自行扩写出新的业务事实。

---

## 七、原型实现与分享规则

### 7.1 单文件原型的两种类型

为避免“能看”和“能稳定分享”混淆，单文件 HTML / JSX 原型分为两类：

#### `share-safe`

可稳定外发的原型，要求：

- 不依赖网络资源。
- 不依赖外部 API。
- 资源全部内嵌或使用本地相对路径。
- 在目标浏览器中双击即可运行。

默认白名单：

- 本地相对路径资源
- 内嵌 `data:` URI
- inline SVG
- 本地字体文件

默认黑名单：

- Google Fonts、Tailwind CDN、esm.sh 等外链字体或脚本
- 运行时远程拉取图片、JSON、CSS、JS
- 依赖公司内网地址或仅本机可访问路径的资源

补充说明：

- 仅禁止交付产物在运行时依赖远程资源。
- 构建时一次性拉取并固化进最终产物的资源，不违反本规则。

适用：

- 发给业务方
- 发给产品方
- 发给设计师
- 发给用户做体验演示

#### `exploration-only`

仅用于内部探索的原型，允许：

- 临时网络依赖
- 临时占位资源
- 更宽松的实现方式

限制：

- 不作为稳定分享产物外发
- 后续若要外发，必须收敛成 `share-safe`

### 7.2 `app/` 阶段的两种产物目标

为避免把“离线分享”和“内部联调”混成一个 `dist/` 目标，`app/` 阶段分成两种交付：

#### 离线分享包

要求：

- 目标是演示与分享，不是联调。
- 运行时不依赖真实 API。
- 可用内嵌数据或构建时固化数据。
- 产物解压后即可本地打开和演示。

#### 内部联调版本

要求：

- 目标是开发联调、真实后端验证或真实工具链连接。
- 可依赖真实 API、环境变量或开发服务。

限制：

- 不承诺“解压双击即看”
- 不作为默认对外分享物

### 7.3 谁决定原型属于哪一类

- 是否能对外分享，由 **Codex 按数据真实性、边界与结构风险拍板**。
- 是否达到足够好的界面与交互质量，由 **Claude 按前端呈现质量拍板**。
- 只有当两边都通过时，原型才算“可外发”。

---

## 八、Claude 的默认参考源与工作约束

### 8.1 默认参考源

Claude 开始一个原型任务时，默认优先参考：

1. 当前任务对应的 `04-uxdesign/<topic>/prd.md` 或 interaction-spec
2. 当前任务对应的 `05-prototypes/<topic>/notes/sample-data.md`
3. `07-designsystem/03-guidance/` 下已存在的原则与 guidance
4. 用户明确给出的参考图、截图、设计方向

### 8.2 不默认继承的内容

除非用户明确要求，否则 Claude **不默认参考** 现有 demo 的以下内容：

- 视觉风格
- 配色
- 布局比例
- 动效处理
- 交互细节

原因：

- 现有 demo 仍处于探索期，不构成稳定基线。
- 旧 demo 可以作为“是否已有类似模式”的线索，但不自动成为“应该这样做”的依据。
- `07-designsystem/01-foundations/` 的 tokens 与 `07-designsystem/03-guidance/` 的 guidance 属于稳定基线，默认可以继承。

### 8.3 风格不明确时的默认动作

当风格、布局方向或组件继承关系不明确时：

- Claude 不应自由发挥到形成强绑定风格。
- Claude 应明确提出 2-3 个可选方向，或指出自己观察到的继承候选，由用户或 Codex 确认。

### 8.4 Claude 的写入范围

Claude 默认主要写入：

- `05-prototypes/<topic>/experiments/`
- `05-prototypes/<topic>/prompts/`
- `05-prototypes/<topic>/notes/`
- `05-prototypes/<topic>/snapshots/`
- `05-prototypes/<topic>/app/src/`
- `07-designsystem/02-components/ui/`

Claude 默认只读不写：

- `02-knowledge/`
- `03-insights/`
- `04-uxdesign/`
- `10-docs/`

---

## 九、Skill 体系的当前角色与未来扩展原则

### 9.1 当前 skill 的角色

当前仓库已有的项目级 skill 继续生效：

- `pyptoux-content-router`：内容路由、命名、索引同步判断
- `pyptoux-git-github`：Git / GitHub 工作流
- `pypto-knowledge-source`：PyPTO 业务知识检索
- `pypto-demo-data-filling`：真实 demo 素材与数据准备

默认使用方式：

- Codex 是主要使用者与维护者。
- Claude 主要消费这些 skill 的产出，而不是主写 skill。

### 9.2 未来新增 skill 的原则

未来可以新增更多 skill，但遵守以下原则：

1. 同一类操作已重复多次，且规则趋于稳定。
2. 该规则值得固化为长期协作能力，而不是一次性说明。
3. skill 的职责边界清楚，不与已有 skill 严重重叠。

### 9.3 未来可能出现的新增方向

只作为后续方向，不代表本轮实施：

- 原型 review / 覆盖检查
- 设计系统模式提取
- 工作台集成架构
- API 契约与 schema 治理
- 可分享 demo 打包与验收

---

## 十、标准协作流程

### 10.1 新原型课题的标准顺序

1. **Codex** 判定课题归属与目录位置。
2. **Codex** 准备外围约束：
   - 业务知识
   - PRD / UX 分析
   - sample-data
   - literal 与术语边界
3. **Claude** 根据外围约束实现原型。
4. **Claude** 自测并在 `notes/` 记录验证结论与待澄清问题。
5. **Codex** review：
   - 事实是否准确
   - 数据等级是否合理
   - 是否需要沉淀到设计系统或知识库
   - 若有问题，按 §3.3 的默认建议载体输出问题清单与修订建议
6. **Claude** 修复 Claude owner 范围内的问题，并回报结果。
7. 涉及 Codex owner 范围的修订，由 Codex 单独落盘。
8. 若原型成熟，再评估是否升级为 `app/` 或接入工作台。

### 10.2 当任务是“做一个新的前端 demo”

默认判断：

- Codex 先做：确认路径、课题、PRD、数据等级与 sample-data。
- Claude 再做：写原型、调视觉、验证交互与分享体验。

### 10.3 当任务是“改一个已有 demo”

先区分改动类型：

- 改视觉、布局、动效、交互 -> Claude 先做
- 改数据来源、术语、事实、schema、索引、构建 -> Codex 先做
- 同时涉及两类时 -> Codex 先给出边界与约束，Claude 再做前端落盘

### 10.4 当任务是“进入 `app/` 阶段”

默认顺序：

1. Codex 决定是否该升级，以及升级解决什么问题。
2. Codex 初始化脚手架、构建方式与数据层策略。
3. Claude 把成熟原型迁移为组件与页面。
4. 双方确认产物属于“离线分享包”还是“内部联调版本”。

---

## 十一、常见风险速查

本节仅作速查，具体规则以第二、四、六、七、十节为准。

### 11.1 两个 agent 同时改同一个原型文件

- 不同时改同一前端文件；Codex 对 Claude owner 文件以建议为主，不直接落盘。见 §4.2、§4.3、§10.1。

### 11.2 Claude 把探索稿误当可分享稿

- 未满足 `share-safe` 条件的原型，不得当作稳定外发产物。见 §7.1、§7.3。

### 11.3 `L2` 与 `L3` 混淆

- `L2` 由 Codex 负责生成或确认；`L3` 仅用于早期布局，不外发，并强制归类为 `exploration-only`。见 §6.4、§6.5、§6.6。

### 11.4 旧 demo 被误当设计基线

- Claude 不默认继承 `experiments/` 历史 demo 的视觉与布局；designsystem 的 tokens 与 guidance 可默认继承。见 §8.1、§8.2、§8.3。

### 11.5 集成期没人拍板

- 先看目录 owner，再看决策 owner；若仍无法收敛，由用户最终仲裁。见 §4.1、§4.2。

---

## 十二、对 `AGENTS.md` / `CLAUDE.md` 的后续沉淀建议

以下内容适合作为后续正式沉淀，但**不在本轮实施**：

### 12.1 适合沉淀到 `AGENTS.md`

- Demo 数据三层策略（`L1` / `L2` / `L3`）
- 双 Agent 基本分工
- 索引同步责任
- 跨边界拍板规则

### 12.2 适合沉淀到未来 `CLAUDE.md`

- Claude 的默认写入范围
- Claude 的默认参考源
- 不默认继承旧 demo 的规则
- `share-safe` / `exploration-only` 的实现约束
- 发现数据或 PRD 缺口时的标准动作

### 12.3 本文档当前状态

- 这份 v2 目前放在 `01-inbox/`，用于评审与确认。
- 若确认作为正式基线，再决定拆分沉淀到哪些长期入口文件。
