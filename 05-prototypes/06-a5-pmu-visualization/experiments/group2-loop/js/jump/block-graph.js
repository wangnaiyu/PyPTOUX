// Mock Block Graph SVG.
// Target node = the leafHash of the selected task; surrounding nodes are
// schematic CFG/DAG neighbors.

export function renderBlockGraph(ctx) {
  const { task } = ctx;
  const leaf = task.traceLinks.leafHash;
  const wrap = task.wrapId ? task.wrapId.split('-')[1] : '?';

  const nodes = [
    { id: 'b0', label: 'Entry',         x: 60,  y: 60,  kind: 'normal' },
    { id: 'b1', label: 'TileLoop',      x: 60,  y: 140, kind: 'normal' },
    { id: 'b2', label: 'CopyInA',       x: 220, y: 220, kind: 'related' },
    { id: 'b3', label: 'CopyInB',       x: 360, y: 220, kind: 'related' },
    { id: 'b4', label: 'LoadToL0',      x: 290, y: 300, kind: 'related' },
    { id: 'b5', label: 'Compute',       x: 290, y: 380, kind: 'target', sub: `leaf ${leaf.slice(0,8)}…` },
    { id: 'b6', label: 'FixOutput',     x: 290, y: 460, kind: 'related' },
    { id: 'b7', label: 'LoopExit',      x: 540, y: 380, kind: 'normal' },
    { id: 'b8', label: 'Exit',          x: 540, y: 460, kind: 'normal' },
  ];
  const edges = [
    ['b0','b1'], ['b1','b2'], ['b1','b3'], ['b2','b4'], ['b3','b4'],
    ['b4','b5','hot'], ['b5','b6','hot'], ['b6','b1'], ['b1','b7'], ['b7','b8'],
  ];

  const W = 660, H = 540;

  const nodeRender = (n) => {
    const w = 110, h = 36;
    const cx = n.x + w / 2, cy = n.y + h / 2;
    const klass = n.kind === 'target' ? 'is-target' : n.kind === 'related' ? 'is-related' : '';
    return `<g>
      <rect class="bg-node ${klass}" x="${n.x}" y="${n.y}" width="${w}" height="${h}" rx="4"/>
      <text class="bg-node-text" x="${cx}" y="${cy - 2}">${n.label}</text>
      ${n.sub ? `<text class="bg-node-sub" x="${cx}" y="${cy + 11}">${n.sub}</text>` : ''}
    </g>`;
  };

  const edgeRender = ([a, b, hot]) => {
    const A = nodes.find(n => n.id === a); const B = nodes.find(n => n.id === b);
    if (!A || !B) return '';
    const ax = A.x + 55, ay = A.y + 36;
    const bx = B.x + 55, by = B.y;
    const midY = (ay + by) / 2;
    const path = `M ${ax} ${ay} C ${ax} ${midY}, ${bx} ${midY}, ${bx} ${by - 4}`;
    return `<path class="bg-edge ${hot ? 'is-hot' : ''}" d="${path}" marker-end="url(#arr)"/>`;
  };

  return `
    <svg class="bg-canvas" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--text-muted)"/>
        </marker>
      </defs>
      ${edges.map(edgeRender).join('')}
      ${nodes.map(nodeRender).join('')}
    </svg>
    <div class="bg-legend">
      <span><span class="sw is-target"></span>当前 leafHash · Compute (wrap ${wrap})</span>
      <span><span class="sw is-related"></span>相邻热路径节点</span>
      <span><span class="sw is-normal"></span>其它节点</span>
      <span style="margin-left:auto;color:var(--text-tertiary);">L3 演示：节点 / 边为示意，生产版本由 IR / Block IR 实际拓扑生成。</span>
    </div>
  `;
}
