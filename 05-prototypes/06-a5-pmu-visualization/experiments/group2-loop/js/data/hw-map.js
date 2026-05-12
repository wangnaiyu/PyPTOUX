// counter → hardware pipe + diagnosis + next-group suggestion
// All wording is mock / inferred — replace with verified content before share-safe.

export const COUNTER_META = {
  cube_instr_busy: {
    family: 'compute',
    color: 'var(--c-compute)',
    label: 'cube_instr_busy',
    pipe: 'Cube',
    explain: 'AIC 内 Cube 矩阵引擎指令 busy 时长。',
    nextGroup: { id: 1, reason: '查看 cube FP/INT 比例确认是否真算术瓶颈' },
  },
  pmu_idc_aic_vec_busy_o: {
    family: 'compute',
    color: 'var(--c-compute)',
    label: 'vec_busy',
    pipe: 'Vector',
    explain: 'AIV 内 Vector 单元 busy 时长。',
    nextGroup: { id: 7, reason: '确认 Vector compute-heavy 还是 UB/MTE access-heavy' },
  },
  scalar_instr_busy: {
    family: 'scalar',
    color: 'var(--c-scalar)',
    label: 'scalar_instr_busy',
    pipe: 'Scalar',
    explain: 'Scalar 单元 busy 时长（指令发射 / 地址计算 / 流程控制）。',
    nextGroup: { id: 6, reason: 'Scalar 拖尾常伴 issue 限制，建议看 issue / VF pressure' },
  },
  mte1_instr_busy: {
    family: 'mte',
    color: 'var(--c-mte1)',
    label: 'mte1_instr_busy',
    pipe: 'MTE1 (L1→L0A/L0B)',
    explain: 'L1 → L0A / L0B 数据装载通路 busy 时长。',
    nextGroup: { id: 5, reason: '深入 L0A / L0B / L0C 路径分解' },
  },
  mte2_instr_busy: {
    family: 'mte',
    color: 'var(--c-mte2)',
    label: 'mte2_instr_busy',
    pipe: 'MTE2 (GM→L1)',
    explain: 'Global Memory → L1 加载通路 busy 时长，常见外部内存压力指示。',
    nextGroup: { id: 4, reason: '验证 main / UB / L1 访问压力的真实层级' },
  },
  mte3_instr_busy: {
    family: 'mte',
    color: 'var(--c-mte3)',
    label: 'mte3_instr_busy',
    pipe: 'MTE3 (L0C/UB→GM)',
    explain: 'L0C / UB → GM 输出通路 busy 时长（FixPipe 输出阶段邻近）。',
    nextGroup: { id: 8, reason: '确认 L2 victim / 写侧 hit rate 是否拖慢输出' },
  },
  pmu_fix_instr_busy: {
    family: 'fixpipe',
    color: 'var(--c-fixpipe)',
    label: 'pmu_fix_instr_busy',
    pipe: 'FixPipe',
    explain: 'FixPipe 后处理（随路量化 / ReLU / 类型转换）busy 时长。',
    nextGroup: { id: 5, reason: '深入 FixPipe 读 L0C 与输出路径' },
  },
  icache_req: {
    family: 'event',
    color: 'var(--c-scalar)',
    label: 'icache_req',
    pipe: 'I-cache',
    explain: 'I-cache 请求事件计数（不参与 clc_cycle 聚合）。',
    nextGroup: null,
    isEvent: true,
  },
  icache_miss: {
    family: 'event',
    color: 'var(--c-scalar)',
    label: 'icache_miss',
    pipe: 'I-cache',
    explain: 'I-cache miss 事件计数（不参与 clc_cycle 聚合）。',
    nextGroup: null,
    isEvent: true,
  },
};

// cycle-like counters (the ones that go into clc_cycle)
export const CYCLE_LIKE = [
  'pmu_idc_aic_vec_busy_o',
  'cube_instr_busy',
  'scalar_instr_busy',
  'mte1_instr_busy',
  'mte2_instr_busy',
  'mte3_instr_busy',
  'pmu_fix_instr_busy',
];

export const EVENT_COUNTERS = ['icache_req', 'icache_miss'];

// op identity coloring (default mode)
export const IDENTITY_COLOR = {
  matmul: 'var(--id-matmul)',
  conv: 'var(--id-matmul)',
  matmul_trans: 'var(--id-matmul)',
  vec_softmax: 'var(--id-vec-softmax)',
  vec_layernorm: 'var(--id-vec-layernorm)',
  vec_elementwise: 'var(--id-vec-elementwise)',
  vec_reduce: 'var(--id-vec-reduce)',
  vec_cast: 'var(--id-vec-elementwise)',
  mte_load: 'var(--id-mte-load)',
  mte_store: 'var(--id-mte-store)',
  cpu_ctrl: 'var(--id-cpu-ctrl)',
  cpu_sched: 'var(--id-cpu-sched)',
};
