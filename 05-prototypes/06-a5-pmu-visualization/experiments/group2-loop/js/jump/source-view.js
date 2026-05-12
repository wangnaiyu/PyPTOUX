// Mock source viewer. Real kernel source is not in the prototype; we synthesize
// a plausible matmul/vector kernel template parameterized by the task identity.

const KEYWORDS = new Set(['for', 'if', 'else', 'return', 'while', 'void', 'inline', 'static', 'const', '__aicore__', '__global__', 'pipe_barrier', 'set_flag', 'wait_flag']);
const TYPES = new Set(['int', 'uint32_t', 'half', 'float', 'GlobalTensor', 'LocalTensor', 'Tensor', 'TPipe', 'TQue']);

function highlight(line) {
  // primitive token-coloring
  return line
    .replace(/("[^"]*")/g, '<span class="src-tok-str">$1</span>')
    .replace(/\b(\d+(\.\d+)?[ufFlL]?)\b/g, '<span class="src-tok-num">$1</span>')
    .replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, (m) => {
      if (KEYWORDS.has(m)) return `<span class="src-tok-keyword">${m}</span>`;
      if (TYPES.has(m)) return `<span class="src-tok-type">${m}</span>`;
      return m;
    })
    .replace(/(\/\/[^\n]*)/g, '<span class="src-tok-comment">$1</span>');
}

function buildKernelLines(task) {
  const isMatmul = task.opName.startsWith('matmul') || task.opName.startsWith('conv');
  const wrap = task.wrapId ? task.wrapId.split('-')[1] : '0';

  const matmulSrc = [
    '#include "kernel_common.h"',
    '#include "tiling/matmul_tiling.h"',
    '',
    `// Wrap-${wrap} matmul kernel · A5 / dav_3510`,
    `// Owner: kernel-team. PMU group 2 hot path: MTE2 -> L1 -> L0A/L0B -> Cube`,
    '',
    `template <typename T>`,
    `class MatmulK${wrap} {`,
    `public:`,
    `  __aicore__ inline void Init(GlobalTensor<T> a, GlobalTensor<T> b, GlobalTensor<T> c,`,
    `                              const TilingData &tiling) {`,
    `    pipe_.InitBuffer(inQueueA_, BUFFER_NUM, A_BLOCK_SIZE * sizeof(T));`,
    `    pipe_.InitBuffer(inQueueB_, BUFFER_NUM, B_BLOCK_SIZE * sizeof(T));`,
    `    pipe_.InitBuffer(outQueueC_, BUFFER_NUM, C_BLOCK_SIZE * sizeof(T));`,
    `    a_gm_.SetGlobalBuffer(a); b_gm_.SetGlobalBuffer(b); c_gm_.SetGlobalBuffer(c);`,
    `    tiling_ = tiling;`,
    `  }`,
    '',
    `  __aicore__ inline void Process() {`,
    `    for (int32_t i = 0; i < tiling_.outerLoop; ++i) {`,
    `      CopyInA(i);                  // MTE2  -- GM -> L1`,
    `      CopyInB(i);                  // MTE2  -- GM -> L1`,
    `      LoadToL0(i);                 // MTE1  -- L1 -> L0A / L0B`,
    `      Compute(i);                  // Cube  -- L0A x L0B -> L0C`,
    `      FixOutput(i);                // FixPipe + MTE3 -- L0C -> GM`,
    `    }`,
    `  }`,
    '',
    `private:`,
    `  __aicore__ inline void CopyInA(int32_t i);`,
    `  __aicore__ inline void CopyInB(int32_t i);`,
    `  __aicore__ inline void LoadToL0(int32_t i);`,
    `  __aicore__ inline void Compute(int32_t i);  // <-- inner-most hot loop`,
    `  __aicore__ inline void FixOutput(int32_t i);`,
    '',
    `  TPipe pipe_;`,
    `  TQue<TPosition::A1, BUFFER_NUM> inQueueA_;`,
    `  TQue<TPosition::A1, BUFFER_NUM> inQueueB_;`,
    `  TQue<TPosition::CO1, BUFFER_NUM> outQueueC_;`,
    `  GlobalTensor<T> a_gm_, b_gm_, c_gm_;`,
    `  TilingData tiling_;`,
    `};`,
  ];

  const vecSrc = [
    '#include "kernel_common.h"',
    `// ${task.opName} · Vector kernel`,
    '',
    `template <typename T>`,
    `class ${task.opName.replace(/[^a-zA-Z0-9_]/g, '_')}_Kernel {`,
    `public:`,
    `  __aicore__ inline void Init(GlobalTensor<T> x, GlobalTensor<T> y,`,
    `                              const TilingData &tiling) {`,
    `    pipe_.InitBuffer(inQ_, BUFFER_NUM, UB_TILE * sizeof(T));`,
    `    pipe_.InitBuffer(outQ_, BUFFER_NUM, UB_TILE * sizeof(T));`,
    `  }`,
    '',
    `  __aicore__ inline void Process() {`,
    `    for (int32_t i = 0; i < tiling_.tileCount; ++i) {`,
    `      CopyInToUB(i);     // MTE2  -- GM -> UB`,
    `      VecCompute(i);     // Vector ops on UB`,
    `      CopyOutFromUB(i);  // MTE3  -- UB -> GM`,
    `    }`,
    `  }`,
    '};',
  ];

  const dmaSrc = [
    '#include "runtime/dma.h"',
    `// ${task.opName} · global memory transfer`,
    '',
    'Status DmaTransfer(const DmaSpec &spec) {',
    `  if (spec.use_nddma) {`,
    `    return NdDma::Issue(spec.src, spec.dst, spec.bytes);`,
    `  }`,
    `  return PlainDma::Issue(spec.src, spec.dst, spec.bytes);`,
    '}',
  ];

  return isMatmul ? matmulSrc : task.opName.startsWith('dma') ? dmaSrc : vecSrc;
}

export function renderSource(ctx) {
  const { task } = ctx;
  const src = task.traceLinks.source;
  const allLines = buildKernelLines(task);
  // align to provided lineStart..lineEnd window
  const startLine = src.lineStart;
  const endLine = src.lineEnd;
  const hotLine = src.hotLine;
  const linesHtml = allLines.map((text, idx) => {
    const ln = startLine + idx;
    if (ln > endLine + 4) return '';
    const isHot = ln === hotLine;
    const inRange = ln >= startLine && ln <= endLine;
    return `<div class="src-line ${isHot ? 'is-hot' : inRange ? 'is-range' : ''}">
      <span class="ln">${ln}</span>
      <span class="code-text">${highlight(text)}</span>
    </div>`;
  }).join('');

  return `
    <div class="src-meta">
      <span><span class="k">file</span><b>${src.path}</b></span>
      <span><span class="k">range</span>L${src.lineStart}–L${src.lineEnd}</span>
      <span><span class="k">hot</span>L${src.hotLine}</span>
      <span><span class="k">leafHash</span>${task.traceLinks.leafHash}</span>
    </div>
    <div class="src-code">${linesHtml}</div>
    <p class="muted" style="margin-top:10px;font-size:11.5px;">
      L3 演示数据：源码模板按 op 类型生成。生产版本应跳转到真实 kernel 源码，并按 leafHash 命中到具体 inline 展开点。
    </p>
  `;
}
