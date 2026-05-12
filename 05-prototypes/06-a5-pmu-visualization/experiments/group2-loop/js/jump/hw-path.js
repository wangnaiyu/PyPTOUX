// A5 hardware micro-architecture diagram (structural reference from
// 05-prototypes/03-ascend-hardware-architecture/experiments/html/ascend-950-hardware-v1.html).
// Layout: AIC subsystem (L1 → L0A/B → Cube → L0C → FixPipe/MTE3 → GM)
//         AIV subsystem (UB ↔ Vector / Scalar; MTE2/3 to GM)
// The dominant pipe of the selected task is highlighted.

const HW_NODES = [
  // shared / GM
  { id: 'GM',      label: 'GM',      sub: 'Global Memory', kind: 'storage', x: 320, y: 30,  w: 160, h: 36 },

  // AIC subsystem (top-left block)
  { id: 'L1',      label: 'L1',      sub: 'L1 Buffer',     kind: 'storage', x: 60,  y: 130, w: 110, h: 34 },
  { id: 'L0A',     label: 'L0A',     sub: 'matrix A in',   kind: 'storage', x: 30,  y: 210, w: 100, h: 34 },
  { id: 'L0B',     label: 'L0B',     sub: 'matrix B in',   kind: 'storage', x: 140, y: 210, w: 100, h: 34 },
  { id: 'Cube',    label: 'Cube',    sub: 'Matrix Engine', kind: 'compute', x: 60,  y: 290, w: 180, h: 40 },
  { id: 'L0C',     label: 'L0C',     sub: 'output / acc',  kind: 'storage', x: 60,  y: 360, w: 180, h: 34 },
  { id: 'FixPipe', label: 'FixPipe', sub: 'L0C → GM/L1',   kind: 'fix',     x: 60,  y: 430, w: 180, h: 36 },
  { id: 'ScalarA', label: 'Scalar',  sub: 'AIC dispatch',  kind: 'compute', x: 260, y: 290, w: 80,  h: 40 },

  // MTE units (AIC side)
  { id: 'MTE2_AIC', label: 'MTE2',   sub: 'GM → L1',       kind: 'mte',     x: 200, y: 100, w: 88, h: 30 },
  { id: 'MTE1',     label: 'MTE1',   sub: 'L1 → L0A/B',    kind: 'mte',     x: 200, y: 175, w: 88, h: 30 },
  { id: 'MTE3_AIC', label: 'MTE3',   sub: 'L0C → GM',      kind: 'mte',     x: 200, y: 480, w: 88, h: 30 },

  // AIV subsystem (right side)
  { id: 'UB',      label: 'Unified Buffer', sub: 'AIV main', kind: 'storage', x: 460, y: 210, w: 150, h: 34 },
  { id: 'Vector',  label: 'Vector', sub: 'Vec Engine',    kind: 'compute', x: 460, y: 290, w: 150, h: 40 },
  { id: 'ScalarV', label: 'Scalar', sub: 'AIV dispatch',  kind: 'compute', x: 630, y: 290, w: 80,  h: 40 },
  { id: 'MTE2_AIV', label: 'MTE2',  sub: 'GM → UB',       kind: 'mte',     x: 460, y: 130, w: 88, h: 30 },
  { id: 'MTE3_AIV', label: 'MTE3',  sub: 'UB → GM',       kind: 'mte',     x: 555, y: 130, w: 88, h: 30 },
];

const HW_EDGES = [
  ['GM',       'MTE2_AIC',   'mte2'],
  ['MTE2_AIC', 'L1',         'mte2'],
  ['L1',       'MTE1',       'mte1'],
  ['MTE1',     'L0A',        'mte1'],
  ['MTE1',     'L0B',        'mte1'],
  ['L0A',      'Cube',       'cube'],
  ['L0B',      'Cube',       'cube'],
  ['Cube',     'L0C',        'cube'],
  ['L0C',      'FixPipe',    'fixpipe'],
  ['FixPipe',  'MTE3_AIC',   'mte3'],
  ['MTE3_AIC', 'GM',         'mte3'],
  ['ScalarA',  'Cube',       'scalar'],

  ['GM',       'MTE2_AIV',   'mte2'],
  ['MTE2_AIV', 'UB',         'mte2'],
  ['UB',       'Vector',     'vec'],
  ['Vector',   'UB',         'vec'],
  ['UB',       'MTE3_AIV',   'mte3'],
  ['MTE3_AIV', 'GM',         'mte3'],
  ['ScalarV',  'Vector',     'scalar'],
];

// counter family → which nodes & edges to highlight
const HIGHLIGHT_BY_FAMILY = {
  compute:  { nodes: ['Cube', 'Vector', 'L0A', 'L0B', 'L0C', 'UB'], edges: ['cube', 'vec'] },
  scalar:   { nodes: ['ScalarA', 'ScalarV'], edges: ['scalar'] },
  mte1:     { nodes: ['MTE1', 'L1', 'L0A', 'L0B'], edges: ['mte1'] },
  mte2:     { nodes: ['MTE2_AIC', 'MTE2_AIV', 'L1', 'UB', 'GM'], edges: ['mte2'] },
  mte3:     { nodes: ['MTE3_AIC', 'MTE3_AIV', 'L0C', 'UB', 'GM'], edges: ['mte3'] },
  fixpipe:  { nodes: ['FixPipe', 'L0C'], edges: ['fixpipe'] },
};

