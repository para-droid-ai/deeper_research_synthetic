# Project Plan: Deeper Research Synthetic

**Status:** Initial Planning Complete. Ready to begin Phase 1.

This is a living document designed to track the development of the Deeper Research Synthetic project, from its current prototype stage to a fully agentic, public-facing application. Each phase and step includes a checkbox to mark progress.

---

## Vision & Philosophy

*   **The Mission:** To combat the flood of low-effort, ambiguous "AI slop" by producing iron-clad, respected analysis that helps people comprehend the complex situations unfolding on our planet.
*   **The Philosophy:** To use AI as a "force multiplier," amplifying human intellect rather than replacing it. The process is a product, offering transparency into how ideas are deconstructed and rebuilt as a learning tool.
*   **The Goal:** A self-sustaining, multi-channel media ecosystem (text, audio, infographics) with a central, data-rich dashboard as its hub.

---

## Phase 1: Foundational Codebase Refactoring

**Goal:** Transition from the `index.html` prototype to a professional, scalable full-stack project structure. This is the critical first step to enable all future development.

**Context after Completion:** The project will have a clean, organized structure with a separate frontend and backend, ready for API development.

### Steps:

- [ ] **1.1: Create Root Directory Structure.**
    - [ ] Create a `/frontend` directory.
    - [ ] Create a `/backend` directory.
    - [ ] Create a `/data` directory.

- [ ] **1.2: Organize Project Files.**
    - [ ] Move the three source report files (`podcast report - gaza - warfronts video.md`, `podcast white paper for 17th airborne division.md`, and `Human Condition Benchmark Framework - Crisis Asses.pdf`) into the `/data` directory.

- [ ] **1.3: Initialize Frontend Application.**
    - [ ] In the `/frontend` directory, initialize a new React project using Vite: `npm create vite@latest . -- --template react`.
    - [ ] Install necessary dependencies: `npm install`.

- [ ] **1.4: Initialize Backend Application.**
    - [ ] In the `/backend` directory, initialize a new Node.js project: `npm init -y`.
    - [ ] Install Express.js: `npm install express`.

- [ ] **1.5: Componentize the UI.**
    - [ ] Break down the UI from the `index.html` prototype into a logical React component structure within the `/frontend/src` directory.
        - [ ] `App.jsx`: Main application component with routing logic.
        - [ ] `components/Dashboard.jsx`: The main landing page with report cards.
        - [ ] `components/FrameworksModal.jsx`: The modal explaining the backend logic.
        - [ ] `views/GazaReport.jsx`: The view for the Podcast Synthetic report.
        - [ ] `views/AirborneReport.jsx`: The view for the Deeper Research report.
        - [ ] `views/HCBReport.jsx`: The view for the Human Condition Benchmark report.
    - [ ] Ensure the componentized frontend runs locally (`npm run dev`) and appears identical to the prototype, but with hardcoded data for now.

---

## Phase 2: Backend API Development

**Goal:** Build a robust backend to dynamically serve report data to the frontend, decoupling the content from the UI.

**Context after Completion:** The frontend will no longer use hardcoded data. It will fetch all report information from a live backend API, making the application dynamic.

### Steps:

- [ ] **2.1: Create Backend Server File.**
    - [ ] Create a `server.js` file in the `/backend` directory.

- [ ] **2.2: Build Report Endpoints.**
    - [ ] In `server.js`, set up an Express server.
    - [ ] Implement a `GET /api/reports` endpoint that reads the files in the `/data` directory and returns a JSON list of available reports with their metadata (id, title, framework, description).
    - [ ] Implement a `GET /api/reports/:id` endpoint that reads the full content of a specific report file and returns it.

- [ ] **2.3: Enable CORS.**
    - [ ] Add the `cors` middleware to the backend (`npm install cors`) to allow the frontend to make requests to the API during local development.

- [ ] **2.4: Refactor Frontend to Fetch Data.**
    - [ ] In the React application, modify the `Dashboard.jsx` component to fetch the list of reports from `GET /api/reports`.
    - [ ] Modify the individual report view components to fetch their content from `GET /api/reports/:id` based on the selected report.

- [ ] **2.5: Verification.**
    - [ ] Run both the frontend and backend servers concurrently.
    - [ ] Confirm that the application is fully functional and displays all report content by fetching it from the backend API.

---

## Phase 3: Agentic Content Generation Service

**Goal:** Design and implement the core asynchronous agent responsible for executing the three content frameworks on demand.

**Context after Completion:** The backend will have the core logic for generating new content, even if it's not yet fully integrated with the frontend.

### Steps:

- [ ] **3.1: Design Agent Service.**
    - [ ] Create a new file, `/backend/agentService.js`, to house the agentic logic.
    - [ ] Stub out functions for each framework (e.g., `generatePodcastSynthetic`, `generateDeeperResearch`, `generateHCB`).

- [ ] **3.2: Implement Asynchronous Job Handling.**
    - [ ] Choose a simple in-memory job queue for the prototype (a simple JavaScript object or array can work initially).

- [ ] **3.3: Create Generation Endpoint.**
    - [ ] In `server.js`, implement a `POST /api/generate` endpoint.
    - [ ] This endpoint should accept a `framework` and `source` in the request body.
    - [ ] It should add a new job to the queue with a unique `jobId` and a `status` of "pending," then immediately return the `jobId`.

- [ ] **3.4: Create Status Endpoint.**
    - [ ] Implement a `GET /api/jobs/:jobId` endpoint that allows the frontend to poll the status of a generation task.

- [ ] **3.5: Implement Mock Generation Logic.**
    - [ ] In the `agentService.js`, create a mock generation process. When a job is processed, it should wait for a simulated time (e.g., 30 seconds) and then create a new dummy report file in the `/data` directory. This simulates the long-running nature of the task without full AI integration yet.

---

## Phase 4: Automation, Frontend Integration, & Deployment

**Goal:** Connect the agent to the frontend, automate the content pipeline, and deploy the entire application for public access.

**Context after Completion:** The project will be a fully realized, publicly accessible web application capable of generating and displaying new content on demand.

### Steps:

- [ ] **4.1: Build Admin UI.**
    - [ ] Create a new, simple admin view/component in the React frontend.
    - [ ] This view will have a form that allows a user to input a source (URL or prompt) and select a framework.
    - [ ] The form submission will trigger a call to the `POST /api/generate` endpoint.

- [ ] **4.2: Implement Frontend Polling.**
    - [ ] After submitting a generation request, the admin UI will poll the `GET /api/jobs/:jobId` endpoint every few seconds to display the job status to the user.

- [ ] **4.3: Dynamic Dashboard Updates.**
    - [ ] When a job status is "complete," the dashboard should automatically refresh its list of reports from the `GET /api/reports` endpoint to display the newly generated content without a manual page reload.

- [ ] **4.4: Full AI Integration (Future Task).**
    - [ ] Replace the mock generation logic in `agentService.js` with the actual, tool-based AI framework execution logic.

- [ ] **4.5: Deployment.**
    - [ ] Choose hosting services (e.g., Vercel for frontend, Render for backend).
    - [ ] Configure the applications for production environments.
    - [ ] Deploy the frontend and backend.
    - [ ] Test the full, live application.
