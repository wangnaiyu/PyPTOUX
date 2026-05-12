// Group workbench registry.
// Each entry conforms to the same interface so a future multi-group switcher
// can call .summarize(), .renderTaskOverlay(), .describeDominant(),
// .suggestNextGroup() without knowing the group's id.

import { group2 } from './group2.js';

export const GROUP_REGISTRY = {
  1: { id: 1, title: 'Cube Arithmetic View',     sampled: false, available: false, impl: null },
  2: { id: 2, title: 'Pipeline Balance View',    sampled: true,  available: true,  impl: group2 },
  4: { id: 4, title: 'Memory Access Flow View',  sampled: false, available: false, impl: null },
  5: { id: 5, title: 'Cube L0 Path View',        sampled: false, available: false, impl: null },
  6: { id: 6, title: 'Conflict / Issue View',    sampled: false, available: false, impl: null },
  7: { id: 7, title: 'Local Buffer Pressure',    sampled: false, available: false, impl: null },
  8: { id: 8, title: 'L2 Efficiency View',       sampled: false, available: false, impl: null },
};

export function getGroup(id) {
  return GROUP_REGISTRY[id];
}
