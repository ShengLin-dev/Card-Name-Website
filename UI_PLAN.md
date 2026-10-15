# UI Plan

Use this template for a specific UI change. Keep it brief for small work; complete the relevant sections for larger work. This is a plan, not a report of work already done.

## Task

- **Request:**
- **Desired outcome:**
- **Affected page or view:**
- **Acceptance criteria:**

## Scope

- **In scope:**
- **Out of scope:**
- **Constraints:**

## Existing project context

- **Framework and routing:**
- **Relevant components and files:**
- **Styling system, tokens, and breakpoints:**
- **Existing behavior to preserve:**
- **Available checks:**

Fill these from inspection. If the codebase is unavailable, mark them unknown instead of guessing.

## User flow and content hierarchy

1. **Entry point:**
2. **Main user task:**
3. **Primary action and expected result:**
4. **Supporting content or secondary actions:**

## Layout and component plan

- **Page regions needed:** Header / navigation / main content / secondary panel / footer; include only what the task needs.
- **Proposed hierarchy:**
- **Components to reuse:**
- **Components to add or change, and their responsibilities:**

## Visual direction

- **Existing styles or tokens to reuse:**
- **Requested visual changes:**
- **Assets or media:**

## Responsive plan

| Size or breakpoint | Layout and navigation behavior | Content and control changes |
| --- | --- | --- |
| Narrow / mobile |  |  |
| Medium / tablet |  |  |
| Wide / desktop |  |  |

Use the project's real breakpoints when known. Omit rows that do not apply.

## Interaction and state plan

| Element or action | Trigger | Expected result | Relevant states and feedback |
| --- | --- | --- | --- |
|  |  |  |  |

Include loading, empty, error, success, disabled, selected, or focus states only where relevant.

## Accessibility notes

- **Semantic structure and heading order:**
- **Keyboard behavior and focus:**
- **Labels and alternative text:**
- **Contrast or motion considerations:**

## Implementation sequence

1. Inspect the affected code and record applicable conventions.
2. Implement the smallest coherent layout, component, style, and behavior changes.
3. Review the changed view against the acceptance criteria.
4. Perform only the checks requested or required by project guidance; record actual results.

## Assumptions and open questions

- **Assumptions:**
- **Questions that could materially change the implementation:**
- **Risks or dependencies:**

## Completion record

Fill this in after implementation:

- **Changed files:**
- **Acceptance criteria met or not met:**
- **Checks actually performed and results:**
- **Remaining limitations:**