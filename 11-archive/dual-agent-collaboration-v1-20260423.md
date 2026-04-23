# PyPTOUX 双 Agent 协同分工指导

## Codex 主导规划与工程,Claude Desktop 负责原型与视觉

> 本文档面向 PyPTOUX 仓库的实际使用场景:UX 设计师以**体验探索 + 快速原型验证**为主线,辅以**和业务方/产品/设计师/用户交流 idea**,长期目标是把多个原型串成一个完整的算子开发工作台 demo,工程随之演进。
>
> 文档基于仓库现有的分层结构(`02-knowledge/` → `04-uxdesign/` → `05-prototypes/` → `07-designsystem/`)、已有的 agent skills 和写作约定,但**所有约定都允许随项目演进迭代**。

---

## 一、为什么这套分工适合 PyPTOUX

PyPTOUX 同时承载多类资产:业务理解、体验洞察、设计输出、可交互原型、设计系统、规则与工具。这种结构需要**信息流严谨**(规范、命名、索引)和**原型好看好用**(视觉、交互、动效),一个 agent 难以同时兼顾。

Codex 桌面端和 Claude Desktop 各自擅长其中一边:

| 能力维度 | Codex 桌面端 | Claude Desktop |
|---|---|---|
| 大量文档检索、跨目录信息整理 | ✅ 强 | 一般 |
| 和上游 `pypto` 仓库、样例数据交叉比对 | ✅ 强(SSH / 多终端) | 一般 |
| 规划与工程结构(后端、构建、部署) | ✅ 强 | 一般 |
| 严格遵守命名规范、索引同步 | ✅ 强 | 中等 |
| Git/GitHub 操作、PR 管理、CI 配置 | ✅ 强 | 一般 |
| 单文件 HTML 原型的视觉/动效迭代 | 一般 | ✅ 极强 |
| dev server 内嵌预览 + 自我截图验证 | ✅(in-app browser) | ✅ 更适合本地原型 |
| 对着设计参考图改样式 | 一般 | ✅ 强(拖拽进 prompt) |
| 行内评论 diff、按像素调样式 | 一般 | ✅ 强 |

**结论**:Codex 做"规划与工程层",Claude Desktop 做"原型与视觉层",边界清晰、能力互补,且这种分工能伴随工程从"单文件 HTML 集合"演进到"完整工作台 demo"。

---

## 二、为什么 Claude 端选 Desktop 而不是 CLI

虽然 Claude Code CLI 能力更全(支持 Agent SDK、第三方模型、headless 脚本化),但对 PyPTOUX 不推荐:

1. **你的工作核心是"看到效果 + 调像素 + 发出去"**,这是视觉反馈回路,CLI 给不了。
2. **Codex 已经吃掉终端**——Codex TUI 用来跑文档检索、git 操作、和上游 `pypto` 镜像交互、未来跑后端服务都很顺;再开一个 Claude CLI 会让两个文字界面混在一起。
3. **CLI 的独有能力**(Bedrock、Agent SDK、headless 脚本)在你的场景里基本用不上;真要 headless 自动化也优先用 Codex。
4. **Desktop 的内嵌预览**特别匹配单文件 HTML 原型,也能跑工程化原型的 dev server——一种工具覆盖你"实验稿 → 工作台 demo"的全过程。

**结论**:Claude 侧用 **Claude Desktop 应用内的 Code 标签**,把 CLI 留给真正需要脚本化的场合(基本用不到)。

---

## 三、职责边界

### Codex 桌面端负责

| 类别 | 具体内容 | 涉及目录 / 当前 Skill |
|---|---|---|
| **规划与方案** | 工作台演进路线、原型整合策略、技术选型 | `04-uxdesign/`、`10-docs/` |
| **业务知识检索** | 查 `pypto` / `CANN` / sample engineering、把结论沉淀到知识库 | `02-knowledge/`、`pypto-knowledge-source` |
| **结构与路由** | 决定新内容放哪里、怎么命名、要不要更新索引 | `10-docs/`、`pyptoux-content-router` |
| **原型素材准备** | 用真实 `program.json`、`*_ROOT.json`、泳道图、日志构造 demo 数据;数据缺失时按业务 schema 推导合理样例 | `pypto-demo-data-filling` |
| **后端与服务**(未来) | 当工作台 demo 需要 API、数据库、文件系统操作时,后端实现 | 未来的 `apps/api/` 或类似位置 |
| **构建与部署**(未来) | 工程化打包、本地预览服务、部署到内网/云端 | `06-tools/`、未来的 CI 配置 |
| **设计系统沉淀** | 提取通用 tokens、components、patterns,从原型回流到 `07-designsystem/` | `07-designsystem/` |
| **Git / GitHub** | 分支、提交、推送、PR、索引同步 | `pyptoux-git-github` |
| **跨课题 review** | 多个原型之间的一致性、知识引用是否准确、整合到工作台时的接口 | 全局 |

### Claude Desktop 负责

| 类别 | 具体内容 | 涉及目录 |
|---|---|---|
| **HTML / JSX 原型实现** | 写单文件 HTML demo、JSX 草案 | `05-prototypes/<topic>/experiments/html/`、`/jsx/` |
| **视觉与动效** | 配色、字体、间距、过渡、微交互 | 同上 + `07-designsystem/` 引用 |
| **工程化原型实现** | 进入 `app/` 阶段后,用 React/Vue/Svelte 等实现交互逻辑 | `05-prototypes/<topic>/app/` |
| **工作台 demo 前端** | 把多个原型串成一个完整 demo 的导航、外壳、模块切换 | 未来的 `05-prototypes/00-shared/workbench/` 或专门位置 |
| **内嵌预览自我验证** | 起预览、截图、点元素、确认效果 | 利用 Desktop 内置能力 |
| **基于参考图迭代** | 拖设计图/截图进 prompt,按视觉对比修改 | 同上 |
| **可分享 demo 产出** | 保证产出物离线可双击运行,资源相对路径 | 同上 |
| **原型笔记** | 每次产出后记录 prompt、结论、待办 | `05-prototypes/<topic>/prompts/`、`/notes/` |

### 严格不重叠的边界

