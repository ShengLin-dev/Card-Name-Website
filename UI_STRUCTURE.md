# UI_STRUCTURE.md

## 1. Purpose

This document is the shared reference for planning, building, and reviewing this project's user interface (UI). Read it before making UI changes.

Follow the user's explicit requirements and applicable higher-priority instructions. Use this guide together with the project's existing code, architecture, and conventions; adapt it to the task instead of forcing every rule onto every page.

## 2. Core Principles

- Define the user flow and page structure before styling details.
- Make the interface clear, consistent, responsive, and accessible.
- Prefer reusable components and existing project conventions.
- Keep each component focused on a clear responsibility.
- Avoid unnecessary dependencies, decorative effects, and unrelated refactoring.
- Do not invent features, pages, content, or interactions that the user did not request.
- If a nonessential detail is unspecified, choose a sensible default and record the assumption. Ask a question only when the answer could materially change the implementation.

## 3. Standard Page Structure

Use only the regions needed for the user's goal.

1. **Header:** project identity, primary navigation, and optional account or settings controls.
2. **Navigation / Sidebar:** page links or feature categories, with the current section clearly indicated.
3. **Main Content:** page title, brief context, primary task or feature, supporting content, and main action.
4. **Secondary Panel (optional):** filters, settings, tools, or contextual information that supports the main task.
5. **Footer (optional):** copyright, help, contact details, or secondary links.

Do not add a sidebar, header, or footer merely because it appears in this template. Choose a layout that best supports the user's goal.

### User Flow and Information Architecture

Before choosing the layout, identify the relevant parts of the user's flow:

- Where the user enters the page or task.
- What the user needs to understand or do first.
- The primary action and the expected result.
- Any supporting content or secondary actions needed to complete the task.

Group and order content around that flow. Include only pages, sections, and actions required by the request or existing product behavior. For a small change, a short written flow is enough.

## 4. Layout and Hierarchy

- Establish a clear hierarchy for page titles, section headings, body text, helper text, and actions.
- Use consistent alignment, spacing, widths, and gaps.
- Use Flexbox for one-dimensional layouts and CSS Grid for two-dimensional layouts when appropriate.
- Prevent unintended horizontal scrolling, clipping, and overlapping elements.
- Keep important actions easy to find.
- Avoid excessive nested containers and overly wide text blocks.
- Reuse the project's existing responsive conventions and CSS framework.
- Set content widths and column proportions to fit the content; avoid arbitrary fixed widths where flexible sizing works.

## 5. Component Architecture

Organize the UI into reusable components where doing so improves clarity or reuse. A typical example is:

~~~
App
+-- PageLayout
|   +-- Header
|   +-- Navigation (optional)
|   +-- MainContent
|   |   +-- PageSection
|   |   +-- ContentCard (optional)
|   |   +-- InteractivePanel (optional)
|   +-- Footer (optional)
~~~

- Inspect the current architecture before creating or moving files.
- Use descriptive component and file names that match project conventions.
- Keep components focused and avoid duplicating the same UI pattern.
- Do not create a component for every tiny element unless it improves reuse or readability.
- Keep presentation logic with its component when that makes the code clearer; use the project's existing data and state patterns for shared or complex logic.
- Do not replace the framework, router, or state-management approach without a clear need and user approval.

## 6. Visual Design System

Before styling a new component, inspect and reuse the project's existing choices for:

- Colors and design tokens
- Typography and heading scale
- Spacing and sizing
- Borders, corner radius, and shadows
- Icons and button variants
- Inputs, forms, cards, and navigation states
- Hover, focus, selected, disabled, loading, success, and error states

Rules:

- Keep elements with the same purpose visually consistent.
- Avoid arbitrary colors, font sizes, and spacing values when design tokens already exist.
- Use animation only when it communicates state or improves the experience.
- Respect reduced-motion preferences when using nonessential animations.
- Do not add a new UI library or styling framework unless it is necessary and approved.

## 7. Responsive Behavior

Unless the user specifies otherwise, make the interface work across the screen sizes supported by the project.

- Use existing breakpoints and project conventions. Do not guess fixed breakpoint values if the project already defines them.
- Plan how navigation, columns, cards, forms, media, and primary actions reflow at narrow widths.
- Keep text and controls from overlapping, clipping, or becoming difficult to use.
- Resize images, video, and 3D canvases without breaking the layout.
- Make buttons and other touch targets practical to use on touch screens.
- Prevent unintended horizontal scrolling.

For a substantial layout change, record a brief responsive plan:

| Screen size or project breakpoint | Layout and navigation behavior | Content and control changes |
| --- | --- | --- |
| Narrow |  |  |
| Medium |  |  |
| Wide |  |  |

Use the project's actual breakpoint names or values when known. Omit rows that do not apply.

## 8. Interaction Requirements

Before implementation, identify the behavior of each important interactive element. A short inventory can use these columns:

