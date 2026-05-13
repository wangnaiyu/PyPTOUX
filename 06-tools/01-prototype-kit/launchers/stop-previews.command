#!/usr/bin/env bash
# Stop all PyPTOUX prototype previews registered in this launchers/ directory.
# 详见同目录 notes/spec.md（端口注册表）

PORTS=(8766 8770)

echo "──────────────────────────────────────────────────────────"
echo "PyPTOUX 预览 · 全部关闭"
echo "──────────────────────────────────────────────────────────"

ANY_KILLED=0
for p in "${PORTS[@]}"; do
  PIDS=$(lsof -nP -iTCP:$p -sTCP:LISTEN -t 2>/dev/null)
  if [ -n "$PIDS" ]; then
    echo "  端口 $p · PID $PIDS · 正在关闭"
    kill $PIDS 2>/dev/null || true
    ANY_KILLED=1
  else
    echo "  端口 $p · 空闲"
  fi
done

if [ "$ANY_KILLED" = "1" ]; then
  echo
  echo "✓ 已关闭所有运行中的 PyPTOUX 预览。"
else
  echo
  echo "ℹ 没有正在运行的 PyPTOUX 预览。"
fi
echo
echo "3 秒后自动关闭窗口..."
sleep 3