- **Codex 不写视觉代码**——不动 `<style>` 内的 CSS、不调 SVG 路径、不微调动画曲线、不改组件视觉细节。
- **Claude 不动知识库与设计文档正文**——`02-knowledge/`、`03-insights/`、`04-uxdesign/`、`10-docs/` 下的 markdown 由 Codex 维护。Claude 可以读,但**不直接改正文**。Claude 发现问题应在 `notes/` 里写"待澄清",而不是越界改。
- **literal 不能被任一端改写**——`program.json`、`*_ROOT.json`、`rootHash`、`callOpMagic`、`leafHash` 这些上游产物的真实名字必须原样保留(已在 `content-routing.md` 第 7.1 节定义,两个 agent 都要遵守)。
- **索引由谁更新**:Codex 创建新课题/共享框架时,负责更新 `10-docs/03-indexes/`;Claude 新增原型实验文件不算"新课题",不需要动索引,但**进入 `app/` 阶段时**通知 Codex 更新 `prototypes.md`。

---

## 四、和现有结构的对应关系

PyPTOUX 已经有非常清晰的目录约定。两个 agent 在每个目录的角色:

```
PyPTOUX/
├── 01-inbox/             [Codex 整理] 临时输入 → 路由到正式位置
├── 02-knowledge/         [Codex 主写] 业务知识沉淀
├── 03-insights/          [Codex 主写] 竞品/跨域洞察
├── 04-uxdesign/          [Codex 主写] PRD / UX 分析 / IA / interaction-spec
│                         [Claude 可读,作为原型实现的参考之一]
├── 05-prototypes/        ★ 协作核心区
│   ├── 00-shared/        [双方协作] 工作台外壳、跨课题复用模块
│   └── <topic>/
│       ├── experiments/  [Claude 主写] HTML / JSX 实验稿
│       ├── prompts/      [Claude 主写] 生成上下文、迭代说明
│       ├── notes/        [Claude 主写] 验证结论、待办
│       ├── snapshots/    [Claude 主写] 产出截图
│       └── app/          [Claude 主写,Codex 协助配置] 工程化原型
├── 06-tools/             [Codex 维护] prototype-kit / scripts / templates
│                         未来:工作台启动器、demo 打包器、跨原型路由
├── 07-designsystem/      [Codex 主写规则,Claude 主写实现]
│   ├── 01-foundations/   [Codex 写 tokens 规范, Claude 实现 CSS 变量]
│   ├── 02-components/    [Claude 实现 ui/, Codex 写 specs/ 和 patterns/]
│   └── 03-guidance/      [Codex 主写] 原则、语气、约束
├── 08-assets/            [Claude 输出 → Codex 归档命名]
├── 09-references/        [Codex 维护] 外部资料索引
├── 10-docs/              [Codex 主写] 规范、模板、索引
└── 11-archive/           [Codex 操作] 归档冻结内容
```

### 协作核心区:`05-prototypes/<topic>/` 内部分工细则

每个原型课题的标准协作循环:

1. **Codex 准备素材**(在课题目录外的相关位置)
   - 在 `02-knowledge/<topic>/` 已有业务理解,或新增
   - 在 `04-uxdesign/<topic>/` 写好 PRD / interaction-spec(允许是迭代中的不完整版本)
   - 用 `pypto-demo-data-filling` 把数据准备好放到课题的 `notes/sample-data.md`,数据策略见第六节

2. **Claude 产出原型**(在 `experiments/`)
   - 优先在 `experiments/html/<demo-name>.html` 出单文件 HTML
   - 复杂交互或要复用组件时再用 `experiments/jsx/<demo-name>.jsx`
   - 同步在 `prompts/<demo-name>.md` 记录生成上下文

3. **Claude 自我验证**
   - 用 Desktop 内嵌预览自己看效果
   - 截图存到 `snapshots/`
   - 在 `notes/<demo-name>.md` 写"已验证 / 待解决 / 下一步"

4. **你 review + 可能让 Codex 介入**
   - 视觉问题直接让 Claude 在 diff view 里改
   - 数据/事实/术语错误让 Codex 查证后给出修正建议,再让 Claude 应用
   - 涉及多课题共性的视觉模式,让 Codex 评估是否提升到 `07-designsystem/`

5. **进入 `app/` 阶段(可选,见第五节)**

---

## 五、原型形态的演进路径

PyPTOUX 的原型形态会随着工作的深入逐步演进。当前以单文件 HTML 为主,未来要演进到完整工作台 demo。两个 agent 的协作方式在每个阶段都不同。

### 阶段 1:单文件 HTML(当前主要形态)

**典型路径**:`05-prototypes/<topic>/experiments/html/<demo-name>.html`

**特征**:一个 .html 文件,内嵌 CSS 和 JS,双击就能在浏览器打开。

**优势**:
- 方便分享:微信、邮件、网盘,对方双击即看
- 方便迭代:Git 历史就是版本历史
- 方便交流:发给业务方/产品/设计师/用户,他们打开就能玩

**协作模式**:
- Codex 在外围准备业务素材
- Claude 在 Desktop 里写 HTML、改样式、自我预览
- 你 review 后直接发文件给别人

**硬约束**(写进 `CLAUDE.md`):
- 资源全部内嵌或本地相对路径(CSS/JS 写在 `<style>`/`<script>` 内,图片优先 inline SVG 或 base64)
- 不依赖 build 工具(用原生 ES module 或 CDN 引入)
- 不调用外部 API(数据 inline 在 JS 里,数据策略见第六节)
- 多页用 hash 路由
- 目标浏览器:Chrome / Edge / Safari 最近三版

### 阶段 2:课题级工程化原型

**典型路径**:`05-prototypes/<topic>/app/`

**触发条件**(满足任一即可考虑升级):
- 单文件超过 2000 行
- 需要复用同一组组件做 5+ 个页面/状态
- 状态管理超过 200 行 JS,需要正经的框架支持
- 要接入 `07-designsystem/02-components/ui/` 的真实组件代码
- 想加入路由、状态管理、TypeScript

**协作模式**:
- Codex 初始化 Vite + React/Vue/Svelte 工程,配 `base: './'` 让产物可双击
- Codex 设计数据层和构建脚本
- Claude 把 `experiments/html/` 里的最新 demo 拆成组件,迁移到 `app/src/`
- `npm run build` 产出 `dist/`,可打包整个文件夹双击运行
- 详细技术约定见第八节

### 阶段 3:跨课题工作台 demo(长期目标)

