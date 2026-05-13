"""PyPTOUX Prototype Bundler · single-file HTML packager.

CLI 入口；GUI 由同目录 `prototype-bundler.command` 通过 osascript 多步对话框驱动。
详细 spec：见同目录 notes/spec.md。
"""
from __future__ import annotations

import datetime as _dt
import re
import sys
import traceback
from pathlib import Path
from typing import Callable

# ---------------------------------------------------------------------------
# Core bundling logic
# ---------------------------------------------------------------------------


class BundleError(Exception):
    """User-facing bundling failure with a clear, human-readable message."""


def _replace_once_ci(s: str, needle: str, replacement: str) -> tuple[str, bool]:
    """Case-insensitive single replace using literal strings (no regex semantics).

    Avoids re.sub's backreference interpretation on `\\d` etc. in CSS / JS content.
    """
    idx = s.lower().find(needle.lower())
    if idx < 0:
        return s, False
    return s[:idx] + replacement + s[idx + len(needle):], True


def infer_default_output(prototype_dir: Path) -> tuple[str, Path]:
    """Return (default_filename_without_ext, default_output_dir)."""
    parts = prototype_dir.resolve().parts
    topic = None
    prototype_name = prototype_dir.name
    if "05-prototypes" in parts:
        i = parts.index("05-prototypes")
        if i + 1 < len(parts):
            topic = parts[i + 1]
    default_name = f"{topic}-{prototype_name}" if topic else prototype_name
    default_dir = prototype_dir.parent
    return default_name, default_dir


_STYLE_LINK_RE = re.compile(
    r'<link\s+[^>]*rel\s*=\s*["\']stylesheet["\'][^>]*>',
    re.IGNORECASE,
)
_HREF_RE = re.compile(r'href\s*=\s*["\']([^"\']+)["\']', re.IGNORECASE)
_SRC_RE = re.compile(r'src\s*=\s*["\']([^"\']+)["\']', re.IGNORECASE)
_GOOGLE_FONTS_RE = re.compile(
    r'<link\s+[^>]*(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*>',
    re.IGNORECASE,
)
_PRECONNECT_GFONTS_RE = re.compile(
    r'<link\s+[^>]*rel\s*=\s*["\']preconnect["\'][^>]*fonts\.[^>]*>',
    re.IGNORECASE,
)
_MODULE_SCRIPT_RE = re.compile(
    r'<script\s+[^>]*type\s*=\s*["\']module["\'][^>]*src\s*=\s*["\']([^"\']+)["\'][^>]*>\s*</script>',
    re.IGNORECASE,
)


def remove_google_fonts(html: str) -> str:
    html = _PRECONNECT_GFONTS_RE.sub("", html)
    html = _GOOGLE_FONTS_RE.sub("", html)
    # collapse multiple blank lines created by removals
    return re.sub(r"\n\s*\n\s*\n", "\n\n", html)


def extract_stylesheets(html: str) -> tuple[list[str], str]:
    """Return (list of relative hrefs, html with the link tags removed)."""
    hrefs: list[str] = []

    def repl(match: re.Match) -> str:
        tag = match.group(0)
        # skip remote stylesheets (http/https)
        m = _HREF_RE.search(tag)
        if not m:
            return tag
        href = m.group(1)
        if href.startswith(("http:", "https:", "//")):
            return tag  # leave alone
        hrefs.append(href)
        return ""

    new_html = _STYLE_LINK_RE.sub(repl, html)
    return hrefs, new_html


def extract_module_scripts(html: str) -> tuple[list[str], str]:
    """Return (list of relative src paths, html with the module script tags removed)."""
    srcs: list[str] = []

    def repl(match: re.Match) -> str:
        src = match.group(1)
        if src.startswith(("http:", "https:", "//")):
            return match.group(0)
        srcs.append(src)
        return ""

    new_html = _MODULE_SCRIPT_RE.sub(repl, html)
    return srcs, new_html


# ---- JS module resolution ----

