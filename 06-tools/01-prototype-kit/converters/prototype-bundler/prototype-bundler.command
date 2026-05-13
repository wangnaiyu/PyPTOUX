#!/usr/bin/env bash
# PyPTOUX Prototype Bundler · double-click entry (macOS).
# 多步原生对话框（osascript）→ python3 bundler.py --cli
# 详见同目录 notes/spec.md。
#
# 兼容性：写定 bash 3.2+（macOS 自带）；不开 `set -u`（短脚本，所有变量
# 显式初始化即可，避免 ANSI-C 引用 + set -u 在边缘情况下抛 "unbound variable"）。

HERE="$(cd "$(dirname "$0")" && pwd)"
BUNDLER="$HERE/bundler.py"

# initialize all variables we'll later read, so empty values never trip up
# subsequent expansions (even if the user has set -u in inherited config).
PROTO=""
INFERRED=""
DEFAULT_NAME=""
DEFAULT_OUTDIR=""
FILENAME=""
OUTDIR=""
STRIP_CHOICE=""
KEEP_FONTS_FLAG=""
OUTPUT=""

# helper: show error dialog and exit
fail_dialog() {
  local msg="$1"
  /usr/bin/osascript <<APPLESCRIPT 2>/dev/null
display dialog "✗ ${msg}\n\n详情请看本 Terminal 窗口。" buttons {"知道了"} default button "知道了" with icon stop with title "PyPTOUX Prototype Bundler"
APPLESCRIPT
  echo
  echo "3 秒后自动关闭窗口..."
  sleep 3
  exit 1
}

echo "──────────────────────────────────────────────────────────"
echo "PyPTOUX Prototype Bundler"
echo "──────────────────────────────────────────────────────────"

# -----------------------------------------------------------------------------
# step 1 · choose prototype folder
# -----------------------------------------------------------------------------
echo "step 1/4 · 选择原型文件夹"
PROTO=$(/usr/bin/osascript <<'APPLESCRIPT' 2>/dev/null
try
  set f to choose folder with prompt "选择原型文件夹（含 index.html）"
  return POSIX path of f
on error
  return ""
end try
APPLESCRIPT
)
if [ -z "$PROTO" ]; then
  echo "  已取消"
  exit 0
fi
PROTO="${PROTO%/}"
echo "  → $PROTO"

if [ ! -f "$PROTO/index.html" ]; then
  fail_dialog "所选目录里没有 index.html：\n$PROTO"
fi

# -----------------------------------------------------------------------------
# step 2 · infer defaults, then ask filename
# -----------------------------------------------------------------------------
INFERRED=$(/usr/bin/env python3 "$BUNDLER" --infer-name "$PROTO" 2>/dev/null)
if [ -z "$INFERRED" ]; then
  # python failed or printed nothing → fall back entirely
  DEFAULT_NAME="$(basename "$PROTO")"
  DEFAULT_OUTDIR="$(dirname "$PROTO")"
else
  # split on the first TAB character (python prints `<name>\t<outdir>`)
  TAB=$(printf '\t')
  DEFAULT_NAME="${INFERRED%%${TAB}*}"
  DEFAULT_OUTDIR="${INFERRED#*${TAB}}"
  # if the split didn't actually split (no tab in INFERRED), use fallbacks
  if [ "$DEFAULT_NAME" = "$INFERRED" ] || [ -z "$DEFAULT_NAME" ]; then
    DEFAULT_NAME="$(basename "$PROTO")"
  fi
  if [ "$DEFAULT_OUTDIR" = "$INFERRED" ] || [ -z "$DEFAULT_OUTDIR" ]; then
    DEFAULT_OUTDIR="$(dirname "$PROTO")"
  fi
fi

echo "step 2/4 · 确认产物文件名（默认: $DEFAULT_NAME）"
FILENAME=$(/usr/bin/osascript 2>/dev/null <<APPLESCRIPT
try
  set r to display dialog "产物文件名（不含 .html）" default answer "$DEFAULT_NAME" buttons {"取消", "下一步"} default button "下一步" with title "PyPTOUX Prototype Bundler"
  return text returned of r
on error
  return ""
end try
APPLESCRIPT
)
if [ -z "$FILENAME" ]; then
  echo "  已取消"
  exit 0
fi
FILENAME="${FILENAME%.html}"
echo "  → $FILENAME.html"

# -----------------------------------------------------------------------------
# step 3 · choose output directory
# -----------------------------------------------------------------------------
echo "step 3/4 · 选择产物存放目录（默认: $DEFAULT_OUTDIR）"
OUTDIR=$(/usr/bin/osascript 2>/dev/null <<APPLESCRIPT
try
  set d to (POSIX file "$DEFAULT_OUTDIR") as alias
  set f to choose folder with prompt "产物存放目录" default location d
  return POSIX path of f
on error
  return ""
end try
APPLESCRIPT
)
if [ -z "$OUTDIR" ]; then
  echo "  已取消"
  exit 0
fi
OUTDIR="${OUTDIR%/}"
echo "  → $OUTDIR"

# -----------------------------------------------------------------------------
# step 4 · ask whether to strip Google Fonts
# -----------------------------------------------------------------------------
echo "step 4/4 · 是否移除 Google Fonts CDN？"
STRIP_CHOICE=$(/usr/bin/osascript 2>/dev/null <<'APPLESCRIPT'
try
  set r to display dialog "是否移除 Google Fonts CDN？\n\n移除后：产物离线可用、视觉走系统字体（PingFang / SF）\n保留则：联网时视觉更精致，但有运行时远程依赖" buttons {"保留", "移除（推荐）"} default button "移除（推荐）" with title "PyPTOUX Prototype Bundler"
  return button returned of r
on error
  return "__cancel__"
end try
APPLESCRIPT
)
if [ "$STRIP_CHOICE" = "__cancel__" ]; then
  echo "  已取消"
  exit 0
fi
KEEP_FONTS_FLAG=""
if [ "$STRIP_CHOICE" = "保留" ]; then
  KEEP_FONTS_FLAG="--keep-fonts"
  echo "  → 保留 Google Fonts"
else
  echo "  → 移除 Google Fonts"
fi

OUTPUT="$OUTDIR/$FILENAME.html"

# -----------------------------------------------------------------------------
# run bundler
# -----------------------------------------------------------------------------
echo "──────────────────────────────────────────────────────────"
echo "正在打包"
echo "  原型: $PROTO"
echo "  产物: $OUTPUT"
echo "──────────────────────────────────────────────────────────"

if /usr/bin/env python3 "$BUNDLER" --cli "$PROTO" -o "$OUTPUT" $KEEP_FONTS_FLAG; then
  /usr/bin/osascript 2>/dev/null <<APPLESCRIPT
try
  set r to display dialog "✓ 打包完成\n\n$OUTPUT" buttons {"完成", "在 Finder 中显示"} default button "在 Finder 中显示" with title "PyPTOUX Prototype Bundler"
  if button returned of r is "在 Finder 中显示" then
    do shell script "open -R " & quoted form of "$OUTPUT"
  end if
end try
APPLESCRIPT
  echo
  echo "✓ 完成。3 秒后自动关闭窗口..."
  sleep 3
  exit 0
else
  fail_dialog "打包失败"
fi