**典型路径**:`05-prototypes/00-shared/workbench/`(建议位置,具体由 Codex 用 `pyptoux-content-router` 决定)

**特征**:一个完整的"算子开发工作台"前端 demo,把多个独立课题(`block-level-coding`、`swimlane-profiler`、`operator-doc-assistant` 等)整合在统一外壳下,有共享导航、统一视觉、互通的数据流。

**触发条件**:
- 已经有 3+ 个独立原型课题趋于稳定
- 业务方开始问"这些放在一起是什么样"
- 需要展示完整的算子开发工作流

**协作模式**:
- Codex 先做规划:工作台的信息架构、模块边界、数据流向、技术架构(纯前端集成 / 引入后端服务)
- Codex 决定每个课题如何"接入"——是嵌入页面、iframe 嵌入,还是抽出共享组件重新组装
- Claude 实现工作台外壳:导航、布局、模块切换、统一主题
- Claude 把各课题的核心实现迁移/适配进工作台
- Codex 维护工作台和各独立课题的双向关系(独立课题继续可以单独 demo,工作台是它们的整合视图)

**何时引入后端**:
- 数据规模超过 inline 能承受的(如要展示真实编译产物全貌)
- 需要文件上传、用户登录、配置持久化
- 需要和真实 `pypto` 工具链联动
- 需要多用户协作

引入后端时,Codex 主导技术选型(Node.js / Python / Go 都可以,优先选和上游 PyPTO 工具链兼容的栈),目录结构可能演进为类似 `apps/web/` + `apps/api/` 的 monorepo,但**这是水到渠成的事,不要提前过度工程化**。

### 阶段 4:工程化产品(超出本仓库范围)

当某个工作台 demo 需要真正产品化时,从 PyPTOUX 拆出独立仓库,这超出本指导文档范围。但本仓库的演进过程会让拆分变得自然——`app/` 或 `workbench/` 已经是相对完整的工程,直接迁移即可。

---

## 六、Demo 数据策略

PyPTOUX 的核心是真实业务场景下的体验探索,数据真实性直接影响 demo 的可信度。但"完全真实"在原型阶段往往做不到——某些场景的真实数据还不存在、不可获取、或数据量过大。所以采用**分层数据策略**:

### 数据真实性的三个等级

| 等级 | 描述 | 适用场景 | 谁负责 |
|---|---|---|---|
| **L1 真实** | 直接来自 `pypto` 仓库、样例数据、真实编译产物 | 有现成数据的场景 | Codex 用 `pypto-knowledge-source` + `pypto-demo-data-filling` 准备 |
| **L2 推导** | 基于真实 schema、字段定义、业务规则推导出的合成数据,前后一致、看起来真实 | 真实数据缺失但 schema 已知 | Codex 用 `pypto-demo-data-filling` 推导,产物明确标注"L2" |
| **L3 占位** | 明显是占位的示意数据,只用于验证布局和交互 | 早期视觉探索、连 schema 都还没明确的场景 | Claude 可以临时填,但要在 `notes/` 里标记"L3 待替换" |

### 三个等级的工作规则

**L1 真实数据**:
- 必须保留所有 literal(`program.json`、`rootHash` 等)的原始名字和值
- 引用时附上来源路径(如 `02-knowledge/00-shared/pypto-sample-datasets/...`)
- 这是默认首选

**L2 推导数据**(本次新增,对原 5.4 的演进):
- **使用前提**:已经有明确的 schema、字段定义、业务规则可参考
- **必须做到**:
  - 字段名严格遵循上游真实定义(`leafHash` 不能写成 `leaf_hash`)
  - 数值范围、量级、分布要符合业务直觉(如 core 编号在 0-15、tile 数量是 2 的幂)
  - 多个数据点之间逻辑自洽(如 `*_ROOT.json` 里的引用必须能在其他文件里找到对应)
  - 时间戳、依赖关系等顺序合理
- **必须标注**:
  - 在 `notes/sample-data.md` 顶部写明"本数据为 L2 推导,基于 `<schema 来源>` 生成"
  - 在 demo 文件里加注释说明哪部分是推导数据
  - 让 Codex 在 `pypto-demo-data-filling` skill 里维护"L2 推导规则记录",未来可追溯
- **目的**:让 demo 能展示完整工作流,对方看不出是真是合成,但内部可追溯

**L3 占位数据**:
- 仅用于早期验证布局,不发给业务方/产品/用户
- 在 `notes/` 里明确标注"L3 待替换",后续替换为 L1 或 L2
- 字段名仍要遵守 schema(避免后续替换时大改结构)

### 当真实数据缺失时的标准动作

1. **Claude 发现需要数据但 `notes/sample-data.md` 没有** → 不自己编造 → 在 prompt 里告知 Codex
2. **Codex 评估**:
   - 这个场景有真实数据吗?有 → 准备 L1
   - 没有真实数据但有 schema → 准备 L2,在 `notes/` 标注
   - 连 schema 都不明确 → 让 Claude 用 L3 占位,同时 Codex 去补 schema 知识到 `02-knowledge/`
3. **Claude 拿到数据后** → 严格使用,不在数据基础上"再加一点"

### 对原 `AGENTS.md` 第 5.4 节的修订建议

原文:
> - `PyPTO` demo 优先使用真实代码、真实图产物、真实泳道图和真实日志
> - 不要把 mock 数据伪装成真实运行结果
> - 优先保证"可追溯",再追求"好看"

修订为:
> - `PyPTO` demo 优先使用 L1 真实数据(真实代码、真实图产物、真实泳道图、真实日志)
> - 真实数据缺失时,允许使用 L2 推导数据:基于明确的 schema、字段定义、业务规则生成,字段名和数据结构必须严格符合上游约定,在 `notes/sample-data.md` 中标注来源和生成规则
> - L3 占位数据仅用于早期布局验证,不外发,需在 `notes/` 标注"待替换"
> - 不要把 L2/L3 数据伪装成 L1 真实运行结果——内部可追溯,对外可呈现
> - 优先保证"可追溯 + 自洽",再追求"好看"

---

## 七、独立于现有 demo 的设计起点

你提到现有 demo 的 UI 布局、视觉、填充内容、相关 PRD 都还在迭代,**所以不应该把它们当作 Claude 后续工作的参考**。这一节明确"Claude 该看什么、不该看什么"。

