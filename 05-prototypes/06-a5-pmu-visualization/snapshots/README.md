# Snapshots

预留目录，等用户取截图后归档。建议覆盖：

1. **Default mode**（Mix OFF）· 默认 lane 顺序 + identity coloring · 选中 Wrap 7 critical task。
2. **Mix mode**（Mix ON）· Wrap-grouped 顺序 + counter composition coloring · 同样选中 Wrap 7。
3. **Wrap 19 overlap**：Mix ON · 选中 W19，显示紫色 overlap badge + 紫色 overflow 刻度。
4. **Wrap 12 wait** · scalar 拖尾。
5. **Empty state**：切到 G4 后的空状态卡 + 重新采集命令。
6. **Modals · 4 张**：源码 / CALL / Block Graph / Hardware path。

预览启动方式：

```
.claude/launch.json 中已注册 a5-pmu-group2-loop（端口 8770）
访问 http://localhost:8770/
```

> 注：预览服务器实际指向 `/tmp/pyptoux-preview/06-a5-pmu-group2-loop/`（一份镜像副本），
> 用于绕过 macOS 沙箱对带空格 / 中文路径的访问限制。
> 真正的源码仍在 `05-prototypes/06-a5-pmu-visualization/experiments/group2-loop/`。
> 修改源码后需要 `cp -R "<source>/." /tmp/pyptoux-preview/06-a5-pmu-group2-loop/` 再 reload。
