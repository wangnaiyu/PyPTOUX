#!/usr/bin/env bash
# Preview launcher · A5 PMU Group 2 Pipeline Balance · Diagnosis Loop
# 详见同目录 notes/spec.md（含端口注册表）

PORT=8770
# resolve repo root via this script's path: <repo>/06-tools/01-prototype-kit/launchers/<this>
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../../.." && pwd)"
ROOT="$REPO/05-prototypes/06-a5-pmu-visualization/experiments/group2-loop"

if [ ! -d "$ROOT" ]; then
  echo "✗ 找不到原型目录：$ROOT"
  echo "  请确认仓库未被移动 / 原型未被删除。"
  read -rsn1 -p "按任意键关闭..."
  exit 1
fi

echo "──────────────────────────────────────────────────────────"
echo "PyPTOUX 预览 · A5 PMU Group 2 (group2-loop)"
echo "──────────────────────────────────────────────────────────"
echo "  目录: $ROOT"
echo "  端口: $PORT"
echo "  地址: http://127.0.0.1:$PORT/"
echo
echo "关闭方式：直接关闭本 Terminal 窗口（推荐），或按 Ctrl+C"
echo "          也可双击 06-tools/01-prototype-kit/launchers/stop-previews.command"
echo "──────────────────────────────────────────────────────────"
echo

cd /tmp || exit 1
(sleep 1 && open "http://127.0.0.1:$PORT/") &
exec /usr/bin/env python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$ROOT"