### 应该参考的(权威性高)

- **`07-designsystem/03-guidance/`** 的设计原则、语气、约束(已有 `principles.md` / `voice-and-tone.md` / `usage-rules.md`)
- **`07-designsystem/01-foundations/`** 的 tokens(虽然现在还是空的,Codex 会逐步填)
- **`07-designsystem/02-components/specs/`** 的组件规范(同上,逐步填)
- **`02-knowledge/`** 的业务理解
- **当前任务对应的最新版** `04-uxdesign/<topic>/prd.md`(标注"以本文件最新版本为准")
- **设计参考图**——你拖进 prompt 的截图、Figma 链接、外部产品截图

### 不应该参考的(避免负面继承)

- **现有 `experiments/html/` 下的 demo 文件**——视觉风格、布局、交互细节都在迭代中,不是稳定基线
- **现有 `04-uxdesign/<topic>/` 下未明确"已定稿"的 PRD 内容**——参考时只看最新内容,不要继承旧约定
- **现有 demo 里的具体配色、字体选择、布局比例**——这些都不是设计系统沉淀,只是临时探索

### Claude 的默认行为约定

写进 `CLAUDE.md`:

> 不要默认参考现有 `experiments/html/` 下的 demo 文件作为视觉/布局/交互基线。除非用户明确说"参考 X demo 的 Y 部分",否则:
>
> - 视觉:从 `07-designsystem/03-guidance/` 和 `07-designsystem/01-foundations/`(如已有内容)出发
> - 布局:从当前任务的 PRD 和参考图出发
> - 风格:由用户在 prompt 里指定,或主动询问
>
> 当现有 demo 的某个部分被你判断为"可能值得继承"时,先在回复中明确指出"我观察到 X demo 用了 Y 处理,是否要保持一致?",由用户决定。

### 设计系统建立期的两人协作

设计系统目前还是骨架(`01-foundations/` 和 `02-components/` 多数是 .gitkeep),正是建立期。建议的协作节奏:

1. **每个新原型完成后**,你和 Codex 一起复盘:这个原型用到的哪些视觉决策、组件、模式应该沉淀?
2. **Codex 写规范** → `01-foundations/` 写 tokens,`02-components/specs/` 写组件规范
3. **Claude 写实现** → `02-components/ui/` 实现可复用代码片段
4. **后续原型** → Claude 优先复用已沉淀内容,如果不够用再扩展
5. **2-3 个原型周期后** → 设计系统应该有真实基线,后续原型才有"参考"价值

---

## 八、原型工程化:`app/` 阶段的技术约定

不是所有原型都要进入这一步,但一旦进入,要遵守以下约定让产出仍然"双击即看"。

### 仓库内 `app/` 推荐结构

```
05-prototypes/<topic>/app/
├── src/
│   ├── api/           # 数据层
│   ├── components/
│   ├── pages/
│   ├── data/          # inline 数据(L1/L2/L3 都可,标注清楚)
│   └── main.tsx
├── public/
│   ├── fonts/         # 字体本地化
│   └── data/          # 较大的 JSON 数据文件
├── vite.config.ts
├── package.json
└── README.md          # 独立运行说明
```

### Vite 配置

```typescript
// vite.config.ts
export default defineConfig({
  base: './',  // ★ 关键:相对路径,支持 file:// 双击打开
  build: {
    outDir: 'dist',
    assetsInlineLimit: 100000,  // 小资源 inline 进 JS,减少文件数
  },
})
```

### 路由

```typescript
import { createHashRouter } from 'react-router-dom'  // 不是 createBrowserRouter
```

### 数据层(无后端阶段)

数据全部 inline,不引入 MSW(MSW 在 `file://` 下不工作,且当前没有真实后端要 mock):

```typescript
// src/api/swimlane.ts
import sampleData from '../data/swimlane-sample'  // 标注 L1/L2/L3

export async function getSwimlaneData() {
  await new Promise(r => setTimeout(r, 200))  // 模拟加载,保留 loading 动效
  return sampleData
}
```

### 数据层(引入后端后,未来阶段)

当工作台 demo 引入后端时,数据层升级为可切换模式:

```typescript
// src/api/client.ts
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true'

export async function getSwimlaneData() {
  if (USE_REAL_API) {
    return fetch('/api/swimlane').then(r => r.json())
  }
  const sampleData = await import('../data/swimlane-sample')
  await new Promise(r => setTimeout(r, 200))
  return sampleData.default
}
```

这样:
- 离线分享时用 `npm run build`(默认 inline 数据),产出 `dist/` 双击即看
- 内部联调时用 `VITE_USE_REAL_API=true npm run build`,接入真实后端

