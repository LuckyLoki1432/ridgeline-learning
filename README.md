# Ridgeline Learning landing page

Responsive React landing page built from the supplied desktop and mobile design references.

## Features
- Semantic HTML landmarks and responsive navigation with an accessible mobile menu.
- Hero, benefits, program cards, registration form, FAQ and footer.
- Reusable React components and CSS Modules using Grid and Flexbox.
- Controlled registration inputs with required name, email, program and consent validation.
- Field-level accessible error messages and local-only success confirmation.
- No personal data is transmitted or persisted.
- Custom SVG brand logo and illustrations; no external image requests.

## Requirements
- Node.js 18+
- npm 9+

## Setup
```bash
npm install
npm run dev
```
Vite normally serves the app at http://localhost:5173.

## Production
```bash
npm run build
npm run preview
```
The build output is `dist/`. Deploy with Vercel or Netlify using build command `npm run build` and output directory `dist`.

## Structure
```text
src/
  components/   # Header, Hero, Benefits, Programs, RegistrationForm, FAQ, Footer
  styles/       # global base styles
  App.jsx
  App.module.css
  main.jsx
public/images/  # SVG logo and illustrations
```

## Dependencies
React 18, React DOM 18 and Vite 5. No analytics, external API, form backend or UI framework.

## Registration privacy
This is a frontend demonstration. Form validation occurs in the browser and successful submission displays an on-page confirmation. The data is not sent to a server, emailed or saved.

## Accessibility and verification
Labels, field descriptions, `aria-invalid`, live confirmation, keyboard focus styles, menu expanded state, Escape-to-close, semantic sections and reduced-motion support are included. Verify the deployed page at 320, 390, 768, 1200 and 1440 CSS pixels. Run Chrome/Firefox checks and Lighthouse before recording scores; no unrun test is marked as passed.
