# UI Brainstorming

Use this guide before planning when the task has meaningful design choices. Brainstorming is optional for a clear, small change. Its purpose is to find a fitting direction, not to expand the requested feature set.

## Ground the discussion

Start with facts from the request and project:

- User goal and audience, if known
- Required pages, content, and actions
- Existing components, design tokens, and patterns
- Supported devices and technical constraints
- Explicit exclusions and unresolved decisions

Mark each item as **required**, **known project convention**, **assumption**, or **open question**. Do not treat an assumption as a requirement.

## Explore only relevant choices

Consider these prompts as needed:

### Structure and flow

- What does the user need to see first?
- What is the primary task and its shortest clear path?
- Which page regions are necessary for that task?
- Does the content need grouping, ordering, filtering, or a secondary panel?

### Components and reuse

- Which existing components already solve part of the problem?
- Would a new component have a clear responsibility or useful reuse?
- Which parts should remain together so the flow stays understandable?

### Responsive behavior

- What must change when the available width is reduced?
- How should navigation, columns, media, forms, and actions reflow?
- Which controls need extra room or a practical touch target?

### Visual direction

- Which existing tokens and patterns should anchor the design?
- What level of emphasis helps users find the primary action?
- Are imagery, icons, or animation necessary to explain the content or state?

### Interaction and feedback

- What happens after each action?
- Which loading, empty, error, success, disabled, or selected states matter?
- What feedback helps users understand the result?

## Compare options

Generate a small number of options only when there is a real choice. Compare each option against:

- Fit with the requested user goal
- Clarity of the content hierarchy and main action
- Reuse of existing project patterns
- Responsive and keyboard usability
- Implementation effort and risk

Choose one direction and record the reason. Do not add a feature just because it is an interesting idea.

## Brainstorming record

- **Task and user goal:**
- **Known constraints:**
- **Required elements:**
- **Option A:**
- **Option B, if useful:**
- **Recommended direction and why:**
- **Assumptions:**
- **Open questions that could change the design:**
- **Ideas explicitly out of scope:**
- **Decisions to carry into UI_PLAN.md:**

## Handoff

Move the selected structure, component approach, responsive behavior, and interactions into UI_PLAN.md. Keep unselected ideas out of the implementation plan unless the user asks to revisit them.