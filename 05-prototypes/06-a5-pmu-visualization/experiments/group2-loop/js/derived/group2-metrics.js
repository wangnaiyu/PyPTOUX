import { CYCLE_LIKE, COUNTER_META } from '../data/hw-map.js';

// derive { clcCycle, gap, gapRatio, severity, status, dominantCounter, dominantPipe, composition }
export function deriveGroup2(task) {
  if (!task.g2) return null;
  const g = task.g2;
  let clc = 0;
  const composition = [];
  for (const k of CYCLE_LIKE) {
    const v = g[k] || 0;
    if (v > 0) composition.push({ counter: k, value: v });
    clc += v;
  }
  composition.sort((a, b) => b.value - a.value);
  const dominant = composition[0] || null;

  const total = task.totalCycle;
  const gap = clc - total;
  const gapRatio = total > 0 ? gap / total : 0;

  let status; // 'wait' | 'accounted' | 'overlap'
  if (gapRatio < -0.10) status = 'wait';
  else if (gapRatio > 0.10) status = 'overlap';
  else status = 'accounted';

  // severity score for sorting Immediate Attention
  let severity = 0;
  if (status === 'wait') severity = total * Math.abs(gapRatio);
  else if (status === 'overlap') severity = total * gapRatio * 0.6;
  else severity = total * 0.05; // accounted tasks contribute mildly

  return {
    clcCycle: clc,
    gap,
    gapRatio,
    status,
    severity,
    dominantCounter: dominant?.counter || null,
    dominantValue: dominant?.value || 0,
    dominantPipe: dominant ? COUNTER_META[dominant.counter]?.pipe : null,
    composition,
  };
}

// aggregate at wrap-level
export function deriveWrapMetrics(wrap, tasks) {
  const primary = tasks.filter(t => t.wrapId === wrap.id && t.isWrapPrimary);
  if (primary.length === 0) return null;
  const wrapStart = Math.min(...primary.map(t => t.start));
  const wrapEnd = Math.max(...primary.map(t => t.end));
  const wrapTotal = wrapEnd - wrapStart;

  // task on critical path = task with the latest end
  const critical = primary.reduce((a, b) => (a.end > b.end ? a : b));
  const criticalDerived = deriveGroup2(critical);

  // uncovered_ratio: how much of (wrapEnd - earliest peer end) is not explained by clc
  const peers = primary.filter(t => t.id !== critical.id);
  const peerMaxEnd = peers.length ? Math.max(...peers.map(t => t.end)) : critical.end;
  const tailLen = Math.max(0, critical.end - peerMaxEnd);
  const uncoveredRatio = wrapTotal > 0 ? tailLen / wrapTotal : 0;

  return {
    wrapId: wrap.id,
    wrapIndex: wrap.index,
    wrapStart, wrapEnd, wrapTotal,
    critical, criticalDerived,
    peers,
    peerMaxEnd,
    tailLen,
    uncoveredRatio,
    dominantCounter: criticalDerived?.dominantCounter,
    status: criticalDerived?.status,
  };
}

// overall group-2 summary
export function summarizeGroup2({ LANES, WRAPS, TASKS, TASKS_BY_LANE }) {
  const wrapMetrics = WRAPS.map(w => deriveWrapMetrics(w, TASKS)).filter(Boolean);

  // critical lane = lane with the longest sum-of-uncovered across all wraps it participates in
  const laneScores = {};
  for (const wm of wrapMetrics) {
    const id = wm.critical.laneId;
    laneScores[id] = (laneScores[id] || 0) + Math.max(0, wm.tailLen) + (wm.criticalDerived?.severity || 0);
  }
  const criticalLaneId = Object.entries(laneScores).sort((a, b) => b[1] - a[1])[0]?.[0];

  // top-3 wraps · combined severity (wrap-level tail + PMU-level gap)
  const wrapSeverity = (w) => (w.tailLen || 0) + (w.criticalDerived?.severity || 0);
  const topWraps = [...wrapMetrics].sort((a, b) => wrapSeverity(b) - wrapSeverity(a)).slice(0, 3);

  // dominant counter overall: vote across critical tasks
  const counterVotes = {};
  for (const wm of wrapMetrics) {
    const dc = wm.dominantCounter;
    if (dc) counterVotes[dc] = (counterVotes[dc] || 0) + (wm.criticalDerived?.dominantValue || 0);
  }
  const overallDominant = Object.entries(counterVotes).sort((a, b) => b[1] - a[1])[0]?.[0];

  // overall explanation ratio: avg clc/total across primary tasks
  let totalSum = 0, clcSum = 0;
  for (const wm of wrapMetrics) {
    totalSum += wm.critical.totalCycle;
    clcSum += wm.criticalDerived?.clcCycle || 0;
  }
  const explainRatio = totalSum > 0 ? clcSum / totalSum : 0;

  return {
    criticalLaneId,
    topWraps,
    overallDominant,
    explainRatio,
    wrapMetrics,
  };
}

export function findPeers(task, TASKS_BY_LANE, WRAPS) {
  if (!task.wrapId) return [];
  const wrap = WRAPS.find(w => w.id === task.wrapId);
  if (!wrap) return [];
  const laneIds = [wrap.aicLaneId, ...wrap.aivLaneIds];
  const peers = [];
  for (const lid of laneIds) {
    const primaries = TASKS_BY_LANE[lid].filter(t => t.wrapId === task.wrapId && t.isWrapPrimary);
    for (const p of primaries) peers.push(p);
  }
  return peers;
}
