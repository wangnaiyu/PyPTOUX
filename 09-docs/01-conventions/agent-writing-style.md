# Agent Writing Style

这份约定用于规范 PyPTOUX 仓库内 `.agents/skills/*/SKILL.md` 及相近代理说明文件的写法。

目标有四个：

- 提高人类阅读速度，尤其是中文母语场景
- 保持关键指令、路径、命令、标识符的准确性
- 尽量不削弱 skill 触发、路由和模型执行效果
- 控制 token 成本，避免把每一句都写成完整双语对照

## 1. Default Style

默认采用“中文主说明 + 英文稳定标识”的中英混写方式：

- 标题、段落说明、规则解释、注意事项 -> 以中文为主
- 路径、文件名、目录名、命令、分支名、代码标识 -> 保持英文
- 少量高频技术词可直接保留英文，如 `GitHub`、`PR`、`HTML`、`JSX`、`UX`
- 需要强调精确概念时，可用 `中文（English term）` 首次出现，后文择一使用

## 2. What Must Stay English

以下内容默认不要翻译：

- YAML frontmatter 的字段名，如 `name`、`description`
- skill 的稳定名字，如 `pyptoux-content-router`
- 路径、目录名、文件名、URL、命令行命令
- 代码标识符、环境变量、Git 分支、GitHub 操作词
- 会被模型直接依赖做匹配或执行的字面量

## 3. What Should Prefer Chinese

以下内容默认优先中文：

- 文档标题与小节标题
- 工作流说明
- 决策规则
- 风险提示
- “什么时候使用这个 skill” 这类面向人的解释

## 4. Bilingual Patterns

推荐使用以下几种混写方式。

### Pattern A: Chinese-first heading

适合大部分正文：

```md
## 核心流程 | Core Workflow
```

### Pattern B: Chinese sentence with precise English literal

适合保留精确标识：

```md
- 先确认当前工作目录（working directory）位于 PyPTOUX 仓库。
```

### Pattern C: Chinese rule plus raw literals

适合命令、路径、文件：

```md
- 提交前检查 `git status -sb`、`git remote -v`、`git branch --show-current`。
```

## 5. Efficiency Rules

为了兼顾模型阅读效率，避免以下写法：

- 不要把每一段都写成完整中英双份对照
- 不要把同一句信息先中文写一遍，再英文完整重写一遍
- 不要把明显无需翻译的命令说明硬翻译成自然语言代码

推荐做法：

- 一条规则只表达一次
- 中文负责解释，英文负责锚定稳定术语
- 在首次出现时补英文术语，后续保持简洁

## 6. Skill-Specific Rules

对 `SKILL.md` 额外遵守以下规则：

- frontmatter 保持英文可触发描述为主
- 如需补中文提示，优先放在正文，不要让 frontmatter 变成冗长双语说明
- “何时使用” 要保留足够清晰的英文关键词，避免削弱 skill routing
- 参考文件路径统一保持英文原样

## 7. Rewrite Principle

改写旧文件时，优先做这几类动作：

1. 保留结构和含义，不做无必要扩写
2. 把小节标题改成中文优先或中英并列
3. 把解释性句子改成中文
4. 保留命令、路径、文件、标识符原文
5. 只在关键术语第一次出现时补英文括注

## 8. Quick Example

不推荐：

```md
## Core Workflow

1. Confirm the working directory is the PyPTOUX repo.
2. Check repository state with `git status -sb`.
```

推荐：

```md
## 核心流程 | Core Workflow

1. 先确认当前工作目录位于 PyPTOUX 仓库。
2. 用 `git status -sb` 检查仓库状态。
```