# Full `import { a, b } from './foo.js';` — also captures the brace contents.
_IMPORT_NAMED_RE = re.compile(
    r"""^\s*import\s*{\s*([^}]+?)\s*}\s*from\s*['"]([^'"]+)['"]\s*;?\s*$""",
    re.MULTILINE,
)
_IMPORT_DEFAULT_RE = re.compile(
    r"""^\s*import\s+(\w+)\s+from\s*['"]([^'"]+)['"]\s*;?\s*$""",
    re.MULTILINE,
)
_IMPORT_NAMESPACE_RE = re.compile(
    r"""^\s*import\s+\*\s+as\s+(\w+)\s+from\s*['"]([^'"]+)['"]\s*;?\s*$""",
    re.MULTILINE,
)
# any import-from (for dependency discovery)
_IMPORT_ANY_RE = re.compile(
    r"""^\s*import\b[^'"\n]*from\s*['"]([^'"]+)['"]\s*;?\s*$""",
    re.MULTILINE,
)
# export declarations capturing the bound name
_EXPORT_CONST_RE = re.compile(
    r"""^(\s*)export\s+(const|let|var)\s+(\w+)\b""",
    re.MULTILINE,
)
_EXPORT_FN_RE = re.compile(
    r"""^(\s*)export\s+(async\s+)?function\s+(\w+)\b""",
    re.MULTILINE,
)
_EXPORT_CLASS_RE = re.compile(
    r"""^(\s*)export\s+class\s+(\w+)\b""",
    re.MULTILINE,
)
_EXPORT_BLOCK_RE = re.compile(
    r"""^\s*export\s*{\s*([^}]+?)\s*}\s*;?\s*$""",
    re.MULTILINE,
)
_EXPORT_FROM_RE = re.compile(
    r"""^\s*export\s*(?:\*|{[^}]*})\s+from\s+['"][^'"]+['"]\s*;?\s*$""",
    re.MULTILINE,
)
_EXPORT_DEFAULT_RE = re.compile(r"^\s*export\s+default\s", re.MULTILINE)


def resolve_js_path(importer: Path, raw: str) -> Path:
    """Resolve a relative `./foo.js` import to an absolute path."""
    if not (raw.startswith("./") or raw.startswith("../")):
        raise BundleError(
            f"不支持的 import 路径（必须以 './' 或 '../' 开头）：'{raw}'\n"
            f"  出现在：{importer}"
        )
    target = (importer.parent / raw).resolve()
    if not target.suffix:
        target = target.with_suffix(".js")
    if not target.exists():
        raise BundleError(
            f"找不到导入的模块：'{raw}'\n"
            f"  期望路径：{target}\n"
            f"  出现在：{importer}"
        )
    return target


def collect_modules(
    entry: Path,
    log: Callable[[str], None],
) -> list[tuple[Path, str]]:
    """DFS-collect all JS modules transitively imported from `entry`.

    Returns list of (path, source_text) in dependency-first order.
    """
    rel_root = entry.parent

    visited: dict[Path, str] = {}
    ordered: list[Path] = []
    in_progress: set[Path] = set()

    def visit(path: Path) -> None:
        if path in visited:
            return
        if path in in_progress:
            raise BundleError(f"检测到循环依赖：{path}")
        in_progress.add(path)

        try:
            text = path.read_text(encoding="utf-8")
        except OSError as e:
            raise BundleError(f"读取失败：{path}\n  {e}") from e

        # walk imports first (any kind, to gather deps)
        for m in _IMPORT_ANY_RE.finditer(text):
            dep = resolve_js_path(path, m.group(1))
            visit(dep)

        if _IMPORT_DEFAULT_RE.search(text):
            raise BundleError(
                f"不支持默认导入语法（`import X from ...`），请改为命名导入。\n"
                f"  位置：{path}"
            )
        if _IMPORT_NAMESPACE_RE.search(text):
            raise BundleError(
                f"不支持命名空间导入（`import * as X`）。\n  位置：{path}"
            )
        if _EXPORT_FROM_RE.search(text):
            raise BundleError(
                f"不支持 `export ... from ...` 转出语法。\n  位置：{path}"
            )
        if _EXPORT_DEFAULT_RE.search(text):
            raise BundleError(
                f"不支持 `export default ...`，请改为命名导出。\n  位置：{path}"
            )

        visited[path] = text
        ordered.append(path)
        in_progress.discard(path)
        try:
            rel = path.resolve().relative_to(rel_root.resolve().parent)
        except ValueError:
            rel = path.name
        log(f"  解析 {rel}")

    visit(entry)
    return [(p, visited[p]) for p in ordered]


def _parse_imports(text: str) -> list[tuple[str, list[str]]]:
    """Return [(import-path, [name, name, ...]), ...]."""
    out: list[tuple[str, list[str]]] = []
    for m in _IMPORT_NAMED_RE.finditer(text):
        names_raw = m.group(1)
        names = [n.strip().split(" as ")[-1].strip() for n in names_raw.split(",") if n.strip()]
        out.append((m.group(2), names))
    return out


def _parse_exports(text: str) -> list[str]:
    """Return the list of exported binding names."""
    names: list[str] = []
    for m in _EXPORT_CONST_RE.finditer(text):
        names.append(m.group(3))
    for m in _EXPORT_FN_RE.finditer(text):
        names.append(m.group(3))
    for m in _EXPORT_CLASS_RE.finditer(text):
        names.append(m.group(2))
    for m in _EXPORT_BLOCK_RE.finditer(text):
        inner = m.group(1)
        for piece in inner.split(","):
            piece = piece.strip()
            if not piece:
                continue
            # `name as alias` → export under `alias`
            if " as " in piece:
                _, alias = piece.split(" as ", 1)
                names.append(alias.strip())
            else:
                names.append(piece)
    # dedupe preserving order
    seen: set[str] = set()
    out: list[str] = []
    for n in names:
        if n not in seen:
            seen.add(n)
            out.append(n)
    return out


