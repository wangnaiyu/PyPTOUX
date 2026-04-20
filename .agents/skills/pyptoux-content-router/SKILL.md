---
name: pyptoux-content-router
description: Use this skill when working inside the PyPTOUX repository and you need to decide where new content should live, how files should be named, how vibe-coding outputs should be routed, or how to quickly find relevant project information across knowledge, insights, uxdesign, prototypes, tools, and designsystem.
---

# PyPTOUX Content Router

Use this skill for any content creation, filing, reorganization, or retrieval task in the PyPTOUX repository.

## What To Read First

- Read [docs/conventions/content-routing.md](../../../docs/conventions/content-routing.md) for the decision tree.
- Read [docs/indexes/content-map.md](../../../docs/indexes/content-map.md) for fast routing and retrieval.
- Read [docs/conventions/repository-structure.md](../../../docs/conventions/repository-structure.md) if you need the stable folder contract.

## Core Workflow

1. Confirm the working directory is the PyPTOUX repo.
2. Classify the artifact by intent:
   - business understanding -> `knowledge/`
   - benchmark or inspiration -> `insights/`
   - formal design output -> `uxdesign/`
   - demo or prototype -> `prototypes/`
   - workflow helper -> `tools/`
   - visual baseline or reusable UI -> `designsystem/`
3. Decide whether it belongs in `shared/` or a specific topic folder.
4. Prefer canonical names such as `overview.md`, `sources.md`, `glossary.md`, `prd.md`, `ux-analysis.md`, `meta.md`.
5. When the artifact comes from vibe coding:
   - HTML -> `prototypes/<topic>/experiments/html/`
   - JSX / TSX -> `prototypes/<topic>/experiments/jsx/`
   - prompts -> `prototypes/<topic>/prompts/`
   - prototype notes -> `prototypes/<topic>/notes/`
   - matured project -> `prototypes/<topic>/app/`
6. If uncertain, choose the smallest correct placement and avoid inventing new top-level structure.
7. Update the relevant index file if you introduced a new topic, shared framework, prototype track, tool, or designsystem area.

## Default Decisions

- Prefer existing topic folders over creating near-duplicate new topics.
- Prefer `shared/` when the content is reusable across multiple topics.
- Prefer `inbox/` only for genuinely unprocessed material, not as a long-term dumping ground.
- Prefer `sources.md` over loose external-link notes scattered across the repo.

## Retrieval Rules

When asked to find relevant information quickly:

- search by topic name first
- then search by content layer
- then check `docs/indexes/content-map.md`
- then inspect nearby `overview.md`, `sources.md`, or `meta.md`

## References

- For routing examples and filename defaults, use [references/routing-examples.md](references/routing-examples.md).