function familyOfCounter(counter) {
  if (counter === 'cube_instr_busy' || counter === 'pmu_idc_aic_vec_busy_o') return 'compute';
  if (counter === 'scalar_instr_busy') return 'scalar';
  if (counter === 'mte1_instr_busy') return 'mte1';
  if (counter === 'mte2_instr_busy') return 'mte2';
  if (counter === 'mte3_instr_busy') return 'mte3';
  if (counter === 'pmu_fix_instr_busy') return 'fixpipe';
  return null;
}

export function renderHwPath(ctx) {
  const { task, derived, dominantMeta } = ctx;
  const family = derived ? familyOfCounter(derived.dominantCounter) : null;
  const hl = family ? HIGHLIGHT_BY_FAMILY[family] : { nodes: [], edges: [] };
  const hlNodes = new Set(hl.nodes);
  const hlEdges = new Set(hl.edges);

  const W = 760, H = 540;

  const nodeKindClass = {
    storage: 'is-storage', compute: 'is-compute', mte: 'is-mte', fix: 'is-fix',
  };

  const nodeRender = (n) => {
    const cx = n.x + n.w / 2, cy = n.y + n.h / 2;
    const hl = hlNodes.has(n.id) ? 'is-highlight' : '';
    return `<g>
      <rect class="hw-node ${nodeKindClass[n.kind]} ${hl}" x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="4"/>
      <text class="hw-label" x="${cx}" y="${cy - 4}">${n.label}</text>
      <text class="hw-sub" x="${cx}" y="${cy + 9}">${n.sub}</text>
    </g>`;
  };
  const findN = id => HW_NODES.find(n => n.id === id);
  const edgeRender = ([a, b, fam]) => {
    const A = findN(a), B = findN(b);
    if (!A || !B) return '';
    const ax = A.x + A.w / 2, ay = A.y + A.h;
    const bx = B.x + B.w / 2, by = B.y;
    const midY = (ay + by) / 2;
    const hot = hlEdges.has(fam) ? 'is-hot' : '';
    return `<path class="hw-edge ${hot}" d="M ${ax} ${ay} C ${ax} ${midY}, ${bx} ${midY}, ${bx} ${by - 2}" marker-end="url(#hwarr)"/>`;
  };

  // rail: list cycle-like counters with values; mark dominant
  const railHtml = derived ? `
    <div class="hw-rail">
      <div class="hw-rail-title">Cycle-like counters</div>
      ${derived.composition.map(seg => {
        const isDom = seg.counter === derived.dominantCounter;
        const pct = (seg.value / derived.clcCycle * 100).toFixed(1);
        return `<div class="hw-rail-counter ${isDom ? 'is-dominant' : ''}">
          <span class="n">${seg.counter}</span>
          <span class="v">${seg.value.toFixed(0)} µs · ${pct}%</span>
        </div>`;
      }).join('')}
      <div class="hw-explain">
        <b>${dominantMeta?.pipe || '—'}</b>：${dominantMeta?.explain || ''}
        <br/><span style="color:var(--text-tertiary);">右图中黄色描边为该 counter 命中的硬件路径。</span>
      </div>
    </div>` : `<div class="hw-rail"><div class="hw-rail-title">无 group 2 数据</div></div>`;

  return `
    <div class="hw-canvas-wrap">
      <svg class="hw-canvas" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="hwarr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--text-muted)"/>
          </marker>
        </defs>

        <!-- AIC group box -->
        <rect x="14" y="86" width="320" height="412" rx="6" fill="rgba(188,140,255,0.04)" stroke="rgba(188,140,255,0.30)" stroke-dasharray="4 3"/>
        <text x="174" y="100" fill="var(--purple)" font-family="var(--font-mono)" font-size="11" text-anchor="middle">AIC subsystem</text>

        <!-- AIV group box -->
        <rect x="444" y="116" width="296" height="220" rx="6" fill="rgba(247,120,186,0.04)" stroke="rgba(247,120,186,0.30)" stroke-dasharray="4 3"/>
        <text x="592" y="130" fill="var(--pink)" font-family="var(--font-mono)" font-size="11" text-anchor="middle">AIV subsystem</text>

        ${HW_EDGES.map(edgeRender).join('')}
        ${HW_NODES.map(nodeRender).join('')}
      </svg>
      ${railHtml}
    </div>
    <p class="muted" style="margin-top:10px;font-size:11.5px;">
      L3 演示：硬件结构参考 <code>03-ascend-hardware-architecture/experiments/html/ascend-950-hardware-v1.html</code> 简化。生产版本应使用 Codex 提供的 A5 / dav_3510 真实拓扑与 counter→pipe 映射。
    </p>
  `;
}
