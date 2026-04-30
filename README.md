# VoteGuide: Smart Election Assistant

## Project Overview

**Project Name:** VoteGuide
**Chosen Vertical:** Civic Tech / Election Tools
**Goal:** Create a smart assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.

## What the App Does

VoteGuide is a premium, 3D-styled interactive web application that acts as a smart election assistant. It guides voters through the entire election lifecycle—from registration and eligibility checks to finding polling locations and understanding Election Day procedures. By tailoring the experience based on the user's profile (First-Time Voter, Student, Returning Voter), the assistant transforms complex, text-heavy governmental processes into a digestible, step-by-step roadmap.

## How it Works

1. **Context Gathering:** The user is greeted by a cinematic, 3D-feeling landing page and asked to select their voter profile.
2. **Dynamic Generation:** Based on their selection, the app generates a personalized timeline. For example, students see additional steps regarding absentee ballots, whereas returning voters see a streamlined timeline.
3. **Interactive Timeline:** Users navigate through milestones (Registration, Dates, Location, Election Day). Each step expands to provide clear, actionable details and relevant outbound links to official resources.

## Design Decisions

- **Premium 3D Aesthetics:** Used Framer Motion and Tailwind CSS to implement "glassmorphism" cards, soft shadows, and glowing accents. This ensures the app feels like a trustworthy, modern product rather than a basic governmental form.
- **Micro-interactions:** Buttons lift on hover, active timeline nodes pulse with electric-blue glows, and background elements "float" slightly to create spatial depth.
- **Component-based Architecture:** Built with React (Vite) to ensure rapid loading times and seamless, single-page transitions without full page reloads.

## Google Services Integration (Mocked/Planned)

- **Google Maps:** "Find on Maps" actions for polling locations link directly into a Maps routing pattern.
- **Google Calendar:** "Add to Calendar" actions to insert crucial deadlines directly into the user's Google Calendar.
- **Google Search:** Verified resource lookup patterns for ensuring users are directed to official `.gov` state portals.

## Assumptions Made

- Users require quick, digestible information rather than reading extensive documentation.
- The app serves as a national/general guide that can link out to state-specific resources for the actual execution (e.g., registering on a state's official `.gov` portal).
- Users have access to modern web browsers to experience the 3D and glassmorphism styling.

## Repository Constraints Followed

- **Single Branch:** Development strictly adhered to a single `main` branch.
- **Under 10MB Total Size:** By avoiding heavy assets (images, videos), relying exclusively on CSS for visuals (gradients, shadows, blurs), using SVG icons (`lucide-react`), and using Vite as the bundler, the final project size is less than 1MB.

---

## Setup & Run Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone this repository.
2. Navigate to the project folder.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server, run:
```bash
npm run dev
```
Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

### Building for Production
To create an optimized production build:
```bash
npm run build
```

### Testing Notes
- **UI Responsiveness:** Test by resizing the browser window. The layout shifts smoothly from desktop grid to mobile column views.
- **Interaction Testing:** Click through the different voter profiles (First-Time, Student, Returning) to verify the timeline dynamically updates with the correct milestones.
- **Performance:** Verify the animations run at 60fps and that the overall bundle size remains minimal.
