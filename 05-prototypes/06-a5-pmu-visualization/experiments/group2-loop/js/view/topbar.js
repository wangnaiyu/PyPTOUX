import { state, setState } from '../state.js';
import { GROUP_REGISTRY } from '../groups/registry.js';

export function renderTopbar() {
  const tabsEl = document.getElementById('group-tabs');
  tabsEl.innerHTML = '';
  for (const g of Object.values(GROUP_REGISTRY)) {
    const btn = document.createElement('button');
    btn.className = 'group-tab' + (state.groupId === g.id ? ' active' : '');
    btn.textContent = `G${g.id}`;
    btn.dataset.groupId = String(g.id);
    btn.dataset.sampled = String(g.sampled);
    btn.dataset.disabled = String(!g.sampled && !g.available);
    btn.title = g.sampled
      ? `${g.title} · 本次 run 已采集`
      : `${g.title} · 本次未采集，切换后展示空状态`;
    btn.addEventListener('click', () => setState({ groupId: g.id, selectedTaskId: null }));
    tabsEl.appendChild(btn);
  }

  const mix = document.getElementById('mix-toggle');
  mix.dataset.on = String(state.mixMode);
  mix.querySelector('.mix-label').textContent = state.mixMode ? 'ON' : 'OFF';
  mix.onclick = () => setState({ mixMode: !state.mixMode });
}

export function setHpTaskCount(n) {
  document.getElementById('hp-task-count').textContent = String(n);
}
