// Entry. Loads data, subscribes views to state, installs initial selection.

import { TASKS, ANCHOR_TASK_ID, SAMPLED_GROUP } from './data/tasks.js';
import { state, setState, subscribe } from './state.js';
import { renderTopbar, setHpTaskCount } from './view/topbar.js';
import { initSwimlane, renderSwimlane, renderLegend, renderTitle } from './view/swimlane.js';
import { renderSummary } from './view/summary.js';
import { renderDetail } from './view/detail-panel.js';

function renderAll() {
  renderTopbar();
  renderLegend('sl-legend');
  renderTitle('sl-title');
  renderSwimlane();
  renderSummary();
  renderDetail();
}

window.addEventListener('DOMContentLoaded', () => {
  setHpTaskCount(TASKS.length);
  initSwimlane('swimlane-host');

  // expose helper for unsampled-state "switch to G2" button
  window.__switchG2 = () => setState({ groupId: 2 });

  // subscribe FIRST so that any setState fires re-renders.
  subscribe((s, patch) => {
    // Topbar (mix toggle + group tabs reflect state)
    if ('mixMode' in patch || 'groupId' in patch) {
      renderTopbar();
      renderLegend('sl-legend');
      renderTitle('sl-title');
      renderSwimlane();
      renderSummary();
      renderDetail();
      return;
    }
    if ('selectedTaskId' in patch || 'hoveredTaskId' in patch) {
      renderSwimlane(); // re-render to update selection stroke
      renderDetail();
      return;
    }
    if ('zoom' in patch) {
      renderSwimlane();
      return;
    }
  });

  // initial render
  renderAll();

  // initial selection = the anchor (Wrap 7 critical task)
  setState({ selectedTaskId: ANCHOR_TASK_ID });

  // zoom controls
  document.getElementById('sl-zoom-in').addEventListener('click', () => {
    const z = Math.min(4, state.zoom * 1.25);
    setState({ zoom: z });
    document.getElementById('sl-zoom-val').textContent = z.toFixed(1) + '×';
  });
  document.getElementById('sl-zoom-out').addEventListener('click', () => {
    const z = Math.max(0.5, state.zoom / 1.25);
    setState({ zoom: z });
    document.getElementById('sl-zoom-val').textContent = z.toFixed(1) + '×';
  });
  document.getElementById('sl-fit').addEventListener('click', () => {
    setState({ zoom: 1 });
    document.getElementById('sl-zoom-val').textContent = '1.0×';
  });
});
