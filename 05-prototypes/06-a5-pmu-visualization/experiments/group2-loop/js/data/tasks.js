// L3 demo data — exploration-only. Replace with Codex L2 before share-safe.
// 78 lanes: 1 AI CPU Ctrl + 3 AI CPU Sched + 24 AIC + 48 AIV + mte_in + mte_out.
// Time unit: µs.

// ---------- seeded RNG ----------
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20260512);
const rand = (lo, hi) => lo + (hi - lo) * rng();
const irand = (lo, hi) => Math.floor(rand(lo, hi + 1));
const pick = arr => arr[Math.floor(rng() * arr.length)];

// ---------- timeline ----------
export const TIMELINE = {
  startUs: 0,
  endUs: 10000,
};

// ---------- Wraps ----------
// Wrap k pairs AIC k with AIV (2k-1) and AIV (2k). k = 1..24.
const NUM_WRAPS = 24;
export const WRAPS = Array.from({ length: NUM_WRAPS }, (_, i) => {
  const k = i + 1;
  return {
    id: `wrap-${k}`,
    index: k,
    aicLaneId: `aic-${k}`,
    aivLaneIds: [`aiv-${2 * k - 1}`, `aiv-${2 * k}`],
  };
});

// 3 critical wraps with hand-tuned signatures
const CRITICAL_WRAPS = new Set(['wrap-7', 'wrap-12', 'wrap-19']);

// ---------- Lanes ----------
export const LANES = [];
LANES.push({ id: 'cpu-ctrl', kind: 'AICCtrl', label: 'AI CPU Ctrl', index: 0 });
for (let i = 1; i <= 3; i++) LANES.push({ id: `cpu-sched-${i}`, kind: 'AICSched', label: `AI CPU Sched ${i}`, index: i });
for (let k = 1; k <= NUM_WRAPS; k++) LANES.push({ id: `aic-${k}`, kind: 'AIC', label: `AIC ${k}`, index: k, wrapId: `wrap-${k}` });
for (let v = 1; v <= 48; v++) {
  const wrapK = Math.ceil(v / 2);
  LANES.push({ id: `aiv-${v}`, kind: 'AIV', label: `AIV ${v}`, index: v, wrapId: `wrap-${wrapK}` });
}
LANES.push({ id: 'mte-in', kind: 'MTEIn', label: 'mte_in', index: 0 });
LANES.push({ id: 'mte-out', kind: 'MTEOut', label: 'mte_out', index: 0 });

// ---------- op-types (default coloring) ----------
const AIC_OPS = ['matmul', 'matmul', 'matmul', 'conv', 'matmul_trans'];
const AIV_OPS = ['vec_softmax', 'vec_layernorm', 'vec_elementwise', 'vec_reduce', 'vec_elementwise', 'vec_cast'];
const MTE_IN_OPS = ['dma_load_gm', 'nddma_load', 'dma_load_gm'];
const MTE_OUT_OPS = ['dma_store_gm', 'nddma_store'];
const CPU_OPS = ['cpu_dispatch', 'cpu_barrier', 'cpu_event'];

// ---------- helpers ----------
let TASK_SEQ = 0;
const nextId = () => `t${(++TASK_SEQ).toString().padStart(4, '0')}`;

function makeTraceLinks(opName, wrapId) {
  return {
    rootHash: `0x${(0xa1b2 + Math.floor(rng() * 0xffff)).toString(16)}`,
    callOpMagic: `op_${irand(1000, 9999)}`,
    leafHash: `0x${(0xab00 + Math.floor(rng() * 0xff)).toString(16)}_${(Math.floor(rng() * 0xffff)).toString(16).padStart(4, '0')}_e3`,
    source: {
      path: opName.startsWith('matmul')
        ? `kernels/${opName}_k${wrapId ? wrapId.split('-')[1] : '0'}.cce`
        : opName.startsWith('vec')
        ? `kernels/vec/${opName}.cce`
        : opName.startsWith('dma')
        ? `runtime/dma/${opName}.cpp`
        : `runtime/cpu/${opName}.cpp`,
      lineStart: irand(20, 200),
      lineEnd: 0, hotLine: 0,
    },
  };
}
function fillSourceRange(tl, lenLines = 36) {
  tl.source.lineEnd = tl.source.lineStart + lenLines;
  tl.source.hotLine = tl.source.lineStart + irand(6, lenLines - 6);
  return tl;
}