| Element or action | Trigger | Expected result | Feedback and relevant states |
| --- | --- | --- | --- |
|  |  |  |  |

Consider these control states where relevant:

- Default
- Hover and keyboard focus
- Active or selected
- Disabled
- Loading
- Success or error

Consider these page or content states where relevant:

- Loading
- Empty
- Error
- Success

Rules:

- Buttons must perform the action implied by their labels.
- Links must lead to the expected destination.
- Forms must validate input and show useful feedback.
- Inputs and icon-only controls must have accessible labels.
- Show feedback for important actions and errors.
- Do not leave decorative controls appearing functional if they do nothing, unless the user explicitly requests a static mockup.
- Preserve working behavior while changing layout or styling.

## 9. Accessibility

- Prefer semantic HTML elements and use headings in a logical order.
- Use readable color contrast and do not communicate meaning through color alone.
- Associate form inputs with labels.
- Support keyboard navigation and show a visible focus indicator.
- Provide meaningful alternative text for informative images.
- Give accessible names to icon-only buttons and interactive controls.
- Respect reduced-motion preferences when animation is present.
- Follow the project's stated accessibility target when one exists; do not claim conformance unless it has been checked.

## 10. AI Agent Workflow

### Before coding

1. Inspect the relevant source files, framework, scripts, dependencies, current UI, and existing behavior.
2. Read applicable project instructions and UI_RULES.md when present.
3. Identify the requested views, user flow, acceptance criteria, component hierarchy, visual direction, responsive behavior, and interactions.
4. Reuse existing components, styles, and design tokens wherever possible.
5. Use UI_PLAN.md for substantial work or when the user requests a plan. Brainstorming is optional; use UI_BRAINSTORMING.md only when there are meaningful design choices to explore.

### While coding

1. Implement the smallest coherent solution that meets the requirements.
2. Make focused changes rather than rewriting unrelated parts of the project.
3. Keep styles, components, and interactions consistent with existing conventions.
4. Avoid unnecessary packages and hidden assumptions.
5. If a requested change conflicts with existing behavior or project constraints, preserve the applicable requirements and explain the trade-off.

### After coding

1. Run relevant existing checks when the task or project guidance calls for verification. Do not add or run tests unless requested.
2. When visual verification is requested or required and available, inspect affected views at relevant screen sizes and keyboard states.
3. Verify requested interactions when they can be exercised in the available environment.
4. Address in-scope layout, accessibility, and runtime issues found during the requested review.
5. Report changed files, checks actually performed and their results, and remaining limitations. Never claim a check passed unless it was actually run.

## 11. Project-Specific UI Brief

Complete these fields when the information is known. Missing fields are unknown; they are not permission to invent features.

- **Project type:** [website / dashboard / portfolio / 3D interactive website / other]
- **Target users:** [who will use it]
- **Main user goal:** [what users should accomplish]
- **Pages or views:** [required pages]
- **Main content and components:** [what users need to see or use]
- **Primary user flow:** [entry point, main action, expected result]
- **Interactions and states:** [what each control does; relevant loading, empty, error, or success states]
- **Visual direction:** [minimal / playful / futuristic / professional / other]
- **Supported devices or screen sizes:** [mobile / tablet / desktop / other]
- **Existing stack and design system:** [use the project's current framework and styling approach]
- **In scope:** [requested UI areas or behavior]
- **Out of scope:** [related work not requested]
- **Constraints:** [deadline, performance, accessibility, or other limits]
- **Acceptance criteria:** [observable conditions for completing the task]
- **Assumptions or open questions:** [only where relevant]

## 12. Definition of Done

A UI task is complete when:

- The implementation meets the user's requirements and each acceptance criterion is met or clearly reported as unmet.
- Visual styling is consistent with the project's existing design system.
- Requested controls and interactions work as expected, including relevant states and feedback.
- The interface behaves appropriately at relevant screen sizes, with no obvious clipping, overlap, or unintended overflow.
- Semantic structure and applicable accessibility requirements have been considered.
- Relevant checks requested by the task or project guidance have been run, or skipped checks and reasons are disclosed.
- The report lists changed files, checks actually performed, and known remaining limitations.

## 13. Prompt to Start a UI Task

Copy this prompt into the AI Agent:

> Read UI_STRUCTURE.md, UI_RULES.md when present, and the applicable project instructions before editing the UI. Inspect the relevant code and identify the framework, component structure, styling conventions, existing behavior, and available checks. Record the user flow and acceptance criteria; use UI_PLAN.md for substantial work and UI_BRAINSTORMING.md only when meaningful design alternatives need exploration. Reuse existing components and styles where possible. Implement the smallest coherent solution that meets the requirements; do not invent features, add unnecessary dependencies, or refactor unrelated code. Run relevant checks when requested or required, and report changed files, checks actually performed, and remaining limitations.