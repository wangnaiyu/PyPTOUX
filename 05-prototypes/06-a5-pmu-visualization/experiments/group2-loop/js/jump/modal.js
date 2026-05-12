// Modal shell for the 4 jump destinations.

import { renderSource } from './source-view.js';
import { renderCall } from './call-view.js';
import { renderBlockGraph } from './block-graph.js';
import { renderHwPath } from './hw-path.js';

const TITLES = {
  source: { kicker: 'Source', label: '源码片段' },
  call: { kicker: 'CALL', label: '调用图定位' },
  blockgraph: { kicker: 'Block Graph', label: 'Block Graph 定位' },
  hw: { kicker: 'Hardware Path', label: 'A5 微架构 · dominant pipe' },
};

export function openModal(type, ctx) {
  const root = document.getElementById('modal-root');
  root.classList.add('is-open');

  let bodyHtml = '';
  if (type === 'source') bodyHtml = renderSource(ctx);
  else if (type === 'call') bodyHtml = renderCall(ctx);
  else if (type === 'blockgraph') bodyHtml = renderBlockGraph(ctx);
  else if (type === 'hw') bodyHtml = renderHwPath(ctx);

  const t = TITLES[type];
  const sub = type === 'source'
    ? `${ctx.task.traceLinks.source.path}:${ctx.task.traceLinks.source.lineStart}-${ctx.task.traceLinks.source.lineEnd}`
    : type === 'call' ? `callOpMagic ${ctx.task.traceLinks.callOpMagic}`
    : type === 'blockgraph' ? `leafHash ${ctx.task.traceLinks.leafHash}`
    : `${ctx.dominantMeta?.pipe || '—'}`;

  root.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop"></div>
    <div class="modal-window" role="dialog">
      <div class="modal-head">
        <div>
          <div class="modal-kicker">${t.kicker}</div>
          <div class="modal-title">${t.label}</div>
        </div>
        <div class="modal-sub">${sub}</div>
        <div class="modal-head-spacer"></div>
        <button class="modal-close" id="modal-close" aria-label="关闭">×</button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
    </div>
  `;

  const close = () => {
    root.classList.remove('is-open');
    root.innerHTML = '';
    document.removeEventListener('keydown', onKey);
  };
  function onKey(e) { if (e.key === 'Escape') close(); }
  document.addEventListener('keydown', onKey);
  root.querySelector('#modal-close').addEventListener('click', close);
  root.querySelector('#modal-backdrop').addEventListener('click', close);
}