// ---------- Group 2 PMU generator ----------
// All cycle-like counters in µs. clc = sum of cycle-like counters.
function genGroup2Pmu({ totalCycle, profile }) {
  // profile: 'wait' | 'accounted' | 'overlap'
  //          'compute-bound' | 'mte2-bound' | 'mte1-bound' | 'scalar-bound' | 'fix-bound'
  //          'vec-compute' | 'vec-mte3-bound' | 'idle'
  const out = {
    pmu_idc_aic_vec_busy_o: 0,
    cube_instr_busy: 0,
    scalar_instr_busy: 0,
    mte1_instr_busy: 0,
    mte2_instr_busy: 0,
    mte3_instr_busy: 0,
    pmu_fix_instr_busy: 0,
    icache_req: irand(60, 2400),
    icache_miss: irand(2, 60),
  };

  // helper to set composition proportions of cycle-like sum
  function compose(target, fractions) {
    // fractions: { key: weight } — auto-normalize to target
    const sum = Object.values(fractions).reduce((a, b) => a + b, 0);
    for (const k of Object.keys(fractions)) {
      out[k] = Math.round((fractions[k] / sum) * target);
    }
  }

  let clcTarget;
  switch (profile) {
    case 'wait': // clc < total
      clcTarget = totalCycle * (0.45 + rand(0, 0.18));
      compose(clcTarget, { cube_instr_busy: 0.15, scalar_instr_busy: 0.10, mte1_instr_busy: 0.10, mte2_instr_busy: 0.55, mte3_instr_busy: 0.07, pmu_fix_instr_busy: 0.03 });
      break;
    case 'accounted':
      clcTarget = totalCycle * (0.92 + rand(0, 0.08));
      compose(clcTarget, { cube_instr_busy: 0.40, scalar_instr_busy: 0.10, mte1_instr_busy: 0.18, mte2_instr_busy: 0.18, mte3_instr_busy: 0.10, pmu_fix_instr_busy: 0.04 });
      break;
    case 'overlap':
      clcTarget = totalCycle * (1.18 + rand(0, 0.15));
      compose(clcTarget, { cube_instr_busy: 0.45, scalar_instr_busy: 0.08, mte1_instr_busy: 0.22, mte2_instr_busy: 0.12, mte3_instr_busy: 0.10, pmu_fix_instr_busy: 0.03 });
      break;
    case 'compute-bound':
      clcTarget = totalCycle * (0.93 + rand(0, 0.07));
      compose(clcTarget, { cube_instr_busy: 0.70, scalar_instr_busy: 0.08, mte1_instr_busy: 0.08, mte2_instr_busy: 0.08, mte3_instr_busy: 0.04, pmu_fix_instr_busy: 0.02 });
      break;
    case 'mte2-bound':
      clcTarget = totalCycle * (0.55 + rand(0, 0.10));
      compose(clcTarget, { cube_instr_busy: 0.16, scalar_instr_busy: 0.06, mte1_instr_busy: 0.12, mte2_instr_busy: 0.57, mte3_instr_busy: 0.06, pmu_fix_instr_busy: 0.03 });
      break;
    case 'mte1-bound':
      clcTarget = totalCycle * (0.92 + rand(0, 0.06));
      compose(clcTarget, { cube_instr_busy: 0.22, scalar_instr_busy: 0.06, mte1_instr_busy: 0.50, mte2_instr_busy: 0.12, mte3_instr_busy: 0.08, pmu_fix_instr_busy: 0.02 });
      break;
    case 'scalar-bound':
      clcTarget = totalCycle * (0.68 + rand(0, 0.08));
      compose(clcTarget, { cube_instr_busy: 0.10, scalar_instr_busy: 0.55, mte1_instr_busy: 0.10, mte2_instr_busy: 0.10, mte3_instr_busy: 0.10, pmu_fix_instr_busy: 0.05 });
      break;
    case 'fix-bound':
      clcTarget = totalCycle * (0.92 + rand(0, 0.06));
      compose(clcTarget, { cube_instr_busy: 0.25, scalar_instr_busy: 0.10, mte1_instr_busy: 0.10, mte2_instr_busy: 0.08, mte3_instr_busy: 0.10, pmu_fix_instr_busy: 0.37 });
      break;
    case 'vec-compute':
      clcTarget = totalCycle * (0.94 + rand(0, 0.06));
      compose(clcTarget, { pmu_idc_aic_vec_busy_o: 0.60, scalar_instr_busy: 0.10, mte1_instr_busy: 0.06, mte2_instr_busy: 0.12, mte3_instr_busy: 0.10, pmu_fix_instr_busy: 0.02 });
      break;
    case 'vec-mte3-bound':
      clcTarget = totalCycle * (0.66 + rand(0, 0.08));
      compose(clcTarget, { pmu_idc_aic_vec_busy_o: 0.22, scalar_instr_busy: 0.08, mte1_instr_busy: 0.06, mte2_instr_busy: 0.08, mte3_instr_busy: 0.52, pmu_fix_instr_busy: 0.04 });
      break;
    case 'idle':
    default:
      clcTarget = totalCycle * (0.30 + rand(0, 0.20));
      compose(clcTarget, { pmu_idc_aic_vec_busy_o: 0.20, scalar_instr_busy: 0.20, mte1_instr_busy: 0.20, mte2_instr_busy: 0.20, mte3_instr_busy: 0.15, pmu_fix_instr_busy: 0.05 });
  }
  return out;
}

