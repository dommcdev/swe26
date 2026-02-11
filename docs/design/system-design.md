<div align="center" style="padding-top: 100px;">

# ChopChop: The Digital Cookbook

<br>
<br>

**CS3340/6340**

**10 February, 2026**

<br>
<br>

Adolfo Duran, Dominic McDevitt, Katie Cerda, Kobie Henson, Shane Misley

</div>

<div style="page-break-after: always;"></div>

## Table of Contents

- [Background and Overview (pg 3-)](#background-and-overview)
- [Requirements Analysis](#requirements-analysis)
- [Detailed Design](#detailed-design)
- [Interface Design and Draft Screens](#interface-design-and-draft-screens)
- [Plan](#plan)
- [References](#references)
- [Notes](#notes)

<div style="page-break-after: always;"></div>

## Background and Overview

ChopChop is a web-based recipe management platform designed to solve the problem of disorganization with cooking recipes. Many people who cook regularly collect recipes from a variety of sources, such as writing them on paper, screenshots from websites, PDFs, and more. These formats are often unreliable, and cooks end up putting in more effort than they need to keep their recipes organized. ChopChop addresses this issue by allowing users to upload images or PDF documents of recipes and convert them into structured, manageable, and editable data. Using AI, the system extracts recipe details and transforms them into a structured format that can be customized and displayed in clean layouts optimized for mobile, PC, or printing.

The accumulation of culinary data has outpaced the tools available to manage it. Home cooks struggle with fragmented collections of "dirty data," food-stained printouts, PDFs, and handwritten notes that current software cannot easily digitize or structure. This project proposes a platform-agnostic, web-based system leveraging Large Language Models and Vision Language Models, specifically the Google Gemini API, to solve the ingestion bottleneck. By converting unstructured image data into structured JSON objects, the system enables dynamic recipe scaling, editing, and cross-platform access (Linux, Windows, macOS).

The digitization of culinary knowledge has evolved from physical index cards to local desktop databases, and finally to cloud-based mobile applications. However, this transition has introduced a significant data management problem: fragmentation. Modern cooks acquire recipes from diverse sources, including digital downloads, screenshots of social media video feeds, and legacy physical formats.

Existing solutions often fail to address the legacy data problem. Users are left with folders of inconsistently formatted PDFs or physical binders that are static and unsearchable. While Optical Character Recognition technology exists, it historically struggles with the complex, non-linear layouts of recipes, often failing to distinguish between ingredients and instructions or misinterpreting fractions.

This project outlines the development of a progressive web application designed to unify these disparate formats. The core innovation is the application of LLMs to parse complex visual data into JSON data, enabling a write once, run everywhere experience for users on any operating system.

Early consumer computing in the 1980s attempted to solve recipe management with hardware like the Honeywell Kitchen Computer, but failed due to high costs and poor usability. The 1990s and 2000s saw the rise of desktop software that mimicked physical index cards, requiring manual data entry. The current internet era introduced web-clipping tools (e.g., Paprika, Copy Me That) that scrape HTML from cooking blogs. While effective for standard websites, these parsers fail when presented with non-standard inputs such as PDFs, images of handwritten text, or social media screenshots.

The system uses the Gemini Vision model to interpret visual data. Unlike standard OCR, which reads text linearly, visual language models understand spatial context. They can differentiate between an ingredient list and a narrative blog post, and can identify fractions (e.g., "1/2 cup") even in non-standard fonts or handwriting.

Designed for the average home cook, the system simplifies meal management by leveraging the ubiquity of modern smartphones and web browsers to ensure access from any device, eliminating the need for specialized software. The integration of a visual LLM removes the barrier of manual data entry; users can simply take a picture of a physical printout or handwritten note, and the system automatically parses it into a digital format. This transformation turns static text into dynamic data, empowering users to effortlessly scale ingredient quantities for any serving size and share their personalized recipe collections with friends and family.

---

<div style="page-break-after: always;"></div>

## Requirements Analysis

### Introduction

Our idea for ChopChop came from recognizing that many people rely on unreliable and inconvenient methods to save recipes. This can make recipes difficult to organize, edit, and reuse over time. When designing ChopChop, our goal was to create a more manageable and modern way for users to store their recipes while maintaining flexibility and being user-friendly. We focused on features that would reduce complexity for users, such as allowing recipes to be uploaded from images or PDFs and converted into editable formats using AI. We chose to prioritize things that would enable users to see our platform as a more reliable source for help storing their recipes or tweaking them. At the same time, we avoided unnecessary complexity by focusing only on features that directly improve a user's cooking experience, ensuring the application remains intuitive while still powerful.

### Problem

Many home chefs will naturally start to keep a recipe collection, i.e saving off pdfs from various recipe sites to print and/or save to disk. Many chefs also want to tweak the recipes they save. This either results in a big stack of food-stained printouts with penciled-in tweaks, or a folder full of inconsistently formatted pdfs without the ability to add modifications.

### Solution

We will build a website that allows users to submit images or pdf documents of a recipe to add it to their recipe collection. Our system will use the Gemini API to convert that image to a json object, which will be parsed by our system to generate various aesthetically pleasing layouts (one optimized for printing, one for mobile, one for desktop screens, etc). Users will be able to tweak the details of a recipe at any time, categorize recipes, share recipes via link, etc. This website will be officially supported on Linux, Windows, and Mac on Chrome, Firefox, and Safari. Other Chromium-based browsers will probably work but won’t be officially tested.

### Main Functionalities

**A user will be able to…**

- Create an account to have easy access to their recipe collection
- Upload a pdf or image of a recipe to add it to the system
- Create/edit categories to keep recipes organized
- Edit the number of servings they want for a recipe
- Make edits to any recipe at any time
- Create a shareable link for easy recipe sharing
- Export pdfs of recipes and/or collections
- Export a json archive of all recipe data for use in other programs if desired

**The system will be able to…**

- Generate layouts optimized for mobile, desktop, and pdf printing.
- Update the recipe amounts on a recipe based on the number of servings
- Use the Gemini API to generate a json object with the recipe details from the uploaded image/pdf.
- Create an unlisted link to a recipe (and maybe a private link)

### Development tools, languages, platforms

We chose the following tech stack based on current web standards. All of the languages/frameworks below are modern, performant, well-supported. Additionally, the listed operating systems and browsers cover the majority of potential users. Because our app will be a website it will run on an computing device with a browser and internet connection, including (but not limited to) PCs, smartphones, tablets, and smart fridges.

- React (Typescript)
- Next.js
- Tailwind CSS
- Bun
- Vercel (for hosting)
- Sqlite database
- Github
- Gemini API via Vercel AI SDK
- Linux, Windows, and macOS
- Chrome, Firefox, and Safari

---

<div style="page-break-after: always;"></div>

## Detailed Design

This section expands on the system requirements and provides a detailed technical design for the ChopChop recipe management platform.

### 1. System Architecture

The system follows a modern web application architecture using Next.js for both frontend and backend API routes. It leverages serverless functions for scalability and integrates with external services for AI processing and data storage.

![System Architecture](https://raw.githubusercontent.com/dommcdev/images/refs/heads/main/chopchop/architecture.png)

#### Core Modules

- **Frontend (Next.js/React):** Handles user interaction, state management, and rendering of responsive UI.
- **Backend API (Next.js API Routes):** Manages business logic, authentication, and data validation.
- **Database (SQLite + Drizzle ORM):** Stores structured data for users, recipes, and ingredients.
- **Gemini Service Adapter:** specialized module to interact with Google's Gemini Vision API for recipe extraction.
- **Storage Service:** Manages upload and retrieval of raw recipe images and PDFs.

### 2. Data Design

The database schema is designed to support the core entity relationships required for recipe management.

![Entity Relationship Diagram](https://raw.githubusercontent.com/dommcdev/images/refs/heads/main/chopchop/erd.png)

#### Schema Definitions

**Users Table**

- `id`: UUID (Primary Key)
- `email`: String (Unique, Indexed)
- `password_hash`: String (Argon2id)
- `created_at`: Timestamp

**Recipes Table**

- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to Users)
- `title`: String
- `description`: Text
- `servings`: Integer (Default: 1)
- `prep_time_min`: Integer
- `cook_time_min`: Integer
- `source_image`: Blob/Reference (Path to stored image)

**Ingredients Table**

- `id`: Integer (Primary Key, Auto-increment)
- `recipe_id`: UUID (Foreign Key to Recipes)
- `name`: String
- `quantity`: Float
- `unit`: String

### 3. User Flows

The application flow is designed to be intuitive, centering around the "Upload -> Process -> Edit" loop.

![User Flow Diagram](https://raw.githubusercontent.com/dommcdev/images/refs/heads/main/chopchop/user_flow.png)

#### Key Flows

1.  **Authentication:** Users must authenticate to access their private library.
2.  **Ingestion:**
    - User uploads a file (PDF/Image).
    - System validates file type and size.
    - Backend sends file to Gemini Vision API.
    - Gemini returns structured JSON.
3.  **Editing:**
    - User reviews the AI-extracted data in the Recipe Editor.
    - Corrections are made to ingredients or instructions.
    - User saves the recipe to their library.
4.  **Consumption:**
    - User views recipe in a read-only format optimized for cooking.
    - User can scale servings, which dynamically adjusts ingredient quantities.

### 4. Module Interactions

#### PDF/Image Ingestion Pipeline

1.  **Upload:** Client sends `FormData` containing the file to `/api/upload`.
2.  **Validation:** Middleware checks file size limits and MIME types.
3.  **Storage:** File is saved to temporary storage or object storage (S3/Blob).
4.  **Processing:**
    - If PDF: Converted to image series.
    - Image passed to `GeminiAdapter`.
5.  **Extraction:** `GeminiAdapter` constructs a prompt with the image and sends it to Gemini API.
6.  **Response:** Gemini returns JSON. System validates JSON against `RecipeSchema`.
7.  **Return:** Validated JSON is returned to the client for the Editor view.

---

## Interface Design and Draft Screens

### Overview

This section covers the draft screens for ChopChop and how users move through the application. The screens outline the main pages and the information shown on each one and are meant to guide development rather than represent a final design.

### Draft Screen 1: Login and Account Creation

**Purpose:** Allow users to create an account or log in to access their recipe collection.

**Screen Contents:**

- Email input field
- Password input field
- Login button
- Link to create a new account
- Error message for invalid login attempts

After logging in successfully, the user is taken to the Home/Recipe Library screen.

![Login Screen](https://raw.githubusercontent.com/dommcdev/images/refs/heads/main/chopchop/login.png)

### Draft Screen 2: Home/Recipe Library

**Purpose:** Serve as the main landing page where users can view and manage their saved recipes.

**Screen Contents:**

- Navigation bar with links to Home, Upload Recipe, and Settings
- Search bar for recipes
- List or grid of saved recipes showing:
  - Recipe title
  - Category or tag (if applicable)
  - Prep or cook time (if available)
- Button to upload a new recipe
- Empty state message when no recipes are saved

Clicking a recipe opens the Recipe Viewer screen. Selecting the upload option takes them to the Recipe Upload screen.

![Home Screen](https://raw.githubusercontent.com/dommcdev/images/refs/heads/main/chopchop/index.png)

### Draft Screen 3: Recipe Upload (PDF or Image)

**Purpose:** Allow users to add a new recipe by uploading an image or PDF file.

**Screen Contents:**

- File upload area (file picker or drag and drop)
- Supported file types (PDF, JPG, PNG)
- Upload progress indicator
- Submit button
- Error message for unsupported files

Once the file is uploaded, it is processed by the backend using the Gemini API. The user is then redirected to the Recipe Editor screen to review the extracted information.

![Upload Screen](https://raw.githubusercontent.com/dommcdev/images/refs/heads/main/chopchop/upload.png)

### Draft Screen 4: Recipe Editor

**Purpose:** Allow users to review and edit the recipe data generated by the AI.

**Screen Contents:**

- Editable fields for:
  - Recipe title
  - Description
  - Number of servings
  - Preparation and cook time
- Editable list of ingredients including:
  - Ingredient name
  - Quantity
  - Unit
- Editable list of instruction steps
- Category selection
- Save and View buttons

After saving, the recipe is stored in the database and becomes available in the Recipe Library.

![Edit Recipe Screen](https://raw.githubusercontent.com/dommcdev/images/refs/heads/main/chopchop/edit_recipe.png)

### Draft Screen 5: Recipe Viewer

**Purpose:** Display a clean, read-only version of a recipe for cooking, sharing, or printing.

**Screen Contents:**

- Recipe title and description
- Ingredient list with quantities scaled based on serving size
- Step by step instructions
- Controls to adjust servings
- Buttons to edit, share, or export the recipe as a PDF

Users may return to the library, edit the recipe, generate a shareable link, or export the recipe.

![View Recipe Screen](https://raw.githubusercontent.com/dommcdev/images/refs/heads/main/chopchop/view_recipe.png)

### Draft Screen 6: Settings and Export

**Purpose:** Provide account settings and data export options.

**Screen Contents:**

- Account information
- Option to export all recipes as a JSON file
- Option to export recipes as PDFs
- Logout button

Changes made here apply to the user account and stored data.

![Settings Screen](https://raw.githubusercontent.com/dommcdev/images/refs/heads/main/chopchop/settings.png)

### Summary

These draft screens define the basic structure and user flow of the ChopChop application. They will be used as a reference when implementing frontend components and backend integrations. Final visual styling will be addressed later in development once core functionality is complete.

---

<div style="page-break-after: always;"></div>

## Plan

We broke our tasks into three general groups: frontend tasks, backend tasks, and documentation tasks. Our Gantt chart places these on a schedule.

### Frontend tasks

- **Login page**
  - Purpose: Provide account creation and sign-in so users can access a private recipe collection.
  - Scope: Email/password UI, validation, error states, password reset (if in scope), loading states, and redirect behavior.
  - Deliverables: Login/register forms, session-aware routing, minimal styling consistent with the app.
- **Home page**
  - Purpose: Primary “recipe library” landing page after login.
  - Scope: List recipes (title, time, tags/categories), create/import CTA, recent uploads, empty states, basic navigation.
  - Deliverables: Responsive recipe grid/list, navigation shell, basic category filters (if ready).
- **File selector (camera/image picker)**
  - Purpose: Ingest recipe sources (PDF or image) for AI extraction.
  - Scope: File upload component, drag/drop, mobile camera capture where supported, file type/size validation, upload progress, re-try, cancel.
  - Deliverables: Upload UI + wiring to backend ingestion endpoint.
- **Recipe details editor**
  - Purpose: Let users review and correct the extracted recipe JSON.
  - Scope: Editable fields for title/description/servings/time; ingredient rows (name/qty/unit); instruction steps; category assignment; save/versioning behavior; client-side validation.
  - Deliverables: Full CRUD editor UI bound to recipe schema; “save” + “save and view” flows.
- **Settings page**
  - Purpose: User preferences and account management.
  - Scope: Profile basics, export actions (JSON archive / PDFs), delete account/data (optional), rate-limit notifications (optional), theme (optional).
  - Deliverables: Settings UI + backend hooks for export and user options.
- **Recipe viewer**
  - Purpose: Clean read-only layout optimized for cooking.
  - Scope: Mobile-first readability, ingredient scaling display, step-by-step view, share-link access mode (unlisted), print/export CTA.
  - Deliverables: Viewer route that renders from stored recipe data consistently.
- **Print to PDF layout**
  - Purpose: A print-friendly, stable layout (and/or PDF export) for single recipe or collection.
  - Scope: Dedicated print stylesheet/layout, pagination considerations, consistent font sizing, ingredient/instructions formatting; “Print” and “Export PDF” UX.
  - Deliverables: Print-ready view + tested output.
- **Search**
  - Purpose: Find recipes quickly.
  - Scope: Search by title, ingredient text, category; debounce; highlight matches; “no results” states; optionally full-text search support.
  - Deliverables: Search bar + results view; backend query endpoints or client filtering depending on DB approach.

### Backend tasks

- **PDF to image converter**
  - Purpose: Convert uploaded PDFs into images for Gemini Vision ingestion (or extract per-page).
  - Scope: Server-side conversion pipeline, page limits, resolution, compression, storage strategy (temp vs persistent).
  - Deliverables: Endpoint/service that takes PDF → images (array), returns references for Gemini processing.
- **Gemini API adapter**
  - Purpose: Standardize calling Gemini and transforming outputs into your internal recipe JSON schema.
  - Scope: Prompting template, response parsing, schema validation, error handling, retries, cost controls.
  - Deliverables: A single adapter module that returns a validated recipe object (or structured errors).
- **Define SQL schemas**
  - Purpose: Persist users, recipes, ingredients, etc. consistent with the design doc tables.
  - Scope: Migrations, constraints, indexing, foreign keys; consider categories, share links, and original upload references.
  - Deliverables: SQL migration scripts + a typed access layer.
- **DB to JSON converter (export)**
  - Purpose: Allow exporting all user data to a portable archive (explicit requirement).
  - Scope: Serialize recipes + ingredients + categories + metadata; optionally include source images; ensure stable schema for re-import.
  - Deliverables: Export endpoint that returns a downloadable JSON (and optional zipped assets).
- **Auth (including rate-limiting)**
  - Purpose: Secure accounts and protect costly endpoints (Gemini calls, uploads).
  - Scope: Session/JWT strategy, password hashing, middleware guards, per-user request throttling, abuse prevention.
  - Deliverables: Auth middleware + rate limiter on ingestion and AI endpoints, plus basic audit logs (optional).
- **S3 storage bucket (low-priority if doing images)**
  - Purpose: Persist uploaded images/PDFs (or page images) outside the app server.
  - Scope: Bucket config, signed upload URLs, lifecycle rules, access controls.
  - Deliverables: Storage integration, plus DB references to stored assets.
- **Deploy to Vercel (optional)**
  - Purpose: Ship a working demo/production instance.
  - Scope: Environment variables, build settings, DB hosting choice, secrets management, staging vs prod.
  - Deliverables: Vercel project configured + deployment pipeline.

### Documentation

- **Requirements doc**
  - Purpose: Finalize user-facing and system requirements (functional + nonfunctional).
  - Deliverables: Clean requirements section with acceptance criteria.
- **Design doc**
  - Purpose: Architecture, module interactions, data flow, database schema, and UI mock usage examples.
  - Deliverables: Completed “Detailed Design” section, diagrams, inputs/outputs per module.
- **Programmer’s manual**
  - Purpose: How to run, test, deploy, and extend the codebase.
  - Deliverables: Setup steps, env vars, scripts, folder structure, API contracts.
- **User manual**
  - Purpose: How an end user uses ChopChop.
  - Deliverables: Upload flow, edit flow, search, share, export, print instructions, screenshots.
- **Integration task**
  - Purpose: Connect end-to-end: upload → convert → Gemini → validate → store → edit/view/print/export.
  - Deliverables: Working happy-path plus error-path handling; smoke tests.
- **Final testing**
  - Purpose: Verify correctness, usability, and edge cases.
  - Scope: Unit tests (adapter/schema), integration tests (ingestion), cross-browser checks (Chrome/Firefox/Safari), mobile responsiveness, print output checks.
  - Deliverables: Test plan + results summary.
- **Final presentation**
  - Purpose: Demo + explain architecture/decisions and show outcomes.
  - Deliverables: Slide deck + demo script + “what we built vs plan” summary.

### Gantt Chart

![Project Gantt Chart](https://raw.githubusercontent.com/dommcdev/images/refs/heads/main/chopchop/gantt-chart.png)

---

<div style="page-break-after: always;"></div>

## References

- Centre, S. (2020, November 10). _Jumbles: Digital Tools and Historical Recipe Reconstruction_. Sherman Centre for Digital Scholarship. [https://scds.ca/jumbles-digital-tools-historical-recipe-reconstruction/](https://scds.ca/jumbles-digital-tools-historical-recipe-reconstruction/)
- _Paprika Recipe Manager for iOS, Mac, Android, and Windows_. (n.d.). paprikaapp.com. [https://www.paprikaapp.com/](https://www.paprikaapp.com/)
- Pressman, R. S., & Maxim, B. R. (2019). _Software engineering: A practitioner’s approach (9th ed.)_. McGraw-Hill Education.
- Recipe - Schema.org Type. (n.d.). Schema.org. [https://schema.org/Recipe](https://schema.org/Recipe)
- _Copy Me That_. (2025). Copy Me That. [https://www.copymethat.com/](https://www.copymethat.com/)
- IBM. (2024, April 18). _What is optical character recognition (OCR)?_ Ibm.com. [https://www.ibm.com/think/topics/optical-character-recognition](https://www.ibm.com/think/topics/optical-character-recognition)

---

<div style="page-break-after: always;"></div>

## Notes

**01/13/26**
Discussed the programming languages that each team member is familiar with and which languages we will be using to develop the website. In class, we talked about the possibility of switching project ideas due to some feasibility issues with our previously-planned Discord/Spotify website project.

Met in the library after class to further discuss project direction. We explored an alternative idea involving a recipe management website where users can upload multiple recipes using PDFs or images.

In this alternate idea, the Gemini API would process the uploaded files, extract the recipe information, and automatically format it into a clean, organized PDF or website for easy user access. Discussed the main functionalities the platform would include and how users would interact with the system. We ultimately decided to go with this recipe management website for our project.

**01/20/25**
Discussed tasks for the week and assigned some roles/tasks to people, Katie and Kobie worked on the abstract, and it has been decided that Katie will make the tasks list, Adolfo is doing the costs analysis, Dominic is doing the preliminary design, and Shane is doing the overview/background research. We also did a presentation in class.

**01/27/2026**
We met in the library and further discussed the tasks list / goals for the project. We briefly discussed the creation of a grant chart at some point in the future, not now. Currently we are trying to decide whether or not 1 person should work on 1 task or maybe having more than 1 person working on a single task, for example, 2 people could work on the front end of our website, one person editing the login, another person editing where the user sees the recipes. Discussed layout/creation of the website. Discussed backend creation, especially the usage of gemini

**02/03/2026**
We worked on the design doc in class and formatted it to the requirements.