### Build 与分享

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:demo": "vite build",       // inline 数据,可双击运行的 demo
    "build:full": "VITE_USE_REAL_API=true vite build",  // 接后端版,未来用
    "preview": "vite preview"
  }
}
```

```bash
cd 05-prototypes/<topic>/app
npm install
npm run build:demo
# 产出在 dist/,把整个 dist/ 文件夹打包发出去
```

### 验证清单(每次发出前自查)

- [ ] 把 `dist/` 复制到一个完全不同的目录,Chrome / Edge / Safari 都试试双击打开
- [ ] 检查所有页面切换、所有交互、所有动效正常
- [ ] 关掉网络再打开一次,确认完全离线可用(字体如果用了 Google Fonts 会回落)
- [ ] 检查 Console,没有 404 或 CORS 错误

---

## 九、Skill 体系:当前 + 未来演进

PyPTOUX 已有 4 个 skill(`pyptoux-content-router` / `pyptoux-git-github` / `pypto-knowledge-source` / `pypto-demo-data-filling`),都为 Codex 服务。随着工程演进,会逐步新增更多 skill。

### 当前 skill 在双 agent 工作流里的角色

| Skill | 谁用 | 在工作流哪一步 |
|---|---|---|
| `pyptoux-content-router` | Codex | 新内容路由、命名、索引同步 |
| `pyptoux-git-github` | Codex | 提交、推送、PR |
| `pypto-knowledge-source` | Codex | 查 PyPTO 业务知识 |
| `pypto-demo-data-filling` | Codex(产出),Claude(消费) | Codex 准备 L1/L2 数据,Claude 拿去写原型 |

### 未来可能新增的 skill(按工程演进阶段)

> 以下为候选清单,按需逐个新建,不需一次到位。每个 skill 的标准位置:`.agents/skills/<skill-name>/SKILL.md`。

#### 阶段 1-2 期(单文件 HTML / 课题工程化)

- **`pyptoux-prototype-reviewer`**:基于 PRD 和 interaction-spec,review 原型实现是否覆盖关键交互。Codex 用,Claude 配合。
- **`pyptoux-share-packager`**:把 `experiments/` 或 `app/dist/` 打包成可分享的 zip,带 README 和版本信息。Codex 用。
- **`pyptoux-data-schema`**:维护 PyPTO 各类数据(`program.json`、`*_ROOT.json` 等)的 schema 定义,L2 推导数据时引用。从 `pypto-demo-data-filling` 拆出。

#### 阶段 3 期(工作台 demo)

- **`pyptoux-workbench-architect`**:维护工作台 demo 的整体架构、模块清单、数据流向、各课题的接入方式。Codex 用。
- **`pyptoux-designsystem-extractor`**:从多个原型中识别可提取到设计系统的组件/模式。Codex 用。
- **`pyptoux-component-generator`**:基于 `07-designsystem/02-components/specs/` 的组件规范,生成符合规范的实现脚手架。Claude 用。

#### 阶段 3+ 期(后端引入后)

- **`pyptoux-api-contract`**:维护前后端 API 契约的 TypeScript 类型 + JSON Schema。Codex 主写,Claude 消费类型。
- **`pyptoux-backend-conventions`**:后端代码规范、错误处理、日志格式。Codex 用。
- **`pyptoux-deploy`**:本地预览服务、内网/云端部署步骤。Codex 用。

#### 阶段 4 期(产品化拆分时)

- **`pyptoux-extract-to-product`**:把某个原型从 PyPTOUX 拆到独立产品仓库的迁移流程。Codex 用。

### Skill 创建的触发原则

不要为了"完整性"提前创建 skill。每个 skill 的合理触发时机:

1. **同一类操作做了 3 次以上**,每次都要重新解释规则 → 抽成 skill
2. **多个 agent 都需要遵守同一组规则** → 抽成 skill,在 `AGENTS.md` 索引
3. **某个领域知识(如数据 schema、设计 token 命名)开始稳定** → 抽成 skill 固化

### Skill 维护的双 agent 协作

- **Codex 是 skill 的主要使用者和维护者**——大多数 skill 都是约束 Codex 自己怎么操作仓库
- **Claude 也读 skill**——通过 `CLAUDE.md` 的"必读上下文"列表显式列出与 Claude 工作相关的 skill(如 `pypto-demo-data-filling` 的产出规则、未来的 `pyptoux-component-generator` 等)
- **新增 skill 时**:Codex 写 `SKILL.md`,如果与 Claude 工作相关,同步更新 `CLAUDE.md`

---

## 十、工作流示例

### 场景 A:全新课题——从知识到原型

> 例:接到任务"设计 mix 子图泳道图核间同步可视化"

1. **Codex**:用 `pypto-knowledge-source` 查 `pypto` 仓库的 issue #1121,把背景理解沉淀到 `02-knowledge/02-swimlane-profiler/`。
2. **Codex**:在 `04-uxdesign/02-swimlane-profiler/` 写或迭代 PRD / UX 分析。
3. **Codex**:用 `pypto-demo-data-filling` 准备数据——优先 L1(找真实日志),不行用 L2(基于 schema 推导),放到 `05-prototypes/02-swimlane-profiler/notes/sample-data.md`,标注数据级别。
4. **Codex**:用 `pyptoux-content-router` 确认路径正确,如有新增课题更新 `10-docs/03-indexes/prototypes.md`。
5. **你切到 Claude Desktop**:打开新会话,选项目根目录,首条 prompt:
   > 读 `04-uxdesign/02-swimlane-profiler/prd.md`(以最新版本为准)和 `05-prototypes/02-swimlane-profiler/notes/sample-data.md`,在 `experiments/html/swimlane-sync-v1.html` 实现一个单文件 demo,展示 mix 子图核间同步的等待段。视觉风格:从 `07-designsystem/03-guidance/principles.md` 出发,**不参考其他现有 demo 的样式**。数据严格用 sample-data 里的内容。
6. **Claude**:写完 → 内嵌预览 → 截图 → 自我验证。
7. **你 review**:在 diff view 里点行加评论,Cmd+Enter 提交,Claude 再迭代。
8. **Claude**:迭代满意后,在 `prompts/swimlane-sync-v1.md` 写 prompt 记录,在 `notes/swimlane-sync-v1.md` 写"已验证 / 待解决 / 下一步"。
9. **Codex**:用 `pyptoux-git-github` 提交 + 推送,PR title 和 commit message 用中文。

### 场景 B:发给业务方看 demo

10. **你打开 Finder**,找到 `05-prototypes/02-swimlane-profiler/experiments/html/swimlane-sync-v1.html`。
11. **直接发**:微信/邮件附件直接发这个 .html 文件,或者打包整个 `experiments/html/` 文件夹。
12. **对方双击 .html**:浏览器打开,完整交互、动效、视觉,**和你本地完全一致**(因为遵守了"资源内嵌"约束)。
13. **收到反馈** → 让 Claude 在 Desktop 里改 → 再发一版。整个循环不需要任何部署。

### 场景 C:课题升级到 `app/`

> 例:swimlane-profiler 想做成可持续演进的工具

1. **你和 Codex 商量**:确认升级路径,在 `notes/upgrade-to-app.md` 写迁移计划。
2. **Codex** 在 `app/` 初始化 Vite + React + TypeScript 工程,配 `vite.config.ts` 的 `base: './'`,准备 build 脚本。
3. **Codex** 把 `notes/sample-data.md` 的数据迁移到 `app/src/data/`,保持 L1/L2/L3 标注。
4. **Claude** 把 `experiments/html/` 里最新的 demo 拆成组件,迁移到 `app/src/`。
5. **新增 npm script**:`build:demo` 产出 `dist/` 文件夹。
6. **Codex** 更新 `prototypes.md` 索引,标注课题已进入 app 阶段。

### 场景 D:整合到工作台 demo

> 例:已经有 3 个独立原型,要做整合工作台

1. **Codex 主导规划**:
   - 写 `04-uxdesign/00-shared/workbench/ia.md`(信息架构)
   - 写 `04-uxdesign/00-shared/workbench/interaction-spec.md`(交互规范)
   - 决定技术架构:纯前端集成 vs 引入后端
   - 在 `05-prototypes/00-shared/workbench/` 初始化工程
2. **Codex 决定每个课题如何接入**:
   - 是 React Router 多路由集成
   - 还是抽出共享组件重新组装
   - 还是 iframe 嵌入(最低成本但隔离最强)
3. **Claude 实现工作台外壳**:导航、布局、模块切换、统一主题(基于已建立的设计系统)
4. **Claude 把各课题适配进工作台**(可能需要微调原课题代码)
5. **保持双向关系**:各独立课题继续可单独 demo,工作台是它们的整合视图——这个对齐由 Codex 维护
6. **首次工作台 demo 完成后**:Codex 评估是否需要引入后端服务

### 场景 E:同一组件在多个原型间复用

> 例:三个 demo 都用了相同的"算子卡片"

1. **你发现复用模式**,让 Codex 评估:
   > 这个算子卡片在 X、Y、Z 三个 demo 里都出现,是否应该提升到 `07-designsystem/02-components/`?
2. **Codex** 决策并在 `07-designsystem/02-components/specs/operator-card.md` 写规范(props、状态、视觉规则)
3. **Claude** 在 `07-designsystem/02-components/ui/operator-card.html`(或 jsx)写参考实现
4. **后续原型**直接复制 `ui/operator-card.html` 的 markup + style
5. **Codex** 同步更新 `10-docs/03-indexes/designsystem.md`

---

## 十一、订阅与成本

| 项目 | 推荐计划 | 大致成本 |
|---|---|---|
| ChatGPT(Codex 桌面端) | Plus 起步 | ~$20/月 |
| Claude(Desktop Code 标签) | Pro 起步 | ~$20/月 |

**判断标准**:
- 个人 UX 探索 + 偶尔分享:两个 Pro 完全够。
- 如果原型迭代频繁、想用 Computer use 在 macOS 上测真实工具:Claude 升 Max。
- 如果 Codex 用得很重(每天大量知识库整理 + 自动化 + 后端开发):升 ChatGPT Pro 或 Business。
- 进入工作台 demo 阶段、引入后端后,Codex 的工作量会显著增加,届时再考虑升级。

**Computer use 的取舍**:
- Codex 桌面端的 Computer use 支持多 agent 后台并行操作所有应用(macOS),适合自动化截图、和 Figma/截图工具交互。
- Claude Desktop 的 Computer use 同样仅 macOS,适合让 Claude 在你的浏览器里测原型、对照设计稿改。
- 日常自动化交给 Codex;Claude 的 Computer use 只在测原型 GUI 时打开,避免抢鼠标。

---

## 十二、AGENTS.md 增量补充建议

你现有的 `AGENTS.md` 已经非常完善,这里建议**增加两节**(放在第 5 节"项目级协作约定"之后),并**修订一节**(第 5.4 节)。

### 修订:5.4 Demo 素材规则(数据策略升级)

替换原文为:

```markdown
### 5.4 Demo 素材规则

