// Mock CALL tree, focused on the task's callOpMagic.

export function renderCall(ctx) {
  const { task } = ctx;
  const magic = task.traceLinks.callOpMagic;
  const wrap = task.wrapId ? task.wrapId.split('-')[1] : null;
  const opName = task.opName;

  const nodes = [
    { depth: 0, op: 'Model.forward', magic: 'op_0001', meta: 'glm_attention' },
    { depth: 1, op: 'Attention.compute', magic: 'op_0042', meta: 'B=4 S=4096 H=8192' },
    { depth: 2, op: 'AttnFusedMatmul.run', magic: 'op_0103', meta: `wrap ${wrap ?? '*'}` },
    { depth: 3, op: `KernelLaunch[${opName}]`, magic, meta: 'a5/dav_3510', target: true },
    { depth: 4, op: 'CopyInA / CopyInB', magic: 'op_0205', meta: 'MTE2 · GM→L1' },
    { depth: 4, op: 'LoadToL0', magic: 'op_0206', meta: 'MTE1 · L1→L0A/B' },
    { depth: 4, op: 'Compute', magic: 'op_0207', meta: 'Cube · L0AxL0B→L0C' },
    { depth: 4, op: 'FixOutput', magic: 'op_0208', meta: 'FixPipe + MTE3 · L0C→GM' },
  ];

  return `
    <div class="call-tree">
      ${nodes.map(n => {
        const indent = '│  '.repeat(Math.max(0, n.depth - 1)) + (n.depth > 0 ? '├─ ' : '');
        return `<div class="call-node ${n.target ? 'is-target' : ''}">
          <span class="branch">${indent}</span>
          <span class="op">${n.op}</span>
          <span class="magic">${n.magic}</span>
          <span class="meta">${n.meta}</span>
        </div>`;
      }).join('')}
    </div>
    <p class="muted" style="margin-top:14px;font-size:11.5px;">
      L3 演示数据：调用链由 op 类型与 wrap 编号合成。生产版本应根据 <b>callOpMagic</b> 命中真实节点，并支持向上/向下展开。
    </p>
  `;
}
