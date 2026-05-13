# launchers

双击 `.command` 即可在本地启动原型预览。设计契约见 [`notes/spec.md`](notes/spec.md)。

## 当前条目

| 文件 | 端口 | 原型 |
|---|---|---|
| `preview-a5-pmu-group2-loop.command` | 8770 | A5 PMU Group 2 Pipeline Balance · Diagnosis Loop |
| `preview-pypto-studio-v1.command` | 8766 | PyPTO Studio v1 |
| `stop-previews.command` | — | 一键关闭所有已注册的本地预览 |

完整端口注册表见 `notes/spec.md` §5。新增预览时**必须同步更新该表 + `stop-previews.command` 的 `PORTS=()`**。

## 用法

**启动一个预览**：双击对应的 `preview-*.command`。

- 会弹出一个 Terminal 窗口，自动打开浏览器到 `http://127.0.0.1:<port>/`
- **关闭方式**：直接关掉 Terminal 窗口（最自然）；或在 Terminal 里按 `Ctrl+C`
- 也可双击 `stop-previews.command` 一键关掉所有 PyPTOUX 预览

**外发？** 这里的 launcher 仅适用本地开发预览。要外发，请用 `06-tools/01-prototype-kit/converters/prototype-bundler/` 打成单文件 HTML。

## 与 Claude Code 的关系

`.claude/launch.json` 里也有同名预览条目，**两条路径独立运行**：

- 用户双击 `.command` → 服务**真实源码目录**
- Claude `preview_start name=...` → 服务 `/tmp/pyptoux-preview/<name>/` **镜像副本**

URL 完全相同。端口和原型一一对应，**两边不能同时跑同一个端口**（端口冲突会报错）。详见 `notes/spec.md` §6。

## 新增一个 launcher

1. 选未占用端口（建议从 8771 起递增）
2. 复制现有的 `preview-*.command`，改 `PORT` 和 `ROOT`
3. `chmod +x` 让它可执行
4. 更新 `notes/spec.md` §5 端口注册表
5. 在 `stop-previews.command` 的 `PORTS=()` 里追加该端口
6. 如希望 Claude Code 也能启动，把同一个原型在 `.claude/launch.json` 加一条（用内联 shell，不要 source 这里的 `.command`，原因见 spec §6）

## 反馈

修改了实现 → **同步更新 `notes/spec.md`** 再改代码（双 Agent 约定）。
