# launchers · Backlog

> 来源：`notes/review-2026-05-18.md`（Codex review）+ 后续观察。
> 维护规则：每条都有 **来源 / 触发条件 / 建议方案 / 优先级**。落地一项就从这里删除并在 spec.md 反映。

---

## P1 · 安全与正确性

### L-01 · PID 文件登记，避免 stop-previews 误杀
- **来源**：review §3 + §6
- **现象**：`stop-previews.command` 按端口 kill；如果 8766/8770 被非本工具进程占用，仍会被一并 kill
- **触发条件**：用户在同样端口跑了其它本地服务
- **建议方案**：每个 `preview-*.command` 启动时写 `/tmp/pyptoux-preview-pids/<name>.pid`；`stop-previews.command` 优先读 PID 文件，校验 PID 仍在并且其命令行包含 `http.server` 后再 kill；fallback 才落到按端口 lsof
- **当前缓解**：spec §4 已把"按注册端口 kill 可能误杀"写明，提示用户先停掉其他同端口服务

### L-02 · 浏览器 `open` 与 server ready 同步
- **来源**：review §6
- **现象**：当前是 `python3 -m http.server &` → `sleep 1` → `open http://...`。慢机器上浏览器可能先打开空连接刷新失败
- **建议方案**：先 launch server，再轮询端口（`nc -z` 或 `lsof -i:$PORT -sTCP:LISTEN`）直到 ready，再 `open`。需要从 `exec` 改为 `&` + `wait`
- **当前缓解**：通常 1 秒够用；问题不常见

---

## P2 · 抽象与可维护性

### L-03 · `registry.json` 作为端口注册表的单一事实源
- **来源**：review §3 + §4
- **现象**：当前端口表存在三处：`launchers/notes/spec.md §5` 表格、`stop-previews.command` 的 `PORTS=(...)` 数组、`.claude/launch.json` 内联配置。三处需手工同步，容易 drift
- **建议方案**：新建 `launchers/registry.json`：
  ```json
  {
    "pypto-studio-v1": { "port": 8766, "root": "05-prototypes/05-pypto-studio/experiments/v1" },
    "a5-pmu-group2-loop": { "port": 8770, "root": "05-prototypes/06-a5-pmu-visualization/experiments/group2-loop" }
  }
  ```
  - `stop-previews.command` 改为读 JSON 取端口（Python 一行解析）
  - `notes/spec.md §5` 表格作为人读摘要，标注"以 registry.json 为准"
  - `.claude/launch.json` 仍内联（沙箱需要），但更新时以 registry 为 source of truth
- **触发条件**：新增第三个 launcher 时；或两处 drift 已发生
- **当前缓解**：现在只有 2 条，手工同步可承担

### L-04 · 第三个 launcher 出现时，抽出公共生成逻辑
- **来源**：review §2
- **现象**：当前两个 `.command` 模板重复
- **建议方案**：基于 L-03 的 `registry.json` + 一个 generator 脚本 `generate-launcher.sh <name>`（或 Python）→ 产出对应 `.command`。或者写一个通用 launcher `preview.command`，命令行参数取 launcher name，从 registry 拿配置。两种各有取舍
- **触发条件**：第三个 launcher 提案出现
- **当前缓解**：N/A

### L-05 · `list-previews.command`
- **来源**：review §4
- **现象**：用户想知道"我现在在跑哪些预览、URL 多少"，没工具看
- **建议方案**：依赖 L-03，读 registry → 列每条 name / port / root / 是否 LISTEN / PID
- **优先级**：中低（先 L-03 再做）

---

## P3 · 端口与环境

### L-06 · 端口段保留约定
- **来源**：review §4
- **现象**：当前 8766 + 8770 临时挑选
- **建议方案**：约定 `8770–8799` 为 PyPTOUX prototype preview 保留段；8766 例外（pypto-studio 早期占用）；新增从 8771 起递增
- **当前缓解**：spec §5 注释已暗示，可正式写入

### L-07 · python3 缺失时的 preflight 错误信息
- **来源**：review §4
- **现象**：`/usr/bin/env python3` 找不到 python3 时（罕见），错误不够人类可读
- **建议方案**：每个 `.command` 开头加 `command -v python3 >/dev/null || { echo "需要 python3：安装 Xcode CLT 或 Homebrew"; exit 1; }`
- **优先级**：低（macOS 通常自带）

---

## P4 · 文档与流程

### L-08 · README "新增 launcher" 步骤补充
- **来源**：review §6
- **现象**：README 提到新增 launcher 时要同步 `.claude/launch.json`，可能让用户以为必须做
- **建议方案**：在 README 与 `notes/spec.md §5` 步骤里强调："仅在希望 Claude Code 也能 `preview_start` 启动该原型时" 才同步 `.claude/launch.json`
- **优先级**：低（顺手就改）

### L-09 · 与 bundler 边界
- **来源**：review §5
- **现象**：launcher 不承担 share-safe 判断；这点 spec/README 写清楚了。但未来若 launcher 提供"导出单文件 HTML"按钮，要委托给 bundler，不要重复实现 share-safe UI
- **当前状态**：仅作记录，不需要现在做

---

## 落地节奏建议

- **下次有人在 8766/8770 撞端口被 kill 之前**：做 L-01 (PID 文件)
- **新增第三个 launcher 时**：做 L-03 (registry.json)；L-04 / L-05 跟着自然出来
- **慢机器观察到浏览器刷新失败时**：做 L-02
- **任何时候顺手**：L-06 / L-07 / L-08