PyPTO demo 采用三层数据策略:

- **L1 真实数据**:直接来自上游 `pypto`、样例数据、真实编译产物。优先选择。
- **L2 推导数据**:真实数据缺失时,基于明确的 schema、字段定义、业务规则生成。要求字段名严格符合上游约定、数值合理、多数据点逻辑自洽。在 `notes/sample-data.md` 标注来源和生成规则。
- **L3 占位数据**:仅用于早期布局验证。不外发。在 `notes/` 标注"待替换"。

通用规则:
- 不要把 L2/L3 数据伪装成 L1 真实运行结果——内部可追溯,对外可呈现
- 优先保证"可追溯 + 自洽",再追求"好看"
- 如果用到样例数据,优先查看 `02-knowledge/00-shared/pypto-sample-datasets/overview.md`
- demo 文案允许统一术语口径,但引用上游真实产物时仍应保留原始路径名、文件名和字段名
```

### 新增:5.6 双 Agent 协作约定

```markdown
### 5.6 双 Agent 协作约定(Codex 与 Claude Desktop)

PyPTOUX 默认使用 Codex 桌面端 + Claude Desktop 协同。

**Codex 负责**:
- 规划与方案(工作台演进路线、技术选型)
- 业务知识检索与沉淀(`02-knowledge/`)
- 设计输出整理(`04-uxdesign/`)
- 内容路由与索引维护(`10-docs/`)
- 原型素材准备(L1/L2 数据)
- 后端与构建(未来阶段)
- Git / GitHub 操作

**Claude Desktop 负责**:
- 原型实现(`05-prototypes/<topic>/experiments/`、`/app/`)
- 工作台 demo 前端实现(未来)
- 视觉与动效迭代
- 内嵌预览自我验证
- 原型 prompts / notes 记录

**边界约束**:
- Codex 不修改 `<style>` / SVG / 动画曲线等视觉代码
- Claude 不修改 `02-knowledge/`、`03-insights/`、`04-uxdesign/`、`10-docs/` 下的正文
- 两个 agent 都遵守 `content-routing.md` 第 7.1 节(literal 不可改写)
- 两个 agent 都遵守第 5.4 节(数据三层策略)
- Claude 不默认参考现有 demo 文件作为视觉/布局基线,以设计系统和当前 PRD 为准

**索引同步责任**:
- Codex 创建新课题/共享框架时,负责更新 `10-docs/03-indexes/`
- Claude 在 `experiments/` 内的实验文件不算新课题
- Claude 把原型升级到 `app/` 时,通知 Codex 更新 `prototypes.md`
```

### 新增:5.7 原型形态演进与工作台 demo

```markdown
### 5.7 原型形态演进

PyPTOUX 的原型按以下阶段演进:

1. **单文件 HTML**:`experiments/html/<demo-name>.html`,资源内嵌、无 build、双击运行
2. **课题工程化**:`<topic>/app/`,Vite + 框架,`base: './'` + Hash Router,产物可双击
3. **跨课题工作台 demo**:`05-prototypes/00-shared/workbench/`(或由 router 决定),整合多个课题
4. **后端引入**(可选):工作台 demo 需要时,Codex 主导后端方案,目录可演进为 monorepo
5. **产品化拆分**(超出本仓库):某个 demo 真正产品化时,从本仓库拆出

