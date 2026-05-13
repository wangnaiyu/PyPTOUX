# prototype-bundler · spec

## 1. 用途

把基于 ES module 的多文件 HTML 原型（`index.html` + 多个 CSS / JS 模块）打包成**单文件 HTML**，使收件人无需本地 server 即可双击运行。

主要解决：ES module 在 `file://` 协议下被浏览器 CORS 拦截，导致双击原型 `index.html` 看不到内容的问题。

## 2. 适用对象

- 任意以 `index.html` 为入口的纯前端原型
- `<head>` 中通过 `<link rel="stylesheet" href="...">` 引用同目录或子目录下的 CSS
- `<body>` 中通过 `<script type="module" src="...">` 引用同目录或子目录下的 JS
- JS 文件之间用相对路径 `import ... from './path.js'`

不适用：
- 使用 npm / bundler 依赖的原型（`import 'react'`、`import 'lodash/...'`）
- 依赖 fetch 本地 `.json` / `.csv` / 图片资源的原型（运行时同源限制下 file:// 也会拦截）—— **首版不处理**，后续可加 base64 内联
- iframe / Web Worker 引用的资源

## 3. 命令入口

- **双击：`prototype-bundler.command`**
- **CLI：`python3 bundler.py --cli <prototype-dir> [-o <out>] [--keep-fonts]`**
- **辅助：`python3 bundler.py --infer-name <prototype-dir>`**（仅打印推断出的默认文件名，供 `.command` 调用）

GUI 通过 `osascript`（AppleScript）多步原生对话框实现。不依赖任何 Python GUI 库。

> **决策记录 · 2026-05-13**：v0.1 试过 tkinter，但 macOS 自带 Python 3.9 绑的是 Tcl/Tk 8.5，已知会出现空白窗口 bug（Python.org 官方亦不建议使用）。改为 osascript 后弹出的全是 macOS 系统对话框，永不空白，也不要求用户安装 homebrew Python。
>
> **决策记录 · 2026-05-13 · 兼容 bash 3.2**：`.command` 的 shell 在 macOS Finder 双击启动时进的是系统自带 `/bin/bash 3.2.57`。脚本避开两个已知坑：
> - 不开 `set -u`：实测会在某些用户环境下对 `${VAR%%PATTERN}` 抛 "unbound variable"。所有需要的变量在顶部显式初始化为空。
> - 拆 tab 分隔字符串改用 `TAB=$(printf '\t')` + `${VAR%%${TAB}*}`，不依赖 `$'\t'` 在参数展开中的支持。

## 4. 输入

| 字段 | 来源 | 默认 | 可改 |
|---|---|---|---|
| 原型文件夹 | 用户在 GUI 上选目录（macOS 文件夹选择对话框） | 无 | 是 |
| 产物文件名（不含 `.html`） | 自动推断：`<topic-folder-name>-<prototype-folder-name>` | 例如 `06-a5-pmu-visualization-group2-loop` | 是 |
| 产物存放目录 | 自动推断：所选原型文件夹的父目录 | 例如 `05-prototypes/06-a5-pmu-visualization/experiments/` | 是 |
| 移除 Google Fonts | checkbox | 默认勾选 | 是 |

**topic-folder-name 推断规则**：在所选路径中向上回溯，找到第一个直接位于 `05-prototypes/` 下的目录名作为 topic。如：
- 选 `05-prototypes/06-a5-pmu-visualization/experiments/group2-loop/` → topic=`06-a5-pmu-visualization`，prototype=`group2-loop`，文件名=`06-a5-pmu-visualization-group2-loop`
- 选 `05-prototypes/02-swimlane-profiler/experiments/html/v1/` → topic=`02-swimlane-profiler`，prototype=`v1`，文件名=`02-swimlane-profiler-v1`

若无法推断（不在 `05-prototypes/` 下），fallback 为 `prototype-folder-name`，用户可手改。

## 5. 输出

单文件 HTML，结构：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset>...
  <title>...</title>
  <style data-bundled-from="styles/tokens.css">/* ... */</style>
  <style data-bundled-from="styles/layout.css">/* ... */</style>
  ...
</head>
<body>
  <!-- original body markup -->
  <script type="module" data-bundled-entry="js/main.js">
    /* === inlined module: js/data/tasks.js === */
    ...
    /* === inlined module: js/main.js (entry) === */
    ...
  </script>
</body>
</html>
```

打包产物在文件开头加注释：
```html
<!--
  PyPTOUX prototype bundle
  source: <relative path to prototype folder>
  built : 2026-05-13 13:42:11
  level : L3 demo · exploration-only