// ---------- Tasks ----------
export const TASKS = [];

function emit(task) {
  TASKS.push(task);
  return task;
}

// 1) Wrap-scoped tasks (24 wraps × 1 AIC + 2 AIV)
//    Each wrap has a primary matmul on AIC (long), and 1-3 vec tasks per AIV.
//    Plus some non-wrap-primary tasks on the AIC/AIV lanes (idle / smaller ops).
for (const wrap of WRAPS) {
  const isCritical = CRITICAL_WRAPS.has(wrap.id);
  const wrapStart = irand(200, 1200) + (wrap.index - 1) * irand(60, 220);
  // Primary matmul on AIC
  const matmulLen = isCritical
    ? (wrap.id === 'wrap-7'  ? 8800
      : wrap.id === 'wrap-12' ? 7200
      :                          9000)  // wrap-19
    : irand(2200, 5800);
  const matmulStart = Math.min(wrapStart, TIMELINE.endUs - matmulLen - 100);
  const matmulEnd = matmulStart + matmulLen;

  let profile;
  if (wrap.id === 'wrap-7') profile = 'wait';        // mte2-dominant + uncovered tail
  else if (wrap.id === 'wrap-12') profile = 'scalar-bound';
  else if (wrap.id === 'wrap-19') profile = 'overlap';
  else profile = pick(['accounted', 'accounted', 'compute-bound', 'compute-bound', 'mte1-bound', 'fix-bound']);

  const matmulName = `${pick(AIC_OPS)}_k${wrap.index}`;
  const matmul = emit({
    id: nextId(),
    laneId: wrap.aicLaneId,
    laneKind: 'AIC',
    wrapId: wrap.id,
    opType: matmulName.startsWith('matmul') ? 'matmul' : matmulName.startsWith('conv') ? 'conv' : 'matmul',
    opName: matmulName,
    start: matmulStart,
    end: matmulEnd,
    totalCycle: matmulLen,
    isWrapPrimary: true,
    g2: genGroup2Pmu({ totalCycle: matmulLen, profile }),
    traceLinks: fillSourceRange(makeTraceLinks(matmulName, wrap.id), irand(36, 68)),
  });
  matmul.profileTag = profile;

  // Some pre/post small ops on the same AIC lane (gap fillers)
  let cursor = matmulStart - irand(200, 600);
  while (cursor > TIMELINE.startUs + 60) {
    const len = irand(120, 380);
    const s = Math.max(TIMELINE.startUs + 20, cursor - len);
    emit({
      id: nextId(), laneId: wrap.aicLaneId, laneKind: 'AIC', wrapId: null,
      opType: 'matmul', opName: `mm_small_${nextId()}`.slice(0, 14),
      start: s, end: cursor, totalCycle: cursor - s,
      g2: genGroup2Pmu({ totalCycle: cursor - s, profile: 'compute-bound' }),
      traceLinks: fillSourceRange(makeTraceLinks('matmul_small', null), 20),
    });
    cursor = s - irand(150, 700);
  }
  cursor = matmulEnd + irand(200, 600);
  while (cursor < TIMELINE.endUs - 60) {
    const len = irand(140, 400);
    const e = Math.min(TIMELINE.endUs - 20, cursor + len);
    emit({
      id: nextId(), laneId: wrap.aicLaneId, laneKind: 'AIC', wrapId: null,
      opType: 'matmul', opName: `mm_tail_${nextId()}`.slice(0, 14),
      start: cursor, end: e, totalCycle: e - cursor,
      g2: genGroup2Pmu({ totalCycle: e - cursor, profile: 'compute-bound' }),
      traceLinks: fillSourceRange(makeTraceLinks('matmul_tail', null), 20),
    });
    cursor = e + irand(200, 700);
  }

  // AIV tasks per wrap: each AIV lane has 1 primary + 1-3 fillers
  for (const aivLaneId of wrap.aivLaneIds) {
    const aivStart = matmulStart + irand(0, 300);
    let aivLen;
    if (wrap.id === 'wrap-7') aivLen = irand(3800, 5200);           // V finishes early → C tail
    else if (wrap.id === 'wrap-19') aivLen = irand(4200, 6000);     // C overlap dominates (still critical)
    else if (wrap.id === 'wrap-12') aivLen = irand(4500, 6000);     // V mte3 wait, but C still critical
    else aivLen = Math.max(800, matmulLen - irand(200, 800));
    const aivEnd = Math.min(matmulEnd + irand(-200, 200), aivStart + aivLen);
    const opName = pick(AIV_OPS);
    let vprofile;
    if (wrap.id === 'wrap-7') vprofile = 'vec-compute';
    else if (wrap.id === 'wrap-12') vprofile = 'vec-mte3-bound';
    else if (wrap.id === 'wrap-19') vprofile = 'vec-compute';
    else vprofile = pick(['vec-compute', 'vec-compute', 'accounted', 'accounted']);

    emit({
      id: nextId(),
      laneId: aivLaneId, laneKind: 'AIV', wrapId: wrap.id,
      opType: opName, opName: `${opName}_w${wrap.index}`,
      start: aivStart, end: aivEnd, totalCycle: aivEnd - aivStart,
      isWrapPrimary: true,
      g2: genGroup2Pmu({ totalCycle: aivEnd - aivStart, profile: vprofile }),
      traceLinks: fillSourceRange(makeTraceLinks(opName, wrap.id), irand(28, 60)),
    });

    // pre/post small vec ops
    let aivCursor = aivStart - irand(200, 600);
    while (aivCursor > TIMELINE.startUs + 80) {
      const len = irand(80, 260);
      const s = Math.max(TIMELINE.startUs + 30, aivCursor - len);
      const op2 = pick(AIV_OPS);
      emit({
        id: nextId(), laneId: aivLaneId, laneKind: 'AIV', wrapId: null,
        opType: op2, opName: `${op2}_s${nextId().slice(1)}`,
        start: s, end: aivCursor, totalCycle: aivCursor - s,
        g2: genGroup2Pmu({ totalCycle: aivCursor - s, profile: 'vec-compute' }),
        traceLinks: fillSourceRange(makeTraceLinks(op2, null), 20),
      });
      aivCursor = s - irand(180, 800);
    }
    aivCursor = aivEnd + irand(200, 600);
    while (aivCursor < TIMELINE.endUs - 80) {
      const len = irand(100, 320);
      const e = Math.min(TIMELINE.endUs - 30, aivCursor + len);
      const op2 = pick(AIV_OPS);
      emit({
        id: nextId(), laneId: aivLaneId, laneKind: 'AIV', wrapId: null,
        opType: op2, opName: `${op2}_t${nextId().slice(1)}`,
        start: aivCursor, end: e, totalCycle: e - aivCursor,
        g2: genGroup2Pmu({ totalCycle: e - aivCursor, profile: pick(['vec-compute', 'vec-mte3-bound']) }),
        traceLinks: fillSourceRange(makeTraceLinks(op2, null), 20),
      });
      aivCursor = e + irand(200, 800);
    }
  }
}

