# GEMINI CLI: Project Context

This document provides an overview of the `deeper_research_synthetic` project, intended to serve as instructional context for the Gemini CLI agent.

## Project Overview

The `deeper_research_synthetic` project aims to create an agentic, self-sustaining ecosystem for generating and disseminating deep, unbiased understanding of critical global issues. It focuses on combating "AI slop" by producing high-quality, evidence-based analysis.

The project is structured as a full-stack application:
*   **Backend:** Developed using Node.js with Express.js.
*   **Frontend:** Developed using React with Vite.

The core philosophy emphasizes AI as a force multiplier, amplifying human intellect rather than replacing it. A key aspect is the "scratchpad framework," promoting transparency in the AI agent's thought processes.

The project's output is channeled through three main frameworks:
1.  **The Deeper Research Framework:** For exhaustive, academic-style white papers.
2.  **The Podcast Synthetic Framework:** For narrative-driven podcast episodes.
3.  **The Human Condition Benchmark (HCB) Framework:** For data-driven, infographic-rich dashboards.

## Building and Running

### Backend

The backend is a Node.js application.

*   **Dependencies:**
    To install backend dependencies, navigate to the `backend` directory and run:
    ```bash
    npm install
    ```

*   **Running the Server:**
    The main entry point for the backend is `server.js`. To start the backend server, navigate to the `backend` directory and run:
    ```bash
    node server.js
    ```

*   **Testing:**
    The `package.json` indicates a test script, but it's a placeholder.
    ```bash
    npm test
    ```
    (Currently outputs "Error: no test specified")

### Frontend

The frontend is a React application built with Vite.

*   **Dependencies:**
    To install frontend dependencies, navigate to the `frontend` directory and run:
    ```bash
    npm install
    ```

*   **Development Server:**
    To start the development server with hot-reloading, navigate to the `frontend` directory and run:
    ```bash
    npm run dev
    ```

*   **Building for Production:**
    To build the project for production, navigate to the `frontend` directory and run:
    ```bash
    npm run build
    ```
    The build artifacts will be placed in the `dist` directory.

*   **Linting:**
    To run the linter, navigate to the `frontend` directory and run:
    ```bash
    npm run lint
    ```

*   **Preview Production Build:**
    To preview the production build locally, navigate to the `frontend` directory and run:
    ```bash
    npm run preview
    ```

## Development Conventions

*   **Transparency and Process:** The project emphasizes transparency, particularly through the "scratchpad framework," which documents the AI agent's reasoning and execution. This suggests a preference for clear, well-documented processes and outputs.
*   **Modularity:** The project is divided into distinct `backend` and `frontend` components, indicating a modular architecture.
*   **Technology Stack:** Adherence to Node.js/Express for the backend and React/Vite for the frontend is expected.
*   **Content Generation Frameworks:** Any new development or analysis should align with the three defined content generation frameworks (Deeper Research, Podcast Synthetic, Human Condition Benchmark).

## Scratchpad Framework

To enable transparent and structured reasoning, the Gemini CLI can utilize a "scratchpad" framework for its responses. This framework is designed to provide insight into the thought process, planning, execution, and review of tasks.

**Activation:**

The scratchpad framework is **on by default**. To deactivate it for a a specific task or for all subsequent interactions, you can explicitly include the keyword `no-scratchpad` in your prompt.

**Structure:**

When activated, responses will begin with a `scratchpad` block, formatted as follows:

```
[Project Context: Briefly state the current project, its overall goal, and the specific phase or initiative being addressed.]

[Task Analysis:]
  [User Request Interpretation: Restate the user's request in my own words to confirm understanding.]
  [Ambiguity/Clarification: Identify any ambiguities in the request and propose clarifying questions if necessary.]
  [Pre-computation/Pre-analysis: Any initial thoughts or quick checks before diving deep (e.g., "This sounds like a refactoring task, I'll need to check existing tests.").]

[Plan Development:]
  [High-Level Plan: Outline the main steps to address the request.]
  [Detailed Steps: Break down the high-level plan into actionable, granular steps.]
  [Tool Selection: Identify which tools will be used for each step and why.]
  [Verification Strategy: How will the changes be verified (e.g., unit tests, linting, manual checks)?]
  [Rollback Plan (if applicable): How to revert changes if something goes wrong.]

[Execution & Monitoring: (This section will be populated during execution)]
  [Current Step: What is currently being executed.]
  [Output/Observations: Any relevant output from tools or observations during execution.]
  [Adjustments: Any deviations from the plan and why.]

[Review & Refinement:]
  [Self-Correction/Debugging: How issues encountered were resolved.]
  [Adherence to Conventions: How the changes align with project conventions.]
  [Completeness Check: Ensuring all aspects of the request are addressed.]

[Metacognition:]
  [Learning/Improvements: What was learned from this task, and how can future performance be improved?]
  [Efficiency Assessment: How efficient was the process?]
  [Alternative Approaches (if any): Other ways the task could have been approached.]

[Next Steps/Recommendations: What should the user do next, or what are my recommendations for further action?]
```