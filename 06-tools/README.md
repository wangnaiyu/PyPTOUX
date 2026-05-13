# Tools

这里存放服务 PyPTOUX 工作流的内部工具。

当前定位：

- `01-prototype-kit/previewer/`：解决 JSX demo 预览问题
- `01-prototype-kit/converters/`：做 HTML / JSX 的轻量转换与包装
- `01-prototype-kit/launchers/`：快速启动 demo 或课题级预览环境
- `01-prototype-kit/shared/`：预览器与转换器共用的壳层或运行时辅助
- `scripts/`：轻量脚本
- `templates/`：可复用模板

原则：

- 先轻量起步
- 优先服务设计与原型验证
- 成熟后再升级为完整子项目
- `01-prototype-kit/` 由 Codex 与 Claude 对等共写；一方新增 toolkit 后，必须在 toolkit 目录下补 `notes/spec.md`，写清 spec、接口约定、输入输出、命令入口、边界和待 review 项
