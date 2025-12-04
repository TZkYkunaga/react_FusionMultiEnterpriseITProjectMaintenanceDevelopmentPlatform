# Frontend (Next.js)

This folder contains the Next.js frontend for the Fusion platform.

Top-level layout

- `frontend/` - Next.js app source and build artifacts
  - `src/app/` - Next.js app routes and pages
  - `src/components/` - Reusable React components (UI primitives + composed components)
    - `dashboard/` - dashboard-specific components
    - `ui/` - design system low-level primitives (buttons, inputs, dialogs, etc.)
  - `src/lib/` - small helper utilities and placeholder data

Notes
- Use `npm install` then `npm run dev` from the project root to start the frontend (scripts in root `package.json` forward to `frontend`).
- Keep components small and add an `index.ts` barrel when useful for cleaner imports.
