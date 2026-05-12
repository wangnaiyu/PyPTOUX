/* ===================================================================
 * PyPTO Studio · Main orchestration
 * 启动顺序: Topbar → Knobs → Modals → CompileStub → Swimlane → PlaybookView
 * 默认入场: 在 Runtime 模式下，自动弹出 Symptom Fingerprint 模态，引导进入剧本
 * =================================================================== */

(function () {

  function boot() {
    // 1. 注册顶栏 & 模式切换
    window.Topbar.init();

    // 2. 旋钮 & 实验对比
    window.Knobs.init();

    // 3. Modals（指纹 / 沉淀 / 帮助）
    window.Modals.init();

    // 4. Compile 模式占位
    window.CompileStub.init();

    // 5. 泳道图（必须先在 runtime DOM 可见后再 layout）
    requestAnimationFrame(() => {
      window.Swimlane.init();
    });

    // 6. Playbook 视图（依赖 Swimlane 已存在）
    window.PlaybookView.init();

    // 7. 入场体验: 弹 fingerprint
    setTimeout(() => {
      if (!window.SESSION_STATE.fingerprintShown) {
        window.Modals.openFingerprint();
        window.SESSION_STATE.fingerprintShown = true;
      }
    }, 280);

    // 模式切换时，重新 layout 泳道图（右侧宽度可能从未渲染过）
    document.addEventListener('mode-changed', (e) => {
      const m = e.detail.mode;
      if (m === 'runtime') {
        // refresh swimlane after layout settles
        setTimeout(() => window.Swimlane.refresh(), 60);
      } else if (m === 'compile') {
        window.CompileStub.update();
      }
    });

    // 键盘导航: ← → 切换步骤
    document.addEventListener('keydown', (e) => {
      // 仅在 runtime 模式且没有 modal 打开时
      if (document.body.dataset.mode !== 'runtime') return;
      if (document.querySelector('.modal-backdrop.open')) return;
      const cur = window.SESSION_STATE.currentStep;
      if (e.key === 'ArrowLeft' && cur > 1) {
        window.PlaybookView.goToStep(cur - 1);
      } else if (e.key === 'ArrowRight' && cur < window.PLAYBOOK.steps.length) {
        window.PlaybookView.goToStep(cur + 1);
      } else if (e.key === '?') {
        window.Modals.open('modal-help');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