def _strip_imports_and_export_keywords(text: str) -> str:
    """Remove import statements and `export` keyword on declarations.

    Body remains valid JS once executed inside an IIFE that has the
    imported names destructured into local consts.
    """
    text = _IMPORT_NAMED_RE.sub("", text)
    text = _IMPORT_DEFAULT_RE.sub("", text)
    text = _IMPORT_NAMESPACE_RE.sub("", text)
    text = _EXPORT_BLOCK_RE.sub("", text)
    text = _EXPORT_CONST_RE.sub(lambda m: m.group(1) + m.group(2) + " " + m.group(3), text)
    text = _EXPORT_FN_RE.sub(
        lambda m: m.group(1) + (m.group(2) or "") + "function " + m.group(3),
        text,
    )
    text = _EXPORT_CLASS_RE.sub(lambda m: m.group(1) + "class " + m.group(2), text)
    return text


def _module_key(path: Path, prototype_root: Path) -> str:
    try:
        return str(path.resolve().relative_to(prototype_root.resolve()))
    except ValueError:
        return str(path)


def wrap_module_section(
    path: Path,
    text: str,
    prototype_root: Path,
) -> str:
    """Wrap a single module's body in an IIFE that pulls imports from the
    runtime registry and pushes exports back into it."""
    imports = _parse_imports(text)
    exports = _parse_exports(text)
    body = _strip_imports_and_export_keywords(text)

    self_key = _module_key(path, prototype_root)
    lines: list[str] = []
    lines.append(f"\n/* === inlined module: {self_key} === */")
    lines.append(f"(function(__exports){{")
    for raw_path, names in imports:
        dep_path = (path.parent / raw_path).resolve()
        if not dep_path.suffix:
            dep_path = dep_path.with_suffix(".js")
        dep_key = _module_key(dep_path, prototype_root)
        if names:
            destructure = ", ".join(names)
            lines.append(
                f"  const {{ {destructure} }} = __PYPTOUX_MODULES__[{dep_key!r}];"
            )
    lines.append(body)
    for n in exports:
        lines.append(f"  __exports.{n} = {n};")
    lines.append(f"}})(__PYPTOUX_MODULES__[{self_key!r}] = {{}});")
    return "\n".join(lines)