不要提前过度工程化。每个阶段的升级由实际需求触发。
```

---

## 十三、CLAUDE.md 模板(放在仓库根目录)

PyPTOUX 目前是 Codex-first 架构(只有 `AGENTS.md`),Claude Desktop 默认会读 `CLAUDE.md`。建议在仓库根新建一份,内容如下:

```markdown
# Claude Desktop 工作指南(PyPTOUX)

## 你的角色
你在 PyPTOUX 仓库里负责**原型实现 + 视觉迭代**。这是一个 UX 设计师的长期工作台,
当前以单文件 HTML 原型为主,未来会演进到完整的算子开发工作台 demo。

## 必读上下文(每次开始前)
1. `README.md` —— 仓库总览
2. `AGENTS.md` —— 项目级协作约定(尤其第 5.4、5.6、5.7 节)
3. `10-docs/01-conventions/content-routing.md` —— 内容路由规则
4. `10-docs/01-conventions/agent-writing-style.md` —— 写作风格
5. `07-designsystem/03-guidance/` —— 设计原则(已有部分内容)
6. 当前任务对应的 `04-uxdesign/<topic>/` —— UX 分析、PRD(以最新版本为准)
7. 当前任务对应的 `05-prototypes/<topic>/notes/sample-data.md` —— 数据来源

## 你工作的目录范围

### 主要写入
- `05-prototypes/<topic>/experiments/html/` —— 单文件 HTML 原型
- `05-prototypes/<topic>/experiments/jsx/` —— JSX/TSX 草案
- `05-prototypes/<topic>/prompts/` —— 生成上下文记录
- `05-prototypes/<topic>/notes/` —— 验证结论
- `05-prototypes/<topic>/snapshots/` —— 截图
- `05-prototypes/<topic>/app/` —— 工程化原型(进入此阶段时)
- `05-prototypes/00-shared/` —— 跨课题复用模块、工作台外壳(未来)
- `07-designsystem/02-components/ui/` —— 可复用 UI 实现
- `08-assets/` —— 输出截图、图标

### 仅读不写
- `02-knowledge/` —— 业务知识(Codex 维护)
- `03-insights/` —— 洞察(Codex 维护)
- `04-uxdesign/` —— 设计输出(Codex 维护)
- `09-references/` —— 外部资料索引
- `10-docs/` —— 规范、模板、索引

### 不要碰
- `.agents/` —— skill 定义
- `01-inbox/`、`11-archive/` —— Codex 操作

## 视觉与布局起点(重要)

不要默认参考现有 `experiments/html/` 下的 demo 作为视觉/布局/交互基线。
现有 demo 还在迭代,不是稳定基线。

视觉起点:
- 从 `07-designsystem/03-guidance/principles.md`、`voice-and-tone.md`、`usage-rules.md` 出发
- `07-designsystem/01-foundations/`(tokens)如已有内容则直接使用
- 用户在 prompt 里指定的设计参考、截图、Figma 链接

布局起点:
- 从当前任务的 PRD 和 interaction-spec 出发
- 用户在 prompt 里描述的交互流程

风格不确定时:
- 不要"自由发挥"
- 在回复中明确询问:"建议风格 A / B,倾向哪个?"
- 或:"我观察到 X demo 用了 Y 处理,是否要保持一致?"

## 单文件 HTML 原型硬约束

写 `experiments/html/<demo-name>.html` 时:

1. **资源内嵌或相对路径**
   - CSS 写在 `<style>` 标签内
   - JS 写在 `<script>` 标签内
   - 图片优先 inline SVG 或 base64
   - 字体可用 Google Fonts(注意离线时回落到系统字体)

2. **不依赖 build 工具**
   - 不写需要 webpack/vite 才能跑的语法
   - 用 React 时通过 esm.sh 或类似 CDN 引入

3. **不调用外部 API**
   - 所有数据 inline 在 JS 里

4. **多页用 hash 路由**
   - `#step-1` / `#tab-perf`,不用 history API

5. **目标浏览器**:Chrome / Edge / Safari 最近三版

## `app/` 阶段(用 Vite 时)

如果原型升级到 `app/`,遵守:

- `vite.config.ts` 的 `base: './'`
- 路由用 `createHashRouter`
- 数据 inline 在 `src/data/`,标注 L1/L2/L3
- 字体放 `public/fonts/`,图片放 `public/` 或 `src/assets/`
- 提供 `npm run build:demo` 脚本,产物 `dist/` 必须能解压双击运行
- 未来引入后端时,数据层支持 `VITE_USE_REAL_API` 环境变量切换

## 数据规则(继承 AGENTS.md 5.4 三层策略)

- 优先 L1 真实数据
- L1 缺失时使用 L2 推导数据(基于已知 schema、字段定义、业务规则)
- L3 占位仅用于早期布局,不外发,需在 `notes/` 标注"待替换"
- 不要把 L2/L3 伪装成 L1
- `program.json`、`*_ROOT.json`、`rootHash`、`callOpMagic`、`leafHash` 等 literal 必须保留原样

**数据来源优先级**:
1. `notes/sample-data.md` 已有的数据 → 直接用
2. 没有 → 在 prompt 中告知用户"需要 X 数据,建议让 Codex 准备",不自己编造
3. 用户授权后允许临时 L3 占位,标注"待替换"

## 写完一个原型后的固定动作

1. 用 Desktop 内嵌预览自我验证:看效果、点交互、截图
2. 截图保存到 `snapshots/<demo-name>.png`
3. 在 `prompts/<demo-name>.md` 记录生成上下文(参考的 PRD 版本、关键决策、用户的视觉偏好)
4. 在 `notes/<demo-name>.md` 用 `10-docs/02-templates/prototype-notes.md` 模板写:
   - 原型目标
   - 当前版本说明
   - 已验证结论
   - 待解决问题
   - 下一步
5. **不要**自己更新 `10-docs/03-indexes/`——索引由 Codex 负责

## 写作风格

- 中文优先(正文、说明、注释)
- 英文保留:目录名、文件名、代码标识、稳定术语(`HTML`、`JSX`、`PRD`、`UX`)
- 详见 `10-docs/01-conventions/agent-writing-style.md`

## 不确定时

