# UI Rules

## Purpose

Use these rules for interface planning and implementation. They complement UI_STRUCTURE.md; they do not replace the user's task requirements or the project's existing architecture.

## Instruction order

- Follow higher-priority system and developer instructions and the user's latest explicit request.
- Follow repository and project guidance where it is consistent with those instructions and the request.
- Use UI_STRUCTURE.md as the shared UI reference, UI_RULES.md for durable constraints, UI_PLAN.md for the current task plan, and UI_BRAINSTORMING.md only when exploration would help.
- If guidance conflicts, identify the conflict and follow the higher-priority instruction.

## Before changing UI

- Inspect the relevant source files, existing components, styles, assets, and project conventions.
- Identify the framework, routing and state patterns, design tokens, and existing controls that apply to the requested change.
- Write down the requested outcome, affected views, required behavior, and acceptance criteria before implementation. Use UI_PLAN.md for substantial tasks.
- Use the available project context. Do not claim to have inspected code, pages, or checks that were not accessible.

## Scope and implementation

- Implement only what the user asked for and what is necessary to make that request work.
- Do not invent pages, content, features, or interactions. Record uncertain details as assumptions; ask only when the answer could materially change the result.
- Reuse existing components, styles, tokens, assets, and dependencies where they fit.
- Make the smallest coherent change. Keep components focused and follow the project's naming and file conventions.
- Do not add a dependency, replace a framework or router, or refactor unrelated code without a clear need and appropriate user authorization.
- Preserve existing behavior unless the requested change requires a deliberate change.

## Layout and visual design

- Establish the content hierarchy and primary user flow before choosing visual details.
- Use semantic elements and the project's established layout, spacing, typography, color, and breakpoint conventions.
- Choose the layout based on the content and task. Do not add a header, sidebar, footer, or panel solely because a template mentions one.
- Prevent clipped content, unintended horizontal scrolling, overlap, and excessively wide text blocks.
- Use animation only when it clarifies state or supports the experience; respect reduced-motion preferences.

## Responsive behavior

- Support the screen sizes relevant to the project and task.
- Prefer existing breakpoints. Define a new breakpoint only when the layout needs it and the project has no suitable convention.
- Plan how navigation, columns, media, cards, forms, and primary actions reflow at narrow widths.
- Keep controls usable with touch and keyboard input. Check for overflow and clipping at relevant sizes when visual verification is part of the task.

## Interactions and page states

- Every visible control must have the behavior its label or appearance promises.
- For each requested interaction, define its trigger, result, and relevant default, focus, selected, disabled, loading, success, error, and empty states.
- Give forms useful labels, validation, and feedback. Give icon-only controls accessible names.
- Keep page-level loading, empty, error, and success states consistent with the existing application.
- Do not make a decorative element look interactive unless the user requests a static mockup.

## Accessibility

- Use semantic HTML and a logical heading order.
- Associate form controls with labels and provide visible keyboard focus.
- Ensure interactive controls work by keyboard and have accessible names.
- Provide meaningful alternative text for informative images.
- Do not rely on color alone to communicate meaning; use the project's accessibility target and contrast conventions.

## Verification and reporting

- Use existing, relevant checks when the task or project guidance calls for verification. Do not add or run tests unless requested.
- When a visual check is requested or required and can be performed, inspect the affected view at relevant widths and keyboard states.
- Report changed files, checks actually performed and their results, and known limitations. Separate planned checks from completed checks.
- Never claim a build, test, accessibility review, or visual inspection passed unless it was actually performed.