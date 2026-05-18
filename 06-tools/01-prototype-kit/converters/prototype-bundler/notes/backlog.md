# prototype-bundler · Backlog

> 来源：`notes/review-2026-05-18.md`（Codex review）+ 后续观察。
> 维护规则：每条都有 **来源 / 触发条件 / 建议方案 / 优先级**。落地一项就从这里删除并在 spec.md 反映。

---

## P1 · 真实存在的 parser bug（现有原型未踩到）

### B-01 · `import { foo as bar }` 别名重命名错误
- **来源**：review §4
- **现象**：当前生成 `const { bar } = ...`；正确语义应为 `const { foo: bar } = ...`
- **触发条件**：任何 ES module 用了 `as` 别名 named import
- **建议方案**：parser 改两行；或先在 spec §10 显式声明"不支持 `import {x as y}`"，遇到时报错
- **当前缓解**：A5 PMU 原型未用，可暂不修

### B-02 · `export { foo as bar }` 别名重命名错误
- **来源**：review §4
- **现象**：当前可能生成 `__exports.bar = bar`（但本地变量名是 `foo`，找不到符号）
- **触发条件**：任何 ES module 用 `as` 别名 named export
- **建议方案**：同 B-01
- **当前缓解**：A5 PMU 原型未用

### B-03 · side-effect import 残留 import 语句
- **来源**：review §6
- **现象**：`import './setup.js'` 不被 `_IMPORT_ANY_RE` 收集，也不被 `_strip_imports_and_export_keywords` 删除；打包后产物里残留 `import` 语句，`file://` 仍会因 ES module 语义触发 CORS
- **触发条件**：任何 ES module 写了 `import './x.js'`（仅副作用，无绑定）
- **建议方案**：在 import 提取阶段加分支识别 side-effect 形式；要么收集进依赖图，要么明确报错
- **当前缓解**：A5 PMU 原型未用

---

## P2 · spec 描述了"应该支持但未实现"的能力

### B-04 · 远程资源仅保留、不算 share-safe
- **来源**：review §6
- **现象**：spec §6 现已写明"远程 `href` / `src` 保留原 tag、不视为 share-safe"。但打包器本身没有一个 `--strict-share-safe` 开关来在遇到远程资源时报错
- **建议方案**：新增 `--strict-share-safe` flag（或 GUI checkbox），开启后任何 `://` 引用直接 fail；默认仍为宽松模式
- **当前缓解**：用户在 README 已被警告"外发需 Codex + Claude 双 review"

### B-05 · `top-level await` / `import.meta` 不保留语义
- **来源**：review §6
- **现象**：spec §10 现已显式列为"不支持"。但打包器不会检测和报错，遇到这两种特性会静默产出可能不可运行的产物
- **建议方案**：在 collect_modules 阶段做 regex 扫描，遇到 `^\s*await ` 或 `import\.meta` 时报错
- **当前缓解**：A5 PMU 原型未用

### B-06 · CSS 内 `url(...)` 资源不内联
- **来源**：review §6
- **现象**：CSS 引用本地字体 / 图片时，打包后产物加载会 404
- **建议方案**：CSS 内联阶段额外扫描 `url(...)`，把本地相对路径资源转 base64 data URI（图片）或 inline 字体
- **当前缓解**：A5 PMU 原型未用本地 url()；如需用，自行 inline 资源到 CSS 后再打包

### B-07 · 相对路径 `../` 可越出 prototype 文件夹
- **来源**：review §6
- **现象**：`import '../../shared/foo.js'` 当前会被正常解析，导致 prototype 文件夹外的相邻文件被打进产物（share-safe 风险 + 边界模糊）
- **建议方案**：解析 import 时检测目标路径是否在 prototype root 之内，不在则报错；或在 `--strict-share-safe` 下开启
- **当前缓解**：A5 PMU 原型所有依赖都在自身目录下

---

## P3 · 接口稳定性与扩展性

### B-08 · `--infer-name` 增加 JSON 输出模式
- **来源**：review §2 + §4
- **现象**：当前 tab 分隔输出；路径含 tab 时会脏；将来要加 `topic` / `prototype` / `warnings` 字段也加不进
- **建议方案**：新增 `--infer-name-json` 子命令输出 `{"name": "...", "outputDir": "...", ...}`；保留 tab 输出作为 legacy
- **当前缓解**：A5 PMU 没问题；`.command` 用 `${VAR%%${TAB}*}` 拆分够用

### B-09 · share-candidate / exploration-only 双模式
- **来源**：review §5
- **现象**：所有产物都写 `level : L3 demo · exploration-only`。无法区分"打来玩"和"已通过 review、准备外发候选"
- **建议方案**：新增 `--variant exploration-only|share-candidate` CLI flag（或 GUI 选项）。`share-candidate` 强制要求 metadata 字段（Codex / Claude review 记录、build_log path），并写一份 build log 到 `05-prototypes/<topic>/notes/build-log.md`
- **当前缓解**：README 已把"L3 默认不能外发"写强

### B-10 · build_bundle 与 CLI I/O 进一步分层
- **来源**：review §4
- **现象**：当前 `build_bundle(...)` 接近 pure，但部分日志通过 callback 传入；`run_cli` 负责 stdout/stderr
- **建议方案**：当文件超 600 行时再按 `parser.py` / `css_inline.py` / `js_inline.py` / `builder.py` 拆。当前 711 行尚未到拆分点，但可以记一笔，待 backlog 任何一项落地时一并整理
- **当前缓解**：N/A

### B-11 · build metadata 写到 build-log.md（可选）
- **来源**：review §5（与 B-09 联动）
- **现象**：当前 build metadata 只在 HTML 头注释里
- **建议方案**：与 B-09 一起做，仅在 `share-candidate` 模式自动写 `05-prototypes/<topic>/notes/build-log.md`。`exploration-only` 不写，避免噪音
- **当前缓解**：N/A

---

## P4 · 友好度

### B-12 · spec §3 措辞收敛
- **来源**：review §3
- **现象**：spec 现写 "Apple Python 3.9.6 环境下是 Tk 8.5；Python.org installer 通常是 8.6"。已收敛过一次，但若有人后续打开 spec 觉得仍宽泛，可再加一句"本机实测"
- **优先级**：低

### B-13 · spec §3 "Finder 双击会进 /bin/bash 3.2.57" 措辞
- **来源**：review §3
- **现象**：如果用户 PATH 里有 Homebrew bash，`#!/usr/bin/env bash` 找到的就是新版
- **建议方案**：把绝对陈述改为"至少需要兼容系统 bash 3.2；用户有 Homebrew bash 时通常更新"
- **优先级**：低（不影响功能）

---

## 落地节奏建议

- **下次有新原型要外发时**：先评估它是否触发 B-01..B-07；触发就先做对应项
- **下次写第二个 converter 时**：评估抽 `shared/` 公共层（路径推断、banner、metadata），把 B-10 一并整理
- **share-safe 流程认真建立时**：B-04 + B-09 + B-11 打包一起做
