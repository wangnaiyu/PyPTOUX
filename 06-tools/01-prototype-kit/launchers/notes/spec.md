# launchers · spec

## 1. 用途

提供"双击即启动 / 关闭原型预览"的本地脚本，覆盖两类使用场景：

- **作者自测**：开发原型时快速起一个 `http://localhost:<port>/` 看效果
- **离 Claude Code**：用户不通过 Claude Code 也能直接预览（双击 `.command`）

不解决"外发给别人"——那是 `converters/prototype-bundler/` 的职责。

## 2. 命令入口

| 文件 | 功能 |
|---|---|
| `preview-a5-pmu-group2-loop.command` | 启动 A5 PMU Group 2 原型的本地预览（默认端口 8770） |
| `preview-pypto-studio-v1.command` | 启动 PyPTO Studio v1 原型的本地预览（默认端口 8766） |
| `stop-previews.command` | 一键关闭所有 PyPTOUX launchers 注册的本地预览（按端口 kill） |

未来新增原型时在此处加一个 `preview-<topic>-<prototype>.command`，并在本 spec 第 5 节"端口注册表"登记端口号。

## 3. 工作原理

每个 `preview-*.command` 是一个 bash 脚本：

```bash
#!/usr/bin/env bash
# preview-<name>.command
PORT=<port>
ROOT="<repo absolute path to prototype folder>"
echo "正在启动预览: <name>"
echo "  目录: $ROOT"
echo "  端口: $PORT"
echo "  地址: http://127.0.0.1:$PORT/"
echo "关闭方式：直接关闭本窗口，或按 Ctrl+C"

cd /tmp || exit 1
open "http://127.0.0.1:$PORT/" &
exec python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$ROOT"
```

要点：
- `cd /tmp` 兜底，防止 macOS Helper 沙箱在带空格 / 中文路径下 `getcwd` 失败（已踩坑）
- `python3 --directory` 显式指定原型目录，规避 cwd 问题
- 启动前 `open` 浏览器（异步），用户不需要手动复制 URL
- `exec` 让 `python3` 继承 Terminal 窗口；用户关窗口 = 杀进程

## 4. stop-previews.command 实现

```bash
#!/usr/bin/env bash
PORTS=(8766 8770)   # 与端口注册表同步
for p in "${PORTS[@]}"; do
  PIDS=$(lsof -nP -iTCP:$p -sTCP:LISTEN -t 2>/dev/null)
  if [ -n "$PIDS" ]; then
    echo "正在关闭端口 $p (PID: $PIDS)"
    kill $PIDS 2>/dev/null
  else
    echo "端口 $p 没有进程"
  fi
done
echo "全部预览已关闭。3 秒后自动关闭窗口..."
sleep 3
```

仅 kill 端口注册表中已知端口；不会误伤其他本地 http server。

## 5. 端口注册表（必须维护）

| 端口 | 原型 | 路径 |
|---|---|---|
| 8766 | pypto-studio-v1 | `05-prototypes/05-pypto-studio/experiments/v1/` |
| 8770 | a5-pmu-group2-loop | `05-prototypes/06-a5-pmu-visualization/experiments/group2-loop/` |
| 8771-8799 | 未使用 · 新增原型时按递增分配 | — |

**新增原型 launcher 时**：
1. 选一个未占用端口（建议从 8771 起递增）
2. 写 `preview-<topic>-<prototype>.command`
3. 在本表追加一行
4. 在 `stop-previews.command` 的 `PORTS=(...)` 里追加该端口
5. 若同时希望 Claude Code 也能用 `preview_start` 启动它，在 `.claude/launch.json` 加一条委托

## 6. 与 `.claude/launch.json` 的关系（双路径）

设计上希望两边复用同一份脚本，但实测发现 **macOS 沙箱阻止 Claude Code helper 读取 `~/Documents` 下的 `.command` 文件**（错误：`Operation not permitted`）。因此**两条启动路径独立**，最终都到达同一个原型：

| 启动方式 | 路径 | 服务目录 |
|---|---|---|
| 用户双击 `preview-xxx.command` | 走本目录的 `.command`（Finder→Terminal 不受沙箱限制） | **源代码目录**（`05-prototypes/<topic>/experiments/<name>/`） |
| Claude Code `preview_start name=xxx` | 走 `.claude/launch.json` 内联 shell（沙箱内可执行） | **`/tmp/pyptoux-preview/<name>/` 镜像副本** |

**已知 trade-off**：
- 用户路径：实时反映源码改动，浏览器刷新即可
- Claude Code 路径：副本不会自动同步，源码改动后需要 `cp -R` 一次。Claude 主动改原型时会负责同步。
- 端口和 URL 完全一致，端口冲突照样会报错；两边不能同时跑同一个端口。

**未来如果 macOS 放开沙箱或我们找到一个统一启动方式，会回到"一份脚本"的形态**，参考 §8 待 review 项。

## 7. 边界与已知限制

- macOS only（`.command` 是 macOS 专属）
- 端口冲突时直接报错（python3 报 `OSError: [Errno 48] Address already in use`），用户需要先跑 `stop-previews.command` 或换端口
- 不监控、不重启、不热更新 —— 文件改动后浏览器需要手动刷新
- 不支持 https（本地预览不需要）
- 不防护防火墙弹窗：首次运行 macOS 可能弹"是否允许接受网络连接"，选"允许"即可（仅绑 127.0.0.1 不会被外部访问）

## 8. 待 review 项（请 Codex 反馈）

- 端口分配规则（每个原型固定一个端口）够不够长期用？是否需要动态分配？
- 是否需要把端口注册表挪到机器可解析的 YAML/JSON，让 `stop-previews.command` 自动读取，而不是硬编码？
- 是否需要一个 `list-previews.command` 显示哪些 launcher 在跑？
- macOS 系统 Python 3.9 已经被苹果 deprecated，未来若用户机器升到只剩 3.10+ 我们要不要 pin python3 路径？
- 双路径（Claude / 用户）能否合并？方向：把 `/tmp/pyptoux-preview/` 镜像副本逻辑做成 `sync-preview-mirror.command`，让 Claude / 用户都用同一个 .command，Claude 启动前先 sync。还要考虑 sync 时机（每次启动？文件变更监听？）。

## 9. 后续可能扩展

- 支持 `--bg` 参数让 launcher 后台运行（不开 Terminal 窗口）
- 集成 `prototype-bundler`，让 launcher 弹个二选一："预览源码" / "导出单文件 HTML"
- Windows 版（`.bat` 或 `.ps1`）