- 路径不确定 → 让 Codex 先用 `pyptoux-content-router` 决定
- 数据真实性不确定 → 让 Codex 用 `pypto-knowledge-source` 查证
- 视觉风格不确定 → 在回复中询问用户,不要默认沿用旧 demo 风格
- PRD 内容矛盾或不完整 → 在 `notes/` 写"PRD 待澄清",不要自己脑补
- 不要自己编造路径、数据、PRD 细节
```

---

## 十四、典型分享场景速查

| 场景 | 操作 | 适用阶段 |
|---|---|---|
| 内部 review,给同事看一个 demo | 直接发 `experiments/html/<demo-name>.html` 单文件 | 阶段 1 |
| 给业务方/产品看一组 demo | 打包整个 `experiments/html/` 文件夹发 zip | 阶段 1 |
| 给设计师看视觉细节 | 同上,或附上 `snapshots/` 截图 | 阶段 1-2 |
| 给用户做原型测试 | 单文件 HTML 最稳;复杂时用 `app/dist/` 文件夹 | 阶段 1-2 |
| 想要在线访问的链接 | `app/dist/` 部署到 Vercel/Netlify(可选) | 阶段 2-3 |
| 给业务方看完整工作台 | 打包 `workbench/dist/` 文件夹 | 阶段 3 |
| 想做组件库浏览页 | 在 `07-designsystem/02-components/ui/` 下做总览 HTML | 任意 |
| 内部联调真实数据 | `VITE_USE_REAL_API=true npm run build` 接后端 | 阶段 3+ |

---

## 十五、常见陷阱与避坑

### 1. 两个 agent 同时改一个原型文件

**症状**:Claude 在改 `experiments/html/foo.html` 的视觉,你又让 Codex 帮忙改这个文件的数据,merge 冲突。

**对策**:
- 数据修改也让 Claude 做(Claude 拿到 Codex 提供的真实数据片段后自己改 `<script>` 里的 inline 数据)
- Codex 只在 markdown 文档(`notes/`、`prompts/`)里给出"应该改成什么"的建议,不直接动 .html 文件

### 2. Claude 编造 PyPTO 业务事实

**症状**:Claude 写 demo 时为了"看起来合理"编造算子名、字段名、core 编号。

**对策**:
- `CLAUDE.md` 里硬性约束:"不确定数据真实性 → 让 Codex 查证"
- 三层数据策略:L1 用真实、L2 用推导(由 Codex 基于 schema 生成)、L3 占位明确标注
- Claude 不能自行决定升级 L3 → L2,L2 数据必须由 Codex 通过 `pypto-demo-data-filling` 产出

### 3. Claude 默认沿用旧 demo 风格

**症状**:你说"做个新的算子卡片",Claude 默认用了现有 demo 的深色科技风,但你其实想试试浅色风。

**对策**:
- `CLAUDE.md` 里明确"不要默认参考现有 demo 视觉"
- 风格不明确时主动询问
- 你给 prompt 时主动说明视觉方向(参考图、风格关键词)

### 4. 单文件 HTML 在你机器上能跑,对方打不开

**症状**:你本地双击正常,对方说白屏或样式丢失。

**对策**:
- 必做:发出去前自己换个目录双击验证一次
- 检查浏览器 Console:90% 是引用了外部资源(本地路径、内部 CDN)
- 字体如果用 Google Fonts,告诉对方"加载需要联网,首次会慢一点"

### 5. 索引漂移

**症状**:新增了一个原型课题但 `10-docs/03-indexes/prototypes.md` 没更新。

**对策**:
- 谁创建课题谁更新——按惯例是 Codex(用 `pyptoux-content-router`)
- Claude 进入 `app/` 阶段后通知 Codex 更新
- 定期让 Codex 跑一次"索引一致性检查":扫描 `05-prototypes/` 实际目录 vs `prototypes.md`,找差异

### 6. 设计系统沉淀滞后

**症状**:同一个组件在 5 个原型里写了 5 次,样式略有差异,从来没沉淀到 `07-designsystem/`。

**对策**:
- 每完成 2-3 个原型,让 Codex 跑一次"重复模式扫描":
  > 对比 `05-prototypes/` 下所有 experiments,找出在 3 个及以上 demo 里出现的 UI 模式,评估是否提升到 `07-designsystem/02-components/`。
- 提升时:Codex 写 `specs/`,Claude 写 `ui/` 实现

### 7. Claude 越界改了 `04-uxdesign/` 的 PRD

**症状**:Claude 觉得 PRD 不够清晰,自己改了 `04-uxdesign/<topic>/prd.md`。

**对策**:
- `CLAUDE.md` 里明确"`04-uxdesign/` 仅读不写"
- Claude 发现 PRD 有问题应在 `notes/` 里记录"PRD 待澄清",而不是直接改
- 你 review notes 后让 Codex 修订 PRD

### 8. 提前过度工程化

**症状**:还在阶段 1(单文件 HTML)就引入 monorepo / 后端 / 复杂构建链。

**对策**:
- 严格按"实际需求触发升级",不为了"完整"提前做
- 每个阶段的升级触发条件见第五节
- 升级前让 Codex 评估"这个升级解决什么具体痛点",不能解释清楚就先不做

---

## 十六、一句话总结

- **Codex 桌面端**做"规划与工程层"——查业务、写 PRD、维护规范、准备数据(L1/L2)、未来管后端、管 Git。
- **Claude Desktop**做"原型与视觉层"——写 HTML/JSX、调样式、跑预览、出截图、记笔记。
- **协作核心区**是 `05-prototypes/<topic>/`,Claude 在 `experiments/`、`prompts/`、`notes/`、`snapshots/`、`app/` 内活动,Codex 在外围提供素材和规则。
- **形态演进路径**清晰:单文件 HTML → 课题工程化 → 跨课题工作台 demo → 引入后端,按需求触发,不提前过度工程化。
- **数据策略升级为三层**:L1 真实优先,L2 推导补缺(Codex 基于 schema 生成),L3 占位临时标注。
- **现有的 4 个 skill 继续生效,本文档预留了未来新增 skill 的清晰路径**(原型 review、组件生成、API 契约、部署等),按实际需求逐个新建。
- **Claude 不默认沿用现有 demo 风格**——以设计系统、当前 PRD 和你的指定为准,设计系统建立期主动配合 Codex 沉淀基线。
