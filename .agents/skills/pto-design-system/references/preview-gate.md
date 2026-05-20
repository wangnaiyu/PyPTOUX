# Preview Gate

Use this workflow whenever the existing PTO system cannot satisfy a new module need.

## Required preview contents

Every preview must show:

1. Existing closest system pattern
2. Proposed new pattern
3. State coverage when relevant:
   - normal
   - hover
   - active
   - selected
4. Token usage
5. Why the current system is insufficient

## Output locations

Preferred order:

1. The current prototype module, usually `05-prototypes/<topic>/experiments/<variant>/component-preview.html` or the relevant `app/src` preview route.
2. `.agents/skills/pto-design-system/design-system-preview.html` only when the approved pattern should become shared system UI.
3. If the pattern becomes part of the long-lived product design system, mirror the decision into the relevant `07-designsystem/` guidance or component area.

## Approval rule

- No explicit user approval: preview only
- Explicit user approval: first absorb into system, then consume from the module

## What counts as explicit approval

Examples:

- “可以，就用这个”
- “approve”
- “按这个迁移”

Examples that are not approval:

- “先看看”
- “接近了”
- “再调一调”