// 2) AI CPU lanes — sparse scheduling signals (no PMU)
for (const lane of LANES.filter(l => l.kind === 'AICCtrl' || l.kind === 'AICSched')) {
  let cursor = TIMELINE.startUs + irand(100, 600);
  while (cursor < TIMELINE.endUs - 200) {
    const len = irand(60, 220);
    const e = cursor + len;
    const op = pick(CPU_OPS);
    emit({
      id: nextId(), laneId: lane.id, laneKind: lane.kind, wrapId: null,
      opType: lane.kind === 'AICCtrl' ? 'cpu_ctrl' : 'cpu_sched',
      opName: op,
      start: cursor, end: e, totalCycle: e - cursor,
      g2: null,
      traceLinks: fillSourceRange(makeTraceLinks(op, null), 14),
    });
    cursor = e + irand(400, 1400);
  }
}

// 3) MTE lanes — global data movement (no group 2 internal composition)
for (const lane of LANES.filter(l => l.kind === 'MTEIn' || l.kind === 'MTEOut')) {
  let cursor = TIMELINE.startUs + irand(120, 400);
  while (cursor < TIMELINE.endUs - 200) {
    const len = irand(180, 720);
    const e = cursor + len;
    const op = pick(lane.kind === 'MTEIn' ? MTE_IN_OPS : MTE_OUT_OPS);
    emit({
      id: nextId(), laneId: lane.id, laneKind: lane.kind, wrapId: null,
      opType: lane.kind === 'MTEIn' ? 'mte_load' : 'mte_store',
      opName: op,
      start: cursor, end: e, totalCycle: e - cursor,
      g2: null,
      traceLinks: fillSourceRange(makeTraceLinks(op, null), 18),
    });
    cursor = e + irand(220, 800);
  }
}

// ---------- pre-compute task index ----------
export const TASKS_BY_ID = Object.fromEntries(TASKS.map(t => [t.id, t]));
export const TASKS_BY_LANE = LANES.reduce((acc, lane) => {
  acc[lane.id] = TASKS.filter(t => t.laneId === lane.id).sort((a, b) => a.start - b.start);
  return acc;
}, {});

// ---------- one canonical "default selected task" ----------
//   The matmul of wrap-7 — anchors the script.
export const ANCHOR_TASK_ID = TASKS.find(t => t.wrapId === 'wrap-7' && t.isWrapPrimary && t.laneKind === 'AIC').id;

// ---------- sampled group context ----------
export const SAMPLED_GROUP = 2; // this run only sampled group 2
