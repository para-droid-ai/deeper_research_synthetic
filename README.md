# Deeper Research Synthetic

## The Mission: An Iron-Clad Understanding for a Complex World

This repository is the foundation for a paradigm-shifting project: an agentic, self-sustaining ecosystem for generating and disseminating deep, unbiased understanding of critical global issues. Our mission is to combat the flood of low-effort, ambiguous "AI slop" by producing iron-clad, respected analysis that helps people comprehend the complex situations unfolding on our planet, the interconnectedness of events, and their profound human impact.

We are building more than a content engine; we are building a new model for global consciousness.

## The Philosophy: AI as a Force Multiplier

This project is a statement against the outsourcing of thought. We believe AI's true potential lies not in replacing human intellect, but in amplifying it. Our methodology is built on a "force multiplier" principle, using a layered, multi-tool approach that requires human guidance, curiosity, and expertise at every stage.

**Process as a Product:** We embrace transparency. A core feature of our work is the "scratchpad framework," which allows users to see *how* the AI agent deconstructs and rebuilds ideas. By revealing the logic, we transform the content into a learning tool, offering a unique external perspective on complex problems.

## The Three Pillars of Content

The project's output is channeled through three distinct, high-effort frameworks:

1.  **The Deeper Research Framework:** Produces exhaustive, academic-style white papers (10,000+ words) for deep, evidence-based analysis.
    *   **Example:** *A Military History of the 17th Airborne Division.*

2.  **The Podcast Synthetic Framework:** Creates compelling, narrative-driven podcast episodes (15,000+ words), transforming dense information and existing media into engaging audio-first analyses.
    *   **Example:** *The Hunger Algorithm: Gaza and the Ghost of Humanitarian Aid.*

3.  **The Human Condition Benchmark (HCB) Framework:** Generates data-driven, infographic-rich dashboards that provide a snapshot of global crises using a DEFCON-style risk assessment.
    *   **Example:** *Human Condition Report: August 1, 2025.*

## The Vision: A Multi-Channel Ecosystem

Our goal is to create a self-sustaining media ecosystem. The public-facing dashboard is the central hub, but the content is designed for wide distribution across multiple formats to reach the largest possible audience:

*   **Long-Form Text:** Full reports and transcripts for deep reading.
*   **Audio:** Professionally produced podcast episodes and audiobooks distributed via RSS to all major podcasting platforms.
*   **Dynamic Infographics:** Shareable, high-impact visuals that distill key findings for broader engagement.

This project will serve as a data-rich showcase into the world we all inhabit, directing users to the original source content while providing a powerful analytical layer on top of it.

## The Path Forward

This project is currently in its foundational stage. The core frameworks have been defined and tested. The next phases of development will focus on building out the agentic system and public-facing platform in a phased approach. The high-level plan is as follows:

*   **Phase 1: Foundation & Validation (Week 1):** Establish the project's foundational infrastructure and validate the core concepts.
*   **Phase 2: Core Development (Weeks 2-3):** Build the core functionality of the application, including the project creation and source context management features.
*   **Phase 3: Integration & Testing (Weeks 4-5):** Integrate the AI generation capabilities and thoroughly test the application.
*   **Phase 4: Launch Preparation (Week 6):** Prepare the application for launch.
*   **Phase 5: Launch & Iteration (Ongoing):** Launch the application and iterate based on user feedback.

A more detailed breakdown of the build plan can be found in the `Project-phased-build-contract.md` file.

## Local Content Generation and Publishing Pipeline

This repository includes a modular, command-line-based pipeline for processing local markdown files and publishing them to external services like Notion.

### Project Structure

The pipeline is organized into several Python modules:

-   `main.py`: The central orchestrator that runs the entire pipeline.
-   `io_utils.py`: A utility module for handling file input/output.
-   `parser.py`: Handles parsing markdown-like text into a structured format.
-   `metadata.py`: Generates metadata (e.g., title, slug, summary) for each document.
-   `integrations/`: A package containing modules for connecting to external services.
    -   `notion_uploader.py`: A concrete implementation for uploading content to a Notion database.
    -   `supabase_stub.py`: A placeholder stub for a future Supabase integration.
-   `output/`: The default directory where all generated text files and JSON metadata are saved.
-   `tests/`: Contains unit tests for the pipeline's modules.

### Setup

1.  **Install Dependencies:** Install the required Python packages.
    ```bash
    pip install -r requirements.txt
    ```

2.  **Set Environment Variables (for Notion):** If you plan to use the Notion integration, you must set the following environment variables:
    -   `NOTION_API_KEY`: Your Notion integration secret.
    -   `NOTION_DATABASE_ID`: The ID of your target Notion database.

### Workflow

The pipeline is executed via the `main.py` script. It performs the following steps:

1.  Reads a source markdown file.
2.  Generates a URL-friendly slug, a summary, and other metadata.
3.  Saves a copy of the source content as a `.txt` file and the metadata as a `.json` file to the `output/` directory. The filename is standardized as `YYYY-MM-DD_{slug}_{type}.txt`.
4.  Parses the content into a list of structured blocks (e.g., headings, paragraphs).
5.  Calls the specified integration module to upload the content.

### Example Usage

To run the pipeline, use the following command structure from the root of the repository:

```bash
python main.py <source_file_path> "<Title>" <content_type> <integration_name>
```

**Example 1: Using the Supabase Stub**

This will run the full pipeline and use the Supabase stub, which prints the data it would have uploaded to the console. This is useful for testing without needing API keys.

```bash
python main.py "data/reports/The Alaskan Gambit.md" "The Alaskan Gambit" "report" "supabase"
```

**Example 2: Publishing to Notion**

This will run the pipeline and upload the content to your configured Notion database.

```bash
python main.py "data/reports/The Alaskan Gambit.md" "The Alaskan Gambit" "report" "notion"
```