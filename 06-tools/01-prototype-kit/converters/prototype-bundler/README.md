# prototype-bundler

把多文件 ES module 原型打包成**单文件 HTML**，给收件人双击即看。

完整设计契约见 [`notes/spec.md`](notes/spec.md)。

## 快速使用

**双击启动：**
```
prototype-bundler.command
```

会先弹出一个 Terminal 窗口（不要关），然后按顺序弹 4 个 macOS 原生对话框：

1. **选择原型文件夹**（"Choose folder"）→ 例如 `05-prototypes/06-a5-pmu-visualization/experiments/group2-loop/`
2. **确认产物文件名**（带默认值，可改） → 例如 `06-a5-pmu-visualization-group2-loop`
3. **选择产物存放目录**（"Choose folder"，默认 = 原型所在的 `experiments/`）
4. **是否移除 Google Fonts CDN**（推荐 "移除"，更 share-safe）

之后 Terminal 内 streaming 显示打包进度（"内联 CSS / 解析 JS / 写盘…"）。结束时弹出最终对话框：
- ✓ 成功 → 可选"在 Finder 中显示"产物
- ✗ 失败 → 看 Terminal 错误详情

任意一步按 Cancel → 退出。

**命令行（CI / 脚本）：**
```bash
python3 bundler.py --cli <原型文件夹> [-o <output.html>] [--keep-fonts]
python3 bundler.py --infer-name <原型文件夹>          # 打印推断默认名 + 存放目录
```

## 为什么是原生对话框、不是 tkinter 表单？

短答：**Apple shipped Python 3.9 自带 Tcl/Tk 8.5**，在 macOS 10.15+ 上会出现"空白窗口"渲染 bug（[官方说明](https://www.python.org/download/mac/tcltk/)）。tkinter 不可靠，但 osascript 对话框永不空白，也不需要装第三方库。这个决策记录在 `notes/spec.md` §3。

## 适用与不适用

✅ 适用：
- 纯前端原型（HTML + CSS + JS）
- JS 用 ES module 命名导入：`import { a, b } from './foo.js'`
- 资源都在原型文件夹内、相对路径引用

❌ 不适用：
- **classic `<script src="...">` 多脚本原型**（无 `type="module"`）。例如 `05-prototypes/05-pypto-studio/experiments/v1/` 当前不能打包
- npm / bundler 依赖（`import 'react'`）
- 运行时 fetch 本地 JSON / CSV / 图片
- `export default` / `import X from ...` / `import * as X`
- top-level `await` / `import.meta`
- side-effect import：`import './setup.js'`（无绑定）

完整边界 + 吸收计划见 `notes/spec.md` §10 + `notes/backlog.md`。

## 我打包后能给谁？

> **默认结论：L3 产物只能内部流转，不能直接外发给业务方 / 产品方 / 设计师 / 客户。**

打包产物在文件头注释里标了 `level : L3 demo · exploration-only`。**这不代表数据已经过外发审计**，只是说"工具产出"。
外发给非项目内成员需满足 `AGENTS.md` / `CLAUDE.md §5` 的全部条件：
- Codex 通过数据真实性 / 边界 / 结构 review
- Claude 通过前端呈现质量 review
- 运行时不再依赖远程资源（如保留 Google Fonts，打包仍不算 share-safe）

任一条不通过 → 视作内部探索，不能外发。

## 状态

- 首版：单文件 `bundler.py`，覆盖 spec §2 适用对象
- 已知边界：见 `notes/spec.md` §10
- 待 review 项：见 `notes/spec.md` §11

## 反馈

修改了实现 → **同步更新 `notes/spec.md`** 再改代码（双 Agent 约定）。
有问题或建议 → 在 `notes/` 下新建 `review-YYYY-MM-DD.md`。