-->
```

## 6. 内部处理流程（pipeline）

输入 → 进度阶段：

1. **校验输入**
   - 所选目录存在且有 `index.html`
   - `index.html` 中没有不支持的引用方式（绝对路径、远程 src、Web Worker 等）→ 失败时给出明确错误
2. **解析 index.html**
   - 收集 `<link rel="stylesheet">` 列表
   - 收集 `<script type="module" src=...>` 列表（视为入口；通常只有 1 个）
   - 如勾选"移除 Google Fonts"：删除 `link[rel="preconnect"]`、`link[href*="fonts.googleapis.com"]`、`link[href*="fonts.gstatic.com"]`
3. **CSS 内联**
   - 按出现顺序读入每个 CSS 文件，转为 `<style data-bundled-from="...">` 注入 head
4. **JS 模块解析与内联**
   - 从入口 JS 出发，做拓扑 DFS：遇到 `import { ... } from './path.js'` 递归读取依赖
   - 处理 `export` / `import`：
     - `export const foo` / `export function foo` / `export class Foo` → 去掉 `export` 关键字（保留定义）
     - `export { a, b }` → 删除（IIFE 内部默认可见）
     - `export default X` → 不支持（首版抛错；当前 prototype 没用 default export）
     - `import { a, b } from './x.js'` → 删除（IIFE 内部直接可访问）
     - `import X from './x.js'` → 不支持（首版抛错）
   - 按依赖顺序拼接：被依赖的模块先出现，入口模块最后
   - 用 `<script type="module">` IIFE 包裹（确保 ES module 语义里的顶层 `await`、`import.meta` 仍能工作；本原型不用就走 classic IIFE）
   - **首版采用 IIFE + 模块顺序拼接**，理由：本原型未使用 dynamic import / top-level await。后续如果有原型用到再升级。
5. **拓扑校验**
   - 检测循环依赖 → 报错
   - 检测未解析的导入（指向不存在的文件）→ 报错
6. **写入产物**
   - 先写到临时文件 `<output>.tmp`
   - 写完后原子重命名为 `<output>.html`
   - 失败时清理 `.tmp`
7. **完成提示**
   - GUI 显示绿框：产物绝对路径 + "在 Finder 中显示" 按钮
   - 失败时显示红框 + 完整错误堆栈摘要 + "复制错误信息" 按钮

## 7. GUI 界面契约（osascript 多步原生对话框）

双击 `prototype-bundler.command` 后顺序触发：

1. **选择原型文件夹** · 系统 "Choose folder" 对话框，prompt = "选择原型文件夹（含 index.html）"
2. **确认产物文件名** · `display dialog` 带 default answer，预填推断结果（见 §4），可修改，按"下一步"继续
3. **选择产物存放目录** · 再一个 "Choose folder"，default location 为推断出的目录
4. **是否移除 Google Fonts** · 两按钮对话框 `{"保留", "移除"}`，default = 移除
5. **运行打包** · 在 Terminal 窗口里 streaming 输出进度（"读取 / 内联 / 解析 …"）；用户全程能看到日志
6. **最终结果对话框**：
   - 成功 → `{"在 Finder 中显示", "完成"}`，前者会执行 `open -R <output>`
   - 失败 → 单按钮 `{"知道了"}`，提示去 Terminal 看详细错误

任意一步按 ✗ Cancel → 整个流程退出（exit 0），Terminal 窗口 3 秒后自动关闭。

进度展示不在对话框里（系统对话框是模态阻塞型）—— **Terminal 窗口本身就是进度面板**，用户能同时看 dialog + 日志。

> 这与原本"一窗口、一表单"的设想相比：UX 慢一点（多步），但视觉上是系统原生 sheet/dialog，永远不会渲染空白。

## 8. 数据等级限制

- 工具本身不读取任何业务数据
- 打包过程纯文本拼接，不对原型源码做语义改动
- 产物保留源码内的所有 `// L3 demo — exploration-only` 标记
- 工具产出的 HTML 头部注释会自动写 `level : L3 demo · exploration-only`（占位标记，仅说明这是开发期工具产出，不代表数据可外发审计已通过）
- **用户责任**：是否真的可以外发，由原型作者按 `AGENTS.md`、`CLAUDE.md §5` 自行判断

## 9. 文件结构

```
prototype-bundler/
├── prototype-bundler.command   ← 双击入口（macOS）；osascript 多步对话框 + 调 bundler.py
├── bundler.py                  ← CLI + 内部 API；不再含 GUI
├── notes/
│   ├── spec.md
│   └── review-YYYY-MM-DD.md    ← Codex review 沉淀
└── README.md
```

> 首版保持单个 `bundler.py`（约 400 行）。后续若文件超过 ~600 行，再按 `parser.py` / `css_inline.py` / `js_inline.py` / `builder.py` 拆分。

## 10. 边界与已知限制

- macOS only（依赖 macOS 系统 Python3 + tkinter；`.command` 是 macOS 专属）
- 不支持 `export default`、`import X from ...`（命名空间默认导入）；当前 PyPTOUX 内的原型未使用
- 不支持 dynamic `import()`、`import.meta.url`
- 不内联本地 `.json` / `.csv` / 图片资源（首版）—— 如原型用 `fetch('./data.json')`，打包后双击仍会失败
- 不处理远程 `<script src="https://...">`（如 CDN 第三方库）—— 这种情况建议把库下载到本地或保持联网
- 路径含空格 / 中文：测过；但路径含特殊符号（`|`、`?`、`*`）未保证
- 不混淆、不压缩、不 minify —— 保留可读性以便事后排查

## 11. 待 review 项（请 Codex 反馈）

- 命名规则 `<topic>-<prototype>` 是否符合内部归档习惯？要不要带版本号 / 日期？
- 是否需要把 build metadata 写到 `05-prototypes/<topic>/notes/build-log.md` 而不是只塞到 HTML 注释里？
- 关于 share-safe 标记：现在只在 HTML 注释里写 `L3 demo`，是否需要在 UI 上强制让用户勾选"已确认可外发"才能保存？
- 是否需要 CLI 模式（无 GUI、纯命令行）以便接入 CI？

## 12. 后续可能扩展

- 支持 windows（PyQt / PyInstaller 打包）
- 支持把本地 `data/*.json` 自动转 data: URI 内联
- 支持把图片 / 字体文件 base64 内联
- 接 GitHub Action：PR 触发自动打包并把产物附到 Release
