# React Demo 运行指南

这是一个预先配置好的 React 环境，专门用于运行 Gemini/ChatGPT/Claude 生成的代码。

## 如何运行

1. **粘贴代码**：
   - 打开 [App.jsx](file:///Users/wny/Documents/1%20项目%20Projects/PyPTO-AI/react-demo/src/App.jsx)。
   - 将 Gemini 生成的代码全部粘贴进去。
   - 如果代码中有 `import` 语句，请确保它们位于文件顶部。

2. **启动开发服务器**（如果尚未启动）：
   - 在终端运行：`cd react-demo && npm run dev`
   - 或者点击 Trae 提供的预览链接。

## 已包含的依赖

本环境已预装了 LLM 常用到的库：

- **Tailwind CSS v4**: 用于极速样式开发。
- **Lucide React**: 绝大多数 LLM 默认使用的图标库。
- **Framer Motion**: 用于复杂的 React 动画。
- **clsx & tailwind-merge**: 用于动态合并 Tailwind 类名（LLM 生成的代码中常有 `cn()` 函数）。

## 常见问题处理

- **缺少依赖**：如果粘贴代码后报错 `Module not found`，请在终端运行 `npm install <包名>`。
- **组件名不匹配**：请确保最后导出的组件是 `export default App`。
- **Tailwind 类名失效**：确保粘贴的代码中使用的类名是标准的 Tailwind 类。
