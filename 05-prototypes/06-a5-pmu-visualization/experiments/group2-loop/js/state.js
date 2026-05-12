// Single store with pub/sub.

const listeners = new Set();

export const state = {
  chip: 'dav_3510',
  groupId: 2,           // active workbench
  mixMode: false,       // OFF → default lane order + identity coloring
                        // ON  → wrap-grouped order + counter-composition coloring
  selectedTaskId: null,
  hoveredTaskId: null,
  zoom: 1.0,            // 1.0 = fit horizontally
  scrollLeft: 0,
  highlightedWrapId: null,
  openModal: null,      // null | { type: 'source'|'call'|'blockgraph'|'hw', task, derived }
};

export function setState(patch) {
  Object.assign(state, patch);
  for (const fn of listeners) fn(state, patch);
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
