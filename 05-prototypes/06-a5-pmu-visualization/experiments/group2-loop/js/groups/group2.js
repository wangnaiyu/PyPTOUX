// Group 2 · Pipeline Balance workbench.
// Encapsulates everything specific to "cycle-like counter composition + clc/total gap".

import { CYCLE_LIKE, EVENT_COUNTERS, COUNTER_META } from '../data/hw-map.js';
import { deriveGroup2, summarizeGroup2, findPeers } from '../derived/group2-metrics.js';

export const group2 = {
  id: 2,
  title: 'Pipeline Balance View',
  shortTitle: 'Pipeline Balance',
  primaryQuestion: 'AIC / AIV0 / AIV1 谁占流水，谁拖尾？',

  // counter taxonomy
  cycleLikeCounters: CYCLE_LIKE,
  eventCounters: EVENT_COUNTERS,
  validCounters: [...CYCLE_LIKE, ...EVENT_COUNTERS],

  // legend for the swimlane area when colored by counters (mix mode)
  legend: [
    { key: 'compute', label: 'compute (cube/vec)', color: 'var(--c-compute)' },
    { key: 'scalar', label: 'scalar', color: 'var(--c-scalar)' },
    { key: 'mte1', label: 'mte1 (L1→L0)', color: 'var(--c-mte1)' },
    { key: 'mte2', label: 'mte2 (GM→L1)', color: 'var(--c-mte2)' },
    { key: 'mte3', label: 'mte3 (L0C→GM)', color: 'var(--c-mte3)' },
    { key: 'fixpipe', label: 'fixpipe', color: 'var(--c-fixpipe)' },
    { key: 'uncovered', label: 'uncovered (wait suspect)', color: 'var(--c-uncovered)', striped: true },
    { key: 'overlap', label: 'overlap suspect', color: 'var(--c-overlap)', striped: true },
  ],

  // derive per-task
  derive: deriveGroup2,

  // composition family lookup (used by overlay renderer)
  familyOf(counter) {
    if (counter === 'cube_instr_busy' || counter === 'pmu_idc_aic_vec_busy_o') return 'compute';
    if (counter === 'scalar_instr_busy') return 'scalar';
    if (counter === 'mte1_instr_busy') return 'mte1';
    if (counter === 'mte2_instr_busy') return 'mte2';
    if (counter === 'mte3_instr_busy') return 'mte3';
    if (counter === 'pmu_fix_instr_busy') return 'fixpipe';
    return 'scalar';
  },
  familyColor(family) {
    switch (family) {
      case 'compute': return 'var(--c-compute)';
      case 'scalar': return 'var(--c-scalar)';
      case 'mte1': return 'var(--c-mte1)';
      case 'mte2': return 'var(--c-mte2)';
      case 'mte3': return 'var(--c-mte3)';
      case 'fixpipe': return 'var(--c-fixpipe)';
      default: return 'var(--c-scalar)';
    }
  },

  // summary across all tasks / wraps
  summarize: summarizeGroup2,

  // peer task lookup
  findPeers,

  // map a dominant counter → narrative
  describeDominant(task, derived) {
    if (!derived || !derived.dominantCounter) return null;
    const meta = COUNTER_META[derived.dominantCounter];
    return {
      counter: derived.dominantCounter,
      pipe: meta?.pipe,
      explain: meta?.explain,
    };
  },

  // suggest next group based on dominant counter + status
  suggestNextGroup(task, derived) {
    if (!derived) return null;
    const dc = derived.dominantCounter;
    const meta = COUNTER_META[dc];
    if (!meta || !meta.nextGroup) return null;
    return {
      group: meta.nextGroup.id,
      reason: meta.nextGroup.reason,
      cmd: `PROF_PMU_EVENT_TYPE=${meta.nextGroup.id}`,
    };
  },
};