def build_bundle(
    prototype_dir: Path,
    output_file: Path,
    strip_google_fonts: bool,
    log: Callable[[str], None],
) -> Path:
    prototype_dir = prototype_dir.resolve()
    output_file = output_file.resolve()

    index_html = prototype_dir / "index.html"
    if not index_html.exists():
        raise BundleError(f"未找到 index.html：{index_html}")
    log(f"读取 {index_html.relative_to(prototype_dir.parent)}")
    html = index_html.read_text(encoding="utf-8")

    # 1. strip google fonts if requested
    if strip_google_fonts:
        log("移除 Google Fonts CDN 链接")
        html = remove_google_fonts(html)

    # 2. inline CSS
    css_hrefs, html = extract_stylesheets(html)
    css_blocks: list[str] = []
    for href in css_hrefs:
        css_path = (prototype_dir / href).resolve()
        if not css_path.exists():
            raise BundleError(f"找不到样式表：{href}\n  期望路径：{css_path}")
        log(f"内联样式 {href}")
        css_text = css_path.read_text(encoding="utf-8")
        css_blocks.append(
            f'<style data-bundled-from="{href}">\n{css_text}\n</style>'
        )

    # inject css blocks just before </head>
    inject_css = "\n".join(css_blocks)
    html, replaced = _replace_once_ci(html, "</head>", inject_css + "\n</head>")
    if not replaced:
        raise BundleError("index.html 中未找到 </head>，无法注入样式")

    # 3. inline JS modules
    module_srcs, html = extract_module_scripts(html)
    if not module_srcs:
        raise BundleError("index.html 中未找到 <script type='module' src='...'>")
    if len(module_srcs) > 1:
        log(
            "注意：检测到多个入口 module，将按出现顺序串联。"
            "若依赖图重叠，请确认无副作用冲突。"
        )

    all_collected: list[tuple[Path, str]] = []
    seen: set[Path] = set()
    for src in module_srcs:
        entry = (prototype_dir / src).resolve()
        if not entry.exists():
            raise BundleError(f"找不到入口模块：{src}\n  期望路径：{entry}")
        log(f"从入口模块 {src} 解析依赖")
        for path, text in collect_modules(entry, log):
            if path in seen:
                continue
            seen.add(path)
            all_collected.append((path, text))

    log("拼接模块、改写 import / export")
    bundled_js_parts: list[str] = ["const __PYPTOUX_MODULES__ = {};"]
    for path, text in all_collected:
        bundled_js_parts.append(wrap_module_section(path, text, prototype_dir))

    inlined_script = (
        '<script type="module" data-bundled-entry="' + module_srcs[0] + '">\n'
        + "\n".join(bundled_js_parts)
        + "\n</script>"
    )

    # inject before </body>
    html, replaced = _replace_once_ci(html, "</body>", inlined_script + "\n</body>")
    if not replaced:
        raise BundleError("index.html 中未找到 </body>，无法注入脚本")

    # 4. header comment
    built_at = _dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        rel_src = prototype_dir.relative_to(Path.cwd())
    except ValueError:
        rel_src = prototype_dir
    banner = (
        "<!--\n"
        "  PyPTOUX prototype bundle\n"
        f"  source: {rel_src}\n"
        f"  built : {built_at}\n"
        "  level : L3 demo · exploration-only\n"
        "  built-by: 06-tools/01-prototype-kit/converters/prototype-bundler\n"
        "-->\n"
    )
    m = re.match(r"\s*<!doctype[^>]*>\s*", html, re.IGNORECASE)
    if m:
        end = m.end()
        html = html[:end] + banner + html[end:]
    else:
        html = banner + html

    # 5. atomic write
    output_file.parent.mkdir(parents=True, exist_ok=True)
    tmp = output_file.with_suffix(output_file.suffix + ".tmp")
    try:
        log(f"写入临时文件 {tmp.name}")
        tmp.write_text(html, encoding="utf-8")
        tmp.replace(output_file)
        log(f"完成：{output_file}")
    except Exception:
        if tmp.exists():
            try:
                tmp.unlink()
            except OSError:
                pass
        raise

    return output_file



# ---------------------------------------------------------------------------
# CLI entry points
# ---------------------------------------------------------------------------


def run_cli(argv: list[str]) -> int:
    import argparse
    parser = argparse.ArgumentParser(
        description="PyPTOUX prototype bundler (CLI). GUI is in prototype-bundler.command."
    )
    parser.add_argument("prototype_dir", type=Path, help="原型文件夹路径")
    parser.add_argument("-o", "--output", type=Path, help="产物完整路径（含 .html）")
    parser.add_argument(
        "--keep-fonts", action="store_true",
        help="保留 Google Fonts CDN link（默认会移除）",
    )
    args = parser.parse_args(argv)

    prototype_dir = args.prototype_dir.expanduser().resolve()
    if args.output:
        output_file = args.output.expanduser().resolve()
    else:
        name, outdir = infer_default_output(prototype_dir)
        output_file = outdir / (name + ".html")

    def log(msg: str) -> None:
        print(msg)

    try:
        result = build_bundle(
            prototype_dir=prototype_dir,
            output_file=output_file,
            strip_google_fonts=not args.keep_fonts,
            log=log,
        )
    except BundleError as e:
        print(f"\n✗ 打包失败：\n{e}", file=sys.stderr)
        return 1
    except Exception:
        traceback.print_exc()
        return 2
    print(f"\n✓ 完成：{result}")
    return 0


def run_infer_name(argv: list[str]) -> int:
    """Print the default <filename>\\t<outdir> for the given prototype dir."""
    if len(argv) != 1:
        print("用法: python3 bundler.py --infer-name <prototype-dir>", file=sys.stderr)
        return 2
    p = Path(argv[0]).expanduser().resolve()
    if not p.is_dir():
        print(f"不是目录: {p}", file=sys.stderr)
        return 2
    name, outdir = infer_default_output(p)
    # tab-separated for shell to parse easily
    print(f"{name}\t{outdir}")
    return 0


def main() -> int:
    argv = sys.argv[1:]
    if not argv:
        print(
            "PyPTOUX Prototype Bundler · 命令行模式\n"
            "  双击使用：prototype-bundler.command（推荐）\n"
            "  CLI 用法：python3 bundler.py --cli <prototype-dir> [-o <out>] [--keep-fonts]\n"
            "  辅助：    python3 bundler.py --infer-name <prototype-dir>",
            file=sys.stderr,
        )
        return 2
    if argv[0] == "--cli":
        return run_cli(argv[1:])
    if argv[0] == "--infer-name":
        return run_infer_name(argv[1:])
    # legacy: any positional arg → cli
    return run_cli(argv)


if __name__ == "__main__":
    sys.exit(main())
